// Lista dos produtos disponíveis
const produtos = [
    {
        id: 1,
        nome: "Argola de Ouro",
        preco: 150,
        imagem: "images/elegant-gold-hoop-earrings-for-showcasing-jewelry-design-and-craftsmanship-cut-out-stock-png.webp"
    },
    {
        id: 2,
        nome: "Anel de Ouro",
        preco: 200,
        imagem: "images/Jewellery-Ring-PNG-Photo.png"
    },
    {
        id: 3,
        nome: "Anel de Prata",
        preco: 120,
        imagem: "images/pngtree-diamond-engagement-ring-clip-art-shiny-jewelry-illustration-in-white-background-png-image_19049150.png"
    },
    {
        id: 4,
        nome: "Conjunto Anéis de Ouro",
        preco: 350,
        imagem: "images/pngtree-gold-3d-three-dimensional-jewelry-ring-modeling-png-image_9048332.png"
    },
    {
        id: 5,
        nome: "Anel de Prata com Pedra",
        preco: 180,
        imagem: "images/pngtree-stylish-fashion-stone-ring-for-modern-jewelry-png-image_13584519.png"
    },
    {
        id: 6,
        nome: "Anel de Ouro",
        preco: 250,
        imagem: "images/pngtree-elegant-jewelry-on-transparent-background-png-image_16052924.png"
    }
];

// Estado do carrinho
let carrinho = [];

// Função para atualizar o HTML da lista do carrinho
function renderCarrinho() {
    const lista = document.querySelector('.lista');
    lista.innerHTML = '';
    carrinho.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-lista';
        card.innerHTML = `
            <div class="card-lista-infos">
                <div class="text-info">
                    <h2 style="font-size: 1rem; color: #F2F2F2">${item.nome}</h2>
                    <p style="color: #F2F2F2">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="quantidade-controle">
                    <button class="diminuir" data-id="${item.id}">-</button>
                    <span class="quantidade" style="color: #F2F2F2">${item.quantidade}</span>
                    <button class="aumentar" data-id="${item.id}">+</button>
                </div>
            </div>
        `;
        lista.appendChild(card);
    });
    atualizarCheckout();
}

// Função para atualizar o valor total do checkout
function atualizarCheckout() {
    const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
    document.getElementById('checkout-total').textContent = total.toFixed(2).replace('.', ',');
}

// Adiciona produto ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemCarrinho = carrinho.find(item => item.id === id);
    if (itemCarrinho) {
        itemCarrinho.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    renderCarrinho();
}

// Remove produto do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    renderCarrinho();
}

// Aumenta quantidade
function aumentarQuantidade(id) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade += 1;
        renderCarrinho();
    }
}

// Diminui quantidade
function diminuirQuantidade(id) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade -= 1;
        if (item.quantidade <= 0) {
            removerDoCarrinho(id);
        } else {
            renderCarrinho();
        }
    }
}

// Eventos dos botões de adicionar ao carrinho
document.querySelectorAll('.add-carrinho').forEach(btn => {
    btn.addEventListener('click', function () {
        adicionarAoCarrinho(Number(this.dataset.id));
    });
});

// Delegação de eventos para os botões do carrinho
document.querySelector('.lista').addEventListener('click', function (e) {
    if (e.target.classList.contains('remover')) {
        removerDoCarrinho(Number(e.target.dataset.id));
    }
    if (e.target.classList.contains('aumentar')) {
        aumentarQuantidade(Number(e.target.dataset.id));
    }
    if (e.target.classList.contains('diminuir')) {
        diminuirQuantidade(Number(e.target.dataset.id));
    }
});

// Inicializa carrinho vazio
renderCarrinho();
