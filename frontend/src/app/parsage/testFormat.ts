/* eslint-disable */
import { Test } from "../models/test";

export function formatTest(PYTHON_INDENT: string, test: Test, periph: string, steps: string): string {

    let indentedPeriph = periph
    .split('\n')
    .map((line) => PYTHON_INDENT + PYTHON_INDENT + line)
    .join('\n');

    let indentedSteps = steps // Already indented in the step parser

    let executableSteps = '';
    for(let i = 0; i < test.steps.length; i++){
        executableSteps += `self.step${i + 1},\n`
    }

    let indentedExecutableSteps = executableSteps
    .split('\n')
    .map((line) => PYTHON_INDENT + PYTHON_INDENT + PYTHON_INDENT + line)
    .join('\n');


    return `# -*- coding: cp1252 -*-
import sys
from PyQt5.QtCore import QLocale, QTranslator, pyqtSignal
from PyQt5.QtWidgets import QApplication, QMessageBox
from PyQt5.Qt import QLibraryInfo
import threading
from testsUtils import *
from baseTest import testHGMicro_BaseTest

# Title: ${test.title}
# Author: ${test.author} - using eTester
# Description: ${test.description}
# Prerequisites: ${test.prerequisites}
${test.deviceType ? `# Device : ${test.deviceName} (${test.deviceType})` : ''}

class testHGMicro_SoftwareVerificationProtocolAppli(testHGMicro_BaseTest):

${PYTHON_INDENT}def __init__(self, parent=None):
${PYTHON_INDENT}${PYTHON_INDENT}super().__init__("${test.title}", parent)

${indentedPeriph}

${PYTHON_INDENT}${PYTHON_INDENT}#Setup and start the thread
${PYTHON_INDENT}${PYTHON_INDENT}self.running=True
${PYTHON_INDENT}${PYTHON_INDENT}self.thread1 = threading.Thread(target=self.runtest)
${PYTHON_INDENT}${PYTHON_INDENT}self.thread1.start()


${indentedSteps}

${PYTHON_INDENT}def executeSteps(self):
${PYTHON_INDENT}${PYTHON_INDENT}steps = [
${indentedExecutableSteps}
${PYTHON_INDENT}${PYTHON_INDENT}]

${PYTHON_INDENT}${PYTHON_INDENT}for step in steps:
${PYTHON_INDENT}${PYTHON_INDENT}${PYTHON_INDENT}if step() == 1:
${PYTHON_INDENT}${PYTHON_INDENT}${PYTHON_INDENT}${PYTHON_INDENT}return  1


if __name__ == "__main__":
${PYTHON_INDENT}app = QApplication(sys.argv)
${PYTHON_INDENT}#4 lignes suivantes pour la traduction des fenetres
${PYTHON_INDENT}locale = QLocale.system().name()
${PYTHON_INDENT}translator=QTranslator ()
${PYTHON_INDENT}translator.load("qt_" + locale, QLibraryInfo.location(QLibraryInfo.TranslationsPath))
${PYTHON_INDENT}app.installTranslator(translator)
${PYTHON_INDENT}#Creation de l'objet appli -> objet myapp
${PYTHON_INDENT}myapp = testHGMicro_SoftwareVerificationProtocolAppli()
${PYTHON_INDENT}#connect signals
${PYTHON_INDENT}myapp.DisplayMessageSignal.connect(myapp.DisplayMessageDialog)
${PYTHON_INDENT}myapp.DisplayQuestionSignal.connect(myapp.DisplayQuestionDialog)
${PYTHON_INDENT}#affichage de la fenetre (GUI)
${PYTHON_INDENT}myapp.show()
${PYTHON_INDENT}#exit
${PYTHON_INDENT}sys.exit(app.exec_())
`;
}

