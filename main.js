let cart = [];
let total = 0;

let selectedProduct = "";
let selectedPrice = 0;
let quantity = 1;

let unitsPerBox = 1;


const precosBebidas = {
    "Vodka": 18,
    "Gin": 16,
    "Whisky": 22
};


function confirmAddToCart(){

    const type =
        document.getElementById("productType").value;

    let finalPrice = selectedPrice;

    const UNIDADES_POR_CAIXA = 12;

    if(type === "Caixa"){
        finalPrice = selectedPrice * unitsPerBox;
    }

    cart.push({
        product: selectedProduct,
        price: finalPrice,
        quantity: quantity,
        type: type
    });

    total += finalPrice * quantity;

    updateCart();

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
}

function sendWhatsApp(){

    const deliveryType =
        document.getElementById("deliveryType").value;

    const address =
        document.getElementById("deliveryAddress").value;

    let message = "🍻 PEDIDO CABANA DAS BEBIDAS%0A%0A";

    cart.forEach(item => {

        message +=
            `• ${item.product} - R$ ${(item.price * item.quantity).toFixed(2)}%0A`;

    });

    message += `%0A💰 Total: R$ ${total.toFixed(2)}%0A`;

    message += `%0A📦 Forma de Recebimento:%0A`;
    message += `${deliveryType}%0A`;

    if(deliveryType === "Entrega"){

        if(address.trim() === ""){

            alert("Digite o endereço de entrega.");

            return;
        }

        message += `%0A📍 Endereço:%0A${address}%0A`;
    }

    const phone = "5599999999999";

    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

    closeCheckoutModal();
}

function openModal(product, price, boxQuantity){

    selectedProduct = product;
    selectedPrice = price;
    unitsPerBox = boxQuantity;


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
    "Vodka": 18,
    "Gin": 16,
    "Whisky": 22
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