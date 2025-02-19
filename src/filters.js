import { importAll, initialLoad } from "./helper";
import { displayCards, sidebar } from "./display";
import { isToday, isThisWeek, isPast } from "date-fns";
import { storeList, retrieveList } from "./localStorage";

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
    
];


export class MyList {
    constructor(name, icon, tasks) {
        this.name = name;
        this.icon = icon;
        this.tasks = tasks;
    }

    getItems() {
        return this.tasks;
    }
}

export class NoteList {
    constructor(name, icon, notes) {
        this.name = name;
        this.icon = icon;
        this.notes = notes;
    }
    
    getItems() {
        return this.notes;
    }
}

export class Task {
    static taskCount = 0;
    static icons = {
        "view": assets["eye.svg"], 
        "star": assets["star.svg"], 
        "edit": assets["edit.svg"], 
        "archive": assets["archive.svg"], 
        "delete": assets["trash-2.svg"]
    }
    constructor(title, description, dueDate, priority, status, listIndex, id){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.listIndex = listIndex;
        this.id = id;
        Task.taskCount++;
    }

    toggleStatus (){
        this.status === "completed" ? this.status = "pending" : this.status = "completed";
    }


}

export class Note {
    static noteCount = 0;
    static icons = {
        "view": assets["eye.svg"], 
        "star": assets["star.svg"], 
        "edit": assets["edit.svg"], 
        "archive": assets["archive.svg"], 
        "delete": assets["trash-2.svg"]
    }
    constructor(title, description, listIndex){
        this.title = title;
        this.description = description;
        this.listIndex = listIndex; 
        this.id = `n${Note.noteCount}`
        Note.noteCount++;
    }
}



export const makeNew = function (){ 

    const myList = (name="Unnamed List", icon=assets["list.svg"], tasks=[]) => {
        const list = new MyList(name, icon, tasks);
        myLists.push(list);
        sidebar.display(defaultFilters, myLists, noteLists);
        displayCards.filters(myLists);
        console.log(myLists)
        if (!initialLoad) {
            storeList(myLists, "myLists")
        }
    }

    const noteList = (name="Unnamed List", icon=assets["file-text.svg"], notes=[]) => {
        const noteList = new NoteList(name, icon, notes);
        noteLists.push(noteList);
        sidebar.display(defaultFilters, myLists, noteLists);
        displayCards.filters(noteLists);
        if (!initialLoad) {
            storeList(noteLists, "noteLists")
        }
    }

    const task = (title, description, dueDate, priority, status, listIndex, id=`${Task.taskCount}`) => {
        const task = new Task(title, description, dueDate, priority, status, listIndex, id);
        console.log(myLists[listIndex])
        myLists[listIndex].tasks.push(task);
        if (!initialLoad) {
            storeList(myLists, "myLists")
        }
    }

    const note = (title, description, listIndex, id=`${Note.noteCount}`) => {
        const note = new Note(title, description, listIndex, id);
        console.log(noteLists[listIndex])
        noteLists[listIndex].notes.push(note);
        if (!initialLoad) {
            storeList(noteLists, "noteLists")
        }  
    }

    return { myList, noteList, task, note }
}()

export const filterBy = function() {

    const all = () => {
        const allItems = [];
        for (let list of myLists) {
            console.log(list.getItems())
            for (let item of list.getItems()) {
                allItems.push(item);
            }
        }
        return allItems;
    }

    const today = () => {
        const todayItems = [];
        for (let list of myLists) {
            console.log(list.getItems())
            for (let item of list.getItems()) {
                const date = new Date(item.dueDate)
                if (isToday(date)) {
                    todayItems.push(item)
                }
            }
        }
        return todayItems;
    }

    const thisWeek = () => {
        const thisWeekItems = [];
        for (let list of myLists) {
            console.log(list.getItems())
            for (let item of list.getItems()) {
                const date = new Date(item.dueDate)
                if (isThisWeek(date) && !isPast(date)) {
                    thisWeekItems.push(item)
                }
            }
        }
        return thisWeekItems;
    }

    const overdue = () => {
        const overdueItems = [];
        for (let list of myLists) {
            console.log(list.getItems())
            for (let item of list.getItems()) {
                const date = new Date(item.dueDate)
                if (isPast(date) && !isToday(date)) {
                    overdueItems.push(item)
                }
            }
        }
        return overdueItems;
    }
    

    return { all, today, thisWeek, overdue }
}()

