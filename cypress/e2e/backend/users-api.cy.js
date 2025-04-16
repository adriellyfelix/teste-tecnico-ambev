import { faker } from '@faker-js/faker'

describe('API de Usuários', () => {
  let existentUsers
  let headers
  let newUser

  before(() => {
    cy.getUsers().then((response) => {
      expect(response.status).to.eq(200)
      existentUsers = response.body.usuarios
    })

    cy.fixture('test-data').then((data) => {
      cy.getAuthToken({
        email: data.users.adminUser.email,
        password: data.users.adminUser.password
      }).then((response) => {
        expect(response.status).to.eq(200)
        headers = {
          Authorization: response.body.authorization
        }
      })
    })
  })

  describe('GET /usuarios', () => {
    it('deve recuperar o usuário pelo query parameter _id', () => {
      const userId = existentUsers[0]._id
      const queryParams = {
        _id: userId
      }
      cy.getUsers(queryParams, headers).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.eq(1)
        expect(response.body.usuarios[0]._id).to.eq(userId)
        expect(response.body.usuarios[0].nome).to.eq(existentUsers[0].nome)
      })
    })

    it('deve recuperar o usuário pelo query parameter nome', () => {
      const userName = existentUsers[0].nome
      const queryParams = {
        nome: userName
      }
      cy.getUsers(queryParams, headers).then((response) => {
        expect(response.status).to.eq(200)
        
        expect(response.body.quantidade).to.be.greaterThan(0)
        const userFound = response.body.usuarios.find(user => user._id === existentUsers[0]._id)
        expect(userFound.nome).to.eq(userName)
      })
    })

    it('deve recuperar o usuário pelo query parameter email', () => {
      const userEmail = existentUsers[0].email
      const queryParams = {
        email: userEmail
      }
      cy.getUsers(queryParams, headers).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.eq(1)
        expect(response.body.usuarios[0].email).to.eq(userEmail)
        expect(response.body.usuarios[0]._id).to.eq(existentUsers[0]._id)
      })
    })

    it('deve recuperar o usuário pelo query parameter password', () => {
      
      const userPassword = existentUsers[0].password
      const queryParams = {
        password: userPassword
      }
      cy.getUsers(queryParams, headers).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.be.greaterThan(0)
        const userFound = response.body.usuarios.find(user => user._id === existentUsers[0]._id)
        expect(userFound.password).to.eq(userPassword) 
      })
    })

    it('deve recuperar usuários administradores pelo query parameter administrador=true', () => {
      const queryParams = {
        administrador: 'true' 
      }
      cy.getUsers(queryParams, headers).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.be.greaterThan(0)

        response.body.usuarios.forEach(user => {
          expect(user.administrador).to.eq('true')
        })
      })
    })

    it('deve recuperar usuários não administradores pelo query parameter administrador=false', () => {
      const queryParams = {
        administrador: 'false' 
      }
      cy.getUsers(queryParams, headers).then((response) => {
        expect(response.status).to.eq(200)
        
        if (response.body.quantidade > 0) {
          response.body.usuarios.forEach(user => {
            expect(user.administrador).to.eq('false')
          })
        }
      })
    })
  })

  describe('POST /usuarios', () => {
    before(() => {
      newUser = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: faker.datatype.boolean().toString()
      }
    })

    it('deve cadastrar um novo usuário com sucesso', () => {
      cy.createUser(newUser).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        expect(response.body._id).to.not.be.empty
        newUser._id = response.body._id
      })
    })

    it('não deve permitir cadastrar usuário com email duplicado', () => {
      const duplicateUser = { ...newUser }
      delete duplicateUser._id

      cy.createUser(duplicateUser).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Este email já está sendo usado')
      })
    })
  })

  describe('GET /usuarios/{_id}', () => {
    it('deve recuperar um usuário existente pelo ID', () => {
      const userId = existentUsers[0]._id

      cy.getUserById(userId, headers).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.nome).to.eq(existentUsers[0].nome)
        expect(response.body.email).to.eq(existentUsers[0].email)
        expect(response.body.password).to.eq(existentUsers[0].password)
        expect(response.body.administrador).to.eq(existentUsers[0].administrador)
        expect(response.body._id).to.eq(userId)
      })
    })

    it('deve retornar erro 400 ao buscar usuário com ID inexistente', () => {
      const nonExistentUserId = faker.string.alphanumeric(16)

      cy.getUserById(nonExistentUserId, headers).then((response) => {
        expect(response.status).to.eq(400) 
        expect(response.body.message).to.eq('Usuário não encontrado')
      })
    })

    it('deve retornar erro 400 ao buscar usuário com ID em formato inválido', () => {
      const invalidUserId = faker.string.uuid()

      cy.getUserById(invalidUserId, headers).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.id).to.eq('id deve ter exatamente 16 caracteres alfanuméricos')
      })
    })
  })

  describe('PUT /usuarios/{_id}', () => {
    let originalUserData

    before(() => {
      if (newUser && newUser._id) {
        originalUserData = { ...newUser }
        delete originalUserData._id
      } else {
        cy.log('Skipping some PUT tests because newUser._id is not available from POST tests')
      }
    })

    it('deve atualizar um usuário existente com sucesso', () => {
      if (!newUser || !newUser._id) {
        cy.log('Skipping test: cannot update user as newUser._id is not available.')
        return
      }

      const updatedUserData = {
        nome: faker.person.fullName(),
        email: originalUserData.email,
        password: originalUserData.password,
        administrador: originalUserData.administrador
      }

      cy.updateUser(newUser._id, updatedUserData, headers).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro alterado com sucesso')
      })
    })

    it('deve cadastrar um novo usuário ao tentar atualizar ID inexistente (Upsert)', () => {
      const nonExistentUserId = faker.database.mongodbObjectId()
      const newUserForUpsert = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: faker.datatype.boolean().toString()
      }

      cy.updateUser(nonExistentUserId, newUserForUpsert, headers).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        expect(response.body._id).to.not.be.empty
      })
    })

    it('não deve permitir atualizar usuário com email já cadastrado por outro', () => {
      if (!newUser || !newUser._id || !existentUsers || existentUsers.length < 1) {
        cy.log('Skipping test: Required data (newUser._id or existentUsers) not available.')
        return
      }
      const existingUserWithDifferentEmail = existentUsers.find(user => user.email !== originalUserData.email)

      if (!existingUserWithDifferentEmail) {
        cy.log('Skipping test: Could not find an existing user with a different email.')
        return
      }

      const updatedUserDataWithDuplicateEmail = {
        ...originalUserData,
        email: existingUserWithDifferentEmail.email
      }

      cy.updateUser(newUser._id, updatedUserDataWithDuplicateEmail, headers).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Este email já está sendo usado')
      })
    })
  })

  describe('DELETE /usuarios/{_id}', () => {
    let userIdToDelete

    before(() => {
      const tempUser = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'false'
      }
      cy.createUser(tempUser, headers).then(response => {
        expect(response.status).to.eq(201)
        userIdToDelete = response.body._id
      })
    })

    it('deve deletar um usuário existente com sucesso', () => {
      if (!userIdToDelete) {
        cy.log('Skipping test: User ID for deletion not available.')
        return
      }
      cy.deleteUser(userIdToDelete, headers).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro excluído com sucesso')
      })
    })

    it('deve retornar mensagem "Nenhum registro excluído" ao tentar deletar usuário inexistente', () => {
      const nonExistentUserId = faker.database.mongodbObjectId()
      cy.deleteUser(nonExistentUserId, headers).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Nenhum registro excluído')
      })
    })
  })
})
