const API_URL = 'http://localhost:3000/alunos'; //verificar se está correto

//Selecionar os elementos do frontend
const alunosList = document.getElementById("alunos-list");
const form = document.getElementById("aluno-form");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cursoInput = document.getElementById("curso");
//Funções
//Função para criar um novo registro
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const novoAluno = {
        nome: nomeInput.value,
        idade: parseInt(idadeInput.value),
        curso: cursoInput.value,
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(novoAluno),
    });

    nomeInput.value = "";
    idadeInput.value = "";
    cursoInput.value = "";
    carregarAlunos();
});

//Função para listar os registros já criados
async function carregarAlunos(){
    const res = await fetch(API_URL); //Extender a sintaxe do fetch api
    const alunos = await res.json();

    alunosList.innerHTML = "";

    alunos.forEach(aluno => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${aluno.nome} (${aluno.idade} anos) <br><span class='curso'>${aluno.curso}</span></span>
        <div class="actions">
            <button onclick="deletarAluno('${aluno._id}')">Excluir</button>
        </div>
        `;
        alunosList.appendChild(li);
    });
}


//Função para apagar um registro
async function deletarAluno(id){
    // console.log(id);
    await fetch(`${API_URL}/${id}`,
        {
            method: "DELETE"
        }
    );
    carregarAlunos();
}
//Função para atualizar um registro

//Chamar a função para listar os alunos
carregarAlunos();