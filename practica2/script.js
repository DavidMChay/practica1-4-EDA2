function generateRandomNumbers(count) {
    let numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * 100));
    }
    return numbers;
}

function displayNumbers(numbers) {
    const randomList = $('#randomNumbers');
    randomList.empty();
    numbers.forEach(number => {
        randomList.append(`<li class="list-group-item">${number}</li>`);
    });
}

function separateEvenAndOdd(numbers) {
    const evenNumbers = [];
    const oddNumbers = [];
    
    function recursiveSeparation(index) {
        if (index >= numbers.length) {
            return;
        }
        if (numbers[index] % 2 === 0) {
            evenNumbers.push(numbers[index]);
        } else {
            oddNumbers.push(numbers[index]);
        }
        recursiveSeparation(index + 1);
    }
    
    recursiveSeparation(0);
    return { evenNumbers, oddNumbers };
}

function displaySeparatedNumbers(evenNumbers, oddNumbers) {
    const evenList = $('#evenNumbers');
    const oddList = $('#oddNumbers');

    evenList.empty();
    oddList.empty();

    evenNumbers.forEach(number => {
        evenList.append(`<li class="list-group-item">${number}</li>`);
    });

    oddNumbers.forEach(number => {
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
