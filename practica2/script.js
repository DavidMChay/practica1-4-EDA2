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

function generateRandomNumbers(count) {
    const numbers = new LinkedList();
    for (let i = 0; i < count; i++) {
        numbers.add(Math.floor(Math.random() * 100));
    }
    return numbers;
}

function displayNumbers(numbers) {
    const randomList = $('#randomNumbers');
    randomList.empty();
    numbers.toArray().forEach(number => {
        randomList.append(`<li class="list-group-item">${number}</li>`);
    });
}

function separateEvenAndOdd(numbers) {
    const evenNumbers = new LinkedList();
    const oddNumbers = new LinkedList();

    let current = numbers.head;
    while (current !== null) {
        if (current.data % 2 === 0) {
            evenNumbers.add(current.data);
        } else {
            oddNumbers.add(current.data);
        }
        current = current.next;
    }
    return { evenNumbers, oddNumbers };
}

function displaySeparatedNumbers(evenNumbers, oddNumbers) {
    const evenList = $('#evenNumbers');
    const oddList = $('#oddNumbers');

    evenList.empty();
    oddList.empty();

    evenNumbers.toArray().forEach(number => {
        evenList.append(`<li class="list-group-item">${number}</li>`);
    });

    oddNumbers.toArray().forEach(number => {
        oddList.append(`<li class="list-group-item">${number}</li>`);
    });
}

$(document).ready(() => {
    $('#generateNumbers').click(() => {
        const randomNumbers = generateRandomNumbers(10);
        displayNumbers(randomNumbers);
        
        const { evenNumbers, oddNumbers } = separateEvenAndOdd(randomNumbers);
        displaySeparatedNumbers(evenNumbers, oddNumbers); 
    });
});
