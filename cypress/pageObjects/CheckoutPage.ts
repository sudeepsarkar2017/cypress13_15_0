import { BasePage } from "./BasePage";

const getFutureYear = () => ((new Date().getFullYear()) + 3) % 100;

export class CheckoutPage extends BasePage {

    readonly getPayWithCardButton = () => cy.findByText('Pay with Card');
    readonly getPayButton = () => cy.iframe().find("#submitButton");
    readonly getEmailTextBox = () => cy.iframe().find("#email");
    readonly getCardNumberTextBox = () => cy.iframe().find("#card_number");
    readonly getCardExpireTextBox = () => cy.iframe().find("#cc-exp");
    readonly getCardCVCTextBox = () => cy.iframe().find("#cc-csc");
    readonly getZipCode = () => cy.iframe().find('#billing-zip');
    readonly verifyPaymentSuccess = () => cy.iframe();

    // Verifies checkout page
    verifyCheckoutPageTile() {
        cy.fixture('pageTitle').then((title) => {
            cy.title().should('include', title["CheckoutPage"].pageTitle);
        })
    }

    verifyItemsInCart(uniqueDescription: string): void {
        cy.contains("tbody tr", uniqueDescription)
    }

    /**
     * Enter card details
     * @param cardType get the value from fixtures/cardDetails.json
     * @param cardExpireDate in the format of 'MMYY'
     */
    enterCardDetails(cardType = 'VisaCard', cardExpireDate = `11${getFutureYear()}`) {
        cy.frameLoaded({ url: 'https://checkout.stripe.com/' });

        cy.fixture('cardDetails').then((details) => {
            const detail = details[cardType];
            this.getEmailTextBox().click().type(detail.emailId, { delay: 10 });
            this.getCardNumberTextBox().dblclick({ force: true }).should('have.class', "control focus");
            this.getCardNumberTextBox().dblclick({ force: true }).type(detail.cardNumberTwotChar, { delay: 10 });
            cy.iframe().find(`[class="card ${detail.cardType}"]`).should('exist');
            this.getCardNumberTextBox().dblclick({ force: true }).type(detail.cardNumber, { delay: 10 });
            this.getCardExpireTextBox().dblclick().type(cardExpireDate, { delay: 10 });
            this.getCardCVCTextBox().dblclick().type(detail.cvc, { delay: 10 });
            this.getZipCode().dblclick().type(detail.zipcode, { delay: 10 });
            this.getPayButton().click();
        })
    }
}
