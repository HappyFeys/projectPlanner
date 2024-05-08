// const filterGlobal = document.getElementById("filter--global");
// const filterCheckboxes = document.querySelectorAll('.filter--options');
// const containers = document.querySelectorAll('.task__container');
// let filterOptionsContainer;

//     filterGlobal.addEventListener('click', () => {
//         if (!filterOptionsContainer) {
//         filterOptionsContainer = document.createElement("section");
//         filterOptionsContainer.className = "filter-options-container";
//         filterOptionsContainer.innerHTML = `
//             <label>
//             <input type="checkbox" class="filter--options"           data-container="to-do">
//             To Do
//             </label>
//             <br>
//             <label>
//             <input type="checkbox" class="filter--options" data-container="doing">
//             Doing
//             </label>
//             <br>
//             <label>
//             <input type="checkbox" class="filter--options" data-container="done">
//             Done
//             </label>
//         `;
//         document.querySelector('#filter--global').appendChild(filterOptionsContainer);
//         } else {
//         filterOptionsContainer.style.display = filterOptionsContainer.style.display === 'none' ? 'block' : 'none';
//         }
//     });
    

//     const checkboxes = document.querySelectorAll(".filter--options");

// checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener('change', () => {
//         if (checkbox.checked) {
//             containers.forEach((container) => {
//                 if (container.dataset.status === 'to-do' || container.dataset.status === 'doing') {
//                     container.style.display = 'block';
//                 } else {
//                     container.style.display = 'none';
//                 }
//             });
//         } else {
//             containers.forEach((container) => {
//                 container.style.display = 'block';
//             });
//         }
//     });
// });

const containers = document.querySelectorAll('.task__container');

document.addEventListener("DOMContentLoaded", function() {
    const filterGlobal = document.getElementById("filter--global");
    let filterOptionsContainer;

    filterGlobal.addEventListener('click', (e) => {
        if(e.target.parentNode.id == "filter--global"){
        console.log("Filter global clicked");
        if (!filterOptionsContainer) {
            filterOptionsContainer = document.createElement("section");
            filterOptionsContainer.className = "filter-options-container";
            filterOptionsContainer.innerHTML = `
                <label>
                    <input type="checkbox" class="filter--options" data-status="to-do" id="toDo">
                    To Do
                </label>
                <br>
                <label>
                    <input type="checkbox" class="filter--options" data-status="doing" id="doing" >
                    Doing
                </label>
                <br>
                <label>
                    <input type="checkbox" class="filter--options" data-status="done" id="done">
                    Done
                </label>
            `;
            document.querySelector('#filter--global').appendChild(filterOptionsContainer);
            check()
        } else {
            filterOptionsContainer.style.display = filterOptionsContainer.style.display === 'none' ? 'block' : 'none';
        }
    }
    });

});



function check(){

    const checkboxes = document.querySelectorAll(".filter--options");
            console.log(checkboxes);
            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', (event) => {
                    console.log(event.target.id) //x tovare ke cs va a prendere il codice 
                    for (const container of containers) {
                        container.style.display = "none";
                    }
                    let bool = !checkboxes[0].checked && !checkboxes[1].checked && !checkboxes[2].checked 
                    for (let index = 0; index < checkboxes.length; index++) {
                        if((checkboxes[index].id == "toDo" && checkboxes[index].checked) || bool){
                            containers[0].style.display = "block";
                        }
                        if((checkboxes[index].id == "doing" && checkboxes[index].checked)|| bool){
                            containers[1].style.display = "block";
                        }
                        if((checkboxes[index].id == "done" && checkboxes[index].checked)|| bool){
                            containers[2].style.display = "block";
                            //i choose the numbr index since i only have 3 containers;
                        }
                    }
                    
                });
            });
}


//La fonction recoit un tableau en entrée et te renvoie le même tableau trié. 
//La fonction sort compare l'élément actuel (a) avec l'élément suivant du tableau (b)
// so that can be used elsewhere export:
export function sortAlphabetique(array) {
    array.sort((a, b) => a.newTask.taskName.localeCompare(b.newTask.taskName))
    return array
}

//les fonctions sort va calculer la différence entre b et a et va trier en fonction de cette différence (<0 ou >0)
export function sortDate(array) {
    array.sort((a, b) => a.newTask.deadLine - b.newTask.deadLine);
    return array
}

    //if not substracted it will take the fist one meets which logically it isn't 
export function sortscore(array) {
    array.sort((a,b)=> a.newTask.score.length - b.newTask.score.length);
    return array
}