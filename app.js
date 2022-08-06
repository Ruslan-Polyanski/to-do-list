
let users = [];
let todos = [];
let todoList = document.getElementById('todo-list');
let userSelect = document.getElementById('user-todo');
let form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', createSubmit);

function getUserName(userId){
    let user = users.find(user => user.id === userId);
    return user.name;
}

function printTodo({id, userId, title, completed}){
    let li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = id;
    li.innerHTML = `<span>${title} by <b>${getUserName(userId)}</b></span>`;

    let status = document.createElement('input');
    status.type = 'checkbox';
    status.checked = completed;
    status.addEventListener('change', createTodoChange);

    let close = document.createElement('span');
    close.innerHTML = '&times;';
    close.className = 'close';
    close.addEventListener('click', handlClose);

    li.prepend(status);
    li.append(close);

    todoList.prepend(li);
}

function removeTodo(todoId){
    todos = todos.filter(todo => todoId !== todo.id);
    let todo = todoList.querySelector(`[data-id="${todoId}"]`);
    todo.querySelector('input').removeEventListener('change', createTodoChange);
    todo.querySelector('.close').removeEventListener('click', handlClose);

    todo.remove();
}

function handlClose(e){
    let todoId = e.target.parentElement.dataset.id;
    deleteTodo(todoId);
}

function createUserOption(user){
    let option = document.createElement('option');
    option.value = user.id;
    option.innerText = user.name;
    
    userSelect.append(option);
}

function initApp(){
    Promise.all([getAllUsers(), getAllTodos()]).then(values => {
        [users, todos] = values;
        todos.forEach(todo => printTodo(todo))
        users.forEach(user => createUserOption(user))
    })
}

function createSubmit(event){
    event.preventDefault();
    createTodo({
        userId: +form.user.value,
        title: form.todo.value,
        completed: false
    });
}

function createTodoChange(){
    let todoId = this.parentElement.dataset.id;
    let completed = this.dataset.checked;

    toggleTodoComplete(todoId, completed);
}

async function getAllUsers(){
    let response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
    let date = await response.json();
    return date;
}

async function getAllTodos(){
    let response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=15');
    let date = await response.json();
    return date;
}

async function createTodo(todo){
    let response = await fetch('https://jsonplaceholder.typicode.com/todos',{
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json'
        }
    });

    let newTodo = await response.json();
    printTodo(newTodo);
}

async function toggleTodoComplete(todoId, completed){
    let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`,{
        method: 'PATCH',
        body: JSON.stringify({completed: completed}),
        headers: {
            'Content-type': 'application/json'
        }

    });
}

async function deleteTodo(todoId){
    let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });
    if(response.ok){
        removeTodo(todoId);
    }
}



