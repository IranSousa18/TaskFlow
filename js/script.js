const taskInput = document.getElementById("taskInput")
const addTaskBtn = document.getElementById("addTaskBtn")
const taskList = document.getElementById("taskList")
const taskCouter = document.getElementById("taskCounter")

let task = []

function renderTask(){
    taskList.innerHTML = ""
    task.forEach((task, index) => {
        const li = document.createElement("li")
        if (task.completed){
            li.classList.add("completed")
        }

        li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
            <button class="completed-btn" onclick="toggleTask("")"></button>
        </div>
        `
    })
}