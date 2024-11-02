import { basePage, checkoutPage } from "../../pageObjects/index";

describe('Basic Functionality of Weather Shopper', () => {

  it('Task 1 - Test to verify cream selection based on temperature', () => {
    basePage.launchUrl('IndexPage');
    basePage.selectCreamType();
  })

  it('Task 2 - Test to verify Add sunscreen cream in the Cart', () => {
    basePage.launchUrl('SunscreensPage');
    basePage.getLeastExpensiveItem('SPF-50');
    basePage.getLeastExpensiveItem('SPF-30');
    basePage.verifyItemsCountInCart(2);
    basePage.getInCart().click();
    checkoutPage.verifyCheckoutPageTile();
    checkoutPage.verifyItemsInCart('SPF-50');
    checkoutPage.verifyItemsInCart('SPF-30');
  })

  it('Task 3 - Test to verify Add Moisturizers cream in the Cart', () => {
    basePage.launchUrl('MoisturizersPage');
    basePage.getLeastExpensiveItem('Aloe');
    basePage.getLeastExpensiveItem('Almond');
    basePage.verifyItemsCountInCart(2);
    basePage.getInCart().click();
    checkoutPage.verifyCheckoutPageTile();
    checkoutPage.verifyItemsInCart('Aloe');
    checkoutPage.verifyItemsInCart('Almond');
  })

  it('Task 3 - Test to verify Checkout Page', () => {
    basePage.launchUrl('CheckoutPage');
    checkoutPage.verifyCheckoutPageTile();
    checkoutPage.getPayWithCardButton().click();
    checkoutPage.enterCardDetails("VisaCard");
    cy.contains('PAYMENT SUCCESS');
  })
})