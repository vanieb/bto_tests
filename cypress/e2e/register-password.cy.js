import registerPage from '../pageobjects/registerPage'
const registerObj = new registerPage()

describe('Register - Password Page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
    cy.clickCreateAcctBtn()
    let suffix = chance.string({ length: 6, alpha: true, casing: 'lower' })
    let email = `vanieburgos+${suffix}@gmail.com`
    cy.inputEmail(email)
  })
  context('Password Page', () => {
    it('has correct elements', () => {
      cy.log('the header text is correct')
      cy.contains('Get started with Up in seconds').should('exist')
      cy.contains(
        'Financial planning is unique to all so, make sure your password is too',
      ).should('exist')
      cy.log('path is correct')
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/register-c/password`,
      )
      cy.log('has password with validation and has looks good button')
      registerObj.passwordInp.should('exist')
      registerObj.looksGoodBtn.should('exist')
    })
    it('show password icon is working', () => {
      registerObj.showPasswordIcon.click()
      registerObj.passwordInp.invoke('attr', 'type').should('eq', 'text')
      registerObj.showPasswordIcon.click()
      registerObj.passwordInp.invoke('attr', 'type').should('eq', 'password')
    })
    it('looks good button is disabled if password format is incorrect', () => {
      let password = 'PaS123!'
      registerObj.passwordInp.type(password)
      // Looks good button is disabled when the password is less than 8 characters
      registerObj.looksGoodBtn.should('be.disabled')
      password = 'password'
      // Looks good button is disabled when the password is 8 lower characters only
      registerObj.passwordInp.clear().type(password)
      cy.contains('8 Characters').should(
        'have.css',
        'color',
        'rgb(80, 227, 194)',
      )
      cy.contains('Lowercase').should('have.css', 'color', 'rgb(80, 227, 194)')
      registerObj.looksGoodBtn.should('be.disabled')
      password = 'password123'
      // Looks good button is disabled when the password is a combination of lower characters and numeric characters only
      registerObj.passwordInp.clear().type(password)
      cy.contains('8 Characters').should(
        'have.css',
        'color',
        'rgb(80, 227, 194)',
      )
      cy.contains('Lowercase').should('have.css', 'color', 'rgb(80, 227, 194)')
      cy.contains('Numeric').should('have.css', 'color', 'rgb(80, 227, 194)')
      registerObj.looksGoodBtn.should('be.disabled')
      password = 'PASSword123'
      // Looks good button is disabled when the password is a combination of upper, lower characters and numeric characters only
      registerObj.passwordInp.clear().type(password)
      cy.contains('8 Characters').should(
        'have.css',
        'color',
        'rgb(80, 227, 194)',
      )
      cy.contains('Lowercase').should('have.css', 'color', 'rgb(80, 227, 194)')
      cy.contains('Uppercase').should('have.css', 'color', 'rgb(80, 227, 194)')
      registerObj.looksGoodBtn.should('be.disabled')
    })
    it('looks good button is enabled if password format is correct', () => {
      let password = 'PaS1234!'
      registerObj.passwordInp.type(password)
      cy.contains('8 Characters').should(
        'have.css',
        'color',
        'rgb(80, 227, 194)',
      )
      cy.contains('Numeric').should('have.css', 'color', 'rgb(80, 227, 194)')
      cy.contains('Lowercase').should('have.css', 'color', 'rgb(80, 227, 194)')
      cy.contains('Uppercase').should('have.css', 'color', 'rgb(80, 227, 194)')
      cy.contains('Special').should('have.css', 'color', 'rgb(80, 227, 194)')
      registerObj.looksGoodBtn.should('be.enabled')
    })
    it('returns an error if the password is unfilled', () => {
      registerObj.passwordInp.type('{enter}')
      cy.contains('Password is required.').should('exist')
      registerObj.looksGoodBtn.should('be.disabled')
    })
    it('back button is working', () => {
      registerObj.backBtn.click()
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/register-c/get-started`,
      )
    })
  })
})
