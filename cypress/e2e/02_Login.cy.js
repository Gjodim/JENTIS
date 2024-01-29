const username = Cypress.env("username");
const password = Cypress.env("password");

describe('Login', () => {
    beforeEach('Go to Login page', () => {
        cy.visitPage('/')
        cy.currentPageIs('/')
    })

    it(`Verify fields existence`, () => {
        cy.assertFieldVisible(cy.getField("input", "id", "email"))
        cy.assertFieldVisible(cy.getField("input", "id", "password"))
        cy.assertFieldVisible(cy.getField("button", "id", "submit"))
        cy.assertFieldVisible(cy.getField("button", "id", "signup"))
    })

    it(`Verify login of registered user`, () => {
        cy.typeInField(cy.getField("input", "id", "email"), username, false)
        cy.typeInField(cy.getField("input", "id", "password"), password, false)
        cy.clickOption(cy.getField("button", "id", "submit"))
        cy.currentPageIs('contactList')
    })

    it(`Verify user cannot login with invalid credentials`, () => {

        cy.fixture('invalidCredentials.json').then(data => {
            cy.typeInField(cy.getField("input", "id", "email"), data["invalidUsername"], false)
            cy.typeInField(cy.getField("input", "id", "password"), password, false)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.currentPageIs('/')
            cy.assertFieldExists(cy.getField('span', 'id', 'error'), 'Incorrect username or password')
            cy.assertFieldVisible(cy.getElementContains('span','Incorrect username or password'))

            cy.typeInField(cy.getField("input", "id", "email"), username, false)
            cy.typeInField(cy.getField("input", "id", "password"), data["invalidPassword"], false)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.currentPageIs('/')
            cy.assertFieldExists(cy.getField('span', 'id', 'error'))
            cy.assertFieldVisible(cy.getElementContains('span','Incorrect username or password'))
        })
    })
})