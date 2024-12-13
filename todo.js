
const input = document.querySelector('.todo-input');
const addButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

addButton.addEventListener('click', () => {
    const taskText = input.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    todoList.appendChild(li);

    input.value = '';

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });
});
