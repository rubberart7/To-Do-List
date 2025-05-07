class Task {
    constructor(title, description, dueDate, priority, status = 'Incomplete') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    // Update method using setters
    update(updatedFields) {
        for (const [key, value] of Object.entries(updatedFields)) {
            if (value !== undefined) {
                this[key] = value; // Uses the setter
            }
        }
    }
}

export default Task;