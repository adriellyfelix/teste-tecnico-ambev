// Authentication commands
Cypress.Commands.add('getAuthToken', (credentials) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrlApi')}/login`,
    body: credentials
  }).then((response) => {
    expect(response.status).to.eq(200)
    return response.body.token
  })
})

// Product API commands
Cypress.Commands.add('getProducts', (queryParams = {}, headers = {}) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrlApi')}/produtos`,
    qs: queryParams,
    headers
  })
})

Cypress.Commands.add('getProductById', (id, headers) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrlApi')}/produtos/${id}`,
    headers
  })
})

Cypress.Commands.add('createProduct', (productData, headers) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrlApi')}/produtos`,
    body: productData,
    headers,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('updateProduct', (id, productData, headers) => {
  return cy.request({
    method: 'PUT',
    url: `${Cypress.config('baseUrlApi')}/produtos/${id}`,
    body: productData,
    headers,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteProduct', (id, headers) => {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.config('baseUrlApi')}/produtos/${id}`,
    headers,
    failOnStatusCode: false
  })
})

// User API commands
Cypress.Commands.add('getUsers', (queryParams = {}, headers = {}) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrlApi')}/usuarios`,
    qs: queryParams,
    headers
  })
})


Cypress.Commands.add('createUser', (userData, headers) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrlApi')}/usuarios`,
    body: userData,
    headers,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('getUserById', (id, headers) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrlApi')}/usuarios/${id}`,
    headers,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('updateUser', (id, userData, headers) => {
  return cy.request({
    method: 'PUT',
    url: `${Cypress.config('baseUrlApi')}/usuarios/${id}`,
    body: userData,
    headers,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteUser', (id, headers) => {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.config('baseUrlApi')}/usuarios/${id}`,
    headers,
    failOnStatusCode: false
  })
})

