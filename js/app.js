const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

//  todos array
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) showTodos();

// setTodos to LocalStorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// get time
function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();

  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const secons =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  fullDay.textContent = `${date}.${month}.${year}`;
  hourEl.textContent = hour;
  minuteEl.textContent = minutes;
  secondEl.textContent = secons;

  return `${hour}: ${minutes}, ${date}.${month}.${year}`;
}
setInterval(getTime, 1000);

// show todos

function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));

  listGroupTodo.innerHTML = "";
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `<li ondblclick="setComplated(${i})" class="list-group-item d-flex justify-content-between ${
      item.isComplated == true ? "complated" : ""
    }">
          ${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${getTime()}</span>
            <img onclick=(editTodo(${i})) src="./img/edit.svg" alt="edit icon" width="25" height="25" />
            <img onclick=(deletetTodo(${i}))
              src="./img/delete.svg"
              alt="delete icon"
              width="25"
              height="25"
            />
          </div>
        </li>`;
  });
}

//   show error
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

//   get todos
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: `${getTime()}`, isComplated: false });
    setTodos();
    showTodos;
  } else {
    showMessage("message-create", "Please,  enter some text...");
  }
});

// delete todo
function deletetTodo(id) {
  todos = todos.filter((item, i) => {
    return i !== id;
  });

  setTodos();
  showTodos();
}

// setComplated
function setComplated(id) {
  const aaa = todos.map((item, i) => {
    if (id == i) {
      return { ...item, isComplated: item.isComplated == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = aaa;
  setTodos();
  showTodos();
}

const inputEdit = document.getElementById("input-edit");
console.log(inputEdit.textContent);

// edit form
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = formEdit["input-edit"].value.trim();

  formEdit.reset();

  if (todoText.length) {
    console.log(editItemId);
    todos.splice(editItemId, 1, {
      text: todoText,
      time: `${getTime()}`,
      isComplated: false,
    });
    setTodos();
    showTodos();
  } else {
    showMessage("message-edit", "Please,  enter some text...");
  }
});

// editTodo
function editTodo(id) {
  inputEdit.value = todos[id].text;
  open();
  editItemId = id;
  close();
}

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function close() {
  closeEl.addEventListener("click", (e) => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
}
