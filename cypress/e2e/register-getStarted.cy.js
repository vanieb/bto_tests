import registerPage from '../pageobjects/registerPage'
const registerObj = new registerPage()

describe('Register - Get Started Page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
    cy.clickCreateAcctBtn()
  })
  context('Get Started Page', () => {
    it('has correct elements', () => {
      cy.log('the header text is correct')
      cy.contains('Build your own financial plan in just 15 minutes').should(
        'exist',
      )
      cy.log('has correct path name')
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/register-c/get-started`,
      )
      cy.log('has an email and get started button')
      registerObj.emailInp.should('exist')
      registerObj.getStartedBtn.should('exist')
    })
    it('returns an error if the email is unfilled', () => {
      registerObj.getStartedBtn.click()
      cy.contains('Email address is required.').should('exist')
    })
  })
})
