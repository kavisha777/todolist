window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.type));
};

function addTask() {
  const input = document.getElementById("taskInput");
  const type = document.getElementById("taskType").value;
  const taskText = input.value.trim();

  if (taskText === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, type: type });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask(taskText, type);
  input.value = "";
}

function renderTask(text, type) {
  const li = document.createElement("li");
  li.className = `task ${type}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = function () {
    if (checkbox.checked) {
      li.remove();
      removeTaskFromStorage(text);
    }
  };

  const span = document.createElement("span");
  span.textContent = text;

  const circle = document.createElement("span");
  circle.className = `circle ${type}`;

  const taskTextDiv = document.createElement("div");
  taskTextDiv.className = "task-text";
  taskTextDiv.appendChild(circle);
  taskTextDiv.appendChild(span);

  li.appendChild(taskTextDiv);
  li.appendChild(checkbox);
  document.getElementById("taskList").appendChild(li);
}

function removeTaskFromStorage(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
