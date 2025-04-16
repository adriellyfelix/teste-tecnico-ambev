import './config'
import './backend/api-commands'
import './frontend/ui-commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})