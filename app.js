import { getInputField, showInputField, hideInputField, createProjectCard, createRightSide, createTaskCard } from './modules/render.js';
import { ProjectManager } from './modules/projectManager.js';

const addProjectButton = document.getElementById('add_project');

let projectIndex = 0;

let inputFieldVisible = false;
let inputField;

function createAndShowInputField() {
    inputField = getInputField();
    showInputField(inputField);
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


function renderAllProjects() {
    const projects = ProjectManager.getProjectsArr();
    projects.forEach((project, index) => {
        createProjectCard(project, index);
    });
}

function setUpAddProjects() {
    addProjectButton.addEventListener('click', handleAddProjectClick); 
}

function setUpDeleteProject() {
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
}

function renderTasks(projectIndex) {
    const projects = ProjectManager.getProjectsArr();
    if (projectIndex < 0 || projectIndex >= projects.length) return;
    
    const project = projects[projectIndex];
    const tasksContainer = createRightSide(project); 
    
    if (!project.tasks || project.tasks.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks yet. Add a task to get started!</p>';
        return;
    }
    
    project.tasks.forEach((task, index) => {
        const taskCard = createTaskCard(task, index);
        tasksContainer.appendChild(taskCard);
    });
}
function switchProject() {
    document.getElementById('projects-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('project-name')) {
            const projectDiv = event.target.closest('.project');
            projectIndex = Array.from(document.querySelectorAll('.project')).indexOf(projectDiv);
            console.log(projectIndex);
            renderTasks(projectIndex);
        }
    });
}

function initializeApp() {
    ProjectManager.loadProjects();
    renderAllProjects();
    setUpAddProjects();
    setUpDeleteProject();
    renderTasks(projectIndex);
    switchProject();
}



initializeApp();

