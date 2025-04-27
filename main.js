export function updateProjectsInLs(projectsArr) {
    localStorage.setItem('projects', JSON.stringify(projectsArr));
}

export function loadProjects() {
    let storedProjects = localStorage.getItem('projects');
     //  This part retrieves the value associated with the key 'projects' from localStorage.
    let projectsArray = [];
    const defaultProject = {
        name: 'Default Project', 
        tasks: [
            {
                title: "Simple Task 1",
                description: "This is the default description.",
                dueDate: "04/27/25",
                priority: "High",
                status: 'Incomplete'                
            }
        ]
    }

    // The localStorage API stores everything as strings. So, the value of 'projects' will be a JSON string (not an actual array or object). 
    // We need to retrieve this data and determine whether it already exists.

    if (!storedProjects) {
        projectsArray.push(defaultProject);
        // puts into an array for future use and to add more projects if necessary
        updateProjectsInLs(projectsArray);
        // local storage only stores strings so you have stringify the projects to store locally at first
        // if there isnt a project already present it makes one and stores the projects by using a stringified version of the projects array

        console.log('Default project saved to localStorage: \n', storedProjects);

    } else {
        if (Array.isArray(JSON.parse(storedProjects))) {
            console.log("This data is an array.", storedProjects);
            projectsArray = JSON.parse(storedProjects);
        } else {
            console.log("This data is not an array.", storedProjects)
        }
    }

    return projectsArray
}

loadProjects();
