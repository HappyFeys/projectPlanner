import { CreateTask } from "./createTask.js"
import { Get, Set } from "./LocalStorage.js"


export function GetAllFlame() {
    let Task = Array.from(Get("taskList", []));
    let score = 0;
    Task.forEach(element => {
       score += element.newTask.score.length/2;
    });
    console.log(score);
}

export function GetAllOnWorking() {
    let Task = Array.from(Get("taskList", []));
    let score = 0;
    Task.forEach(element => {
        if (element.id == 1) {
            score += element.newTask.score.length / 2;
        }
    });
    console.log(score);
}

export function GetAllOnDone() {
    let Task = Array.from(Get("taskList", []));
    let score = 0;
    Task.forEach(element => {
        if (element.id == 2) {
            score += element.newTask.score.length / 2;
        }
    });
    console.log(score);
}


function SetBalise(id) {
    const CurrentDate = new Date();
    let m = CurrentDate.getMonth() + 1
    let d = CurrentDate.getDate()
    let MinDate = CurrentDate.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);

    return '<input type="text" placeholder="name" name="task" id="taskName_' + id + '"/>'
        +
        '<input type="text" placeholder="description" name="description" id="taskDescription_' + id + '"/>'
        +
        '<input type="date" min="' + MinDate + '" name="Date" id="taskDate_' + id + '" value="' + MinDate +'">'
        +
        '<select id="taskPriority_' + id + '"><option>🔥</option><option>🔥🔥</option><option>🔥🔥🔥</option></select>'
        +
        '<button class="toggleProject" id="taskButton_' + id + '"><i class="fa-solid fa-plus"></i></button>'
        ;
}


export let AddTask = (e) => {
    let zone = document.getElementsByClassName('add__toggle');
    let id = parseInt(e.target.parentNode.id)

    if (zone[id].innerHTML == "") {
        zone[id].innerHTML = SetBalise(id)
        document.getElementById('taskButton_' + id).addEventListener('click', CreateTask)
    } else {
        zone[id].innerHTML = ""
    }
}


    let btnPlus = document.getElementsByClassName('btnPlus');

    for (let i = 0; i < btnPlus.length; i++) {
        btnPlus[i].id = i;
        btnPlus[i].addEventListener('click', AddTask);
    }

    let zones = document.getElementsByClassName('add__toggle');
    for (const zone of zones) {
        zone.innerHTML = "";
    }