import { GetAllFlame, GetAllOnWorking, GetAllOnDone } from "./styloxis.js"
import { Get, Set } from "./LocalStorage.js"


export let CreateTask = (e) => {
    let getid = e.target.parentNode.id + "";
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
            deadLine: (new Date(valueDeadLine)).getTime(),
            creation: (new Date()).getTime()
        };
    
    let Task = Array.from(Get("taskList",[]));
    Task.push({ id: getid, newTask: newTask });
    Set("taskList", Task);

    let zone = document.getElementsByClassName('add__toggle');
    zone[getid].innerHTML = "";
    
    ReloadPlanning();
}

let deleteTask = (e) => {
    let Task = Array.from(Get("taskList", []));

    for (let i = 0; i < Task.length; i++) {
        if (Task[i].newTask.creation + "" == e.target.id + "") {
            console.log("test")
            Task.splice(i, 1);
            i = 99999;
        }
    }

    Set("taskList", Task);
    
    ReloadPlanning();
}

function ReloadPlanning() {
    cleanHTML();

    let Task = Array.from(Get("taskList", []));
    Task.forEach(element => {
        generateHTML(element.newTask, element.id)
    });


    let donePercent = (100 / GetAllFlame()) * GetAllOnDone();
    let doingPercent = (100 / GetAllFlame()) * GetAllOnWorking();

    let pb = document.querySelector('#progressionBar');
    let doing = document.querySelector('#doing');
    let done = document.querySelector('#done');

    pb.style = "overflow: hidden;display: flex;flex-direction: row;"
    
    doing.style = "width: " + (doingPercent) + "%;background-color: yellow;"
    done.style = "width: " + (donePercent) + "%;background-color: green"

    doing.textContent = ' '
    done.textContent = ' '

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
    
    let ls = Html_div("leftSide");
    let sd = Html_div("scoreDate");
    let bd = Html_div("btnDelete");

    let btn = document.createElement('button')
    btn.addEventListener('click', deleteTask)
    btn.textContent = "X"
    btn.id = obj.creation + "";

    bd.appendChild(btn)



    ls.appendChild(Html_p(obj.taskName));
    ls.appendChild(Html_p(obj.description,"description"));
    sd.appendChild(Html_p(obj.score));
    sd.appendChild(Html_p(time((parseInt(obj.deadLine) + ((new Date()).getTimezoneOffset() * 60000)) - parseInt((new Date()).getTime()))));
    ls.appendChild(sd);

    div.appendChild(ls);
    div.appendChild(bd);


    zoneTask[i].appendChild(div)
}

ReloadPlanning();

//  Function recurante
function Html_p(text,classAdded) {
    const p = document.createElement('p');
    p.innerText = text;
    if(classAdded != null){p.classList.add(classAdded)}
    return p
}

function GetValueById(id) {
    console.log(document.getElementById(id),id)
    let val = document.getElementById(id).value + "";
    document.getElementById(id).value = "";
    return val
}

function Html_div(classAdded) {
    const p = document.createElement('div');
    p.classList.add(classAdded);
    return p
}

function time(timeSpan) {
    let seconde = Math.floor(timeSpan / 1000);
    let minute = Math.floor(seconde / 60);
    let heure = Math.floor(minute / 60);
    let jour = Math.floor(heure / 24); 

    seconde -= (minute * 60)
    minute -= (heure * 60)
    heure -= (jour * 24)

    let sayJour = Math.floor(jour) > 0 ? Math.floor(jour) > 1 ? Math.floor(jour) + " days " : Math.floor(jour) + " day " : "";
    let sayHour = Math.floor(heure) > 0 ? Math.floor(heure) > 1 ? Math.floor(heure) + " hours " : Math.floor(heure) + " hour " : "";
    let sayMinute = Math.floor(minute) > 0 ? Math.floor(minute) > 1 ? Math.floor(minute) + " minutes " : Math.floor(minute) + " minute " : "";


    return sayJour + sayHour + sayMinute
}
