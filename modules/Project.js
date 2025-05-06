import Task from './Task.js';

class Project {
    constructor(name) {
        this._name = name;
        this._tasks = [];
    }

    addTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority);
        this._tasks.push(newTask);
    }

    removeTask(taskIndex) {
        if (taskIndex >= 0 && taskIndex < this._tasks.length) {
            this._tasks.splice(taskIndex, 1);
        } else {
            console.error(`Invalid task index: ${taskIndex}`);
        }
    }

    getTask(taskTitle) {
        return this._tasks.find(task => task.title === taskTitle); // Changed to use property
    }

    getTaskArr() {
        return this._tasks;
    }

    updateTask(taskIndex, updatedFields) {
        if (taskIndex < 0 || taskIndex >= this._tasks.length) { // Fixed to use _tasks
            throw new Error(`Invalid task index: ${taskIndex}`);
        }

        try {
            this._tasks[taskIndex].update(updatedFields); // Fixed to use _tasks
            
        } catch (error) {
            console.error('Task update failed:', error.message);
        }
    }
}

export default Project;