import { getInputField, showInputField, hideInputField, createProjectCard } from './modules/render.js';
import { ProjectManager } from './modules/projectManager.js';

const addProjectButton = document.getElementById('add_project');
let inputFieldVisible = false;

function initializeApp() {
    ProjectManager.loadProjects();
    const projects = ProjectManager.getProjectsArr();
    projects.forEach(project => {
        createProjectCard(project);
    });
}

function handleAddProjectClick() {

    const inputField = getInputField();

    showInputField(inputField);
    inputFieldVisible = !inputFieldVisible;

    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const projectName = inputField.value.trim();
            if (projectName) {
                ProjectManager.createNewProject(projectName);
                const index = ProjectManager.getLastIndex();
                const newProject = ProjectManager.getLatestProject();

                createProjectCard(newProject, index);

                hideInputField(inputField);

                inputFieldVisible = false;
            } else {
                console.error("Project name is required!");
            }
        }

    });
}

// function handleRemoveProjectClick() {

// }

initializeApp();

addProjectButton.addEventListener('click', () => {
    if (inputFieldVisible === false) {
        handleAddProjectClick();
        inputFieldVisible = true;
    } else {
        console.error("Input is already there!")
    }
});
