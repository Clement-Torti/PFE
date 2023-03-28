# Test Title 
# Author: XXX - using eTester
# Description: 
# Prerequisites:

# Import base test

class HGMicro_Test(HGoMicro_Software_Verification_Base_Test):

    def __init__(self):
        super().__init__("testHGMicro_TC1_SMS")

    
    def step1(self):
        self.logScenario("Step 1: ", "Step name", "Step description")

        # Action 1

        # Action 2

        # Action 3

        # ...


    def test(self):
        # ----------- 
        # Init part
        # 
        self.logScenario("Initialization")


        # -----------
        # 1. Step Name
        # Step description
        self.step1()

        # ...

        # -----------
        # Factory reset
        # 
        self.logScenario("Factory reset")

        



