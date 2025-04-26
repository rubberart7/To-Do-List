export function loadProjects() {
    let storedProjects = localStorage.getItem('projects');
    //  This line retrieves the value associated with the key 'projects' from localStorage.
    // The localStorage API stores everything as strings. So, the value of 'projects' will be a JSON string (not an actual array or object). 
    // We need to retrieve this data and determine whether it already exists.

    if (!storedProjects) {
        const defaultProject = {
            name: 'Default Project', 
            tasks: [
                {
                    taskName: 'Simple Task 1',
                    taskDescription: "Simple task 1",
                    dueDate: '04/27/25',
                    priority: 'High',
                    status: 'Incomplete'                
                }
            ]
        }

        const projects = [defaultProject];
        // puts into an array for future use and to add more projects if necessary
        localStorage.setItem('projects', JSON.stringify(projects));
        // local storage only stores strings so you have stringify the projects to store locally at first

        return projects
        // return the javascript object version so you can work with it later
    } else {
        return JSON.parse(storedProjects);
        // parse to return the javascript object version
    }
}

export function saveProjects(projects) {

}