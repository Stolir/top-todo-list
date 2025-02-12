import { importAll } from "./helper";
import { displayFilterCards, sidebar } from "./display";

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

];



export const noteLists = [
    {
        name: "All",
        icon: assets["inbox.svg"]
    },
];


class MyList {
    constructor(name) {
        this.name = name;
        this.icon = assets["list.svg"];
        this.tasks = [];
    }

    getTasks() {
        return this.tasks;
    }
}

class NoteList {
    constructor(name) {
        this.name = name;
        this.icon = assets["file-text.svg"];
        this.notes = [];
    }
    
    getNotes() {
        return this.notes;
    }
}

export class Task {
    static icons = {
        "view": assets["eye.svg"], 
        "star": assets["star.svg"], 
        "edit": assets["edit.svg"], 
        "archive": assets["archive.svg"], 
        "delete": assets["trash-2.svg"]
    }
    constructor(title, description, dueDate, priority, status, list){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.list = list; 
    }

    toggleStatus (){
        this.status === "completed" ? this.status = "pending" : this.status = "completed";
    }


}

export class Note {
    static icons = {
        "view": assets["eye.svg"], 
        "star": assets["star.svg"], 
        "edit": assets["edit.svg"], 
        "archive": assets["archive.svg"], 
        "delete": assets["trash-2.svg"]
    }
    constructor(title, description, list){
        this.title = title;
        this.description = description;
        this.list = list; 
    }
}



export const makeNew = function (){ 

    const myList = (name="Unnamed List") => {
        const list = new MyList(name);
        myLists.splice((myLists.length -1), 0, list);
        sidebar.display(defaultFilters, myLists, noteLists);
        displayFilterCards(myLists);
    }

    const noteList = (name="Unnamed List") => {
        const noteList = new NoteList(name);
        noteLists.splice((noteLists.length -1), 0, noteList);
        sidebar.display(defaultFilters, myLists, noteLists);
        displayFilterCards(noteLists);
    }

    const task = (title, description, dueDate, priority, status, list) => {
        const task = new Task(title, description, dueDate, priority, status, list);
        myLists[list].tasks.push(task);
    }

    const note = (title, description, list) => {
        const note = new Note(title, description, list);
        noteLists.notes.push(note);
    }

    return { myList, noteList, task, note }
}()