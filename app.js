import { 
    getInputField, 
    showInputField, 
    hideInputField, 
    createProjectCard, 
    createRightSide,
    createTaskCard, createTaskForm
} from './modules/render.js';
import { ProjectManager } from './modules/projectManager.js';

const addProjectButton = document.getElementById('add_project');
let activeProjectIndex = 0; // Tracks currently selected project
let inputFieldVisible = false;
let inputField;

// PROJECT CREATION FUNCTIONS
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

// RENDERING FUNCTIONS
function renderAllProjects() {
    const projects = ProjectManager.getProjectsArr();
    document.getElementById('projects-container').innerHTML = '';
    projects.forEach((project, index) => {
        createProjectCard(project, index);
    });

    // Set first project as active if none exists
    if (projects.length > 0 && !document.querySelector('.project.active')) {
        const firstProject = document.querySelector('.project');
        firstProject.classList.add('active');
        activeProjectIndex = 0;
        renderTasks(0);
    }
}

function renderTasks(projectIndex) {
    const projects = ProjectManager.getProjectsArr();
    if (projectIndex < 0 || projectIndex >= projects.length) return;

    const project = projects[projectIndex];
    const tasksContainer = createRightSide(project); 
    tasksContainer.innerHTML = ''; // Clear container

    if (!project.tasks || project.tasks.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks yet. Add a task to get started!</p>';
        return;
    }

    // Recreate all task cards with fresh indexes
    project.tasks.forEach((task, index) => {
        const taskCard = createTaskCard(task, index);
        tasksContainer.appendChild(taskCard);
    });
}

// EVENT LISTENERS
function setUpAddProjectsListener() {
    addProjectButton.addEventListener('click', handleAddProjectClick); 
}

function setUpDeleteProjectListener() {
    document.getElementById('projects-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('trash-icon-project')) {
            const projectDiv = event.target.closest('.project');
            const index = Array.from(document.querySelectorAll('.project')).indexOf(projectDiv);
            
            ProjectManager.removeProject(index);
            renderAllProjects();
            
            // Reset active project if the current active project is deleted
            if (activeProjectIndex >= ProjectManager.getProjectsArr().length) {
                activeProjectIndex = Math.max(0, ProjectManager.getProjectsArr().length - 1);
                if (ProjectManager.getProjectsArr().length > 0) {
                    document.querySelector('.project')?.classList.add('active');
                    renderTasks(activeProjectIndex);
                }
            }
        }
    });
}

function switchProjectListener() {
    document.getElementById('projects-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('project-name') || event.target.closest('.project-name')) {
            // Remove active class from all projects
            document.querySelectorAll('.project').forEach(proj => {
                proj.classList.remove('active');
            });
            
            // Set new active project
            const projectDiv = event.target.closest('.project');
            projectDiv.classList.add('active');
            activeProjectIndex = parseInt(projectDiv.dataset.index);
            
            renderTasks(activeProjectIndex);
        }
    });
}

function setUpDeleteTaskListener() {
    // Use event delegation for dynamic elements
    document.getElementById('right-side').addEventListener('click', (event) => {
        const deleteBtn = event.target.closest('.delete-task-btn');
        if (!deleteBtn) return;

        const activeProject = document.querySelector('.project.active');
        if (!activeProject) {
            alert('No project selected');
            return;
        }

        const taskCard = deleteBtn.closest('.task-card');
        const taskIndex = parseInt(taskCard.dataset.index);
        const projectIndex = parseInt(activeProject.dataset.index);

        const success = ProjectManager.removeTask(projectIndex, taskIndex);
        if (success) {
            renderTasks(projectIndex); // Refresh the task list
        }
    });
}

function setUpAddTaskForm() {
    // Use event delegation for dynamic elements
    document.getElementById('right-side').addEventListener('click', (event) => {
        if (event.target.closest('#add_task')) {
            const activeProject = document.querySelector('.project.active');
            if (!activeProject) {
                alert('Please select a project first');
                return;
            }

            // Remove existing form if any
            const existingForm = document.querySelector('.task-form-container');
            if (existingForm) existingForm.remove();

            // Create and show form
            const form = createTaskForm();
            document.getElementById('tasks-container').prepend(form);

            form.querySelector('.task-form').addEventListener('submit', (e) => {
                e.preventDefault();
                saveNewTask(parseInt(activeProject.dataset.index));
            });

            form.querySelector('.cancel-task-btn').addEventListener('click', () => {
                form.remove();
            });
        }
    });
}

function saveNewTask(projectIndex) {
    const form = document.querySelector('.task-form');
    if (!form) return;

    const taskData = {
        title: form.querySelector('#task-name').value.trim(),
        description: form.querySelector('#task-description').value.trim(),
        dueDate: form.querySelector('#task-due-date').value,
        priority: form.querySelector('#task-priority').value,
        status: form.querySelector('#task-status').checked ? 'Complete' : 'Incomplete'
    };

    // Basic validation
    if (!taskData.title) {
        alert('Task title is required');
        return;
    }

    const success = ProjectManager.addTaskToProject(
        projectIndex,
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.priority,
        taskData.status
    );

    if (success) {
        form.remove();
        renderTasks(projectIndex);
    }
}

function initializeApp() {
    ProjectManager.loadProjects();
    renderAllProjects();
    
    // Set up listeners IN THIS ORDER:
    setUpAddProjectsListener();
    setUpDeleteProjectListener();
    switchProjectListener(); 
    setUpAddTaskForm();
    setUpDeleteTaskListener(); // Should come last
    
    // Activate first project if exists
    if (ProjectManager.getProjectsArr().length > 0) {
        document.querySelector('.project')?.classList.add('active');
        renderTasks(0);
    }
}

initializeApp();