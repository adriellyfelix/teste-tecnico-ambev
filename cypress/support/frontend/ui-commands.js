Cypress.Commands.add('login', (userType = 'validUser') => {
  cy.fixture('test-data').then((data) => {
    const user = data.users[userType]
    cy.visit('/login')
    cy.get(data.selectors.login.emailInput).type(user.email)
    cy.get(data.selectors.login.passwordInput).type(user.password)
    cy.get(data.selectors.login.loginButton).click()
  })
})
