describe('Produto', () => {
  let existentProducts
  
  before(() => {
    cy.getProducts().then((response) => {
      existentProducts = response.body.produtos
    })
  })

  beforeEach(() => {
    cy.visit('/')
    cy.login()
  })

  it('deve exibir os detalhes do produto', () => {
    cy.fixture('test-data').then((data) => {
      cy.get(data.selectors.home.searchInput).type(existentProducts[0].nome)
      cy.get(data.selectors.home.searchButton).click()
      cy.get(data.selectors.home.linkDetails).first().click()
      cy.get(data.selectors.productDetails.productName).should('contain', existentProducts[0].nome)
    })
  })

  it('deve adicionar o produto na lista de compras a partir da página de detalhes', () => {
    cy.fixture('test-data').then((data) => {
      cy.get(data.selectors.home.searchInput).type(existentProducts[0].nome)
      cy.get(data.selectors.home.searchButton).click()
      cy.get(data.selectors.home.linkDetails).first().click()
      cy.get(data.selectors.common.addToShoppingListButton).click()
      cy.get(data.selectors.shoppingList.shoppingListProductName).should('contain', existentProducts[0].nome)
    })
  })
})

