class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}

let students = [];
let failedStudents = [];

function addStudent() {
    const name = $('#studentName').val().trim();
    const grade = parseFloat($('#studentGrade').val().trim());

    if (name && !isNaN(grade)) {
        const student = new Student(name, grade);
        students.push(student);
        $('#studentName').val('');
        $('#studentGrade').val('');
        separateStudents();
        displayStudents();
    } else {
        alert('Por favor ingresa un nombre válido y una calificación.');
    }
}

function separateStudents() {
    failedStudents = [];
    function recursiveSeparation(index) {
        if (index >= students.length) {
            return;
        }
        if (students[index].grade < 70) {
            failedStudents.push(students[index]);
        }
        recursiveSeparation(index + 1);
    }
    recursiveSeparation(0);
}

function displayStudents() {
    const passedList = $('#passedStudents');
    const failedList = $('#failedStudents');

    passedList.empty();
    failedList.empty();

    students.forEach(student => {
        if (student.grade >= 70) {
            passedList.append(`<li class="list-group-item">${student.name} - Calificación: ${student.grade}</li>`);
        }
    });

    failedStudents.forEach(student => {
        failedList.append(`<li class="list-group-item">${student.name} - Calificación: ${student.grade}</li>`);
    });
}

$(document).ready(() => {
    $('#addStudent').click(addStudent);
});
