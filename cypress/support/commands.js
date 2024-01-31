// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitPage', (page) => {
    cy.visit(page)
})

Cypress.Commands.add('currentPageIs', (page) => {
    cy.url().should('include', page)
})

/**
 * Get a field of type ${fieldType} containing ${attribute} with ${value}
 * @example
 * cy.getField('label', 'for', 'publish')
 * */
Cypress.Commands.add('getField', (fieldType, attribute, value) => {
    return cy.get(`${fieldType}[${attribute}=${value}]`, {timeout: 10000})
})

Cypress.Commands.add('getElement', (element) => {
    return cy.get(element, {timeout: 10000})
})

Cypress.Commands.add('getElementContains', (element, text) => {
    cy.get(element, {timeout: 10000}).contains(text)
})

Cypress.Commands.add('clickOption', (option) => {
    option.click({force: true})
})

Cypress.Commands.add('assertFieldVisible', (element) => {
    element.should('exist').and('be.visible')
})

Cypress.Commands.add('assertFieldExists', (element) => {
    element.should('exist')
})

Cypress.Commands.add('typeInField', (field, inputString, logUI = true) => {
    field.clear({force: true}).type(inputString, {log: logUI, force: true})
})

Cypress.Commands.add('addContact', (url, token, requestBody) => {
    cy.request({
        method: 'POST',
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: requestBody,
    });
})

    Cypress.Commands.add('deleteContacts', (url, token) => {
        cy.request({
            method: 'DELETE',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    })

    Cypress.Commands.add('interceptRequest', (method, partialURL, alias) => {
        cy.intercept({
            method: method,
            url: `**/${partialURL}*`,
        }).as(alias)
    })

    Cypress.Commands.add('loginUser', (url, email, password) => {
        cy.request({
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
        }).then((response) => {
            // Log the response to the console
            cy.log('Login Response:', response.body);

            // You can save the token or other information from the response if needed
            // For example, you might want to save the token for subsequent requests
            cy.wrap(response.body.token).as('authToken');
        });
    });
