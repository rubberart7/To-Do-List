import Project from './Project.js';

function updateProjectsInLs(projectsArr) {
    localStorage.setItem('projects', JSON.stringify(projectsArr));
}

function loadProjects() {
    let storedProjects = localStorage.getItem('projects');
     //  This part retrieves the value associated with the key 'projects' from localStorage.
    let projectsArray = [];

    const newProject = new Project("Default Project");
    newProject.addTask("Simple Task 1", "This is the default description.", "04/27/25", "High");

    // The localStorage API stores everything as strings. So, the value of 'projects' will be a JSON string (not an actual array or object). 
    // We need to retrieve this data and determine whether it already exists.

    if (!storedProjects) {
        projectsArray.push(newProject);
        // puts into an array for future use and to add more projects if necessary
        updateProjectsInLs(projectsArray);
        // local storage only stores strings so you have stringify the projects to store locally at first
        // if there isnt a project already present it makes one and stores the projects by using a stringified version of the projects array

        console.log('Default project saved to localStorage: \n', storedProjects);

    } else {
        console.log("This data is an array.", storedProjects);
        projectsArray = JSON.parse(storedProjects);
    }

    return projectsArray
}

export { updateProjectsInLs, loadProjects };

