class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    add(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }

    removeAt(index) {
        if (index < 0 || index >= this.length) return null;
        let current = this.head;
        if (index === 0) {
            this.head = current.next;
        } else {
            let previous = null;
            let currentIndex = 0;
            while (currentIndex < index) {
                previous = current;
                current = current.next;
                currentIndex++;
            }
            previous.next = current.next;
        }
        this.length--;
        return current.data;
    }

    toArray() {
        let arr = [];
        let current = this.head;
        while (current !== null) {
            arr.push(current.data);
            current = current.next;
        }
        return arr;
    }
}

class Product {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

let availableProducts = new LinkedList();
let removedProducts = new LinkedList();

function generateProduct() {
    const quantity = Math.floor(Math.random() * 100) + 1;
    const price = (Math.random() * 100).toFixed(2);
    const productName = `Producto ${availableProducts.length + 1}`;
    return new Product(productName, quantity, price);
}

function addProduct() {
    const product = generateProduct();
    availableProducts.add(product);
    displayAvailableProducts();
}

function removeProduct(index) {
    const removedProduct = availableProducts.removeAt(index);
    if (removedProduct) {
        removedProducts.add(removedProduct);
        displayAvailableProducts();
        displayRemovedProducts();
    }
}

function displayAvailableProducts() {
    const availableList = $('#availableProducts');
    availableList.empty();
    availableProducts.toArray().forEach((product, index) => {
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
    removedProducts.toArray().forEach((product) => {
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
