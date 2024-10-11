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

    remove(key, comparisonCallback) {
        if (this.head === null) return null;

        let current = this.head;
        let previous = null;

        while (current !== null) {
            if (comparisonCallback(current.data, key)) {
                if (previous === null) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                this.length--;
                return current.data;
            }
            previous = current;
            current = current.next;
        }
        return null;
    }

    traverse(callback) {
        let current = this.head;
        while (current !== null) {
            callback(current.data);
            current = current.next;
        }
    }

    getTotalPrice() {
        let total = 0;
        let current = this.head;
        while (current !== null) {
            total += current.data.price;
            current = current.next;
        }
        return total;
    }

    sort(comparisonCallback) {
        if (this.head === null) return;

        let current = this.head;
        while (current !== null) {
            let nextNode = current.next;
            while (nextNode !== null) {
                if (comparisonCallback(current.data, nextNode.data) > 0) {
                    let temp = current.data;
                    current.data = nextNode.data;
                    nextNode.data = temp;
                }
                nextNode = nextNode.next;
            }
            current = current.next;
        }
    }
}

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = parseFloat(price);
    }
}

let products = new LinkedList();

function addProduct() {
    const name = $('#productName').val().trim();
    const price = $('#productPrice').val().trim();

    if (name && !isNaN(price) && price > 0) {
        const product = new Product(name, price);
        products.add(product);
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
        const removedProduct = products.remove(key, (product, key) => product.name === key);
        if (removedProduct) {
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

    // Ordenar los productos utilizando el método sort con comparación
    products.sort((a, b) => a.name.localeCompare(b.name));

    // Recorrer la lista enlazada directamente con traverse
    products.traverse((product) => {
        productList.append(`
            <li class="list-group-item">
                ${product.name} - $${product.price.toFixed(2)}
            </li>
        `);
    });
}

function updateTotalPrice() {
    const totalPrice = products.getTotalPrice();
    $('#totalPrice').text(totalPrice.toFixed(2));
}

$(document).ready(() => {
    $('#addProduct').click(addProduct);
    $('#removeProduct').click(removeProduct);
});
