import { 
    getInputField, 
    showInputField, 
    hideInputField, 
    createProjectCard, 
    createRightSide,
    createTaskCard,
    createTaskForm 
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
    if (projectIndex < 0 || projectIndex >= projects.length) {
        console.error("Invalid project index:", projectIndex);
        return;
    }
    
    const project = projects[projectIndex];
    const tasksContainer = createRightSide(project); 
    tasksContainer.innerHTML = ''; // Only clear tasks, not the whole right side
    
    if (!project.tasks || project.tasks.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks yet. Add a task to get started!</p>';
        return;
    }
    
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
            
            // Reset active project if needed
            if (activeProjectIndex >= ProjectManager.getProjectsArr().length) {
                activeProjectIndex = ProjectManager.getProjectsArr().length - 1;
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
    document.getElementById('right-side').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-task-btn')) {
            const activeProject = document.querySelector('.project.active');
            if (!activeProject) {
                console.error("No active project selected");
                return;
            }
            
            const taskCard = event.target.closest('.task-card');
            const taskIndex = parseInt(taskCard.dataset.index);
            const projectIndex = parseInt(activeProject.dataset.index);
            
            console.log(`Deleting task ${taskIndex} from project ${projectIndex}`);
            
            ProjectManager.removeTask(projectIndex, taskIndex);
            renderTasks(projectIndex);
        }
    });
}

function setUpAddTaskForm() {
    document.addEventListener('click', function(event) {
        // Use event delegation for dynamically created elements
        if (event.target.closest('#add_task')) {
            const tasksContainer = document.getElementById('tasks-container');
            
            // Remove any existing form
            const existingForm = document.querySelector('.task-form-container');
            if (existingForm) existingForm.remove();
            
            // Create and show new form
            const form = createTaskForm(activeProjectIndex);
            tasksContainer.prepend(form);
            
            // Handle form submission
            const taskForm = form.querySelector('.task-form');
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                saveNewTask(activeProjectIndex);
            });
            
            // Handle cancel
            const cancelBtn = form.querySelector('.cancel-task-btn');
            cancelBtn.addEventListener('click', () => {
                form.remove();
            });
        }
    });
}

function saveNewTask(projectIndex) {
    const form = document.querySelector('.task-form');
    
    const taskData = {
        title: form.querySelector('#task-name').value,
        description: form.querySelector('#task-description').value,
        dueDate: form.querySelector('#task-due-date').value,
        priority: form.querySelector('#task-priority').value,
        status: form.querySelector('#task-status').checked ? 'Complete' : 'Incomplete'
    };
    
    // Add task to project
    ProjectManager.addTaskToProject(
        projectIndex,
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.priority,
        taskData.status
    );
    
    // Refresh tasks display
    form.remove();
    renderTasks(projectIndex);
}

// INITIALIZATION
function initializeApp() {
    ProjectManager.loadProjects();
    renderAllProjects();
    
    // Set up all event listeners
    setUpAddProjectsListener();
    setUpDeleteProjectListener();
    setUpDeleteTaskListener();
    switchProjectListener();
    
    // Initialize view
    if (ProjectManager.getProjectsArr().length > 0) {
        renderTasks(0);
    }

    setUpAddTaskForm();
}

initializeApp();