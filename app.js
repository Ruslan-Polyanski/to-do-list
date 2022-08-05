
let users = [];
let todos = [];
let todoList = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', initApp);

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

    let close = document.createElement('span');
    close.innerHTML = '&times;';
    close.className = 'close';

    li.prepend(status);
    li.append(close);

    todoList.prepend(li);
}

function initApp(){
    Promise.all([getAllUsers(), getAllTodos()]).then(values => {
        [users, todos] = values;
        todos.forEach(todo => printTodo(todo))
    })
}

async function getAllUsers(){
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let date = await response.json();
    return date;
}

async function getAllTodos(){
    let response = await fetch('https://jsonplaceholder.typicode.com/todos');
    let date = await response.json();
    return date;
}



