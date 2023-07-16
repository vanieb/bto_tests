import registerPage from '../pageobjects/registerPage'
const registerObj = new registerPage()

describe('Register - User Journey', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
    cy.clickCreateAcctBtn()
  })
  context('User can', () => {
    it('successfully register with valid input', () => {
      let suffix = chance.string({ length: 6, alpha: true, casing: 'lower' })
      let email = `vanieburgos+${suffix}@gmail.com`
      let password = 'Pass1234!'
      let first_name = chance.first()
      let last_name = chance.last()
      let mobile = chance.string({ length: 8, alpha: false, numeric: true })
      let otp = chance.string({ length: 6, alpha: false, numeric: true })
      let user = {
        email: email,
        password: password,
        firstn: first_name,
        lastn: last_name,
        mobile: mobile,
        otp: otp,
      }
      cy.register(user)
      cy.contains(
        "Thank you for registering! Please confirm your email address via the email sent to you. You'll be redirected automatically!",
      ).should('exist')
      registerObj.startPlanningBtn.dblclick()
      cy.contains('Who is this plan for?').should('exist')
      cy.location().then((location) => {
        cy.log(location.href)
        cy.log(location.pathname)
      })
      cy.location('href').should('contain', '/onboarding-c/household')
    })
    it('cannot register with invalid email', () => {
      let suffix = chance.string({ length: 6, alpha: true, casing: 'lower' })
      let email = `vanieburgos+${suffix}gmailcom`
      let password = 'Pass1234!'
      let first_name = chance.first()
      let last_name = chance.last()
      let user = {
        email: email,
        password: password,
        firstn: first_name,
        lastn: last_name,
        mobile: '12345678',
        otp: '123456',
      }
      cy.inputEmail(user.email)
      cy.inputPassword(user.password)
      cy.inputNames(user.firstn, user.lastn)
      cy.contains('"Email" must be a valid email').should('exist')
    })
    it('cannot register if email already exists', () => {
      let suffix = chance.string({ length: 6, alpha: true, casing: 'lower' })
      let email = `vanieburgos@gmail.com`
      let password = 'Pass1234!'
      let first_name = chance.first()
      let last_name = chance.last()
      let user = {
        email: email,
        password: password,
        firstn: first_name,
        lastn: last_name,
      }
      cy.inputEmail(user.email)
      cy.inputPassword(user.password)
      cy.inputNames(user.firstn, user.lastn)
      cy.contains('An account with this email address already exists').should(
        'exist',
      )
    })
  })
})
