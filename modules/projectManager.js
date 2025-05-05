import Project from './Project.js';

const ProjectManager = (() => {
    let projectsArr = [];

    function createDefaultProject() {
        const newProject = new Project("Default Project");
        newProject.addTask("Simple Task 1", "This is the default description.", "04/27/25", "High");
        console.log("Default project created:", newProject); 
        return newProject;
    }

    function addProjectToLs(projectsArr) {
        console.log("Saving to localStorage:", JSON.stringify(projectsArr)); 
        localStorage.setItem('projects', JSON.stringify(projectsArr));
        console.log("LocalStorage after save:", localStorage.getItem('projects')); 
    }

    function getJsonVerOfProj() {
        return localStorage.getItem('projects')
    }

    function getProjsFromLs() {
        const storedProjects = getJsonVerOfProj();
        console.log("Retrieved from localStorage:", storedProjects); 
        if (storedProjects) {
            return JSON.parse(storedProjects);
        }
        return [];
    }

    function addProjectToArr(newProject) {
        projectsArr.push(newProject);
        console.log("Project added to projectsArr:", newProject); 
        console.log("Current projectsArr:", projectsArr); 
    }

    function loadProjects() {
        const jsonProjects = getProjsFromLs();
        console.log("Loaded projects from localStorage (jsonProjects):", jsonProjects); 
        if (jsonProjects.length === 0) {
            const defaultProject = createDefaultProject();
            addProjectToArr(defaultProject);
            addProjectToLs(projectsArr);
        } else {
            projectsArr = jsonProjects;
            console.log("projectsArr loaded from localStorage:", projectsArr); 
        }
    }

    function createNewProject(projectName) {
        const newProject = new Project(projectName);
        addProjectToArr(newProject);
        addProjectToLs(projectsArr);
    }

    function getLastIndex() {
        return projectsArr.length - 1;
    }

    function getLatestProject() {
        return projectsArr[getLastIndex()];
    }

    function removeProject(index) {
        if (index >= 0 && index < projectsArr.length) {
            const removedProject = projectsArr.splice(index, 1);
            console.log("Removed project:", removedProject);
            addProjectToLs(projectsArr);  
        } else {
            console.error("Invalid index provided for project removal.");
        }
    }

    function addTaskToProject(projectIndex, title, description, dueDate, priority, status = 'Incomplete') {
        const project = projectsArr[projectIndex];
        if (!project) {
            console.error("Invalid project index.");
            return;
        }
    
        project.addTask(title, description, dueDate, priority, status);
        console.log(`Task "${title}" added to project "${project.name}".`);
        addProjectToLs(projectsArr);
    }

    function getProjectTasks(projectIndex) {
        const project = projectsArr[projectIndex];
        if (!project) {
            console.error("Invalid project index.");
            return [];
        }
        return project.getTaskArr();
    }

    return {
        loadProjects,
        getJsonVerOfProj,
        getProjectsArr: () => projectsArr, 
        createNewProject,
        getLastIndex, 
        getLatestProject, 
        removeProject,
        addTaskToProject,
        getProjectTasks
    };
})();

export { ProjectManager };
