import { importAll } from "./helper";

export const assets = importAll(require.context("./assets", false, /\.(png|jpe?g|svg)$/))

export const defaultFilters = [
    {
        name: "All",
        icon: assets["inbox.svg"]
    },
    {
        name: "Today",
        icon: assets["clock.svg"]
    },
    {
        name: "This week",
        icon: assets["calendar.svg"]
    },
    {
        name: "Overdue",
        icon: assets["alert-circle.svg"]
    },
    {
        name: "Archived",
        icon: assets["archive.svg"]
    },
]

export const myLists = [
    {
        name: "My Custom List 1",
        icon: assets["list.svg"]
    },
    {
        name: "My Custom List 2",
        icon: assets["list.svg"]
    },
]

export const noteLists = [
    {
        name: "TOP Notes",
        icon: assets["file-text.svg"]
    },
];

const tasks = [];
const notes = [];


class myList {
    constructor(name) {
        this.name = name;
        this.icon = assets["list.svg"];
        this.tasks = [];
        myLists.push(this)
    }
}

class NoteList {
    constructor(name) {
        this.name = name;
        this.icon = assets["file-text.svg"];
        this.notes = [];
        noteLists.push(this);
    }
}

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
