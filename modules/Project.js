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

    removeTask(taskTitle) {
        this.tasks = this.tasks.filter(task => task.title !== taskTitle);
    }

    getTask(taskTitle) {
        return this.tasks.find(task => task.title === taskTitle);
    }

    getTaskArr() {
        return this.tasks;
    }
}

export default Project;