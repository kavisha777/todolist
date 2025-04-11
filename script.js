window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => renderTask(task.text, task.type));
    updateTaskCount();
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
    updateTaskCount();
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
        updateTaskCount();
      }
    };
  
    const span = document.createElement("span");
    span.textContent = text;
  
    // Add emoji bullet based on type
    const emoji = document.createElement("span");
    emoji.style.marginRight = "8px";
    emoji.textContent = type === "Urgent" ? "🔴" : type === "Work" ? "🟡" : "🟢";
  
    const taskTextDiv = document.createElement("div");
    taskTextDiv.className = "task-text";
    taskTextDiv.style.display = "flex";
    taskTextDiv.style.alignItems = "center";
    taskTextDiv.appendChild(emoji);
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
  
  function updateTaskCount() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let counter = document.getElementById('taskCounter');
  
    if (!counter) {
      counter = document.createElement('div');
      counter.id = 'taskCounter';
      counter.className = 'mt-4 text-center font-semibold text-blue-800';
      document.querySelector('#taskList').before(counter);
    }
  
    counter.textContent = `Tasks to complete: ${tasks.length}`;
  }