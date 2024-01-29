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

Cypress.Commands.add('getField', (fieldType, attribute, value) => {
    return cy.get(`${fieldType}[${attribute}=${value}]`, {timeout: 10000})
})

Cypress.Commands.add('getElement', (element) => {
    return cy.get(element, {timeout: 10000})
})

Cypress.Commands.add('getElementContains', (element, text) => {
    cy.get(element).contains(text)
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
});