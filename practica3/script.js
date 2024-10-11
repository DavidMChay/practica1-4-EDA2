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

    filter(callback) {
        const filteredList = new LinkedList();
        let current = this.head;
        while (current !== null) {
            if (callback(current.data)) {
                filteredList.add(current.data);
            }
            current = current.next;
        }
        return filteredList;
    }
}

class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}

let students = new LinkedList();
let failedStudents = new LinkedList();

function addStudent() {
    const name = $('#studentName').val().trim();
    const grade = parseFloat($('#studentGrade').val().trim());

    if (name && !isNaN(grade)) {
        const student = new Student(name, grade);
        students.add(student);
        $('#studentName').val('');
        $('#studentGrade').val('');
        separateStudents();
        displayStudents(); 
    } else {
        alert('Por favor ingresa un nombre válido y una calificación.');
    }
}

function separateStudents() {
    failedStudents = students.filter(student => student.grade < 8); 
}

function displayStudents() {
    const passedList = $('#passedStudents');
    const failedList = $('#failedStudents');

    passedList.empty();
    failedList.empty();

    students.toArray().forEach(student => {
        if (student.grade >= 8) {
            passedList.append(`<li class="list-group-item">${student.name} - Calificación: ${student.grade}</li>`);
        }
    });

    failedStudents.toArray().forEach(student => {
        failedList.append(`<li class="list-group-item">${student.name} - Calificación: ${student.grade}</li>`);
    });
}

$(document).ready(() => {
    $('#addStudent').click(addStudent);
});
