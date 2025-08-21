// Schema para o modelo de Aluno
const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "Este campo é obrigatório"],
            minlength: [3, "O nome deve ter pelo menos 3 caracteres"],
            maxlength: [100, "O nome deve ter no máximo 100 caracteres"],
        },
        idade: {
            type: Number,
            required: [true, "Este campo é obrigatório"],
            min: [0, "A idade mínima é 0"],
            max: [150, "Idade inválida"],
        },
        curso: {
            type: String,
            required: [true, "Este campo é obrigatório"],
            enum: {
                values: ["Engenharia", "Medicina", "Direito", "Artes", "Ciência da Computação"],
                message: "{VALUE} não é um curso válido",
            },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    { versionKey: false }
);

const Aluno = mongoose.model('Aluno', alunoSchema);
module.exports = Aluno;