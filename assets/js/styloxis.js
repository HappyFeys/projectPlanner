let buttonAddTask =
    '<input type="text" name="task" id="taskName"/>'
    +
    '<input type="text" name="description" id="taskDescription"/>'
    +
    '<input type="date" name="Date" id="Date">'
    +
    '<select><option>🔥</option><option>🔥🔥</option><option>🔥🔥🔥</option></select>'
    +
    '<button onclick="createTask" id="0">Add task</button>'
;



export let AddTask = (e) => {
    let zone = document.getElementById('id');
    zone.innerHTML = buttonAddTask;
}