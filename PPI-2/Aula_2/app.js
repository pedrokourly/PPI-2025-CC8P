const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [
    {
        id: 0,
        nome: 'João',
        idade: 30
    }, 
    {
        id: 1,
        nome: 'Maria',
        idade: 25
    }
];
let idCounter = usuarios.length;

app.post('/usuarios', (req, res) => {
    const { nome, idade } = req.body;
    const novoUsuario = { id: idCounter++, nome, idade };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nome, idade } = req.body;
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (nome) {
        usuario.nome = nome;
    }
    if (idade) {
        usuario.idade = idade;
    }
    res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    usuarios.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});