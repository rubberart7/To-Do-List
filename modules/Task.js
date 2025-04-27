class Task {
    constructor(title, description, dueDate, priority, status = 'Incomplete') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    toggleStatus() {
        this.status = this.status === 'Incomplete' ? 'Complete' : 'Incomplete';
    }
}

export default Task;