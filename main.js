<<<<<<< HEAD
let carrinho = []
let total = 0

function passPage() {
    window.location.href = "#produtos"
}

function abrirModal(produto, preco) {

    document.getElementById("modal").style.display = "flex"

    document.getElementById("modal-produto").innerText = produto

    document.getElementById("quantidade").value = 1

    window.produtoAtual = produto

    window.precoAtual = preco
}

function fecharModal() {

    document.getElementById("modal").style.display = "none"
}

function adicionarCarrinho() {

    let quantidade = parseInt(
        document.getElementById("quantidade").value
    )

    let tipo = document.getElementById("tipo").value

    let precoFinal = 0

    if (tipo == "caixa") {

        precoFinal = (window.precoAtual * 12) * quantidade

    } else {

        precoFinal = window.precoAtual * quantidade
    }

    carrinho.push(
        `${window.produtoAtual} - ${quantidade} ${tipo}`
    )

    total += precoFinal

    atualizarCarrinho()

    fecharModal()
}

function atualizarCarrinho() {

    const lista =
        document.getElementById("lista-carrinho")

    const totalTexto =
        document.getElementById("total")

    lista.innerHTML = ""

    carrinho.forEach(item => {

        let li = document.createElement("li")

        li.textContent = item

        lista.appendChild(li)
    })

    totalTexto.innerText =
        `Total: R$ ${total.toFixed(2)}`
}


function finalizarPedido(){

    if(carrinho.length == 0){

        alert("Seu carrinho está vazio!")

        return
    }

    let tipoEntrega = document.getElementById("tipo-entrega").value

    let endereco = document.getElementById("endereco").value

    if(tipoEntrega == "Entrega" && endereco == ""){

        alert("Digite o endereço para entrega!")

        return
    }

    let mensagem = "🍹 *NOVO PEDIDO - CABANA DAS BEBIDAS* %0A%0A"

    carrinho.forEach(item => {

        mensagem += `• ${item}%0A`

    })

    mensagem += `%0A💰 Total: R$ ${total.toFixed(2)}%0A`

    mensagem += `%0A🚚 Tipo: ${tipoEntrega}%0A`

    if(tipoEntrega == "Entrega"){

        mensagem += `📍 Endereço: ${endereco}%0A`
    }

    let telefone = "55799988342388"

    let url = `https://wa.me/${telefone}?text=${mensagem}`

    window.open(url, "_blank")
}


function mostrarEndereco(){

    let tipo =
        document.getElementById("tipo-entrega").value

    let endereco =
        document.getElementById("endereco")

    if(tipo == "Entrega"){

        endereco.style.display = "block"

    } else {

        endereco.style.display = "none"
    }
=======
let carrinho = []
let total = 0

function passPage() {
    window.location.href = "#produtos"
}

function abrirModal(produto, preco) {

    document.getElementById("modal").style.display = "flex"

    document.getElementById("modal-produto").innerText = produto

    document.getElementById("quantidade").value = 1

    window.produtoAtual = produto

    window.precoAtual = preco
}

function fecharModal() {

    document.getElementById("modal").style.display = "none"
}

function adicionarCarrinho() {

    let quantidade = parseInt(
        document.getElementById("quantidade").value
    )

    let tipo = document.getElementById("tipo").value

    let precoFinal = 0

    if (tipo == "caixa") {

        precoFinal = (window.precoAtual * 12) * quantidade

    } else {

        precoFinal = window.precoAtual * quantidade
    }

    carrinho.push(
        `${window.produtoAtual} - ${quantidade} ${tipo}`
    )

    total += precoFinal

    atualizarCarrinho()

    fecharModal()
}

function atualizarCarrinho() {

    const lista =
        document.getElementById("lista-carrinho")

    const totalTexto =
        document.getElementById("total")

    lista.innerHTML = ""

    carrinho.forEach(item => {

        let li = document.createElement("li")

        li.textContent = item

        lista.appendChild(li)
    })

    totalTexto.innerText =
        `Total: R$ ${total.toFixed(2)}`
>>>>>>> b743887ec533a425166bcd1b91c2eca94483c2d1
}