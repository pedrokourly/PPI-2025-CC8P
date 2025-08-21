const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Array para armazenar os produtos (simula um banco de dados)
let produtos = [
    {
        id: 1,
        nome: 'Produto A',
        preco: 100.00,
        descricao: 'Descrição do Produto A'
    },
    {
        id: 2,
        nome: 'Produto B',
        preco: 150.00,
        descricao: 'Descrição do Produto B'
    }
];

// Variável para controlar o próximo ID
let proximoId = 3;

// CREATE - Criar um novo produto
app.post('/produtos', (req, res) => {
    try {
        const { nome, preco, descricao } = req.body;
        
        // Validação dos campos obrigatórios
        if (!nome || !preco) {
            return res.status(400).json({ 
                erro: 'Nome e preço são obrigatórios' 
            });
        }
        
        // Validação do preço
        if (isNaN(preco) || preco <= 0) {
            return res.status(400).json({ 
                erro: 'Preço deve ser um número positivo' 
            });
        }
        
        // Criar novo produto
        const novoProduto = {
            id: proximoId++,
            nome: nome.trim(),
            preco: parseFloat(preco),
            descricao: descricao ? descricao.trim() : ''
        };
        
        produtos.push(novoProduto);
        
        res.status(201).json({
            mensagem: 'Produto criado com sucesso',
            produto: novoProduto
        });
        
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// READ - Obter todos os produtos
app.get('/produtos', (req, res) => {
    try {
        res.json({
            total: produtos.length,
            produtos: produtos
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// READ - Obter um produto específico por ID
app.get('/produtos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ erro: 'ID deve ser um número válido' });
        }
        
        const produto = produtos.find(p => p.id === id);
        
        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        
        res.json(produto);
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// UPDATE - Atualizar um produto
app.put('/produtos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, preco, descricao } = req.body;
        
        if (isNaN(id)) {
            return res.status(400).json({ erro: 'ID deve ser um número válido' });
        }
        
        const indice = produtos.findIndex(p => p.id === id);
        
        if (indice === -1) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        
        // Validação dos campos se fornecidos
        if (nome !== undefined && nome.trim() === '') {
            return res.status(400).json({ erro: 'Nome não pode estar vazio' });
        }
        
        if (preco !== undefined && (isNaN(preco) || preco <= 0)) {
            return res.status(400).json({ erro: 'Preço deve ser um número positivo' });
        }
        
        // Atualizar apenas os campos fornecidos
        if (nome !== undefined) produtos[indice].nome = nome.trim();
        if (preco !== undefined) produtos[indice].preco = parseFloat(preco);
        if (descricao !== undefined) produtos[indice].descricao = descricao.trim();
        
        res.json({
            mensagem: 'Produto atualizado com sucesso',
            produto: produtos[indice]
        });
        
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// DELETE - Remover um produto
app.delete('/produtos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ erro: 'ID deve ser um número válido' });
        }
        
        const indice = produtos.findIndex(p => p.id === id);
        
        if (indice === -1) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        
        const produtoRemovido = produtos.splice(indice, 1)[0];
        
        res.json({
            mensagem: 'Produto removido com sucesso',
            produto: produtoRemovido
        });
        
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// Rota raiz para informações da API
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API CRUD de Produtos',
        versao: '1.0.0',
        endpoints: {
            'GET /produtos': 'Listar todos os produtos',
            'GET /produtos/:id': 'Obter produto específico',
            'POST /produtos': 'Criar novo produto',
            'PUT /produtos/:id': 'Atualizar produto',
            'DELETE /produtos/:id': 'Remover produto'
        }
    });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log('API CRUD de Produtos ativa!');
    console.log(`Total de produtos iniciais: ${produtos.length}`);
});

