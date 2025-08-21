# API CRUD de Produtos

Uma API RESTful simples para gerenciamento de produtos usando Node.js e Express.

## Funcionalidades

- ✅ **CREATE** - Criar novos produtos
- ✅ **READ** - Listar todos os produtos ou buscar por ID
- ✅ **UPDATE** - Atualizar produtos existentes
- ✅ **DELETE** - Remover produtos

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## Endpoints da API

### Base URL
```
http://localhost:3000
```

### 1. Listar todos os produtos
- **Método:** GET
- **URL:** `/produtos`
- **Resposta:**
```json
{
  "total": 2,
  "produtos": [
    {
      "id": 1,
      "nome": "Produto A",
      "preco": 100.00,
      "descricao": "Descrição do Produto A"
    }
  ]
}
```

### 2. Obter produto específico
- **Método:** GET
- **URL:** `/produtos/:id`
- **Exemplo:** `/produtos/1`

### 3. Criar novo produto
- **Método:** POST
- **URL:** `/produtos`
- **Body (JSON):**
```json
{
  "nome": "Novo Produto",
  "preco": 299.99,
  "descricao": "Descrição opcional"
}
```

### 4. Atualizar produto
- **Método:** PUT
- **URL:** `/produtos/:id`
- **Body (JSON):**
```json
{
  "nome": "Produto Atualizado",
  "preco": 199.99,
  "descricao": "Nova descrição"
}
```

### 5. Remover produto
- **Método:** DELETE
- **URL:** `/produtos/:id`
- **Exemplo:** `/produtos/1`

## Estrutura do Produto

```json
{
  "id": "number (gerado automaticamente)",
  "nome": "string (obrigatório)",
  "preco": "number (obrigatório, > 0)",
  "descricao": "string (opcional)"
}
```

## Validações

- **Nome:** Obrigatório, não pode estar vazio
- **Preço:** Obrigatório, deve ser um número positivo
- **Descrição:** Opcional
- **ID:** Gerado automaticamente

## Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `404` - Produto não encontrado
- `500` - Erro interno do servidor

## Exemplos de Uso

### Criar um produto
```bash
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Smartphone","preco":899.99,"descricao":"Smartphone Android"}'
```

### Listar produtos
```bash
curl http://localhost:3000/produtos
```

### Atualizar produto
```bash
curl -X PUT http://localhost:3000/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{"preco":799.99}'
```

### Remover produto
```bash
curl -X DELETE http://localhost:3000/produtos/1
```

## Tecnologias Utilizadas

- Node.js
- Express.js
- JavaScript ES6+

## Estrutura do Projeto

```
CRUD - Produtos (14-08)/
├── server.js          # Servidor principal com rotas
├── package.json       # Configurações e dependências
└── README.md         # Documentação
```
