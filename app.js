import { getInputField, showInputField, hideInputField, createProjectCard } from './modules/render.js';
import { ProjectManager } from './modules/projectManager.js';

const addProjectButton = document.getElementById('add_project');
let inputFieldVisible = false;

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

addProjectButton.addEventListener('click', () => {
    if (inputFieldVisible === false) {
        handleAddProjectClick();
        inputFieldVisible = true;
    } else {
        console.error("Input is already there!")
    }
});
