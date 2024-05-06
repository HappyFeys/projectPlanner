export function addTask() {
    const btnAddTask = document.querySelectorAll('.addWhite')
  for (let i = 0; i < btnAddTask.length; i++) {
    btnAddTask[i].addEventListener('click', ()=> {
        //récupération des valeurs
        let valueName = btnAddTask[i].parentNode.parentNode.children[0].value
        let valueDescription;
        let valueScore;
        let valueDeadLine;
        //création de l'objet 
        const newTask = {
            taskName: valueName,
            description : valueDescription,
            score : valueScore,
            deadLine : valueDeadLine
        };
        console.log(newTask);
        //il faut mtn que je push mon objet dans un tableau ou l'index correspond à l'index de ma zone de tache. 
        //si le tableau à l'index i n'existe pas on le crée
        if (!tasksArray[i]) {
            tasksArray[i] = [];
        }
        tasksArray[i].push(newTask);
        generateHTML(i)
    })
  }
}

function generateHTML(i) {
    
    const zoneTask = document.querySelectorAll('.zone__tache')
    //création de la zone de task
    const div = document.createElement('div');
    div.classList.add('task');
    div.dataset.taskId=newTask.id;
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkedBox')
    div.appendChild(checkbox);
    const p = document.createElement('p');
    p.innerText = valueInput;
    div.appendChild(p);
    const btnDelete = document.createElement('img')
    btnDelete.src = "assets/img/icons/delete.svg";
    btnDelete.classList.add("btnDelete")
    div.appendChild(btnDelete)
    zoneTask[i].insertAdjacentElement('afterbegin', div)
}