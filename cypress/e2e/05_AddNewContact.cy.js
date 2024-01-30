import {helper} from "../support/helper";

const username = Cypress.env("username");
const password = Cypress.env("password");
let index = helper.indexByOne()

describe('AddNewContact', () => {
    beforeEach('Login', () => {
        cy.visitPage('/')
        cy.currentPageIs('/')
        cy.typeInField(cy.getField("input", "id", "email"), username, false)
        cy.typeInField(cy.getField("input", "id", "password"), password, false)
        cy.clickOption(cy.getField("button", "id", "submit"))
        cy.currentPageIs('contactList')
    })

    it(`Access page`, () => {
        cy.visitPage('addContact')
        cy.currentPageIs('addContact')
        cy.visitPage('contactList')
        cy.currentPageIs('contactList')
        cy.clickOption(cy.getField("button", "id", "add-contact"))
        cy.currentPageIs('addContact')
    })

    it(`Verify fields existence`, () => {
        cy.visitPage('addContact')
        cy.assertFieldVisible(cy.getField("input", "id", "firstName"))
        cy.assertFieldVisible(cy.getField("input", "id", "lastName"))
        cy.assertFieldVisible(cy.getField("input", "id", "birthdate"))
        cy.assertFieldVisible(cy.getField("input", "id", "email"))
        cy.assertFieldVisible(cy.getField("input", "id", "phone"))
        cy.assertFieldVisible(cy.getField("input", "id", "street1"))
        cy.assertFieldVisible(cy.getField("input", "id", "street2"))
        cy.assertFieldVisible(cy.getField("input", "id", "city"))
        cy.assertFieldVisible(cy.getField("input", "id", "stateProvince"))
        cy.assertFieldVisible(cy.getField("input", "id", "postalCode"))
        cy.assertFieldVisible(cy.getField("input", "id", "country"))
        cy.assertFieldVisible(cy.getField("button", "id", "submit"))
        cy.assertFieldVisible(cy.getField("button", "id", "cancel"))
        cy.assertFieldVisible(cy.getField("button", "id", "logout"))
    })

    it(`Verify contact is created with only mandatory fields`, () => {
        cy.visitPage('addContact')
        cy.fixture('newContact.json').then(data => {
            let firstName = helper.randomIndex() + index + data["First Name"]
            let lastName = helper.randomIndex() + index + data["Last Name"]

            cy.typeInField(cy.getField("input", "id", "firstName"), firstName)
            cy.typeInField(cy.getField("input", "id", "lastName"), lastName)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.assertFieldVisible(cy.getElementContains('td', firstName + ' ' + lastName))
        })
    })

    it(`Verify contact is created with combination of mandatory and non-mandatory fields`, () => {
        cy.visitPage('addContact')
        cy.fixture('newContact.json').then(data => {
            let firstName = helper.randomIndex() + index + data["First Name"]
            let lastName = helper.randomIndex() + index + data["Last Name"]
            let email = helper.randomIndex() + index + data["Email"]
            let streetAddress1 = helper.randomIndex() + index + data["Street Address 1"]

            cy.typeInField(cy.getField("input", "id", "firstName"), firstName)
            cy.typeInField(cy.getField("input", "id", "lastName"), lastName)
            cy.typeInField(cy.getField("input", "id", "email"), email)
            cy.typeInField(cy.getField("input", "id", "street1"), streetAddress1)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.assertFieldVisible(cy.getElementContains('td', firstName + ' ' + lastName))
            cy.assertFieldVisible(cy.getElementContains('td', email))
            cy.assertFieldVisible(cy.getElementContains('td', streetAddress1))

        })
    })

    it(`Verify contact is created with all fields`, () => {
        cy.visitPage('addContact')
        cy.fixture('newContact.json').then(data => {
            let firstName = helper.randomIndex() + index + data["First Name"]
            let lastName = helper.randomIndex() + index + data["Last Name"]
            let dateOfBirth = data["Date of Birth"]
            let email = helper.randomIndex() + index + data["Email"]
            let phone = data["Phone"]
            let streetAddress1 = helper.randomIndex() + index + data["Street Address 1"]
            let streetAddress2 = helper.randomIndex() + index + data["Street Address 2"]
            let city = helper.randomIndex() + index + data["City"]
            let stateOrProvince = helper.randomIndex() + index + data["State or Province"]
            let postalCode = helper.randomIndex() + data["Postal Code"]
            let country = helper.randomIndex() + index + data["Country"]

            cy.typeInField(cy.getField("input", "id", "firstName"), firstName)
            cy.typeInField(cy.getField("input", "id", "lastName"), lastName)
            cy.typeInField(cy.getField("input", "id", "birthdate"), dateOfBirth)
            cy.typeInField(cy.getField("input", "id", "email"), email)
            cy.typeInField(cy.getField("input", "id", "phone"), phone)
            cy.typeInField(cy.getField("input", "id", "street1"), streetAddress1)
            cy.typeInField(cy.getField("input", "id", "street2"), streetAddress2)
            cy.typeInField(cy.getField("input", "id", "city"), city)
            cy.typeInField(cy.getField("input", "id", "stateProvince"), stateOrProvince)
            cy.typeInField(cy.getField("input", "id", "postalCode"), postalCode)
            cy.typeInField(cy.getField("input", "id", "country"), country)
            cy.clickOption(cy.getField("button", "id", "submit"))

            cy.assertFieldVisible(cy.getElementContains('td', firstName + ' ' + lastName))
            cy.assertFieldVisible(cy.getElementContains('td', dateOfBirth))
            cy.assertFieldVisible(cy.getElementContains('td', email))
            cy.assertFieldVisible(cy.getElementContains('td', phone))
            cy.assertFieldVisible(cy.getElementContains('td', streetAddress1 + ' ' + streetAddress2))
            cy.assertFieldVisible(cy.getElementContains('td', city + ' ' + stateOrProvince + ' ' + postalCode))
            cy.assertFieldVisible(cy.getElementContains('td', country))
        })
    })

    it(`Verify contact not added when First Name and/or Last Name not populated`, () => {
        cy.visitPage('addContact')
        cy.fixture('newContact.json').then(data => {
            let firstName = helper.randomIndex() + index + data["First Name"]
            let lastName = helper.randomIndex() + index + data["Last Name"]

            cy.typeInField(cy.getField("input", "id", "firstName"), firstName)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.assertFieldExists(cy.getField('span', 'id', 'error'))
            cy.assertFieldVisible(cy.getElementContains('span', 'Contact validation failed: lastName: Path `lastName` is required.'))
            cy.currentPageIs('addContact')
            cy.getField("input", "id", "firstName").clear()

            cy.typeInField(cy.getField("input", "id", "lastName"), lastName)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.assertFieldExists(cy.getField('span', 'id', 'error'))
            cy.assertFieldVisible(cy.getElementContains('span', 'Contact validation failed: firstName: Path `firstName` is required.'))
            cy.currentPageIs('addContact')

            cy.visitPage('contactList')
            cy.get('td').contains(firstName + ' ' + lastName).should('not.exist')
        })
    })

    it(`Verify contact not added when invalid formats are entered in fields`, () => {
        cy.visitPage('addContact')
        cy.fixture('newContact.json').then(data => {
            let dateOfBirth = helper.randomIndex() + index + data["Date of Birth"]
            let phone = helper.randomIndex() + data["Phone"]
            let firstName = helper.randomIndex() + index + data["First Name"]
            let lastName = helper.randomIndex() + index + data["Last Name"]

            cy.typeInField(cy.getField("input", "id", "firstName"), firstName)
            cy.typeInField(cy.getField("input", "id", "lastName"), lastName)
            cy.typeInField(cy.getField("input", "id", "birthdate"), dateOfBirth)
            cy.typeInField(cy.getField("input", "id", "phone"), phone)
            cy.clickOption(cy.getField("button", "id", "submit"))
            cy.assertFieldExists(cy.getField('span', 'id', 'error'))
            cy.assertFieldVisible(cy.getElementContains('span', 'Contact validation failed: birthdate: Birthdate is invalid, phone: Phone number is invalid'))

            cy.visitPage('contactList')
            cy.get('td').contains(firstName + ' ' + lastName).should('not.exist')
            cy.get('td').contains(dateOfBirth).should('not.exist')
            cy.get('td').contains(phone).should('not.exist')
        })
    })

    it(`Verify contact not added when entry is canceled`, () => {
        cy.visitPage('addContact')
        cy.fixture('newContact.json').then(data => {
            let firstName = helper.randomIndex() + index + data["First Name"]
            let lastName = helper.randomIndex() + index + data["Last Name"]

            cy.typeInField(cy.getField("input", "id", "firstName"), firstName)
            cy.typeInField(cy.getField("input", "id", "lastName"), lastName)
            cy.clickOption(cy.getField("button", "id", "cancel"))
            cy.currentPageIs('contactList')
            cy.get('td').contains(firstName + ' ' + lastName).should('not.exist')
        })
    })
})