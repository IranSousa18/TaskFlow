const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const searchInput = document.getElementById("searchInput");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(function(task) {
        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    const searchText = searchInput.value.toLowerCase();

    filteredTasks = filteredTasks.filter(function(task) {
        return task.text.toLowerCase().includes(searchText);
    });

    filteredTasks.forEach(function(task) {
        const realIndex = tasks.indexOf(task);
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${realIndex})">
                    ${task.completed ? "Desfazer" : "Feito"}
                </button>

                <button class="delete-btn" onclick="deleteTask(${realIndex})">
                    Excluir
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateCounter();
}

function updateCounter() {
    const total = tasks.length;

    if (total === 0) {
        taskCounter.innerText = "Nenhuma tarefa cadastrada";
    } else if (total === 1) {
        taskCounter.innerText = "1 tarefa cadastrada";
    } else {
        taskCounter.innerText = `${total} tarefas cadastradas`;
    }
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Digite uma tarefa antes de adicionar.");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });

    if (filter === "all") {
        buttons[0].classList.add("active");
    } else if (filter === "pending") {
        buttons[1].classList.add("active");
    } else {
        buttons[2].classList.add("active");
    }

    renderTasks();
}

function loadTheme() {
    const darkMode = localStorage.getItem("darkMode");

    if (darkMode === "true") {
        document.body.classList.add("dark");
        themeBtn.innerText = "☀️";
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("darkMode", isDark);

    themeBtn.innerText = isDark ? "☀️" : "🌙";
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

searchInput.addEventListener("input", renderTasks);

themeBtn.addEventListener("click", toggleTheme);

loadTheme();
renderTasks();