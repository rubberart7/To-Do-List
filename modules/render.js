function getInputField() {
    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('id', 'project-name-input');
    inputField.setAttribute('placeholder', 'Enter Project Name');
    return inputField;
}

function showInputField(inputField) {
    const container = document.getElementById('projects-container');
    container.appendChild(inputField);  
    inputField.focus();  
}

function hideInputField(inputField) {
    inputField.remove();  
}

function createProjectCard(project, index) {
    const projectContainer = document.getElementById('projects-container');  

    const projectCard = document.createElement('div');
    projectCard.classList.add('project');  
    projectCard.setAttribute('data-index', index);
    
    const projectName = document.createElement('p');
    projectName.classList.add('project-name');
    projectName.textContent = project.name;
    const trashIconDiv = document.createElement('div');
    const trashIcon = document.createElement("img");
    trashIcon.classList.add('pic-container');
    trashIcon.classList.add('trash-icon-project');
    trashIcon.src = './images/trash_can_icon.png';
    trashIcon.alt = 'trash can icon';
    trashIconDiv.appendChild(trashIcon);

    projectCard.appendChild(projectName); 
    projectCard.appendChild(trashIconDiv);

    projectContainer.appendChild(projectCard); 
}

function createRightSide(project) {
    const rightSide = document.getElementById('right-side');
    rightSide.innerHTML = ''; 

    const header = document.createElement('div');
    header.className = 'right-side-header';
    
    const projectName = document.createElement('h2');
    projectName.textContent = project.name;
    
    const addTaskBtn = document.createElement('button');
    addTaskBtn.className = 'add-item';
    addTaskBtn.id = 'add_task';
    
    const addIcon = document.createElement('img');
    addIcon.src = './images/add_icon.png';
    addIcon.alt = 'Add Task';
    addIcon.className = 'pic-container';
    
    addTaskBtn.appendChild(addIcon);
    addTaskBtn.appendChild(document.createTextNode(' Add Task'));
    
    header.appendChild(projectName);
    header.appendChild(addTaskBtn);
    
    const tasksContainer = document.createElement('div');
    tasksContainer.id = 'tasks-container';
    
    rightSide.appendChild(header);
    rightSide.appendChild(tasksContainer);
    
    return tasksContainer; 
}

function createTaskCard(task, index) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.dataset.index = index;

    const title = document.createElement('h3');
    title.textContent = task.title;
    
    const description = document.createElement('p');
    description.textContent = task.description;
    
    const dueDate = document.createElement('p');
    dueDate.textContent = `Due: ${task.dueDate}`;
    
    const priority = document.createElement('p');
    priority.textContent = `Priority: ${task.priority}`;
    
    const status = document.createElement('p');
    status.textContent = `Status: ${task.status}`;
    status.style.color = task.status === 'Complete' ? 'green' : 'red';
    
    const actions = document.createElement('div');
    actions.className = 'task-actions';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-task-btn';
    deleteBtn.textContent = 'Delete';
    
    taskCard.append(title, description, dueDate, priority, status, actions);
    actions.appendChild(deleteBtn);
    return taskCard;
}

export { 
    getInputField, 
    showInputField, 
    hideInputField, 
    createProjectCard, 
    createRightSide,
    createTaskCard
};
