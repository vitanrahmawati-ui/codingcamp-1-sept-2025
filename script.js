// Ambil elemen
const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filter = document.getElementById("filter");

// Event
form.addEventListener("submit", addTodo);
filter.addEventListener("change", filterTodos);

// Tambah todo
function addTodo(e) {
  e.preventDefault();

  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please fill in task and date!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${task} - ${date}</span>
    <button class="delete">Delete</button>
  `;

  todoList.appendChild(li);

  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
  });

  todoInput.value = "";
  dateInput.value = "";
}

// Filter todo
function filterTodos() {
  const value = filter.value;
  const items = todoList.getElementsByTagName("li");
  const today = new Date().toISOString().split("T")[0];

  Array.from(items).forEach((li) => {
    const text = li.querySelector("span").innerText;
    const date = text.split(" - ")[1];

    if (value === "all") {
      li.style.display = "flex";
    } else if (value === "today") {
      li.style.display = (date === today) ? "flex" : "none";
    } else if (value === "upcoming") {
      li.style.display = (date > today) ? "flex" : "none";
    }
  });
}

