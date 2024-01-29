import {helper} from "../support/helper";

const username = Cypress.env("username");

describe('SignUp', () => {
    beforeEach('Go to Add User page', () => {
        cy.visitPage('addUser')
        cy.currentPageIs('addUser')
    })

    it(`Verify fields existence`, () => {
        cy.assertFieldVisible(cy.getField("input", "id", "firstName"))
        cy.assertFieldVisible(cy.getField("input", "id", "lastName"))
        cy.assertFieldVisible(cy.getField("input", "id", "email"))
        cy.assertFieldVisible(cy.getField("input", "id", "password"))
        cy.assertFieldVisible(cy.getField("button", "id", "submit"))
        cy.assertFieldVisible(cy.getField("button", "id", "cancel"))
    })

    it(`Verify signup of new user`, () => {
        cy.fixture('newUsers.json').then(data => {
            cy.typeInField(cy.getField("input", "id", "firstName"), data["First Name"])
            cy.typeInField(cy.getField("input", "id", "lastName"), data["Last Name"])
            cy.typeInField(cy.getField("input", "id", "email"), helper.randomIndex() + helper.indexByOne() + data["email"])
            cy.typeInField(cy.getField("input", "id", "password"), data["password"], false)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.currentPageIs('contactList')
        })
    })

    it(`Verify signup of user with already existing email`, () => {
        cy.fixture('newUsers.json').then(data => {
            cy.typeInField(cy.getField("input", "id", "firstName"), data["First Name"])
            cy.typeInField(cy.getField("input", "id", "lastName"), data["Last Name"])
            cy.typeInField(cy.getField("input", "id", "email"), username)
            cy.typeInField(cy.getField("input", "id", "password"), data["password"], false)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.currentPageIs('addUser')
            cy.assertFieldExists(cy.getField('span', 'id', 'error'))
            cy.assertFieldVisible(cy.getElementContains('span','Email address is already in use'))
        })
    })

    it(`Verify signup of user with un-matching password requirements`, () => {
        cy.fixture('newUsers.json').then(data => {
            cy.typeInField(cy.getField("input", "id", "firstName"), data["First Name"])
            cy.typeInField(cy.getField("input", "id", "lastName"), data["Last Name"])
            cy.typeInField(cy.getField("input", "id", "email"), helper.randomIndex() + helper.indexByOne() + data["email"])
            cy.typeInField(cy.getField("input", "id", "password"), data["unmatchingPassword"], false)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.currentPageIs('addUser')
            cy.assertFieldExists(cy.getField('span', 'id', 'error'))
            cy.assertFieldVisible(cy.getElementContains('span',`User validation failed: password: Path \`password\` (\`${data["unmatchingPassword"]}\`) is shorter than the minimum allowed length (7).`))
        })
    })

    it(`Verify cancel of signup`, () => {
        cy.fixture('newUsers.json').then(data => {
            cy.typeInField(cy.getField("input", "id", "firstName"), data["First Name"])
            cy.typeInField(cy.getField("input", "id", "lastName"), data["Last Name"])
            cy.typeInField(cy.getField("input", "id", "email"), helper.randomIndex() + helper.indexByOne() + data["email"])
            cy.typeInField(cy.getField("input", "id", "password"), data["unmatchingPassword"], false)
            cy.clickOption(cy.getField("button", "id", "cancel"))
            cy.currentPageIs('login')
        })
    })
})