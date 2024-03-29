import {helper} from "../support/helper";

const username = Cypress.env("username");
const password = Cypress.env("password");
const token = Cypress.env("bearerToken");

describe('ContactDetails', () => {
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
    before('Add sample Contact', () => {
        /*cy.fixture('apiContact.json').then(data => {
            cy.addContact('contacts', token, data["contact"])
        })*/
        helper.addContact()
    })
    /*after('Delete Contacts', () => {
        cy.deleteContacts('contacts/', token)
    })*/

    it(`Access page`, () => {
        cy.fixture('apiContact.json').then(data => {
            let firstName = data["contact"]["firstName"]
            let lastName = data["contact"]["lastName"]

            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')
            cy.visitPage('contactList')
            cy.visitPage('contactDetails')
            cy.currentPageIs('contactDetails')
        })
    })

    it(`Verify fields existence`, () => {
        cy.fixture('apiContact.json').then(data => {
            let firstName = data["contact"]["firstName"]
            let lastName = data["contact"]["lastName"]

            cy.intercept('GET', '**/contacts/*').as('contactDetails');


            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')

            cy.assertFieldVisible(cy.getField("form", "id", "contactDetails"))
            cy.assertFieldVisible(cy.getField("button", "id", "edit-contact"))
            cy.assertFieldVisible(cy.getField("button", "id", "delete"))
            cy.assertFieldVisible(cy.getField("button", "id", "return"))
            cy.assertFieldVisible(cy.getField("button", "id", "logout"))

            cy.wait("@contactDetails").then(intercept => {
                cy.get('@contactDetails').should('exist')
                cy.expect(intercept.response.statusCode).to.equal(200)
            })
        })
    })

    it(`Verify contact details data`, () => {
        cy.fixture('apiContact.json').then(data => {
            let firstName = data["contact"]["firstName"]
            let lastName = data["contact"]["lastName"]

            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')

            cy.assertFieldVisible(cy.getElementContains('#firstName', data["contact"]["firstName"]))
            cy.assertFieldVisible(cy.getElementContains('#lastName', data["contact"]["lastName"]))
            cy.assertFieldVisible(cy.getElementContains('#birthdate', data["contact"]["birthdate"]))
            cy.assertFieldVisible(cy.getElementContains('#email', data["contact"]["email"]))
            cy.assertFieldVisible(cy.getElementContains('#phone', data["contact"]["phone"]))
            cy.assertFieldVisible(cy.getElementContains('#street1', data["contact"]["street1"]))
            cy.assertFieldVisible(cy.getElementContains('#street2', data["contact"]["street2"]))
            cy.assertFieldVisible(cy.getElementContains('#city', data["contact"]["city"]))
            cy.assertFieldVisible(cy.getElementContains('#stateProvince', data["contact"]["stateProvince"]))
            cy.assertFieldVisible(cy.getElementContains('#postalCode', data["contact"]["postalCode"]))
            cy.assertFieldVisible(cy.getElementContains('#country', data["contact"]["country"]))

        })
    })

    it(`Verify contact can be edited`, () => {
        cy.fixture('apiContact.json').then(data => {
            let firstName = data["contact"]["firstName"]
            let lastName = data["contact"]["lastName"]
            let dateOfBirth = data["contact"]["birthdate"]
            let email = data["contact"]["email"]
            let phone = data["contact"]["phone"]
            let streetAddress1 = data["contact"]["street1"]
            let streetAddress2 = data["contact"]["street2"]
            let city = data["contact"]["city"]
            let stateOrProvince = data["contact"]["stateProvince"]
            let postalCode = data["contact"]["postalCode"]
            let country = data["contact"]["country"]

            let edit_firstName = '1' + firstName
            let edit_lastName = '1' + lastName
            let edit_dateOfBirth = dateOfBirth
            let edit_email = '1' + email
            let edit_phone = '1' + phone
            let edit_streetAddress1 = '1' + streetAddress1
            let edit_streetAddress2 = '1' + streetAddress2
            let edit_city = '1' + city
            let edit_stateOrProvince = '1' + stateOrProvince
            let edit_postalCode = '1' + postalCode
            let edit_country = '1' + country

            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')

            cy.intercept('GET', '**/contacts/*').as('contactDetails');

            cy.clickOption(cy.getField("button", "id", "edit-contact"))
            cy.currentPageIs('editContact')

            cy.wait("@contactDetails").then(intercept => {
                cy.get('@contactDetails').should('exist')
                cy.expect(intercept.response.statusCode).to.equal(200)
            })

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

            cy.typeInField(cy.getField("input", "id", "firstName"), edit_firstName)
            cy.typeInField(cy.getField("input", "id", "lastName"), edit_lastName)
            cy.typeInField(cy.getField("input", "id", "birthdate"), edit_dateOfBirth)
            cy.typeInField(cy.getField("input", "id", "email"), edit_email)
            cy.typeInField(cy.getField("input", "id", "phone"), edit_phone)
            cy.typeInField(cy.getField("input", "id", "street1"), edit_streetAddress1)
            cy.typeInField(cy.getField("input", "id", "street2"), edit_streetAddress2)
            cy.typeInField(cy.getField("input", "id", "city"), edit_city)
            cy.typeInField(cy.getField("input", "id", "stateProvince"), edit_stateOrProvince)
            cy.typeInField(cy.getField("input", "id", "postalCode"), edit_postalCode)
            cy.typeInField(cy.getField("input", "id", "country"), edit_country)
            cy.clickOption(cy.getField("button", "id", "submit"))

            cy.currentPageIs('contactDetails')
            cy.assertFieldVisible(cy.getElementContains('#firstName', edit_firstName))
            cy.assertFieldVisible(cy.getElementContains('#lastName', edit_lastName))
            cy.assertFieldVisible(cy.getElementContains('#birthdate', edit_dateOfBirth))
            cy.assertFieldVisible(cy.getElementContains('#email', edit_email))
            cy.assertFieldVisible(cy.getElementContains('#phone', edit_phone))
            cy.assertFieldVisible(cy.getElementContains('#street1', edit_streetAddress1))
            cy.assertFieldVisible(cy.getElementContains('#street2', edit_streetAddress2))
            cy.assertFieldVisible(cy.getElementContains('#city', edit_city))
            cy.assertFieldVisible(cy.getElementContains('#stateProvince', edit_stateOrProvince))
            cy.assertFieldVisible(cy.getElementContains('#postalCode', edit_postalCode))
            cy.assertFieldVisible(cy.getElementContains('#country', edit_country))
        })
    })

    it(`Verify return to Contact List page`, () => {
        cy.fixture('apiContact.json').then(data => {
            let firstName = data["contact"]["firstName"]
            let lastName = data["contact"]["lastName"]

            cy.intercept('GET', '**/contacts*').as('contactDetails');

            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')
            cy.clickOption(cy.getField("button", "id", "return"))
            cy.currentPageIs('contactList')

            cy.wait("@contactDetails").then(intercept => {
                cy.get('@contactDetails').should('exist')
                cy.expect(intercept.response.statusCode).to.equal(200)
            })
        })
    })

    it(`Verify contact can be deleted`, () => {
        cy.fixture('apiContact.json').then(data => {
            let firstName = '1' + data["contact"]["firstName"]
            let lastName = '1' + data["contact"]["lastName"]

            cy.intercept('DELETE', '**/contacts/*').as('contactDetails');

            cy.clickOption(cy.getElementContains('td', firstName + ' ' + lastName).first())
            cy.currentPageIs('contactDetails')
            cy.clickOption(cy.getField("button", "id", "delete"))
            cy.currentPageIs('contactList')
            cy.get('td').contains(firstName + ' ' + lastName).should('not.exist')

            cy.wait("@contactDetails").then(intercept => {
                cy.get('@contactDetails').should('exist')
                cy.expect(intercept.response.statusCode).to.equal(200)
            })
        })
    })

})