const express = require('express');
const Aluno = require('../models/Aluno');

const router = express.Router();

// POST
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const aluno = await Aluno.create(req.body);
        res.status(201).json({
            message: 'Aluno criado com sucesso',
            aluno: aluno
        });

    } catch (error) {
        next(error);
    }
});
// GET
router.get('/', async (req, res, next) => {
    try {
        const alunos = await Aluno.find();
        res.status(200).json(alunos);
    } catch (error) {
        next(error);
    }
});

// UPDATE

// DELETE

module.exports = router;