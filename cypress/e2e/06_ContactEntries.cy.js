import {helper} from "../support/helper";

const username = Cypress.env("username");
const password = Cypress.env("password");
const token = Cypress.env("bearerToken");

describe('ContactEntries', () => {
    beforeEach('Login', () => {
        cy.loginUser('users/login', username, password)
        cy.visitPage('/contactList')
        cy.currentPageIs('/contactList')
        /*cy.visitPage('/')
        cy.currentPageIs('/')
        cy.typeInField(cy.getField("input", "id", "email"), username, false)
        cy.typeInField(cy.getField("input", "id", "password"), password, false)
        cy.clickOption(cy.getField("button", "id", "submit"))
        cy.currentPageIs('contactList')*/
    })
    before('Add sample Contact', () => {
        cy.fixture('sampleContact.json').then(data => {
            cy.addContact('contacts', token, data["contact"])
        })
    })
    /*after('Delete Contacts', () => {
        cy.deleteContacts('contacts/', token)
    })*/

    it(`Access page`, () => {
        cy.currentPageIs('contactList')
    })

    it(`Verify fields existence`, () => {
        cy.assertFieldVisible(cy.getField("table", "id", "myTable"))
        cy.assertFieldVisible(cy.getField("button", "id", "add-contact"))
        cy.assertFieldVisible(cy.getField("button", "id", "logout"))
    })
})