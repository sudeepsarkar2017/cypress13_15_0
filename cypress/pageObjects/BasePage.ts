
export class BasePage {

    readonly getTemperature = () => cy.get('#temperature');
    readonly getBuyMoisturizersButton = () => cy.findByText('Buy moisturizers', { exact: false });
    readonly getBuySunscreensButton = () => cy.findByText('Buy sunscreens', { exact: false })
    readonly getItemBasedOnIngredientAndPrice = (ingredients: string, price = 'Price') =>
        cy.xpath(`//p[contains(.,'${ingredients}')]/following-sibling::p[contains(.,'${price}')]`);
    readonly getInCart = () => cy.get('#cart');


    /**
     * launch URL and verifies page Title. Default is baseUrl
     * @param url should be mentioned in pageTitle.json
     */
    launchUrl(url = '/') {
        cy.log(url)
        cy.fixture('pageTitle').then((titles) => {
            const title = titles[url]
            cy.visit(title.url);
            cy.title().should('include', title.pageTitle);
        })
    }

    // Shop for moisturizers if the weather is below 19 degrees.
    // Shop for suncreens if the weather is above 34 degrees.
    selectCreamType() {

        cy.fixture('pageTitle').then((title) => {
            this.getTemperature().invoke('text').then(temperature => {

                // Shop for moisturizers if the weather is below 19 degrees.
                if (parseInt(temperature, 10) < 19) {
                    this.getBuyMoisturizersButton().click();
                    cy.title().should('include', title["MoisturizersPage"].pageTitle);
                }
                // Shop for suncreens if the weather is above 34 degrees.
                else if (parseInt(temperature, 10) > 34) {
                    this.getBuySunscreensButton().click();
                    cy.title().should('include', title["SunscreensPage"].pageTitle);
                }
            })

        })
    }


    /**
     * Add Least Expensive Cream based on Ingredient
     * @param ingredient is the selection criteria
     */
    getLeastExpensiveItem(ingredient: string) {

        this.getItemBasedOnIngredientAndPrice(ingredient)
            .then(($prices) =>
                Cypress._.map($prices, (el) => el.innerText.match(/\d+(?:\.\d+)?/g)))
            .should('be.an', 'array')
            .then((list) => {
                const sorted = Cypress._.sortBy(list)
                cy.log(JSON.stringify(sorted))

                this.getItemBasedOnIngredientAndPrice(ingredient, sorted[0]?.[0]).first().siblings('button').click()
            });
    }

    /**
     * Verify Number of items added in cart
     * @param actualCount expected item count from item selection page
     */
    verifyItemsCountInCart(actualCount: string | number) {
        this.getInCart().invoke('text')
            .then(text => expect(text.replace(' item(s)', '')).to.equal(actualCount.toString()));
    }


}
