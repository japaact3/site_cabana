let cart = [];
let total = 0;

let selectedProduct = "";
let selectedPrice = 0;
let quantity = 1;

let boxPrice = 0;


const precosBebidas = {
    "Vodka Slova": 13,
    "Vodka Smirnoff": 15,
    "Gin": 16,
    "Whisky Black White": 16,
    "Whisky White Horse": 18,
    "Whisky Red Label": 20
};



function showToast(message){

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

function confirmAddToCart(){

    const type =
        document.getElementById("productType").value;

    let finalPrice = selectedPrice;


    if(type === "Caixa"){
        finalPrice = boxPrice;
    }

    cart.push({
        product: selectedProduct,
        price: finalPrice,
        quantity: quantity,
        type: type
    });

    total += finalPrice * quantity;

    updateCart();

    showToast(
    `✅ ${selectedProduct} adicionado ao carrinho`
    );

    closeModal();
}

function updateCart(){

    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const countElement = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    cart.forEach(item => {

        const li = document.createElement("li");

        li.textContent =
        `${item.product}
        (${item.type})
        x${item.quantity}
        - R$ ${(item.price * item.quantity).toFixed(2)}`;

        cartItems.appendChild(li);

    });

    totalElement.textContent = total.toFixed(2);
    countElement.textContent = cart.length;

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    localStorage.setItem(
        "total",
        total
    );
}

function sendWhatsApp(){


    const deliveryType =
        document.getElementById("deliveryType").value;

    const address =
        document.getElementById("deliveryAddress").value;

    let message = "🍻 *PEDIDO CABANA DAS BEBIDAS*\n";
    message += "━━━━━━━━━━━━━━\n\n";

    cart.forEach(item => {

    message += `🍺 *${item.product}*\n\n`;
    message += `   ▸ Tipo: ${item.type}\n\n`;
    message += `   ▸ Qtd: ${item.quantity}\n\n`;
    message += `   ▸ Valor: R$ ${item.price}\n\n`;
    message += "──────────────\n\n";

    });

    message += `💰 *TOTAL: R$ ${total.toFixed(2)}*\n`;

    let payment = "";

    const paymentEl = document.getElementById("paymentMethod");

    if(paymentEl){
        payment = paymentEl.value;
    }


    message += `💳 *Pagamento:* ${payment}\n`;

    message += `%0A📦 Forma de Recebimento:%0A`;
    message += `${deliveryType}%0A`;

    if(deliveryType === "Entrega"){

        if(address.trim() === ""){

            alert("Digite o endereço de entrega.");

            return;
        }

        message += `%0A📍 Endereço:%0A${address}%0A`;
    }

    const phone = "5579988342388";

    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );


    closeCheckoutModal();

    cart = [];
    total = 0;

    localStorage.removeItem("cart");   
    localStorage.removeItem("total");

    updateCart();


    const payment =
    document.getElementById("paymentMethod").value;

    const changeValue =
    document.getElementById("changeValue").value;

    message += `%0A💳 Pagamento:%0A`;
    message += `${payment}%0A`;

    if(payment === "Dinheiro" && changeValue){

    message += `%0A💵 Troco para: R$ ${changeValue}%0A`;


}

}

function openModal(product, price, caixaPreco){

    selectedProduct = product;
    selectedPrice = price;
    boxPrice = caixaPreco;

    quantity = 1;

    document.getElementById("modalProductName").textContent = product;
    document.getElementById("quantity").textContent = quantity;

    document.getElementById("productModal").style.display = "flex";
}

function closeModal(){

    document.getElementById("productModal").style.display = "none";
}

function changeQuantity(value){

    quantity += value;

    if(quantity < 1){
        quantity = 1;
    }

    document.getElementById("quantity").textContent = quantity;
}



/*  Modal do card dos copao */



function openComboModal(){
    document.getElementById("comboModal")
        .style.display = "flex";

    updateComboPrice();
}

function closeComboModal(){
    document.getElementById("comboModal").style.display = "none";
}

function addCombo(){


    const gelo =
        document.getElementById("comboIce").value;

    const bebida =
        document.getElementById("comboDrink").value;

    const energetico =
        document.getElementById("comboEnergy").value;

    const precosBebidas = {
    "Vodka Slova": 13,
    "Vodka Smirnoff": 15,
    "Gin": 16,
    "Whisky Black White": 16,
    "Whisky White Horse": 18,
    "Whisky Red Label": 20
    };

    const preco = precosBebidas[bebida];

    cart.push({
        product:
        `Combo (${bebida},  ${gelo},  ${energetico})`,
        price: preco,
        quantity: 1,
        type: "Copão"
    });

    total += preco;

    updateCart();

    closeComboModal();
}

function updateComboPrice(){

    const bebida =
        document.getElementById("comboDrink").value;

    const preco =
        precosBebidas[bebida];

    document.getElementById("comboPrice")
        .textContent = `R$ ${preco.toFixed(2)}`;
}

function openCheckoutModal(){


    if(cart.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    closeCart();

    document.getElementById("checkoutModal")
        .style.display = "flex";
}

function closeCheckoutModal(){

    document.getElementById("checkoutModal")
        .style.display = "none";
}

function toggleAddressField(){

    const deliveryType =
        document.getElementById("deliveryType").value;

    const addressContainer =
        document.getElementById("addressContainer");

    if(deliveryType === "Entrega"){
        addressContainer.style.display = "block";
    }
    else{
        addressContainer.style.display = "none";
    }
}

window.onload = function(){

    const savedCart =
        localStorage.getItem("cart");

    const savedTotal =
        localStorage.getItem("total");

    if(savedCart){

        cart = JSON.parse(savedCart);

        total = Number(savedTotal);

        updateCart();
    }
}

function clearCart(){

    cart = [];
    total = 0;

    localStorage.removeItem("cart");
    localStorage.removeItem("total");

    updateCart();
    closeCart();
}

function toggleChangeField(){

    const payment =
        document.getElementById("paymentMethod").value;

    const container =
        document.getElementById("changeContainer");

    if(payment === "Dinheiro"){
        container.style.display = "block";
    }
    else{
        container.style.display = "none";
    }
}

const cartIcon =
    document.querySelector(".cart-icon");

cartIcon.classList.add("shake");

setTimeout(() => {
    cartIcon.classList.remove("shake");
}, 500);


document.addEventListener("DOMContentLoaded", () => {

    const banner =
        document.getElementById("bannerText");

    const mensagens = [
        "🍻 Melhores Preços da Região",
        "🚚 Entrega Rápida",
        "🔥 Promoções Toda Semana"
    ];

    let i = 0;

    setInterval(() => {

        banner.style.opacity = "0";

        setTimeout(() => {

            i = (i + 1) % mensagens.length;

            banner.textContent = mensagens[i];

            banner.style.opacity = "1";

        }, 300);

    }, 3000);

});

function searchProducts(){

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        const title =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

        if(title.includes(search)){

            card.style.display = "flex";

        }
        else{

            card.style.display = "none";

        }

    });

}

function filterCategory(category){

    document.querySelectorAll(".categories button")
    .forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const cardCategory =
            card.getAttribute("data-category");

        if(category === "all" || cardCategory === category){
            card.style.display = "flex";
        }else{
            card.style.display = "none";
        }

    });

}

function openCart(){

    document.querySelector(".cart-panel")
        .classList.add("open");

    document.querySelector(".cart-overlay")
        .classList.add("open");
}

function closeCart(){

    document.querySelector(".cart-panel")
        .classList.remove("open");

    document.querySelector(".cart-overlay")
        .classList.remove("open");
}