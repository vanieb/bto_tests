class registerPage {
  get createAcctBtn() {
    return cy.findByRole('button', { name: 'Create account for free!' })
  }

  get emailInp() {
    return cy.get('input[id="input__email"]').first()
  }

  get getStartedBtn() {
    return cy.findAllByRole('button', { name: 'Get Started' }).first()
  }
  get passwordInp() {
    return cy.get('input[id="input__password"]')
  }
  get showPasswordIcon() {
    return cy.get('button[class*="password__eye"]')
  }
  get looksGoodBtn() {
    return cy.findByRole('button', { name: 'Looks Good' })
  }
  get backBtn() {
    return cy.findByRole('button', { name: 'Back' })
  }
  get firstNInp() {
    return cy.get('input[id="input__fn"]')
  }
  get lastNInp() {
    return cy.get('input[id="input__ln"]')
  }
  get consentCheckbox() {
    return cy.get('#consent__checkbox')
  }
  get nextBtn() {
    return cy.findByRole('button', { name: 'Next' })
  }
  get mobileInp() {
    return cy.get('input[id="input__mobile"]')
  }
  get sendCodeBtn() {
    return cy.findByRole('button', { name: 'Send Code' })
  }
  get otpInp() {
    return cy.get('input[id="input__verification"]')
  }
  get allSetBtn() {
    return cy.findByRole('button', { name: 'All Set!' })
  }
  get startPlanningBtn() {
    return cy.findAllByRole('button', { name: 'Start Planning Now' })
  }
}
export default registerPage
