const currentDate = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  document.getElementById("currentDate").textContent = currentDate;

  // Get elements
  const todoForm = document.getElementById("todoForm");
  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");
  const clearAllBtn = document.getElementById("clearAllBtn");

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  renderTodos();

  // Form submit event
  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      addTodo(todoText);
      todoInput.value = "";
      todoInput.focus();
    }
  });

  // Clear all button click event
  clearAllBtn.addEventListener("click", function () {
    todos = [];
    renderTodos();
    saveTodos();
  });

  // Add todo function
  function addTodo(text) {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    todos.push(todo);
    renderTodos();
    saveTodos();
  }

  // Render todos function
  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(function (todo) {
      const todoItem = document.createElement("li");
      todoItem.className = "todo-item";
      if (todo.completed) {
        todoItem.classList.add("completed");
      }
      todoItem.innerHTML = `
        <div class="todo-text">
          <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? "checked" : ""}>
          <label for="todo-${todo.id}">${todo.text}</label>
        </div>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${todo.id}">Delete</button>
      `;
      todoList.appendChild(todoItem);

      // Checkbox change event
      const checkbox = todoItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", function () {
        todo.completed = this.checked;
        todoItem.classList.toggle("completed");
        saveTodos();
      });

      // Delete button click event
      const deleteBtn = todoItem.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function () {
        const todoId = parseInt(this.dataset.id);
        todos = todos.filter(function (todo) {
          return todo.id !== todoId;
        });
        renderTodos();
        saveTodos();
      });
    });
  }

  // Save todos to localStorage
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }