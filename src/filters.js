import { importAll } from "./helper";
import { displayCards, sidebar } from "./display";

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


class MyList {
    constructor(name, icon=assets["list.svg"]) {
        this.name = name;
        this.icon = icon;
        this.tasks = [];
    }

    getTasks() {
        return this.tasks;
    }
}

class NoteList {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
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

    const myList = (name="Unnamed List", icon=assets["list.svg"]) => {
        const list = new MyList(name, icon);
        myLists.splice((myLists.length -1), 0, list);
        sidebar.display(defaultFilters, myLists, noteLists);
        displayCards.filters(myLists);
    }

    const noteList = (name="Unnamed List", icon=assets["file-text.svg"]) => {
        const noteList = new NoteList(name, icon);
        noteLists.splice((noteLists.length -1), 0, noteList);
        sidebar.display(defaultFilters, myLists, noteLists);
        displayCards.filters(noteLists);
    }

    const task = (title, description, dueDate, priority, status, listIndex) => {
        const task = new Task(title, description, dueDate, priority, status, myLists[listIndex]);
        console.log(myLists[listIndex])
        myLists[listIndex].tasks.push(task);
    }

    const note = (title, description, listIndex) => {
        const note = new Note(title, description, noteLists[listIndex]);
        console.log(noteLists[listIndex])
        noteLists[listIndex].notes.push(note);
    }

    return { myList, noteList, task, note }
}()

export const myLists = [
    new MyList("My Nice List 1")
];



export const noteLists = [
    new NoteList("All", assets["inbox.svg"])
];
