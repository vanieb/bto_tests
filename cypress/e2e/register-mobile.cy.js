import registerPage from '../pageobjects/registerPage'
const registerObj = new registerPage()

describe('Register - Mobile Page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
    cy.clickCreateAcctBtn()
    let suffix = chance.string({ length: 6, alpha: true, casing: 'lower' })
    let email = `vanieburgos+${suffix}@gmail.com`
    let password = 'Pass1234!'
    let first_name = chance.first()
    let last_name = chance.last()
    cy.inputEmail(email)
    cy.inputPassword(password)
    cy.inputNames(first_name, last_name)
  })
  context('Mobile Page', () => {
    it('has correct elements', () => {
      cy.log('the header text is correct')
      cy.contains('Finish setting up your account').should('exist')
      cy.contains(
        "It's an added security step that ensures only you can access your account ",
      ).should('exist')
      cy.log('path is correct')
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/register-c/mobile-verification-b`,
      )
      cy.log('has mobile and send code button')
      registerObj.mobileInp.should('exist')
      registerObj.sendCodeBtn.should('exist')
    })
    it('returns an error if the mobile is incorrect format', () => {
      let mobile = chance.string({ length: 9, alpha: false, numeric: true })
      registerObj.mobileInp.type(mobile)
      cy.get('body').click()
      cy.contains('Please enter a valid Mobile number').should('exist')
      registerObj.sendCodeBtn.should('be.disabled')
      mobile = chance.string({ length: 8, alpha: true, numeric: false })
      cy.get('body').click()
      cy.contains('Please enter a valid Mobile number').should('exist')
      registerObj.sendCodeBtn.should('be.disabled')
    })
    it('shows the OTP field if the mobile has correct format and OTP field has an error handling', () => {
      let mobile = chance.string({ length: 8, alpha: false, numeric: true })
      registerObj.mobileInp.type(mobile)
      registerObj.sendCodeBtn.click()
      registerObj.otpInp.should('exist')
      let otp = chance.string({ length: 5, alpha: false, numeric: true })
      registerObj.otpInp.type(otp)
      cy.contains('Please enter a valid one-time password.').should('exist')
      registerObj.allSetBtn.should('be.disabled')
      otp = chance.string({ length: 7, alpha: false, numeric: true })
      cy.contains('Please enter a valid one-time password.').should('exist')
      registerObj.allSetBtn.should('be.disabled')
      otp = chance.string({ length: 7, alpha: true, numeric: false })
      cy.contains('Please enter a valid one-time password.').should('exist')
      registerObj.allSetBtn.should('be.disabled')
    })
    it('returns an error if the mobile is unfilled', () => {
      registerObj.mobileInp.type('{enter}')
      cy.contains('Mobile number is required.').should('exist')
      registerObj.sendCodeBtn.should('be.disabled')
    })
    it('back button is working', () => {
      registerObj.backBtn.click()
      cy.location('pathname', { timeout: '10000' }).should(
        'eq',
        `/register-c/names-b`,
      )
    })
  })
})
