import {helper} from "../support/helper";

const username = Cypress.env("username");
const password = Cypress.env("password");
const token = Cypress.env("bearerToken");
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
    before('Add sample Contact', () => {
        cy.fixture('sampleContact.json').then(data => {
            cy.addContact('/contacts', token, data["contact"])
        })
    })
    /*afterEach('Delete Contacts', () => {
        cy.deleteContacts('contacts/', token)
    })*/

    it(`Access page`, () => {
        cy.fixture('sampleContact.json').then(data => {
            let firstName = helper.randomIndex() + index + data["First Name"]
            let lastName = helper.randomIndex() + index + data["Last Name"]

            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')
            cy.visitPage('contactList')
            cy.visitPage('contactDetails')
            cy.currentPageIs('contactDetails')
        })
    })

    it(`Verify fields existence`, () => {
        cy.fixture('sampleContact.json').then(data => {
            let firstName = helper.randomIndex() + index + data["First Name"]
            let lastName = helper.randomIndex() + index + data["Last Name"]

            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')

            cy.assertFieldVisible(cy.getField("form", "id", "contactDetails"))
            cy.assertFieldVisible(cy.getField("button", "id", "edit-contact"))
            cy.assertFieldVisible(cy.getField("button", "id", "delete"))
            cy.assertFieldVisible(cy.getField("button", "id", "return"))
            cy.assertFieldVisible(cy.getField("button", "id", "logout"))
        })
    })

    it(`Verify contact details data`, () => {
        cy.fixture('sampleContact.json').then(data => {
            let firstName = helper.randomIndex() + index + data["firstName"]
            let lastName = helper.randomIndex() + index + data["lastName"]

            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')

            cy.assertFieldVisible(cy.getElementContains('#firstName',), data["firstName"])
            cy.assertFieldVisible(cy.getElementContains('#lastName',), data["lastName"])
            cy.assertFieldVisible(cy.getElementContains('#birthdate',), data["birthdate"])
            cy.assertFieldVisible(cy.getElementContains('#email',), data["email"])
            cy.assertFieldVisible(cy.getElementContains('#phone',), data["phone"])
            cy.assertFieldVisible(cy.getElementContains('#street1',), data["street1"])
            cy.assertFieldVisible(cy.getElementContains('#street2',), data["street2"])
            cy.assertFieldVisible(cy.getElementContains('#city',), data["city"])
            cy.assertFieldVisible(cy.getElementContains('#stateProvince',), data["stateProvince"])
            cy.assertFieldVisible(cy.getElementContains('#postalCode',), data["postalCode"])
            cy.assertFieldVisible(cy.getElementContains('#country',), data["country"])

        })
    })

    it(`Verify contact can be edited`, () => {
        cy.fixture('sampleContact.json').then(data => {
            let firstName = helper.randomIndex() + index + data["firstName"]
            let lastName = helper.randomIndex() + index + data["lastName"]

            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')
            cy.clickOption(cy.getField("button", "id", "edit-contact"))
            cy.currentPageIs('editContact')
        })
    })

    it(`Verify return to Contact List page`, () => {
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

    it(`Verify contact can be deleted`, () => {
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

})