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
    projectName.textContent = project.name;
    const trashIconDiv = document.createElement('div');
    const trashIcon = document.createElement("img");
    trashIcon.classList.add('pic-container');
    trashIcon.id = 'trash-icon-project';
    trashIcon.src = './images/trash_can_icon.png';
    trashIcon.alt = 'trash can icon';
    trashIconDiv.appendChild(trashIcon);

    projectCard.appendChild(projectName); 
    projectCard.appendChild(trashIconDiv);

    projectContainer.appendChild(projectCard); 
}

export { getInputField, showInputField, hideInputField, createProjectCard };
