class Task {
    constructor(title, description, dueDate, priority, status = 'Incomplete') {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._status = status;
    }

    // Getters
    get title() { return this._title; }
    get description() { return this._description; }
    get dueDate() { return this._dueDate; }
    get priority() { return this._priority; }
    get status() { return this._status; }

    // Setters with basic validation
    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Title must be a non-empty string');
        }
        this._title = value.trim();
    }

    set description(value) {
        this._description = String(value); // Convert to string but allow empty
    }

    set dueDate(value) {
        if (value && isNaN(Date.parse(value))) {
            throw new Error('Invalid date format');
        }
        this._dueDate = value || null;
    }

    set priority(value) {
        const validPriorities = ['Low', 'Medium', 'High'];
        if (!validPriorities.includes(value)) {
            throw new Error('Invalid priority value');
        }
        this._priority = value;
    }

    set status(value) {
        if (value !== 'Complete' && value !== 'Incomplete') {
            throw new Error('Status must be "Complete" or "Incomplete"');
        }
        this._status = value;
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