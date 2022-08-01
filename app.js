
let users = [];
let todos = [];

document.addEventListener('DOMContentLoaded', initApp);

function initApp(){
    Promise.all([getAllUsers(), getAllTodos()]).then(values => {
        [users, todos] = values;
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