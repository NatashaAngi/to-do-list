const TodoForm = document.querySelector("#todo-form");
const TodoInput = document.querySelector("#todo-input");
const TodoList = document.querySelector("#todo-list");
const EditForm = document.querySelector("#edit-form");
const EditiInput = document.querySelector("#edit-input");
const CancelEdit = document.querySelector("#cancel-edit");
const SearchInput = document.querySelector("#search-input");
const EraseBtn = document.querySelector("#erase");
const Filterbtn = document.querySelector("#filter-select");

let oldInputValue 

// FUNÇÕES

const salvarLista = (text,done = 0,save =1)=>{const todo = document.createElement("div")
todo.classList.add("todo")

const todoTitle = document.createElement("h3")
todoTitle.innerText = text

todo.appendChild(todoTitle)


const doneBtn = document.createElement("button")
doneBtn.classList.add('finish-todo')
doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
todo.appendChild(doneBtn)


const editBtn = document.createElement("button")
editBtn.classList.add('edit-todo')
editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
todo.appendChild(editBtn)


const removeBtn = document.createElement("button")
removeBtn.classList.add('remove-todo')
removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
todo.appendChild(removeBtn)

if(done){todo.classList.add("done")}

if (save){saveTodoLocalStorage ({text, done:0})}

TodoList.appendChild(todo)

TodoInput.value=""
TodoInput.focus()
}

const toggleForm = ()=>{EditForm.classList.toggle('hide')
TodoForm.classList.toggle("hide")
TodoList.classList.toggle("hide")}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      let todoTitle = todo.querySelector("h3");
  
      if (todoTitle.innerText === oldInputValue) {
        todoTitle.innerText = text;
      
      updateTodoLocalStorage(oldInputValue,text)}})}




const getSearch = (search) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
  
      todo.style.display = "flex";
  
      console.log(todoTitle);
  
      if (!todoTitle.includes(search)) {
        todo.style.display = "none"}})}


const filterTodos = (filtervalue)=>{const todos = document.querySelectorAll(".todo")
switch(filtervalue){
    case "all": todos.forEach((todo)=>(todo.style.display = "flex"))
    break

    case "done": todos.forEach((todo)=>todo.classList.contains("done")?(todo.style.display = "flex"):(todo.style.display = "none"));
    break

    case "todo": todos.forEach((todo) =>!todo.classList.contains("done")? (todo.style.display = "flex")
: (todo.style.display = "none"));
    break;
    default:
    break;
}
}
// FUNÇÕES



// EVENTOS

TodoForm.addEventListener("submit", (e)=>{e.preventDefault();
const inputValue = TodoInput.value
if(inputValue){
    salvarLista(inputValue)
}
})


document.addEventListener("click", (e)=>{
    const TargetEl = e.target; 
    const parentEl = TargetEl.closest("div")
    let todoTitle;

if (parentEl&&parentEl.querySelector("h3")){todoTitle = parentEl.querySelector("h3").innerText}

if(TargetEl.classList.contains("finish-todo")){parentEl.classList.toggle("done")
updateTodoStatusLocalStorage(todoTitle)}

if(TargetEl.classList.contains("remove-todo")){parentEl.remove();
removeTodoLocalStorage(todoTitle)
}


if(TargetEl.classList.contains("edit-todo")){toggleForm()
EditiInput.value = todoTitle
oldInputValue = todoTitle}

})

CancelEdit.addEventListener("click",(e)=>{e.preventDefault()
toggleForm()

})

EditForm.addEventListener("submit",(e)=>{e.preventDefault()

const editInputValue = EditiInput.value

if(editInputValue){updateTodo(editInputValue)}

toggleForm()

})

SearchInput.addEventListener("keyup",(e)=>{const search = e.target.value
getSearch(search)})

EraseBtn.addEventListener("click",(e)=>{e.preventDefault()

    SearchInput.value = ""
    SearchInput.dispatchEvent(new Event("keyup"))

})


Filterbtn.addEventListener("click", (e) => {const filterValue = e.target.value;
  filterTodos(filterValue);});

//  LOCAL STORAGE

const getTodosLocalStorage=()=>{const todos = JSON.parse(localStorage.getItem("todos")) || [];
return todos}


const loadTodos= ()=>{const todos = getTodosLocalStorage()
todos.forEach((todo)=>{salvarLista(todo.text, todo.done,0)})}

const saveTodoLocalStorage = (todo)=>{const todos = getTodosLocalStorage()
todos.push(todo)

localStorage.setItem("todos",JSON.stringify(todos))}

const removeTodoLocalStorage = (todoText)=>{const todos = getTodosLocalStorage()
const filteredTodos = todos.filter((todo)=>todo.text != todoText)

localStorage.setItem("todos", JSON.stringify(filterTodos))}


const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos()