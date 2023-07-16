import registerPage from '../pageobjects/registerPage'
const registerObj = new registerPage()

describe('Register - Names Page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
    cy.clickCreateAcctBtn()
    let suffix = chance.string({ length: 6, alpha: true, casing: 'lower' })
    let email = `vanieburgos+${suffix}@gmail.com`
    let password = 'Pass1234!'
    cy.inputEmail(email)
    cy.inputPassword(password)
  })
  context('Names Page', () => {
    it('has correct elements', () => {
      cy.log('the header text is correct')
      cy.contains('Ready to explore the future?').should('exist')
      cy.contains(
        'Look at a wide range of dreams and life events to build a plan just for you',
      ).should('exist')
      cy.log('path is correct')
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/register-c/names-b`,
      )
      cy.log('has first name, last name, consent checkbox, next button')
      registerObj.firstNInp.should('exist')
      registerObj.lastNInp.should('exist')
      registerObj.nextBtn.should('exist')
      registerObj.consentCheckbox.should('exist')
    })
    it('returns an error if the first name and last name is incorrect format', () => {
      let name = 'Vanessa123'
      registerObj.firstNInp.type(`${name}`)
      registerObj.consentCheckbox.click()
      cy.contains('Please enter a valid First Name.').should('exist')
      registerObj.lastNInp.type(`${name}{enter}`)
      registerObj.consentCheckbox.click()
      cy.contains('Please enter a valid Last Name.').should('exist')
      registerObj.nextBtn.should('be.disabled')
    })
    it('returns an error if the first and last name is unfilled', () => {
      registerObj.firstNInp.type('{enter}')
      cy.contains('Provide us with your first name.').should('exist')
      registerObj.lastNInp.type('{enter}')
      cy.contains('Provide us with your last name.').should('exist')
      registerObj.nextBtn.should('be.disabled')
    })
    it('terms of use and privacy policy link are working', () => {
      cy.clickNamesPageLinks('Terms of Use')
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/legal/terms-and-conditions`,
      )
      cy.go('back')
      cy.clickNamesPageLinks('Privacy Policy')
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/legal/privacy-policy`,
      )
    })
    it('it can proceed if the consent checkbox is unchecked', () => {
      registerObj.consentCheckbox.should('exist')
      registerObj.consentCheckbox.click()
      let first_name = chance.first()
      let last_name = chance.last()
      registerObj.firstNInp.type(first_name)
      registerObj.lastNInp.type(last_name)
      registerObj.nextBtn.click()
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/register-c/mobile-verification-b`,
      )
    })
    it('back button is working', () => {
      registerObj.backBtn.click()
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/register-c/password`,
      )
    })
  })
})
