//sectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

//events
document.addEventListener("DOMContentLoaded", addFromLocal);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletCheck);
todoFilter.addEventListener("click", filterTodo);

//Functions
function addTodo(e) {
    e.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.className = "todo-item";

    saveToLocal(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.className = "complete-btn";

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.className = "trash-btn";

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}
function deletCheck(e) {
    console.log(e.target);
    if (e.target.className == "trash-btn") {
        e.target.parentElement.classList.add("fall");
        removeFromLocal(e.target.parentElement);
        e.target.parentElement.addEventListener("transitionend", function () {
            e.target.parentElement.remove();
        });
    }
    if (e.target.className == "complete-btn")
        e.target.parentElement.classList.toggle("completed");
}

function filterTodo(e) {
    const todol = todoList.childNodes;
    todol.forEach(function (x) {
        switch (e.target.value) {
            case "All":
                x.style.display = "flex";
                break;
            case "Completed":
                if (x.classList.contains("completed")) {
                    x.style.display = "flex";
                } else {
                    x.style.display = "none";
                }
                break;
            case "Uncompleted":
                if (!x.classList.contains("completed")) {
                    x.style.display = "flex";
                } else {
                    x.style.display = "none";
                }
                break;
        }
    });
}

function saveToLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addFromLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (x) {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo";

        const newTodo = document.createElement("li");
        newTodo.innerText = x;
        newTodo.className = "todo-item";

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.className = "complete-btn";

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.className = "trash-btn";

        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeFromLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.splice(todos.indexOf(todo.children[0].innerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
