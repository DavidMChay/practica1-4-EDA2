class Product {
    constructor(name, price) {
        this.name = name;
        this.price = parseFloat(price);
    }
}

let products = [];

function addProduct() {
    const name = $('#productName').val().trim();
    const price = $('#productPrice').val().trim();

    if (name && !isNaN(price) && price > 0) {
        const product = new Product(name, price);
        products.push(product);
        $('#productName').val('');
        $('#productPrice').val('');
        displayProducts();
        updateTotalPrice();
    } else {
        alert('Por favor ingresa un nombre válido y un precio mayor a cero.');
    }
}

function removeProduct() {
    const key = $('#productKey').val().trim();
    if (key) {
        const index = products.findIndex(product => product.name === key);
        if (index !== -1) {
            products.splice(index, 1);
            $('#productKey').val('');
            displayProducts();
            updateTotalPrice();
        } else {
            alert('Producto no encontrado.');
        }
    } else {
        alert('Por favor ingresa una clave válida.');
    }
}

function displayProducts() {
    const productList = $('#productList');
    productList.empty();

    products.sort((a, b) => a.name.localeCompare(b.name));

    products.forEach(product => {
        productList.append(`
            <li class="list-group-item">
                ${product.name} - $${product.price.toFixed(2)}
            </li>
        `);
    });
}

function updateTotalPrice() {
    const totalPrice = products.reduce((total, product) => total + product.price, 0);
    $('#totalPrice').text(totalPrice.toFixed(2));
}

$(document).ready(() => {
    $('#addProduct').click(addProduct);
    $('#removeProduct').click(removeProduct);
});
