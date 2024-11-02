# Introduction
## _Automating Weather Shopper website using Cypress with Very basic page object model._

Framework is build using typescript.

- cypress-13.15.0
- handeled iframe
- Mocha framework

## FrameWork Description:

- ./fixtures: is having all the data providers for the test scripts using .json file.
- /e2e: is having all tests/specs
-       /e2e/component_test: is having tests for individule page/module/component
-       /e2e/e2e_test: is having complete e2e/integration test.
- /e2e_Component: is having all the functions related to e2e which is having buisness logic
- /pageObjects: is having all the pageObjects, functions, locators.
- /support: is having cypress specific files like commands.ts, and e2e.ts
- cypress.config.ts: is haveing all global configurations/ settings
- package.json: is having all dependencies

Environment:
            * Java version * 22.0.1
            * node version: * 18.13.0
            * npm version: * 8.19.3
    ** Note: haven't tried on any other environment so not sure whether it'll work on other environment. **
    ** Working fine on mac **

    ** Step 1: ** clone the project
        Command: git clone 
    ** Step2: ** install all the dependencies
        Command: npm run cy:install
    ** Step 3: ** execute in headless mode
        Command: npm run cy:run
    * Note: this command will generate a execution video .mp4 file under videos/test. *
    ** Step 4: ** execute in debug mode
        Command: npm run cy:open
        now click on the script you want to execute.
  