// Function to create the input field element
function getInputField() {
    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('id', 'project-name-input');
    inputField.setAttribute('placeholder', 'Enter Project Name');
    return inputField;
}

// Function to show the input field on the screen
function showInputField(inputField) {
    const container = document.getElementById('projects-container');
    container.appendChild(inputField);  // Append the input field to the container
    inputField.focus();  // Optionally, set focus on the input field for immediate typing
}

// Function to hide the input field after the project is created
function hideInputField(inputField) {
    inputField.remove();  // Remove the input field from the DOM
}

// Function to create and render the project card
function createProjectCard(project, index) {
    const projectContainer = document.getElementById('projects-container');  

    const projectCard = document.createElement('div');
    projectCard.classList.add('project');  
    projectCard.setAttribute('data-index', index);
    
    const projectName = document.createElement('h3');
    projectName.textContent = project.name;  

    projectCard.appendChild(projectName);  

    projectContainer.appendChild(projectCard); 
}

export { getInputField, showInputField, hideInputField, createProjectCard };
