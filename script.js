//* accessing important nodes from document
let inputField = document.querySelector("#task");
let addBtn = document.querySelector("#addTaskBtn");
let taskList = document.querySelector(".taskList");

//* Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

//*? function to add task in list
const addTask = () => {
    if (inputField.value === "") {
        alert("Create Task First!!!");
    } else {
        let task = document.createElement("li");
        task.textContent = inputField.value;
        let divs = document.createElement("div");
        divs.classList.add("btns");
        task.appendChild(divs);
        divs.appendChild(createEditButton());
        divs.appendChild(createDeleteButton());
        taskList.appendChild(task);
        inputField.value = "";
        addBtn.textContent = "Add Task";
        saveTasksToLocalStorage(); // Save tasks to localStorage
    }
};

//*? function to create a button for delete operation
function createDeleteButton() {
    let delBtn = document.createElement("button");
    delBtn.setAttribute("class", "delBtn");
    delBtn.addEventListener("click", () => { deleteTask(delBtn); });
    return delBtn;
}

const deleteTask = (btn) => {
    btn.parentNode.parentNode.remove();
    saveTasksToLocalStorage(); // Save tasks to localStorage
};

//*? function to create a button for edit operation
function createEditButton() {
    let editBtn = document.createElement("button");
    editBtn.setAttribute("class", "editBtn");
    editBtn.addEventListener("click", () => { updateTask(editBtn); });
    return editBtn;
}

const updateTask = (btn) => {
    inputField.value = btn.parentNode.parentNode.textContent;
    addBtn.textContent = "Edit";
    btn.parentNode.parentNode.remove();
    saveTasksToLocalStorage(); // Save tasks to localStorage
};

addBtn.addEventListener("click", addTask);

//* event listener for enter key
inputField.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

//* adding event listeners to existing buttons
let editBtns = document.querySelectorAll(".editBtn");
editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        updateTask(btn);
    });
});

let delBtns = document.querySelectorAll(".delBtn");
delBtns.forEach((btn) => {
    btn.addEventListener("click", () => { deleteTask(btn); });
});

//* Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll(".taskList li").forEach((task) => {
        tasks.push(task.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//* Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => {
        let task = document.createElement("li");
        task.textContent = taskText;
        let divs = document.createElement("div");
        divs.classList.add("btns");
        task.appendChild(divs);
        divs.appendChild(createEditButton());
        divs.appendChild(createDeleteButton());
        taskList.appendChild(task);
    });
}
