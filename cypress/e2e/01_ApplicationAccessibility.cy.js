describe('ApplicationAccessibility', () => {

    it(`Login page available`, () => {
        cy.visitPage('/')
        cy.currentPageIs('/')
    })

    it(`Signup page available`, () => {
        cy.visitPage('addUser')
        cy.currentPageIs('addUser')

        cy.visitPage('/')
        cy.contains('Sign up').click()
        cy.currentPageIs('addUser')
    })
})