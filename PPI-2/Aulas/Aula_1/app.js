const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Olá, PPI-2!');
});

app.get('/hello/:nome', (req, res) => {
    const nome = req.params.nome;
    res.send(`Olá, ${nome}!`);
});

app.get('/pesquisa', (req, res) => {
    const nome = req.query.nome || 'Visitante';
    const sobrenome = req.query.sobrenome || '';
    res.send(`Olá, ${nome} ${sobrenome}!`);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});