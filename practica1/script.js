class Product {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

let availableProducts = [];
let removedProducts = [];

function generateProduct() {
    const quantity = Math.floor(Math.random() * 100) + 1; 
    const price = (Math.random() * 100).toFixed(2);
    const productName = `Producto ${availableProducts.length + 1}`;
    return new Product(productName, quantity, price);
}

function addProduct() {
    const product = generateProduct();
    availableProducts.push(product);
    displayAvailableProducts();
}

function removeProduct(index) {
    const removedProduct = availableProducts.splice(index, 1)[0];
    removedProducts.push(removedProduct);
    displayAvailableProducts();
    displayRemovedProducts();
}

function displayAvailableProducts() {
    const availableList = $('#availableProducts');
    availableList.empty();
    availableProducts.forEach((product, index) => {
        availableList.append(`
            <li class="list-group-item">
                ${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}
                <button class="btn btn-danger btn-sm" onclick="removeProduct(${index})">Retirar</button>
            </li>
        `);
    });
}

function displayRemovedProducts() {
    const removedList = $('#removedProducts');
    removedList.empty();
    removedProducts.forEach((product) => {
        removedList.append(`
            <li class="list-group-item">
                ${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}
            </li>
        `);
    });
}

$(document).ready(() => {
    $('#addProduct').click(addProduct);
});
