# -*- coding: cp1252 -*-


class HGoMicro_Software_Verification_Params (ScriptParamGeneral):
    def __init__(self, logName):
        ScriptParamGeneral.__init__(self)
        #Param perso script
        self._logPath="C:\\Temp\\" + logName + "_" + str(date.today())+ '_' + str(time.localtime()[3]) + '-' + str(time.localtime()[4]) + ".txt"

class HGoMicro_Software_Verification_Base_Test(QGroupBox):
    def __init__(self, logName, parent=None):
        super (HGoMicro_Software_Verification_Base_Test, self).__init__(parent)
        #Creation du set de parametres � utiliser -> objet param
        self.param=HGoMicro_Software_Verification_Params(logName)
        #Creation du pilote Phidgets
        self.phiphi=DriverPhidget()
        #open logfile if defined
        if self.param._logPath:
            self.logfile= open(self.param._logPath,'w')
        else:
            self.logfile = False
        #Creation de la queue avec le GUI
        self.queue=Queue.Queue()
        #Creation du semaphore pour bloquer les traitements
        self.mutex=QMutex()
        #Creation de la fenetre (GUI du test) -> objet ui
        self.ui = Ui_GroupBox(self.queue)
        self.ui.setupUi(self)
        self.connect(self.ui, SIGNAL("closefenetre(PyQt_PyObject)"), self.stopthread)
        #Creation et init du Timer de queue
        self.timer=QTimer()
        QObject.connect(self.timer, SIGNAL("timeout()"), self.periodicCall)
        self.timer.start(200)
        #Setup and start the thread
        self.running=True
        self.thread1 = threading.Thread(target=self.runtest)
        self.thread1.start()

    #Polling de la queue
    def periodicCall(self):
        self.ui.processIncoming(self.logfile)
        if not self.running:
            root.quit()

    #Killing thread on window close
    def stopthread (self, x):
        self.running=False
        self.thread1._Thread__stop()
        self.at_exit(0)

    #fonction init
    def inittest(self):
        ###INIT PART
        #ouvrir phidget
        self.phiphi.Open()
        #Power OFF au d�part
        self.phiphi.PowerOff(0)
        #ouvrir Ports S�rie
        self.param.ser.open()
        #open logfile if defined
        if self.param._logPath:
            self.logfile= open(self.param._logPath,'w')
        else:
            self.logfile = False

    #fonction at_exit
    def at_exit(self,code):
        try:
            if self.client:
                stdin, stdout, stderr = self.client.exec_command("kill $(pidof python2.7)\n\r")
                self.client.close()
        except:
            pass
        self.param.ser.flush()
        self.queue.join()
        self.phiphi.Close()
        if self.logfile:
            self.logfile.close()
        self.param.ser.close()
        self.ui.close()
        qApp.quit()
        exit(code)

    #Fonctions affichage BDD
    def DisplayMessageDialog(self, arg):
        QMessageBox.warning(self.ui,arg[0],arg[1])
        self.mutex.unlock()

    def DisplayQuestionDialog(self, arg):
        self.ReponseQuestion=QMessageBox.question(self.ui, arg[0], arg[1], QMessageBox.Yes | QMessageBox.No)
        self.mutex.unlock()

    #Fonction de detection et d'attente de démarrage de la carte
    @staticmethod
    def WaitBootLinux(serialPortConsole, queue, UN, PWD):
        queue.put("Wait Start Linux...")
        if WaitSerial("healthgomicro login", serialPortConsole, queue, 60)!=0:
                queue.put("ERROR: no linux login: KO")
                return False
        if ATcmd(UN, "Password", serialPortConsole, queue, 10)!=0:
                        queue.put("ERROR: setting linux username: KO")
                        return False
        if ATcmd(PWD, "root@healthgomicro:~#", serialPortConsole, queue, 10)!=0:
                queue.put("ERROR: setting linux password: KO")
                return False
        else:
            queue.put("Got Shell prompt")
            return True

    #Fonction d'envoi d'une requete POST sur le HGC Frontend
    def httpPostHgcFrontend(self, url, data):
        print url
        # base64 encode the username and password
        auth = base64.encodestring('%s:%s' % (self.param.hgcFrontendUsername, self.param.hgcFrontendPassword)).replace('\n', '')

        params = urllib.urlencode(data)
        headers = {"Content-type": "application/x-www-form-urlencoded","Authorization":"Basic %s" % auth}
        conn = httplib.HTTPConnection(self.param.testBenchIp + ":5051")
        conn.request("POST", url,params, headers)
        response = conn.getresponse()
        print response.status
        print response.reason
        self.queue.put(response.status)
        self.queue.put(response.reason)
        if response.status == 404:
            self.queue.put("HTTP POST FAILURE")
        dataResponse = response.read()
        conn.close()
        return(dataResponse)

    #Fonction d'envoi d'une requete POST sur le OM2M Server
    def httpPostOm2mServer(self, url, data):
        print url
        # params = urllib.urlencode(data)
        params = data
        headers = {"Content-type": "application/vnd.onem2m-res+xml;ty=4","X-M2M-Origin":"admin:edcoin33"}
        conn = httplib.HTTPConnection(self.param.testBenchIp + ":8090")
        conn.request("POST", url,params, headers)
        response = conn.getresponse()
        self.queue.put(response.status)
        self.queue.put(response.reason)
        if response.status != 200:
            self.queue.put("HTTP POST FAILURE")
        dataResponse = response.read()
        conn.close()
        return(dataResponse)

    #Fonction d'envoi d'une requete HTTP sur le Medical Server. (method = "GET", "POST", "PUT", etc...)
    def httpRequestMedicalServer(self, method, url, data="", customerServer="edevice"):
        print url
        body = ""
        headers = {}

        if customerServer == "and":
            conn = httplib.HTTPConnection(self.param.testBenchIp + ":8001")
        else: #edevice Medical Server
            conn = httplib.HTTPConnection(self.param.testBenchIp)

        if data:
            print "data is not empty"
            body = json.dumps(data)
            headers = {"Content-type": "application/json"}

        conn.request(method, url, body, headers)
        response = conn.getresponse()
        self.queue.put(response.status)
        self.queue.put(response.reason)
        if response.status == 400  :
            self.queue.put("HTTP REQUEST FAILURE")
        dataResponse = response.read()
        conn.close()
        return(dataResponse)

    #FTPGET handler: copie les blocs dans le fichier ouvert
    def HandleGetToFile (self, block):
        self.fd.write(block)

    #Recuperation d'un fichier par FTP
    def FTPGetFile (self, ftpserv, src, dest):
        self.queue.put("Connexion au Serveur "+ftpserv.FTPserv+"...")
        try:
            connect=ftp.FTP(ftpserv.FTPserv,ftpserv.FTPun,ftpserv.FTPpwd)
        except Exception, e:
            self.queue.put("Error: Impossible de se connecter au serveur FTP "+ftpserv.FTPserv)
            self.queue.put("Exception: "+str(e))
            return(1,0,0)
        self.queue.put("Get File: "+src)
        if ftpserv.FTPtype=='B':
            self.fd=open(dest, 'wb')
        elif ftpserv.FTPtype=='A':
            self.fd=open(dest, 'w')
        else:
            self.queue.put("FTP type inconnu")
            self.fd=open(dest, 'wb')
        r="" #init string
        t1=time.time()
        try:
            if ftpserv.FTPtype=='B':
                r=connect.retrbinary('RETR '+src, self.HandleGetToFile)
            elif ftpserv.FTPtype=='A':
                r=connect.retrlines('RETR '+src, self.HandleGetToFile)
            else:
                self.queue.put("FTP type inconnu")
        except Exception, e:
            self.queue.put("Error: Impossible de Downloader le fichier")
            self.queue.put("Exception: "+str(e))
            self.queue.put("Retour serveur: "+r)
            self.fd.close()
            return(1,0,0)
        self.fd.close()
        t2=time.time()
        self.queue.put(r) #retour serveur
        self.queue.put("File received")
        self.queue.put("Deconnexion...")
        try:
            r=connect.quit()
        except Exception, e:
            self.queue.put("Erreur Deconnexion.")
            self.queue.put("Exception: "+str(e))
            self.queue.put("Retour serveur: "+r)
            #return(1)
            return(0) #OK qd m�me car transfert long et donc > au timeout d'inactivit� (portant sur l'envoi de commandes) du serveur FTP
        self.queue.put(r)
        self.queue.put("Deconnect�")
        return(0)


    def APNParameter(self, user, pwd, server):
        #APNuser/APNpassword
        r1=SendSerial("cd /etc/ppp/", self.param.ser, self.queue,10)
        time.sleep(5)
        r2=SendSerial("sed -i 's/andhub/"+user+"/g' pap-secrets", self.param.ser, self.queue,10)
        time.sleep(5)
        r3=SendSerial("sed -i 's/edevice edevice/* "+pwd+"/g' pap-secrets", self.param.ser, self.queue,10)
        time.sleep(5)
        r4=SendSerial("cd ~", self.param.ser, self.queue,10)
        time.sleep(5)
        r5=WaitSerial('root@healthgomicro:~#',self.param.ser,self.queue,10)
        if r5 != 0:
            self.queue.put("Config FAILURE : save of pap-secrets KO")
            return(1)
            self.at_exit(1)
        #APNServer/APNuser
        p1=SendSerial("cd /etc/ppp/peers/", self.param.ser, self.queue,10)
        time.sleep(5)
        p2=SendSerial("sed -i 's/edevice/"+server+"/g' edhub", self.param.ser, self.queue,10)
        time.sleep(5)
        p3=SendSerial("sed -i 's/andhub/"+user+"/g' edhub", self.param.ser, self.queue,10)
        time.sleep(5)
        p4=SendSerial("cd ~", self.param.ser, self.queue,10)
        time.sleep(5)
        p5=SendSerial('sync', self.param.ser, self.queue,10)
        time.sleep(2)
        p6=WaitSerial('root@healthgomicro:~#',self.param.ser,self.queue,10)
        if p5 != 0:
            self.queue.put("Config FAILURE: save of edhub failure")
            return(1)
            self.at_exit(1)
        return(0)

    def CasaasServerConfig(self,ID,IPNoc,PortNoc):
        r1=SendSerial('sqlite3 /var/lib/edevice/hub_db.db', self.param.ser, self.queue,10)
        time.sleep(2)
        r2=WaitSerial('sqlite>',self.param.ser,self.queue,10)
        if r2 != 0:
            self.queue.put("SQLITE CONNECT FAILURE")
            self.at_exit(1)
        r3=SendSerial('update CASAASServers set casaasServers_id='+ID+';', self.param.ser, self.queue,10)
        time.sleep(5)
        r4=SendSerial('update CASAASServers set address="'+IPNoc+'";', self.param.ser, self.queue,10)
        time.sleep(5)
        r5=SendSerial('update CASAASServers set udpPort='+PortNoc+';', self.param.ser, self.queue,10)
        time.sleep(5)
        r6=SendSerialAns('select * from CASAASServers;',''+ID+'|'+IPNoc+'|'+PortNoc+'|10000', self.param.ser, self.queue,10)
        if r6!=0:
            self.queue.put("Echec parametrageserver Casaas")
            return(1)
        else:
            self.queue.put("Parametrage Casaas Server OK")
        time.sleep(2)
        r7=SendSerial('\04', self.param.ser, self.queue,10)
        time.sleep(5)
        r8=WaitSerial('root@healthgomicro:~#',self.param.ser,self.queue,10)
        if r8 != 0:
            self.queue.put("Config FAILURE : escape of sqlite KO")
            return(1)
            self.at_exit(1)
        return(0)

    def RechercheTexte(self):
        chaine = "Field '10' ="
        chaineFin = "Transaction finished"
        fichier = open("C:\\Temp\TestCopsCasaas.txt", "r")
        while 1:
            texte = fichier.readline()
            if chaine in texte:
                self.queue.put("LAC et Cell ID pr�sent :")
                LAC = texte[texte.index('=')+3:texte.index(':')]
                CellID = texte[texte.index(':')+1:texte.index('/')-2]
                self.queue.put("LAC : " +LAC+" ")
                self.queue.put("CellID : " +CellID+" ")
                return(0)
                break
            elif chaineFin in texte or texte == "":
                self.queue.put("Pas de LAC ni Cell ID")
                return(1)
                break
            else:
                print "CellID pas encore trouv�"
        fichier.close()



    #Configuration du Medical Server
    def MedicalServerConfig(self):
        hubsensorlink = self.httpRequestMedicalServer("GET", "/hubsensorlink?_sort=id&_order=ASC")
        parsed_json = json.loads(hubsensorlink)
        hubListMedicalServer = []
        for i in parsed_json:
            hubListMedicalServer.append(i["entity"]["hubId"])

        if self.param.hgoMiniSerialNumber not in hubListMedicalServer:
            print "Add hub in Medical Server"
            newHub = {"statusCode": "200"}
            newHub["id"] = self.param.hgoMiniSerialNumber
            newHub["entity"] = {}
            newHub["entity"]["sensors"] = []
            newHub["entity"]["active"] = True
            newHub["entity"]["hubId"] = self.param.hgoMiniSerialNumber
            newHub["entity"]["firmwareVersion"] = "1.0.1"
            newHub["entity"]["provisionCheckSum"] = "1"
            data = newHub
            self.httpRequestMedicalServer("POST", "/hubsensorlink", data)

        hubsensorlink = self.httpRequestMedicalServer("GET", "/hubsensorlink/" + self.param.hgoMiniSerialNumber)
        parsed_json = json.loads(hubsensorlink)
        auth_devMedicalServer = [];
        for i in parsed_json["entity"]["sensors"]:
            auth_devMedicalServer.append(i["sensorId"])

        if self.param.idScale_AndUA352BLE not in auth_devMedicalServer:
            newSensor = {"sensorId": self.param.idScale_AndUA352BLE}
            newSensor["sensorType"] = "weight"
            newSensor["interface"] = "BLE"
            newSensor["active"] = True
            parsed_json["entity"]["sensors"].append(newSensor)
            parsed_json["entity"]["provisionCheckSum"] = str(date.today())
            data = parsed_json
            self.httpRequestMedicalServer("PUT", "/hubsensorlink/" + self.param.hgoMiniSerialNumber, data)


    def RemovePeriph(self):
        hubsensorlink = self.httpRequestMedicalServer("GET", "/hubsensorlink/" + self.param.hgoMiniSerialNumber)
        parsed_json = json.loads(hubsensorlink)
        print "Parsed JSON:"
        print parsed_json["entity"]["sensors"]
        auth_devMedicalServer = [];
        for i in parsed_json["entity"]["sensors"]:
            auth_devMedicalServer.append(i["sensorId"])

        print "Auth dev list:"
        print auth_devMedicalServer
        indexFirstPeriph= auth_devMedicalServer.index(self.param.idScale_AndUA352BLE)
        del parsed_json["entity"]["sensors"][indexFirstPeriph]
        parsed_json["entity"]["provisionCheckSum"] = str(time.time() // 1000)
        data = parsed_json
        self.httpRequestMedicalServer("PUT", "/hubsensorlink/" + self.param.hgoMiniSerialNumber, data)

    #Restauration parametrage
    def RestoreParams(self):
        print "Mise en place des parametres par defaut"
        self.queue.put("Mise en place des parametres par defaut")
        self.phiphi.PowerOff(0)
        time.sleep(2)
        self.phiphi.PowerOn(0)
        self.WaitBootLinux(self.param.ser,self.queue, self.param.hgoMiniLogin, self.param.hgoMiniPassword)
        r=SendSerial('cp /etc/edevice/hub_db.default /var/lib/edevice/hub_db.db', self.param.ser, self.queue,10)
        time.sleep(2)
        r3=SendSerial('sync', self.param.ser, self.queue,10)
        time.sleep(2)
        settings = {"hubId": self.param.hgoMiniSerialNumber,"customerId": self.param.customer,"logs":0,"cloudRetransmissionPeriod":14400,"cloudConnectPeriod":82800,"smsPhoneNumber":"","smsPassword":"","interviewId":"","pstTimeout":28800,"rtcTimeout":604800}
        self.httpPostHgcFrontend("/postOm2mSettings", settings )
        settings = {"hubId": self.param.hgoMiniSerialNumber,"customerId": self.param.customer}
        self.httpPostHgcFrontend("/postOm2mClearLogs", settings )
        print "postNetworkApplicationStartStop:\n"
        settings = {"id":self.param.networkApplicationName,"status": "true"}
        self.httpPostHgcFrontend("/postNetworkApplicationStartStop", settings )
        print "postOm2mStartStop:\n"
        settings = {"status": "true"}
        self.httpPostHgcFrontend("/postOm2mStartStop", settings )
        print "Enable Medical Server:\n"
        data = {"EnableServer": True}
        self.httpRequestMedicalServer("POST", "/enableServer", data )
        print "Medical Server reject readings:\n"
        data = {"RejectReadings": False}
        self.httpRequestMedicalServer("POST", "/rejectReadings", data )
        self.httpRequestMedicalServer("DELETE", "/reading?hubId=" + self.param.hgoMiniSerialNumber)
        self.phiphi.PowerOff(0)
        time.sleep(2)
        print "Fin de la mise en place des parametres par defaut"


    #Scenario du test
    def runtest(self):
        ###INIT PART
        result=0 #Resultat du test
        self.inittest()
        self.queue.put("-"*10 + "Debut du test: HGMicro-TC-9 Communication with AnD Scale UC-352" + "-"*10)
        timeout=None

        #########
        ### Paramétrage usine:
        #########
        self.MedicalServerConfig()
        self.RestoreParams()


        #########
        ###Step1
        #########
        print "Step1:\n"
        self.phiphi.PowerOff(0)
        time.sleep(2)
        self.phiphi.PowerOn(0)
        self.WaitBootLinux(self.param.ser,self.queue, self.param.hgoMiniLogin, self.param.hgoMiniPassword)

        r6=SendSerialAns('tail -f /var/log/messages|grep "successfully initialized"','Hub successfully initialized', self.param.ser, self.queue,600)      
        if r6!=0:
            self.queue.put("Demarrage ko")
            result=1
        else:
            self.queue.put("Demarrage OK")
        r7=SendSerial('\03', self.param.ser, self.queue,10)
        time.sleep(2)


        self.mutex.lock()
        arg=["Message Operateur", "Appuyer sur le bouton 'SET' du UA-352BLE (A&D Scale) pendant 3s et attendre la fin de la procedure d'appairage"]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation

        data = {"id":"eDevice","status":"false"}
        self.httpPostHgcFrontend("/postNetworkApplicationStartStop", data )

        self.mutex.lock()
        arg=["Message Operateur", "Prendre une mesure avec le peripherique UA-352BLE (A&D Scale)."]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation

        time.sleep(90)
        data = {"hubId":self.param.hgoMiniSerialNumber,"customerId":"edevice","container":"dataPushed"}
        container = self.httpPostHgcFrontend("/getOm2mContainer", data)
        dataPushed = json.loads(container)
        dataPushed = str( dataPushed['content'] )

        if dataPushed != "[]":
            self.queue.put("STEP_1: OM2M server receives and stores measurement: OK")
        else:
            self.queue.put("STEP_1: OM2M server receives and stores measurement: KO")
            result=1

        ########
        ##Step2
        ########
        self.phiphi.PowerOn(0)
        print "Step2:\n"
        data = {"id":"eDevice","status":"true"}
        self.httpPostHgcFrontend("/postNetworkApplicationStartStop", data )

        self.mutex.lock()
        arg=["Message Operateur", "Prendre une mesure avec le peripherique UA-352BLE (A&D Scale) et attendre que la LED 'HealthGO Cloud Communication' devienne verte fixe."]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation

        measurements = self.httpRequestMedicalServer("GET", "/reading?[sensorId]=" + self.param.idScale_AndUA352BLE + "&_sort=readingTakenTime&_order=DESC")
        parsed_json = json.loads(measurements)
        measurementTime = datetime.datetime.fromtimestamp( int(parsed_json[0][0]['readingTakenTime']) // 1000 ).strftime('%Y-%m-%d')
        if measurementTime ==  time.strftime('%Y-%m-%d',time.localtime()):
            self.queue.put("STEP_2: Internal time of UA-352BLE was succesfully updated: OK")
        else :
            self.queue.put("STEP_2: Internal time of UA-352BLE was succesfully updated: KO")
            result=1

        #########
        ###Step3
        #########
        print "Step3:\n"
        self.phiphi.PowerOff(0)

        oldMeasurements = self.httpRequestMedicalServer("GET", "/reading?[sensorId]=" + self.param.idScale_AndUA352BLE + "&_sort=readingTakenTime&_order=DESC")
        oldMeasurements = json.loads(oldMeasurements)

        self.mutex.lock()
        arg=["Message Opérateur", "Déconnecter la batterie du périphérique UA-352BLE (A&D Scale)."]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation
        time.sleep(60)
        self.mutex.lock()
        arg=["Message Operateur", "Reconnecter la batterie du peripherique UA-352BLE (A&D Scale), configurer l'unit� de la balance en kg (bouton set au dos de la balance) et prendre une mesure. Attendre que l'ecran de la balance soit eteint avant de passer à la suite."]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation

        self.phiphi.PowerOn(0)
        self.WaitBootLinux(self.param.ser,self.queue, self.param.hgoMiniLogin, self.param.hgoMiniPassword)

        r6=SendSerialAns('tail -f /var/log/messages|grep "successfully initialized"','Hub successfully initialized', self.param.ser, self.queue,600)      
        if r6!=0:
            self.queue.put("Demarrage ko")
            result=1
        else:
            self.queue.put("Demarrage OK")
        r7=SendSerial('\03', self.param.ser, self.queue,10)
        time.sleep(2)

        self.mutex.lock()
        arg=["Message Operateur", "Prendre une mesure avec le peripherique UA-352BLE (A&D Scale) et attendre que la LED 'HealthGO Cloud Communication' devienne verte fixe."]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation

        newMeasurements = self.httpRequestMedicalServer("GET", "/reading?[sensorId]=" + self.param.idScale_AndUA352BLE + "&_sort=readingTakenTime&_order=DESC")
        newMeasurements = json.loads(newMeasurements)


        if (len(newMeasurements) - len(oldMeasurements)) > 1:
            self.queue.put("STEP_3: HealthGo Micro received only the second data: KO")
            result=1
        else :
            self.queue.put("STEP_3: HealthGo Micro received only the second data: OK")

        self.mutex.lock()
        arg=["Message Operateur", "Verifiez sur le medical server que la donn�e remont�e est en kg."]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation            


        #########
        ###Step4
        #########
        print "Step4:\n"
        
        self.mutex.lock()
        arg=["Message Operateur", "Configurer l'unit� de la balance en lb (bouton set au dos de la balance) "]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation

        self.mutex.lock()
        arg=["Message Operateur", "Prendre une mesure avec le peripherique UA-352BLE (A&D Scale) et attendre que la LED 'HealthGO Cloud Communication' devienne verte fixe."]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation

        newMeasurements2 = self.httpRequestMedicalServer("GET", "/reading?[sensorId]=" + self.param.idScale_AndUA352BLE + "&_sort=readingTakenTime&_order=DESC")
        newMeasurements2 = json.loads(newMeasurements2)
        
        if (len(newMeasurements2) != len(newMeasurements)):
            self.queue.put("STEP_4: HealthGo Micro received the measurement: KO")
            result=1
        else :
            self.queue.put("STEP_4: HealthGo Micro received the measurement: OK")

        self.mutex.lock()
        arg=["Message Operateur", "Verifiez sur le medical server que la donn�e remont�e est en lb."]
        self.emit(SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),arg)
        self.mutex.lock() # pour bloquer en attendant de r�sultat BDD
        self.mutex.unlock() # on a eu le resultat, on a donc repris mutex ligne ci-dessus, et on le relache donc de nouveau pour r�utilisation             
        
        ########
        ##Restauration des paramétres par défaut:
        ########
        self.RestoreParams()
        self.RemovePeriph()


        ########
        ##Resultat:
        ########
        if result==0:
            self.queue.put("TEST OK")
        else:
            self.queue.put("TEST KO")
        #fermeture des ressources
        self.at_exit(result)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    #4 lignes suivantes pour la traduction des fenetres
    locale = QLocale.system().name()
    translator=QTranslator ()
    translator.load(QString("qt_") + locale, QLibraryInfo.location(QLibraryInfo.TranslationsPath))
    app.installTranslator(translator)
    #Creation de l'objet appli -> objet myapp
    myapp = testHGMicro_SoftwareVerificationProtocolAppli()
    #connect signals
    app.connect(myapp, SIGNAL("DisplayMessageDialog(PyQt_PyObject)"),myapp.DisplayMessageDialog)
    app.connect(myapp, SIGNAL("DisplayQuestionDialog(PyQt_PyObject)"),myapp.DisplayQuestionDialog)
    #affichage de la fenetre (GUI)
    myapp.show()
    #exit
    sys.exit(app.exec_())
