import { GetAllFlame, GetAllOnWorking, GetAllOnDone, findParentWithClass } from "./styloxis.js"
import { Get, Set } from "./LocalStorage.js"
import { sortAlphabetique, sortDate, sortscore } from "./filter.js"

const filters = document.querySelectorAll(".filter--local");

export let CreateTask = (e) => {
    let getid = e.target.parentNode.id + "";
    getid = getid.slice(11);

    //récupération des valeurs
    let valueName = GetValueById('taskName_' + getid);
    let valueDescription = GetValueById('taskDescription_' + getid)
    let valueScore = GetValueById('taskPriority_' + getid)
    let valueDeadLine = GetValueById('taskDate_' + getid)

    if (valueName != "") {
        //création de l'objet
        const newTask = {
            taskName: valueName,
            description: valueDescription,
            score: valueScore,
            deadLine: (new Date(valueDeadLine)).getTime(),
            creation: (new Date()).getTime()
        };
    
        let Task = Array.from(Get("taskList", []));
        Task.push({ id: getid, newTask: newTask });
        Set("taskList", Task);

        let zone = document.getElementsByClassName('add__toggle');
        zone[getid].innerHTML = "";
    
        ReloadPlanning();
    }
}

let deleteTask = (e) => {
    let Task = Array.from(Get("taskList", []));

    let target = findParentWithClass(e.target,"btnDelete")
    for (let i = 0; i < Task.length; i++) {
        if (Task[i].newTask.creation + "" == e.target.id + "") {
            Task.splice(i, 1);
            i = 99999;
        }
    }

    Set("taskList", Task);
    
    ReloadPlanning();
}

export function ReloadPlanning() {
    cleanHTML();

    let Task = Array.from(Get("taskList", []));

    let Tab_0 = [];
    let Tab_1 = [];
    let Tab_2 = [];

    for (const x of Task) {
        //console.log(x)
        if (x.id + "" == "0") { Tab_0.push(x)}
        if (x.id + "" == "1") { Tab_1.push(x) }
        if (x.id + "" == "2") { Tab_2.push(x) }
    }

    const filters = document.querySelectorAll(".filter--local");
    
    for (let i = 0; i < filters.length; i++){
        if (filters[i].value == "date") { if (i == 0) { Tab_0 = sortDate(Tab_0) }; if (i == 1) { Tab_1 = sortDate(Tab_1) }; if (i == 2) { Tab_2 = sortDate(Tab_2) }; }
        if (filters[i].value == "name") { if (i == 0) { Tab_0 = sortAlphabetique(Tab_0) }; if (i == 1) { Tab_1 = sortAlphabetique(Tab_1) }; if (i == 2) { Tab_2 = sortAlphabetique(Tab_2) }; }
        if (filters[i].value == "score") { if (i == 0) { Tab_0 = sortscore(Tab_0) }; if (i == 1) { Tab_1 = sortscore(Tab_1) }; if (i == 2) { Tab_2 = sortscore(Tab_2) }; }
    }


    let newTab = []
    newTab = newTab.concat(Tab_0)
    newTab = newTab.concat(Tab_1)
    newTab = newTab.concat(Tab_2)

    newTab.forEach(element => {
        generateHTML(element.newTask, element.id)
    });


    let donePercent = (100 / GetAllFlame()) * GetAllOnDone();
    let doingPercent = (100 / GetAllFlame()) * GetAllOnWorking();

    let pb = document.querySelector('#progressionBar');
    let doing = document.querySelector('#doing');
    let done = document.querySelector('#done');

    pb.style = "overflow: hidden;display: flex;flex-direction: row;"
    
    doing.style = "width: " + (doingPercent) + "%;background-color: yellow;transition: width 0.5s"
    done.style = "width: " + (donePercent) + "%;background-color: green;transition: width 0.5s"

    doing.textContent = doingPercent > 0 ? ' ' : ""
    done.textContent = donePercent > 0 ? ' ' : ""

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
    div.id = obj.creation + "";
    
    let ls = Html_div("leftSide");
    let sd = Html_div("scoreDate");
    let bd = Html_div("btnDelete");

    let btn = document.createElement('button')
    btn.addEventListener('click', deleteTask)
    btn.textContent = "X"; //innerHTML = '<span class="material-symbols-outlined">delete</span >'
    btn.classList.add("btnDelete")
    btn.id = obj.creation + "";

    bd.appendChild(btn)



    ls.appendChild(Html_p(obj.taskName));
    ls.appendChild(Html_p(obj.description,"description"));
    sd.appendChild(Html_p(obj.score));
    sd.appendChild(Html_p(time((parseInt(obj.deadLine) + ((new Date()).getTimezoneOffset() * 60000)) - parseInt((new Date()).getTime()))));
    ls.appendChild(sd);

    div.appendChild(ls);
    div.appendChild(bd);

    if (filters[i].value == "noFilter") {
        zoneTask[i].insertAdjacentElement("afterbegin", div)
    } else {
        zoneTask[i].appendChild(div)
    }
}


ReloadPlanning();


for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('change', ReloadPlanning)
}


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
