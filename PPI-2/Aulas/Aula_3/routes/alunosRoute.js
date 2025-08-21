const express = require('express');
const Aluno = require('../models/Aluno');

const router = express.Router();

// POST
router.post('/', async (req, res, next) => {
    try {
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

// UPDATE

// DELETE

module.exports = router;