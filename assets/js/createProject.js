import { Get, Set } from "./LocalStorage.js"

function toggleInput() {
    const btnToggle = document.querySelector("#btnAddProject")
    btnToggle.addEventListener("click", (e) => {
        if (document.querySelector("#toggleProject") == null) {
            createZone()
        }
        else {
            console.log("il existe déjà un projet");
            let inputName = document.querySelector('.inputName')
            let inputDeadLine = document.querySelector('.inputDeadLine')
            let divtoggle = document.querySelector('.toggleProject')
            const computedStyle = window.getComputedStyle(divtoggle);
            const displayStyle = computedStyle.getPropertyValue('display');
            if (displayStyle === "none") {
                divtoggle.style.display = "block";
            } else {
                divtoggle.style.display = "none";
            }
            let title = {
                name: inputName.value,
                deadline: inputDeadLine.value
            }
            initTitle(title)
        }
    })
}

toggleInput()
let title={
    name:"",
    deadline: new Date()
}

let projectTitle = Get("title", title)
initTitle(projectTitle)

function createZone() { 
    const headerTitle = document.querySelector(".header__title")
    const div = document.createElement("div")
    div.classList.add('toggleProject')
    div.id = "toggleProject";
    headerTitle.appendChild(div)
    const inputNameProject = document.createElement("input")
    inputNameProject.classList.add("inputName")
    inputNameProject.placeholder = "Enter the name project"
    const inputDeadLineProject = document.createElement("input")
    inputDeadLineProject.type="date"
    let today = new Date()
    let m = today.getMonth()+1
    let d = today.getDate()
    inputDeadLineProject.min=today
    inputDeadLineProject.value=today.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    inputDeadLineProject.classList.add("inputDeadLine")
    inputDeadLineProject.placeholder = "Enter the dead line"
    div.appendChild(inputNameProject)
    div.appendChild(inputDeadLineProject)
}

function initTitle(title) {
    const projectName =document.querySelector("#project--name")
    const projectDeadLine = document.querySelector("#project--deadLine")
    Set("title", title)
    let project = Get("title", title)
    console.log(project.name);
    projectName.innerText = project.name;
    let dateDeadLine = new Date(project.deadline)
    let day = dateDeadLine.getDate()
    let month = dateDeadLine.getMonth()
    let year = dateDeadLine.getFullYear()
    let monthList = ["January","February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"]
    if (!(project.name =="")) {
        projectDeadLine.innerText =`DeadLine : ${day} ${monthList[month]} ${year}` ;
    }
}