// script.js

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const progress = document.querySelector(".progress");
const progressText = document.getElementById("progressText");

const filters = document.querySelectorAll(".filter");

const themeToggle = document.getElementById("themeToggle");

let tasks = [];

let currentFilter = "all";

/* THEME */

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

});

/* ADD */

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e => {

  if(e.key === "Enter"){
    addTask();
  }

});

function addTask(){

  const text = taskInput.value.trim();

  if(text === "") return;

  tasks.push({

    id:Date.now(),
    text,
    completed:false

  });

  taskInput.value = "";

  renderTasks();
}

/* FILTER */

filters.forEach(btn => {

  btn.addEventListener("click", () => {

    filters.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    currentFilter = btn.dataset.filter;

    renderTasks();

  });

});

/* RENDER */

function renderTasks(){

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if(currentFilter === "completed"){

    filteredTasks = tasks.filter(t => t.completed);

  }

  if(currentFilter === "pending"){

    filteredTasks = tasks.filter(t => !t.completed);

  }

  filteredTasks.forEach(task => {

    const li = document.createElement("li");

    li.className = `task ${task.completed ? "completed" : ""}`;

    li.innerHTML = `

      <div class="task-left">

        <div class="check">
          <i class="fa-solid fa-check"></i>
        </div>

        <p>${task.text}</p>

      </div>

      <div class="actions">

        <button class="edit">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button class="delete">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>

    `;

    /* COMPLETE */

    li.querySelector(".check")
    .addEventListener("click", () => {

      task.completed = !task.completed;

      renderTasks();

    });

    /* DELETE */

    li.querySelector(".delete")
    .addEventListener("click", () => {

      li.style.transform = "translateX(200px)";
      li.style.opacity = "0";

      setTimeout(() => {

        tasks = tasks.filter(t => t.id !== task.id);

        renderTasks();

      },300);

    });

    /* EDIT */

    li.querySelector(".edit")
    .addEventListener("click", () => {

      const newText = prompt(
        "Edit Task",
        task.text
      );

      if(newText !== null && newText.trim() !== ""){

        task.text = newText;

        renderTasks();
      }

    });

    taskList.appendChild(li);

  });

  updateStats();
}

/* STATS */

function updateStats(){

  const total = tasks.length;

  const completed =
  tasks.filter(t => t.completed).length;

  const pending = total - completed;

  totalTasks.innerText = total;

  completedTasks.innerText = completed;

  pendingTasks.innerText = pending;

  const percent =
  total === 0
  ? 0
  : Math.round((completed / total) * 100);

  progress.style.width = `${percent}%`;

  progressText.innerText = `${percent}%`;

}

/* AUTO DEMO TASKS */

tasks = [

  {
    id:1,
    text:"Design futuristic UI",
    completed:true
  },

  {
    id:2,
    text:"Complete JavaScript project",
    completed:false
  },

  {
    id:3,
    text:"Push code to GitHub",
    completed:false
  }

];

renderTasks();