import { getInputField, showInputField, hideInputField, createProjectCard } from './modules/render.js';
import { ProjectManager } from './modules/projectManager.js';

const addProjectButton = document.getElementById('add_project');

let inputFieldVisible = false;
let inputField;

function renderAllProjects() {
    const projects = ProjectManager.getProjectsArr();
    projects.forEach((project, index) => {
        createProjectCard(project, index);
    });
}

function initializeApp() {
    ProjectManager.loadProjects();
    renderAllProjects();
}

function createAndShowInputField() {
    inputField = getInputField();
    showInputField(inputField);
    inputField.focus();
    inputFieldVisible = true;

    inputField.addEventListener('keypress', handleInputEnter);
}

function handleInputEnter(event) {
    if (event.key !== 'Enter') return;

    const projectName = inputField.value.trim();
    if (!projectName) {
        console.error("Project name is required!");
        return;
    }

    ProjectManager.createNewProject(projectName);
    const index = ProjectManager.getLastIndex();
    const newProject = ProjectManager.getLatestProject();

    createProjectCard(newProject, index);

    hideInputField(inputField);
    inputFieldVisible = false;
    inputField.removeEventListener('keypress', handleInputEnter);
    inputField = null;
}

function handleAddProjectClick() {
    if (inputFieldVisible) {
        console.error("Input is already visible!");
        return;
    }
    createAndShowInputField();
}


initializeApp();

addProjectButton.addEventListener('click', handleAddProjectClick);

document.getElementById('projects-container').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('trash-icon-project')) {
        console.log("Trash can icon has been selected.");
        const projectDiv = event.target.closest('.project');
        const index = Array.from(document.querySelectorAll('.project')).indexOf(projectDiv);
        ProjectManager.removeProject(index);
        
        document.getElementById('projects-container').innerHTML = '';
        renderAllProjects();
    }
});

