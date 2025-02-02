const tasks = [    
    new Task(
    "Complete Project Proposal",
    "Draft and finalize the project proposal for the new client.",
    "2025-11-15",
    "high",
    "pending",
),
    new Task(
    "Grocery Shopping",
    "Buy groceries for the week including fruits, vegetables, and snacks.",
    "2025-11-10",
    "medium",
    "pending",
)];

const notes = [];

class Task {
    constructor(title, description, dueDate, priority, status, list){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.list = list; 
    }

    toggleStatus (){
        this.status === "completed" ? this.status = "pending" : this.status = "completed"
    }


}

class Note {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.list = "notes"; 
    }
}

export function makeTask(title, description, dueDate, priority, status, list="none") {
    const task = new Task(title, description, dueDate, priority, status, list);
    tasks.push(task);
}