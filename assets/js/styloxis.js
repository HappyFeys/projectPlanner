import { CreateTask, ReloadPlanning } from "./createTask.js"
import { Get, Set } from "./LocalStorage.js"


export function GetAllFlame() {
    let Task = Array.from(Get("taskList", []));
    let score = 0;
    Task.forEach(element => {
       score += element.newTask.score.length/2;
    });
    return score;
}

export function GetAllOnWorking() {
    let Task = Array.from(Get("taskList", []));
    let score = 0;
    Task.forEach(element => {
        if (element.id == 1) {
            score += element.newTask.score.length / 2;
        }
    });
    return score;
}

export function GetAllOnDone() {
    let Task = Array.from(Get("taskList", []));
    let score = 0;
    Task.forEach(element => {
        if (element.id == 2) {
            score += element.newTask.score.length / 2;
        }
    });
    return score;
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
    
// drag and drop

let CurrentObjectGet = ""

let cont = document.querySelectorAll('.task__container');
for (let a = 0; a < cont.length; a++){
    cont[a].id = a;
}


window.addEventListener('pointerdown', function (e) {
    let parentWithClass = findParentWithCertainClass(e.target, 'task');
    if (parentWithClass !== null) {
        parentWithClass.classList.add('drag');
        CurrentObjectGet = parentWithClass.id;
        console.log(CurrentObjectGet)
    }
})

window.addEventListener('pointerup', function (e) {
    if (CurrentObjectGet != "") {
        let parentWithClass = findParentWithCertainClass(e.target, 'task__container');
        console.log(parentWithClass)
        if (parentWithClass == null) {
            ReloadPlanning()
        } else {
            let Task = Array.from(Get("taskList", []));

            
            for (const X of Task) {
                if (X.newTask.creation == CurrentObjectGet) {
                    X.id = parentWithClass.id;
                    CurrentObjectGet = "";
                }
            }
            Set("taskList", Task);


            ReloadPlanning()
        }
    }
})


window.addEventListener('pointermove', function (event) {
    var x = event.clientX;
    var y = event.clientY;

    var drag = document.querySelector(".drag");
    drag.style.position = "absolute";
    drag.style.left = `${x}px`;
    drag.style.top = `${y}px`;
})


function findParentWithCertainClass(element, className) {
    // Si l'élément est null ou si nous avons atteint l'élément racine du document, retourner null
    if (element === null || element === document.body) {
        return null;
    }
    // Si l'élément parent a la classe recherchée, retourner l'élément parent
    if (element.classList.contains(className)) {
        return element;
    }
    // Sinon, continuer à chercher récursivement dans l'arbre DOM
    return findParentWithCertainClass(element.parentNode, className);
}