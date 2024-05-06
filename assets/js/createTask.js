
export let CreateTask = (e) => {
        //récupération des valeurs
        let valueName = "test"
        let valueDescription = "test"
        let valueScore = "test"
        let valueDeadLine = "test"
        //création de l'objet 
        const newTask = {
            taskName: valueName,
            description : valueDescription,
            score : valueScore,
            deadLine : valueDeadLine
        };

    let getid = e.target.id + "";
    getid = getid.slice(11);
    console.log(getid);
    generateHTML(newTask, getid)
    }

function generateHTML(obj,i) {
    
    const zoneTask = document.querySelectorAll('.zone__task')
    console.log(zoneTask);
    //création de la zone de task
    const div = document.createElement('div');
    div.classList.add('task');
    //div.dataset.taskId=newTask.id;
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkedBox')
    div.appendChild(checkbox);
    const p = document.createElement('p');
    p.innerText = obj.taskName;
    div.appendChild(p);
    const btnDelete = document.createElement('img')
    //btnDelete.src = "assets/img/icons/delete.svg";
    btnDelete.classList.add("btnDelete")
    div.appendChild(btnDelete)
    zoneTask[i].appendChild(div)
}