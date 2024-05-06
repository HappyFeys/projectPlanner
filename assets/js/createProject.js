
function toggleInput() {
    const btnToggle = document.querySelector("#btnAddProject")
    const projectName =document.querySelector("#project--name")
    const projectDeadLine = document.querySelector("#project--deadLine")
    btnToggle.addEventListener("click", (e)=>{
        if (!(e.target.parentNode.parentNode.children[4])) {
            createZone()
        }
        else{
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
            projectName.innerText = inputName.value;
            let dateDeadLine = new Date(inputDeadLine.value)
            let day = dateDeadLine.getDate()
            let month = dateDeadLine.getMonth()
            let year = dateDeadLine.getFullYear()
            let monthList = ["January","February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"]
            console.log(day);
            console.log(month);
            projectDeadLine.innerText =`DeadLine : ${day} ${monthList[month]} ${year}` ;
        }
    })
}

toggleInput()

function createZone() { 
    const headerTitle = document.querySelector(".header__title")
    const div = document.createElement("div")
    div.classList.add('toggleProject')
    headerTitle.appendChild(div)
    const inputNameProject = document.createElement("input")
    inputNameProject.classList.add("inputName")
    inputNameProject.placeholder = "Enter the name project"
    const inputDeadLineProject = document.createElement("input")
    inputDeadLineProject.type="date"
    inputDeadLineProject.classList.add("inputDeadLine")
    inputDeadLineProject.placeholder = "Enter the dead line"
    div.appendChild(inputNameProject)
    div.appendChild(inputDeadLineProject)
}