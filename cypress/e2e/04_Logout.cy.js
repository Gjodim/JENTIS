const username = Cypress.env("username");
const password = Cypress.env("password");

describe('Logout', () => {
    beforeEach('Login', () => {
        //cy.loginUser('users/login', username, password)
        //cy.visitPage('/contactList')
        //cy.currentPageIs('/contactList')
        cy.visitPage('/')
        cy.currentPageIs('/')
        cy.typeInField(cy.getField("input", "id", "email"), username, false)
        cy.typeInField(cy.getField("input", "id", "password"), password, false)
        cy.clickOption(cy.getField("button", "id", "submit"))
        cy.currentPageIs('contactList')
    })

    it(`Verify user is able to logout`, () => {
        cy.intercept('POST', '**/users/logout*').as('logout');

        cy.assertFieldVisible(cy.getField("button", "id", "logout"))
        cy.clickOption(cy.getField("button", "id", "logout"))
        cy.currentPageIs('logout')

        cy.wait("@logout").then(intercept => {
            cy.get('@logout').should('exist')
            cy.expect(intercept.response.statusCode).to.equal(200)
        })
    })
})