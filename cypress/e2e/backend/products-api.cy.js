import { faker } from '@faker-js/faker'

describe('API de Produtos', () => {
  let existentProducts
  let headers
  let newProduct

  before(() => {
    cy.getProducts().then((response) => {
      existentProducts = response.body.produtos
    })
    cy.fixture('test-data').then((data) => {
      cy.getAuthToken({
        email: data.users.adminUser.email,
        password: data.users.adminUser.password
      }).then((response) => {
        headers = {
          'Authorization': response.body.authorization
        }
      })
    })

    newProduct = {
      nome: faker.commerce.productName(),
      preco: faker.number.int({ min: 1, max: 999 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 })
    }
  })

  describe('GET /produtos', () => {
    it('deve recuperar o produto pelo query parameter ID', () => {
      const productId = existentProducts[0]._id
      const queryParams = {
        _id: productId
      }
      cy.getProducts(queryParams, headers)
        .then((response) => {
          expect(response.body.produtos[0]._id).to.eq(productId)
          expect(response.body.produtos[0].nome).to.eq(existentProducts[0].nome)
        })
    })

    it('deve recuperar o produto por nome', () => {
      const productName = existentProducts[0].nome
      const queryParams = {
        nome: productName
      }
      cy.getProducts(queryParams, headers)
        .then((response) => {
        expect(response.body.produtos[0].nome).to.eq(productName)
      })
    })

    it('deve recuperar o produto pelo query parameter preco', () => {
      const productPrice = existentProducts[0].preco
      const queryParams = {
        preco: productPrice
      }
      cy.getProducts(queryParams, headers)
        .then((response) => {
          const productFound = response.body.produtos.find(product => product._id === existentProducts[0]._id)
          expect(productFound.preco).to.eq(productPrice)
        })
    })

    it('deve recuperar o produto pelo query parameter descricao', () => {
      const productDescription = existentProducts[0].descricao
      const queryParams = {
        descricao: productDescription
      }
      cy.getProducts(queryParams, headers)
        .then((response) => {
          const productFound = response.body.produtos.find(product => product._id === existentProducts[0]._id)
          expect(productFound.descricao).to.eq(productDescription)
        })
    })

    it('deve recuperar o produto pelo query parameter quantidade', () => {
      const productQuantity = existentProducts[0].quantidade
      const queryParams = {
        quantidade: productQuantity
      }
      cy.getProducts(queryParams, headers)
        .then((response) => {
          const productFound = response.body.produtos.find(product => product._id === existentProducts[0]._id)
          expect(productFound.quantidade).to.eq(productQuantity)
        })
    })
  })

  describe('GET /produtos/:id', () => {
    it('deve recuperar um produto pelo ID', () => {
      cy.getProductById(existentProducts[0]._id, headers)
        .then((response) => {
          expect(response.body._id).to.eq(existentProducts[0]._id)
        })
    })
  })

  describe('POST /produtos', () => {
    it('deve cadastrar um novo produto com sucesso', () => {
      cy.createProduct(newProduct, headers)
        .then((response) => {
          console.log(response)
          expect(response.status).to.eq(201)
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
          expect(response.body._id).to.not.be.empty
          newProduct._id = response.body._id
        })
    })

    it('não deve permitir cadastrar produto com nome duplicado', () => {
      const { _id, ...rest } = newProduct
      cy.createProduct(rest, headers).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Já existe produto com esse nome')
      })
    })

    it('deve retornar erro 401 ao cadastrar produto sem authorization token', () => {
      cy.createProduct(newProduct, {}).then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })
  })

  describe('PUT /produtos/:id', () => {
    it('deve atualizar um produto com sucesso', () => {
      const { _id, ...rest } = newProduct
      const updatedProduct = {
        nome: faker.commerce.productName(),
        ...rest
      }
      cy.updateProduct(_id, updatedProduct, headers)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Registro alterado com sucesso')
        })
    })
    it('deve retornar erro 401 ao atualizar produto sem authorization token', () => {
      const { _id, ...rest } = newProduct
      const updatedProduct = {
        nome: faker.commerce.productName(),
        ...rest
      }
      cy.updateProduct(_id, updatedProduct, {}).then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })
  })

  describe('DELETE /produtos/:id', () => {
    it('deve deletar um produto com sucesso', () => {
      cy.deleteProduct(newProduct._id, headers)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
    })

    it('deve retornar erro 401 ao deletar produto sem authorization token', () => {
      cy.deleteProduct(newProduct._id, {}).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })
}) 