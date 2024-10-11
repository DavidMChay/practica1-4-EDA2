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

    traverse(callback) {
        let current = this.head;
        while (current !== null) {
            callback(current.data);
            current = current.next;
        }
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

// Implementación de listas enlazadas para los estudiantes
let students = new LinkedList();
let failedStudents = new LinkedList();

function addStudent() {
    const name = $('#studentName').val().trim();
    const grade = parseFloat($('#studentGrade').val().trim());

    if (name && !isNaN(grade)) {
        const student = new Student(name, grade);
        students.add(student);
        $('#studentName').val(''); // Limpiar el campo de nombre
        $('#studentGrade').val(''); // Limpiar el campo de calificación
        separateStudents(); // Clasificar a los estudiantes
        displayStudents();  // Mostrar los estudiantes en la interfaz
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

    // Mostrar estudiantes aprobados recorriendo la lista enlazada
    students.traverse((student) => {
        if (student.grade >= 8) {
            passedList.append(`<li class="list-group-item">${student.name} - Calificación: ${student.grade}</li>`);
        }
    });

    // Mostrar estudiantes reprobados recorriendo la lista enlazada
    failedStudents.traverse((student) => {
        failedList.append(`<li class="list-group-item">${student.name} - Calificación: ${student.grade}</li>`);
    });
}

$(document).ready(() => {
    $('#addStudent').click(addStudent);
});
