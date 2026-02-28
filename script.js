// Todo List Application with Light/Dark Theme

// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const remainingTasksEl = document.getElementById('remaining-tasks');

// State
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('.theme-text');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        text.textContent = 'Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Dark Mode';
    }
}

// Todo Functions
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.unshift(todo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function toggleTodoComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

function editTodo(id, newText) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, text: newText };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateStats();
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const remaining = total - completed;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    remainingTasksEl.textContent = remaining;
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

function filterTodos(filter) {
    currentFilter = filter;
    renderTodos();
}

// Render Functions
function renderTodos() {
    // Update active filter button
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filter todos based on current filter
    let filteredTodos = [];
    switch (currentFilter) {
        case 'active':
            filteredTodos = todos.filter(todo => !todo.completed);
            break;
        case 'completed':
            filteredTodos = todos.filter(todo => todo.completed);
            break;
        default:
            filteredTodos = todos;
    }
    
    // Render todos
    if (filteredTodos.length === 0) {
        let emptyMessage = '';
        switch (currentFilter) {
            case 'active':
                emptyMessage = 'No active tasks - great job!';
                break;
            case 'completed':
                emptyMessage = 'No completed tasks yet';
                break;
            default:
                emptyMessage = 'No tasks yet. Add your first task above!';
        }
        
        todoList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>${emptyMessage}</h3>
                <p>${currentFilter === 'all' ? 'Add your first task above to get started!' : 'Try changing the filter'}</p>
            </div>
        `;
    } else {
        todoList.innerHTML = filteredTodos.map(todo => `
            <div class="todo-item" data-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" 
                     onclick="toggleTodoComplete(${todo.id})">
                </div>
                <div class="todo-text ${todo.completed ? 'completed' : ''}" 
                     ondblclick="enableEditMode(${todo.id})">
                    ${todo.text}
                </div>
                <div class="todo-actions">
                    <button class="todo-action-btn edit-btn" onclick="enableEditMode(${todo.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="todo-action-btn delete-btn" onclick="deleteTodo(${todo.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    updateStats();
}

function enableEditMode(id) {
    const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
    const todoText = todoItem.querySelector('.todo-text');
    const currentText = todoText.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    input.style.cssText = `
        flex: 1;
        padding: 8px;
        border: 2px solid var(--primary-color);
        border-radius: 6px;
        font-size: 1.1rem;
        font-family: 'Poppins', sans-serif;
        background: var(--container-bg);
        color: var(--text-color);
    `;
    
    todoText.style.display = 'none';
    todoText.parentNode.insertBefore(input, todoText);
    
    input.focus();
    input.select();
    
    function saveEdit() {
        const newText = input.value.trim();
        if (newText && newText !== currentText) {
            editTodo(id, newText);
        } else {
            todoText.style.display = 'block';
            input.remove();
        }
    }
    
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
}

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

themeToggle.addEventListener('click', toggleTheme);

clearCompletedBtn.addEventListener('click', clearCompleted);

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterTodos(btn.dataset.filter);
    });
});

// Initialize
function init() {
    initTheme();
    renderTodos();
    
    // Add some sample todos if empty
    if (todos.length === 0) {
        const sampleTodos = [
            { id: 1, text: 'Learn JavaScript', completed: true, createdAt: new Date().toISOString() },
            { id: 2, text: 'Build a Todo App', completed: true, createdAt: new Date().toISOString() },
            { id: 3, text: 'Add Dark Mode', completed: false, createdAt: new Date().toISOString() },
            { id: 4, text: 'Test the application', completed: false, createdAt: new Date().toISOString() },
            { id: 5, text: 'Deploy to GitHub', completed: false, createdAt: new Date().toISOString() }
        ];
        
        todos = sampleTodos;
        saveTodos();
        renderTodos();
    }
}

// Make functions globally available for inline event handlers
window.toggleTodoComplete = toggleTodoComplete;
window.deleteTodo = deleteTodo;
window.enableEditMode = enableEditMode;

// Initialize the app
init();
