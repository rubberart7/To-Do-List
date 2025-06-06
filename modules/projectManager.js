import Project from './Project.js';
import Task from './Task.js';

const ProjectManager = (() => {
    let projectsArr = [];

    // Creates the default project with sample task
    function createDefaultProject() {
        const newProject = new Project("Default Project");
        newProject.addTask("Sample Task", "This is a default task", "2023-12-31", "Medium");
        console.log("Default project created:", newProject);
        return newProject;
    }

    // Saves projects to localStorage
    function addProjectToLs() {
        const serialized = JSON.stringify(projectsArr);
        localStorage.setItem('projects', serialized);
        console.log("Projects saved to localStorage:", serialized);
    }

    // Gets raw JSON from localStorage
    function getJsonVerOfProj() {
        return localStorage.getItem('projects');
    }

    function getProjsFromLs() {
        const storedProjects = getJsonVerOfProj();
        if (storedProjects) {
            try {
                const parsed = JSON.parse(storedProjects);
                return parsed.map(projectData => {
                    // Reconstruct Project
                    const project = new Project(projectData.name);
                    // Reconstruct Tasks
                    project.tasks = projectData.tasks.map(task => new Task(
                        task.title,
                        task.description,
                        task.dueDate,
                        task.priority,
                        task.status
                    ));
                    return project;
                });
            } catch (e) {
                console.error("Error parsing stored projects:", e);
                return [];
            }
        }
        return [];
    }

    // Adds a project (handles both instances and plain objects)
    function addProjectToArr(projectData) {
        const project = projectData instanceof Project 
            ? projectData 
            : new Project(projectData.name);
        
        if (projectData.tasks) {
            project.tasks = projectData.tasks;
        }
        
        projectsArr.push(project);
        console.log("Added project:", project);
        return project;
    }

    // Initial load of projects
    function loadProjects() {
        const storedProjects = getProjsFromLs();
        projectsArr = [];
        
        if (storedProjects.length > 0) {
            storedProjects.forEach(project => {
                addProjectToArr(project);
            });
        } else {
            addProjectToArr(createDefaultProject());
        }
        addProjectToLs();
    }

    // Creates new project
    function createNewProject(projectName) {
        const project = new Project(projectName);
        addProjectToArr(project);
        addProjectToLs();
        return project;
    }

    // Gets last project index
    function getLastIndex() {
        return projectsArr.length - 1;
    }

    // Gets most recent project
    function getLatestProject() {
        return projectsArr[getLastIndex()];
    }

    // Removes a project
    function removeProject(index) {
        if (index >= 0 && index < projectsArr.length) {
            projectsArr.splice(index, 1);
            addProjectToLs();
            return true;
        }
        console.error("Invalid project index:", index);
        return false;
    }

    function addTaskToProject(projectIndex, title, description, dueDate, priority, status = 'Incomplete') {
        if (projectIndex < 0 || projectIndex >= projectsArr.length) {
            console.error("Invalid project index:", projectIndex);
            return false;
        }
        
        try {
            const project = projectsArr[projectIndex];
            project.addTask(title, description, dueDate, priority, status);
            addProjectToLs();
            return true;
        } catch (error) {
            console.error("Failed to add task:", error);
            return false;
        }
    }

    // Gets tasks for a project
    function getProjectTasks(projectIndex) {
        if (projectIndex < 0 || projectIndex >= projectsArr.length) {
            console.error("Invalid project index:", projectIndex);
            return [];
        }
        return projectsArr[projectIndex].getTaskArr();
    }

    // Removes task from project - FIXED VERSION
    function removeTask(projectIndex, taskIndex) {
        if (projectIndex < 0 || projectIndex >= projectsArr.length) {
            console.error("Invalid project index:", projectIndex);
            return false;
        }
        
        const project = projectsArr[projectIndex];
        if (taskIndex < 0 || taskIndex >= project.tasks.length) {
            console.error("Invalid task index:", taskIndex);
            return false;
        }
    
        project.tasks.splice(taskIndex, 1);
        addProjectToLs();
        return true;
    }

    function updateTask(projectIndex, taskIndex, updatedTaskData) {
        try {
            console.log("Now inside projectManager.js methopd for editting task!");
            const project = projectsArr[projectIndex];
            if (!project) throw new Error('Project not found');
            
            const success = project.updateTask(taskIndex, updatedTaskData);
            if (success) addProjectToLs();
            return true;
        } catch (error) {
            console.error('Update failed:', error.message);
            return false;
        }
    }


    return {
        loadProjects,
        getProjectsArr: () => projectsArr,
        createNewProject,
        getLastIndex,
        getLatestProject,
        removeProject,
        addTaskToProject,
        getProjectTasks,
        removeTask,
        addProjectToLs,
        getJsonVerOfProj,
        updateTask
    };
})();

export { ProjectManager };