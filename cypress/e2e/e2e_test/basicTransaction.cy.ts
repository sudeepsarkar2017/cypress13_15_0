import { baseComponent } from "../../e2e_Component/index";

describe('Basic Functionality of Weather Shopper', () => {

    it('E2E Task 1 - Test to complete the Basic Transaction of cream based on temperature', () => {
        baseComponent.creamSelectionBasedOnTemperature();
        baseComponent.addCreamBasedOnTemperature();
        baseComponent.completeTransaction();
        cy.contains('PAYMENT SUCCESS');
    })

})