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

    projectCard.appendChild(projectName);  

    projectContainer.appendChild(projectCard); 
}

export { getInputField, showInputField, hideInputField, createProjectCard };
