import { GetAllFlame, GetAllOnWorking, GetAllOnDone } from "./styloxis.js"
import { Get, Set } from "./LocalStorage.js"


export let CreateTask = (e) => {
    let getid = e.target.id + "";
    getid = getid.slice(11);


    //récupération des valeurs
    let valueName = GetValueById('taskName_' + getid);
    let valueDescription = GetValueById('taskDescription_' + getid)
    let valueScore = GetValueById('taskPriority_' + getid)
    let valueDeadLine = GetValueById('taskDate_' + getid)

        //création de l'objet
        const newTask = {
            taskName: valueName,
            description : valueDescription,
            score : valueScore,
            deadLine : valueDeadLine
        };
    
    let Task = Array.from(Get("taskList",[]));
    Task.push({ id: getid, newTask: newTask });
    Set("taskList", Task);

    let zone = document.getElementsByClassName('add__toggle');
    zone[getid].innerHTML = "";
    
    ReloadPlanning();
}

function ReloadPlanning() {
    cleanHTML();

    let Task = Array.from(Get("taskList", []));
    Task.forEach(element => {
        generateHTML(element.newTask, element.id)
    });

    GetAllFlame();
    GetAllOnWorking();
    GetAllOnDone();
}

function cleanHTML() {
    const zoneTask = document.querySelectorAll('.zone__task')
    for (const zone of zoneTask) {
        zone.innerHTML = "";
    }
}
function generateHTML(obj,i) {
    const zoneTask = document.querySelectorAll('.zone__task')

    //création de la zone de task
    const div = document.createElement('div');
    div.classList.add('task');

    div.appendChild(Html_p(obj.taskName));
    div.appendChild(Html_p(obj.description));
    div.appendChild(Html_p(obj.score));
    div.appendChild(Html_p(obj.deadLine));


    zoneTask[i].appendChild(div)
}

ReloadPlanning();

//  Function recurante
function Html_p(text) {
    const p = document.createElement('p');
    p.innerText = text;
    return p
}

function GetValueById(id) {
    let val = document.getElementById(id).value + "";
    document.getElementById(id).value = "";
    return val
}