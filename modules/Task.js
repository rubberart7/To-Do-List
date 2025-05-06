class Task {
    constructor(title, description, dueDate, priority, status = 'Incomplete') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    // Getters
    get title() { return this.title; }
    get description() { return this.description; }
    get dueDate() { return this.dueDate; }
    get priority() { return this.priority; }
    get status() { return this.status; }

    // Setters with basic validation
    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Title must be a non-empty string');
        }
        this.title = value.trim();
    }

    set description(value) {
        this.description = String(value); // Convert to string but allow empty
    }

    set dueDate(value) {
        if (value && isNaN(Date.parse(value))) {
            throw new Error('Invalid date format');
        }
        this.dueDate = value || null;
    }

    set priority(value) {
        const validPriorities = ['Low', 'Medium', 'High'];
        if (!validPriorities.includes(value)) {
            throw new Error('Invalid priority value');
        }
        this.priority = value;
    }

    set status(value) {
        if (value !== 'Complete' && value !== 'Incomplete') {
            throw new Error('Status must be "Complete" or "Incomplete"');
        }
        this.status = value;
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