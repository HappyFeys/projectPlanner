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


document.addEventListener("DOMContentLoaded", function() {
    const filterGlobal = document.getElementById("filter--global");
    const containers = document.querySelectorAll('.task__container');
    let filterOptionsContainer;

    filterGlobal.addEventListener('click', () => {
        console.log("Filter global clicked");
        if (!filterOptionsContainer) {
            filterOptionsContainer = document.createElement("section");
            filterOptionsContainer.className = "filter-options-container";
            filterOptionsContainer.innerHTML = `
                <label>
                    <input type="checkbox" class="filter--options" data-status="to-do">
                    To Do
                </label>
                <br>
                <label>
                    <input type="checkbox" class="filter--options" data-status="doing">
                    Doing
                </label>
                <br>
                <label>
                    <input type="checkbox" class="filter--options" data-status="done">
                    Done
                </label>
            `;
            document.querySelector('#filter--global').appendChild(filterOptionsContainer);
        } else {
            filterOptionsContainer.style.display = filterOptionsContainer.style.display === 'none' ? 'block' : 'none';
        }
    });

    const checkboxes = document.querySelectorAll(".filter--options");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const containerType = checkbox.dataset.container;
            containers.forEach((container) => {
                if (!containerType || container.dataset.status === containerType) {
                    container.style.display = checkbox.checked ? 'block' : 'none';
                }
            });
        });
    });
});