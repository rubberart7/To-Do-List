import Task from './Task.js';

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority);
        this.tasks.push(newTask);
    }

    removeTask(taskIndex) {
        if (taskIndex >= 0 && taskIndex < this.tasks.length) {
            this.tasks.splice(taskIndex, 1);
        } else {
            console.error(`Invalid task index: ${taskIndex}`);
        }
    }

    getTask(taskTitle) {
        return this.tasks.find(task => task.title === taskTitle);
    }

    getTaskArr() {
        return this.tasks;
    }

    static fromJSON(data) {
        const project = new Project(data.name);
        project.tasks = data.tasks.map(task => new Task(
            task.title,
            task.description,
            task.dueDate,
            task.priority,
            task.status
        ));
        return project;
    }
}

export default Project;