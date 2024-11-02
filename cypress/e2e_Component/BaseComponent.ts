import { basePage, checkoutPage } from "../pageObjects";

export class BaseComponent {

    // launch URL and verifies page Title
    // Navigate to moisturizers page if the weather is below 19 degrees.
    // Navigate to suncreens page if the weather is above 34 degrees.
    creamSelectionBasedOnTemperature() {
        basePage.launchUrl('IndexPage');
        basePage.selectCreamType();
    }

    // Add Creams based on temperature
    addCreamBasedOnTemperature() {
        cy.title().then(text => {
            /**
             * Add two moisturizers to your cart. First, select the least expensive mositurizer that contains Aloe.
             * For your second moisturizer, select the least expensive moisturizer that contains almond.
             * Click on cart when you are done.
             */
            if (text.includes("Moisturizers")) {
                basePage.getLeastExpensiveItem('Aloe');
                basePage.getLeastExpensiveItem('Almond');
                basePage.verifyItemsCountInCart(2);
                basePage.getInCart().click();
                checkoutPage.verifyCheckoutPageTile();
                checkoutPage.verifyItemsInCart('Aloe');
                checkoutPage.verifyItemsInCart('Almond');
            }
            /**
             * Add two sunscreens to your cart. First, select the least expensive sunscreen that is SPF-50.
             * For your second sunscreen, select the least expensive sunscreen that is SPF-30.
             * Click on the cart when you are done.
             * */
            else if (text.includes("Sunscreens")) {
                basePage.getLeastExpensiveItem('SPF-50');
                basePage.getLeastExpensiveItem('SPF-30');
                basePage.verifyItemsCountInCart(2);
                basePage.getInCart().click();
                checkoutPage.verifyCheckoutPageTile();
                checkoutPage.verifyItemsInCart('SPF-50');
                checkoutPage.verifyItemsInCart('SPF-30');
            }
        })
    }

    /**
     * Verify that the shopping cart looks correct.
     * Then, fill out your payment details and submit the form.
     * You can Google for 'Stripe test card numbers' to use valid cards.
     * Note: The payment screen will error 5% of the time by design
     */
    completeTransaction() {
        checkoutPage.getPayWithCardButton().click();
        checkoutPage.enterCardDetails("VisaCard");
    }
}

