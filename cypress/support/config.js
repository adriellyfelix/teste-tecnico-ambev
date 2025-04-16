const API_BASE_URL = Cypress.env('baseUrlApi') || 'https://serverest.dev'
const FRONTEND_BASE_URL = Cypress.env('baseUrl') || 'https://front.serverest.dev'

window.API_BASE_URL = API_BASE_URL
window.FRONTEND_BASE_URL = FRONTEND_BASE_URL

Cypress.env('API_BASE_URL', API_BASE_URL)
Cypress.env('FRONTEND_BASE_URL', FRONTEND_BASE_URL) 