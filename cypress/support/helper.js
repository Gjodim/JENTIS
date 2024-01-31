const username = Cypress.env("username");
const password = Cypress.env("password");
let fn
let ln

class Helper {
    indexByOne() {
        let index = 0;
        return index + 1
    }

    randomIndex() {
        let index = 10000
        return Math.floor(Math.random() * index)
    }

    login = (url, email, password) => {
        return cy.request({
            method: 'POST',
            url: url, // Replace with your actual login endpoint
            body: {
                email: email,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
                // Add any additional headers if required
            }
        })/*.then((response) => {
            // Log the response to the console
            cy.log('Login Response:', response.body);

            // Return the response for further use in the test
            return response;
        });*/
    };

    addContact() {
        cy.visitPage('/')
        cy.currentPageIs('/')
        cy.typeInField(cy.getField("input", "id", "email"), username, false)
        cy.typeInField(cy.getField("input", "id", "password"), password, false)
        cy.clickOption(cy.getField("button", "id", "submit"))
        cy.currentPageIs('contactList')
        cy.visitPage('addContact')
        cy.currentPageIs('addContact')

        cy.fixture('apiContact.json').then(data => {
            let firstName = data["contact"]["firstName"]
            let lastName = data["contact"]["lastName"]
            let dateOfBirth = data["contact"]["birthdate"]
            let email = helper.randomIndex() + helper.indexByOne() + data["contact"]["email"]
            let phone = data["contact"]["phone"]
            let streetAddress1 = helper.randomIndex() + helper.indexByOne() + data["contact"]["street1"]
            let streetAddress2 = helper.randomIndex() + helper.indexByOne() + data["contact"]["street2"]
            let city = helper.randomIndex() + helper.indexByOne() + data["contact"]["city"]
            let stateOrProvince = helper.randomIndex() + helper.indexByOne() + data["contact"]["stateProvince"]
            let postalCode = helper.randomIndex() + data["contact"]["postalCode"]
            let country = helper.randomIndex() + helper.indexByOne() + data["contact"]["country"]

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
            cy.currentPageIs('contactList')

            cy.assertFieldVisible(cy.getElementContains('td', firstName + ' ' + lastName))
            cy.assertFieldVisible(cy.getElementContains('td', dateOfBirth))
            cy.assertFieldVisible(cy.getElementContains('td', email))
            cy.assertFieldVisible(cy.getElementContains('td', phone))
            cy.assertFieldVisible(cy.getElementContains('td', streetAddress1 + ' ' + streetAddress2))
            cy.assertFieldVisible(cy.getElementContains('td', city + ' ' + stateOrProvince + ' ' + postalCode))
            cy.assertFieldVisible(cy.getElementContains('td', country))

            cy.clickOption(cy.getField("button", "id", "logout"))
            cy.currentPageIs('logout')

        })
    }

    interceptRequest(method, partialURL, alias) {
        cy.intercept({
            method: method,
            url: `**/${partialURL}*`,
        }).as(alias)
    }


}

export const helper = new Helper();