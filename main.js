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