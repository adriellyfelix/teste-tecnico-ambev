# Testes de API com Cypress para Serverest

Este projeto contém testes automatizados de API e de UI utilizando Cypress para a API de testes [Serverest](https://serverest.dev/) e [Front Serverest](https://front.serverest.dev/).

## 🚀 Tecnologias

- Cypress
- Node.js
- Mochawesome (Relatórios - se configurado)
- Faker (Geração de dados)
- Dotenv (Variáveis de ambiente)

## 📋 Pré-requisitos

- Node.js (v14 ou superior recomendado)
- NPM ou Yarn

## 🔧 Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/adriellyfelix/teste-tecnico-ambev
    cd teste-tecnico-ambev
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:
    *   Copie o arquivo de exemplo:
        ```bash
        cp .env.example .env
        ```
    *   Edite o arquivo `.env` se necessário para apontar para um ambiente diferente do padrão Serverest.

## 🏃‍♂️ Executando os testes

### Abrir o Cypress Test Runner (Modo Interativo)

```bash
npm run cypress:open
# ou
# npx cypress open
```
Selecione "E2E Testing" e escolha o navegador e o spec file (`users-api.cy.js`) para executar.

### Executar todos os testes E2E (Modo Headless)

```bash
npm run cypress:run
# ou
# npx cypress run
```
Este comando executa todos os testes encontrados na pasta `cypress/e2e`.

*(Nota: Os comandos `npm run ...` dependem dos scripts definidos no seu `package.json`. Os comandos `npx cypress ...` funcionarão se o Cypress estiver instalado localmente.)*

## 📁 Estrutura do Projeto

```
.
├── cypress/
│   ├── e2e/
│   │   └── backend/
│   │       └── users-api.cy.js   # Testes da API de Usuários
│   │       └── products-api.cy.js   # Testes da API de Produtos
│   ├── fixtures/
│   │   └── test-data.json        # Dados de teste (ex: usuários)
│   └── support/
│       ├── backend/
│       │   └── api-commands.js   # Comandos customizados para a API
│       ├── frontend/
│       │   └── ui-commands.js    # Comandos customizados para a API
│       ├── config.js             # Configuração global e variáveis de ambiente
│       └── e2e.js                # Configurações E2E
├── .env                          # Variáveis de ambiente (local)
├── .env.example                  # Exemplo de variáveis de ambiente
├── cypress.config.js             # Configurações do Cypress
├── package.json                  # Dependências e scripts
└── README.md                     # Este arquivo
```

## 🔍 Funcionalidades Testadas (API)

Os testes de API cobrem as seguintes funcionalidades:

### Autenticação
- **POST /login:** Obtenção de token de autenticação (utilizado nos `before` hooks dos testes).

### Usuários (`/usuarios`)
- **GET /usuarios:** Listagem e busca com query parameters (`_id`, `nome`, `email`, `password`, `administrador`).
- **POST /usuarios:** Criação de novos usuários (incluindo validação de email duplicado).
- **GET /usuarios/{_id}:** Busca de usuário por ID (incluindo ID inexistente/inválido).
- **PUT /usuarios/{_id}:** Atualização de usuário (incluindo upsert e validação de email duplicado).
- **DELETE /usuarios/{_id}:** Exclusão de usuário (incluindo ID inexistente).

### Produtos (`/produtos`)
- **GET /produtos:** Listagem e busca com query parameters (`_id`, `nome`, `preco`, `descricao`, `quantidade`).
- **GET /produtos/{_id}:** Busca de produto por ID.
- **POST /produtos:** Criação de novos produtos (incluindo validação de nome duplicado e acesso não autorizado).
- **PUT /produtos/{_id}:** Atualização de produto (incluindo acesso não autorizado).
- **DELETE /produtos/{_id}:** Exclusão de produto (incluindo acesso não autorizado).

## 📊 Relatórios

Se configurado (geralmente com `mochawesome`), os relatórios HTML podem ser gerados após a execução dos testes em modo headless. Verifique a configuração em `cypress.config.js` e os scripts no `package.json`.

## 🔐 Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente (definidas em `.env` ou no sistema):

- `CYPRESS_BASE_URL_API`: URL base da API (padrão: `https://serverest.dev`)
- `CYPRESS_BASE_URL`: URL base do frontend (usado pelo Serverest, padrão: `https://front.serverest.dev` - pode não ser diretamente usado nos testes de API)

## 🤝 Contribuição

1.  Faça um fork do projeto.
2.  Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3.  Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4.  Faça push para a branch (`git push origin feature/nova-feature`).
5.  Abra um Pull Request.

## 📝 Licença

Este projeto está sob a licença MIT.

