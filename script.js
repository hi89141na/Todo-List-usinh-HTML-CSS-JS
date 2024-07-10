//* accessing important nodes from document
let inputField = document.querySelector("#task");
let addBtn = document.querySelector("#addTaskBtn");
let taskList = document.querySelector(".taskList");

//* Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

//* function to add task in list
const addTask = () => {
    if (inputField.value === "") {
        alert("Create Task First!!!");
    } else {
        let task = document.createElement("li");
        let taskText = document.createElement("span");
        taskText.textContent = inputField.value;
        task.appendChild(taskText);

        let divs = document.createElement("div");
        divs.classList.add("btns");
        divs.appendChild(createEditButton()); // Create edit button
        divs.appendChild(createDeleteButton()); // Create delete button
        task.appendChild(divs);

        taskList.appendChild(task); // Append task to task list
        inputField.value = ""; // Clear input field
        addBtn.textContent = "Add Task"; // Reset button text
        saveTasksToLocalStorage(); // Save tasks to localStorage
    }
};

//* function to create a button for delete operation
function createDeleteButton() {
    let delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", () => { deleteTask(delBtn); });
    return delBtn;
}

//* function to delete a task
const deleteTask = (btn) => {
    btn.closest("li").remove(); // Find the closest li and remove it
    saveTasksToLocalStorage(); // Save tasks to localStorage
};

//* function to create a button for edit operation
function createEditButton() {
    let editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", () => { updateTask(editBtn); });
    return editBtn;
}

//* function to update task
const updateTask = (btn) => {
    let taskText = btn.closest("li").querySelector("span");
    inputField.value = taskText.textContent; // Set input field value to task text
    addBtn.textContent = "Edit/Save"; // Change button text to Edit/Save
    taskText.parentNode.remove(); // Remove the task node
    saveTasksToLocalStorage(); // Save tasks to localStorage
};

//* event listener for add button click
addBtn.addEventListener("click", addTask);

//* event listener for enter key press
inputField.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

//* Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll(".taskList li").forEach((task) => {
        tasks.push({ text: task.querySelector("span").textContent.trim() });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//* Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskObj) => {
        let task = document.createElement("li");
        let taskText = document.createElement("span");
        taskText.textContent = taskObj.text;
        task.appendChild(taskText);

        let divs = document.createElement("div");
        divs.classList.add("btns");
        divs.appendChild(createEditButton()); // Create edit button
        divs.appendChild(createDeleteButton()); // Create delete button
        task.appendChild(divs);

        taskList.appendChild(task); // Append task to task list
    });
}
