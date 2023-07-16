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
import '@testing-library/cypress/add-commands'
import registerPage from '../pageobjects/registerPage'
const registerObj = new registerPage()
var Chance = require('chance')

Cypress.Commands.add('clickCreateAcctBtn', () => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen')
    registerObj.createAcctBtn.click()
    cy.get('@windowOpen')
      .should('be.calledOnce')
      .then((stub) => {
        const openedUrl = stub.args[0][0]
        cy.visit(openedUrl)
      })
  })
})
Cypress.Commands.add('inputEmail', (email) => {
  registerObj.emailInp.click().type(email)
  registerObj.getStartedBtn.click()
})

Cypress.Commands.add('inputPassword', (password) => {
  registerObj.passwordInp.click().type(password)
  registerObj.looksGoodBtn.click()
})
Cypress.Commands.add('clickNamesPageLinks', (link) => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen')
    cy.contains(link).first().click()
    cy.get('@windowOpen')
      .should('be.calledOnce')
      .then((stub) => {
        const openedUrl = stub.args[0][0]
        cy.visit(openedUrl)
      })
  })
})

Cypress.Commands.add('inputNames', (first_name, last_name) => {
  registerObj.firstNInp.click().type(first_name)
  registerObj.lastNInp.click().type(last_name)
  registerObj.nextBtn.click()
})

Cypress.Commands.add('register', (user) => {
  cy.inputEmail(user.email)
  cy.inputPassword(user.password)
  cy.inputNames(user.firstn, user.lastn)
  registerObj.mobileInp.click().type(user.mobile)
  registerObj.sendCodeBtn.click()
  registerObj.otpInp.type(user.otp)
  registerObj.allSetBtn.click()
})
