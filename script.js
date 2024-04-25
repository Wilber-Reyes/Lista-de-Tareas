document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const text = input.value.trim();
      if (text !== "") {
        addTask(text);
        input.value = "";
      }
    });
  
    list.addEventListener("click", function(event) {
      const target = event.target;
      if (target.tagName === "BUTTON") {
        if (target.classList.contains("delete")) {
          deleteTask(target.parentNode);
        } else if (target.classList.contains("complete")) {
          toggleTaskCompletion(target.parentNode);
        }
      }
    });
  
    function addTask(text) {
      const li = document.createElement("li");
      li.textContent = text;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("delete");
      const completeButton = document.createElement("button");
      completeButton.textContent = "Completar";
      completeButton.classList.add("complete");
      li.appendChild(deleteButton);
      li.appendChild(completeButton);
      list.appendChild(li);
      saveTasks();
    }
  
    function deleteTask(task) {
      task.remove();
      saveTasks();
    }
  
    function toggleTaskCompletion(task) {
      task.classList.toggle("completed");
      saveTasks();
    }
  
    function saveTasks() {
      const tasks = [];
      list.querySelectorAll("li").forEach(function(task) {
        tasks.push({
          text: task.textContent,
          completed: task.classList.contains("completed")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(function(task) {
        addTask(task.text);
        const li = list.lastElementChild;
        if (task.completed) {
          li.classList.add("completed");
        }
      });
    }
  
    loadTasks();
  });
  