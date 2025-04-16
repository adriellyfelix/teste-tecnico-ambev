describe('Lista de compras', () => {
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

  it('deve adicionar um item a lista de compras', () => {
    cy.fixture('test-data').then((data) => {
      cy.get(data.selectors.home.searchInput).type(existentProducts[0].nome)
      cy.get(data.selectors.home.searchButton).click()
      cy.get(data.selectors.common.addToShoppingListButton).first().click()
      cy.get(data.selectors.shoppingList.shoppingListProductName).should('contain', existentProducts[0].nome)
    })
  })

  it('deve aumentar e diminuir a quantidade de um item', () => {
    cy.fixture('test-data').then((data) => {
      cy.get(data.selectors.home.searchInput).type(existentProducts[0].nome)
      cy.get(data.selectors.home.searchButton).click()
      cy.get(data.selectors.common.addToShoppingListButton).first().click()
      cy.get(data.selectors.shoppingList.shoppingListProductName).should('contain', existentProducts[0].nome)
      cy.get(data.selectors.shoppingList.increaseQuantityButton).click()
      cy.get(data.selectors.shoppingList.totalProductQuantity).should('contain', '2')
      cy.get(data.selectors.shoppingList.decreaseQuantityButton).click()
      cy.get(data.selectors.shoppingList.totalProductQuantity).should('contain', '1')
    })
  })

  it('deve remover todos os itens da lista de compras', () => {
    cy.fixture('test-data').then((data) => {
      cy.get(data.selectors.home.searchInput).type(existentProducts[0].nome)
      cy.get(data.selectors.home.searchButton).click()
      cy.get(data.selectors.common.addToShoppingListButton).first().click()
      cy.get(data.selectors.shoppingList.shoppingListProductName).should('contain', existentProducts[0].nome)
      cy.get(data.selectors.shoppingList.clearShoppingListButton).click()
      cy.get(data.selectors.shoppingList.shoppingCartEmptyMessage).should('contain', 'Seu carrinho está vazio')
    })
  })
})

