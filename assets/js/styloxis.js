import { CreateTask } from "./createTask.js"

function SetBalise(id) {
    return '<input type="text" name="task" id="taskName_' + id + '"/>'
        +
        '<input type="text" name="description" id="taskDescription_' + id + '"/>'
        +
        '<input type="date" name="Date" id="taskDate_' + id + '">'
        +
        '<select id="taskPriority_' + id + '"><option>🔥</option><option>🔥🔥</option><option>🔥🔥🔥</option></select>'
        +
        '<button id="taskButton_' + id + '">Add task</button>'
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

for (let i = 0; i < btnPlus.length; i++){
    btnPlus[i].id = i;
    btnPlus[i].addEventListener('click', AddTask);
}