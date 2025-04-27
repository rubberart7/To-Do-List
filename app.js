import { getInputField, showInputField, hideInputField, createProjectCard } from './modules/render.js';
import { ProjectManager } from './modules/projectManager.js';

const addProjectButton = document.getElementById('add_project');
let inputField = null;

// Function to handle the 'Add Project' button click
function handleAddProjectClick() {
    // Step 1: Get the input field
    inputField = getInputField();

    // Step 2: Show the input field in the UI
    showInputField(inputField);

    // Step 3: Add event listener to the input field for 'Enter' key
    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const projectName = inputField.value.trim();
            if (projectName) {
                // Step 4: Create the project and add it to the ProjectManager
                ProjectManager.createNewProject(projectName);
                const index = ProjectManager.getLastIndex();
                const newProject = ProjectManager.getLatestProject();

                // Step 5: Render the new project card
                createProjectCard(newProject, index);

                // Step 6: Hide the input field after the project is created
                hideInputField(inputField);
            }
        }
    });
}

// Set up event listener for the 'Add Project' button
addProjectButton.addEventListener('click', handleAddProjectClick);
