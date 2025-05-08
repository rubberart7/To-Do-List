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
            console.log("Updated", key, " to this ", value);
            if (value !== undefined) {
                this[key] = value;
            }

        }

        return true;
    }
    // loops through every key value pair using Object.entries() and updates the value
}

export default Task;