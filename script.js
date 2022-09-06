window.onload = loadTasks;

document.querySelector(".addWork").addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

document.querySelector(".cancelWork").addEventListener("click", (e) => {
  document.querySelector("form input").value = "";
});

function loadTasks() {
  if (localStorage.getItem("tasks") == null) return;

  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach((task) => {
    const list = document.querySelector(".myUL");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>
    <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="fa fa-trash closebtns" onclick="removeTask(this)"></i>`;
    li.className = "list-group-item myTasks";
    list.appendChild(li);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector(".myUL");

  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }

  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!");
    return false;
  }

  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task.value, completed: false },
    ])
  );

  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
  <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
  <i class="fa fa-trash closebtns" onclick="removeTask(this)"></i>`;
  li.className = "list-group-item myTasks";
  list.appendChild(li);

  task.value = "";
}


function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

var currentTask = null;


function getCurrentTask(event) {
  currentTask = event.value;
}

function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  
  tasks.forEach(task => {
    if (task.task === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  
  localStorage.setItem("tasks", JSON.stringify(tasks));
}