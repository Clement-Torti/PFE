import { Component } from '@angular/core';

import { FolderService } from 'src/app/services/folder.service';
import { TaskService } from 'src/app/services/task.service';

import { File } from 'src/app/models/file';
import { Test } from 'src/app/models/test';
import { MOCKED_TEST } from 'src/app/mocks/test-mock';
import { MOCKED_STEP } from 'src/app/mocks/step-mock';

@Component({
  selector: 'app-test-edit-view',
  templateUrl: './test-edit-view.component.html',
  styleUrls: ['./test-edit-view.component.css'],
})
export class TestEditViewComponent {
  selectedFile: File | null = null;
  test: Test = MOCKED_TEST;
  inputName = '';
  showCode = false;
  code = `# -*- coding: cp1252 -*-


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
  `;

  constructor(
    private folderService: FolderService,
    private taskService: TaskService
  ) {
    this.folderService.selectedFile$.subscribe((file) => {
      this.selectedFile = file;
    });
  }

  onGenerateCodeClick() {
    const folder = this.folderService.getFolder();

    if (folder && this.selectedFile) {
      this.taskService
        .updateFile(
          folder._id,
          this.selectedFile._id,
          this.selectedFile.title,
          this.selectedFile.content
        )
        .subscribe(() => {
          this.folderService.getFiles();
        });
    }

    this.showCode = true;
  }

  onDeleteTestClick() {
    const folder = this.folderService.getFolder();
    if (folder && this.selectedFile) {
      this.taskService
        .deleteFile(folder._id, this.selectedFile!._id)
        .subscribe(() => {
          this.selectedFile = null;
          this.folderService.getFiles();
        });
    }
  }

  onAddStepClick() {
    this.test.steps.push(MOCKED_STEP);
  }

  onMoveStepClick(index: number) {
    if (index < this.test.steps.length - 1) {
      const step = this.test.steps[index];
      this.test.steps[index] = this.test.steps[index + 1];
      this.test.steps[index + 1] = step;
    }
  }

  onDeleteStepClick(index: number) {
    this.test.steps.splice(index, 1);
  }

  onCloseCodeClick() {
    this.showCode = false;
  }

  onCopyToClipboardClick() {
    navigator.clipboard.writeText(this.code);
  }
}
