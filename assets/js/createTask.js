export function createTask() {
    //Récupérer les boutons et la zone dans laquelle je me trouve
    const btnAddTask = document.querySelectorAll('')
    
  for (let i = 0; i < btnAddTask.length; i++) {
    btnAddTask[i].addEventListener('click', ()=> {
        //récupération des valeurs
        let valueName = btnAddTask[i].parentNode.parentNode.children[0].value
        let valueDescription;
        let valueScore;
        let valueDeadLine;        
        //création de l'objet 
        const newTask = {
            id: generateUniqueId(),
            taskName: valueName,
            description: valueDescription,
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
        generateHtml(i, id, taskName, description, score, deadLine)
    })
  }
}

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36);
}

function generateHtml(i, id, taskName, description, score, deadLine) {
    const zoneTask = document.querySelectorAll('')
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
    let pCategorie = document.createElement('p')
    pCategorie.innerText= valueSelect;
    div.appendChild(pCategorie)
    const btnDelete = document.createElement('img')
    btnDelete.src = "assets/img/icons/delete.svg";
    btnDelete.classList.add("btnDelete")
    div.appendChild(btnDelete)
    zoneTask[i].insertAdjacentElement('afterbegin', div)
}