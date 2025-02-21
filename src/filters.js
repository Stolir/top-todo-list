import { importAll, initialLoad } from "./helper";
import { displayCards, sidebar } from "./display";
import { isToday, isThisWeek, isPast } from "date-fns";
import { storeItem, retrieveList, getStoredItem } from "./localStorage";

window.addEventListener("DOMContentLoaded", () => {
    MyList.idCount = getStoredItem("MyListIdCount");
    NoteList.idCount = getStoredItem("NoteListIdCount");
    Task.idCount = getStoredItem("TaskIdCount");
    Note.idCount = getStoredItem("NoteIdCount");
})

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
    static idCount;
    static findListById(id){
        for (let list of myLists) {
            if (list.id === id) {
                console.log(list)
                return list;
            }
        }
    }
    constructor(name, icon, tasks, id) {
        this.name = name;
        this.icon = icon;
        this.tasks = tasks;
        this.id = `ml${id}`;
    }

    removeSelf() {
        const index = myLists.indexOf(this);
        if (index > -1) {
            myLists.splice(index, 1);
            storeItem(myLists, "myLists")
            sidebar.display(defaultFilters, myLists, noteLists)
            displayCards.filters(defaultFilters);
        }
    }

    getItems() {
        return this.tasks;
    }
}

export class NoteList {
    static idCount;
    static findListById(id){
        for (let list of noteLists) {
            if (list.id === id) {
                return list;
            }
        }
    }
    constructor(name, icon, notes, id) {
        this.name = name;
        this.icon = icon;
        this.notes = notes;
        this.id = `nl${id}`;
    }
    
    removeSelf() {
        const index = noteLists.indexOf(this);
        if (index > -1) {
            noteLists.splice(index, 1);
            storeItem(noteLists, "noteLists");
            sidebar.display(defaultFilters, myLists, noteLists)
            displayCards.filters(defaultFilters);
        }
    }

    getItems() {
        return this.notes;
    }
}

export class Task {
    static idCount;
    static icons = {
        "view": assets["eye.svg"], 
        "checkbox": assets["minus-square.svg"], 
        "edit": assets["edit.svg"], 
        "archive": assets["archive.svg"], 
        "delete": assets["trash-2.svg"]
    }
    constructor(title, description, dueDate, priority, status, listId, id){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.listId = listId;
        this.id = `t${id}`;
    }

    removeSelf() {
        const containingList = MyList.findListById(this.listId);
        const index = containingList.tasks.indexOf(this);
        if (index > -1) {
            containingList.tasks.splice(index, 1);
            storeItem(myLists, "myLists")
            displayCards.tasks(containingList.tasks);
        }
    }

    toggleStatus (){
        this.status === "completed" ? this.status = "pending" : this.status = "completed";
    }


}

export class Note {
    static idCount;
    static icons = {
        "view": assets["eye.svg"], 
        "edit": assets["edit.svg"], 
        "archive": assets["archive.svg"], 
        "delete": assets["trash-2.svg"]
    }
    constructor(title, description, listId, id){
        this.title = title;
        this.description = description;
        this.listId = listId; 
        this.id = `n${id}`;
    }

    removeSelf() {
        const containingList = NoteList.findListById(this.listId);
        const index = containingList.notes.indexOf(this);
        if (index > -1) {
            containingList.notes.splice(index, 1);
            storeItem(noteLists, "noteLists")
            displayCards.notes(containingList.notes);
        }
    }
}



export const makeNew = function (){ 

    const myList = (name="Unnamed List", icon=assets["list.svg"], tasks=[], id=`${MyList.idCount}`) => {
        const list = new MyList(name, icon, tasks, id);
        myLists.push(list);
        sidebar.display(defaultFilters, myLists, noteLists);
        displayCards.filters(myLists);
        if (!initialLoad) {
            storeItem(myLists, "myLists")
            MyList.idCount++;
            storeItem(MyList.idCount, "MyListIdCount")
        }
    }

    const noteList = (name="Unnamed List", icon=assets["file-text.svg"], notes=[], id=`${NoteList.idCount}`) => {
        const noteList = new NoteList(name, icon, notes, id);
        noteLists.push(noteList);
        sidebar.display(defaultFilters, myLists, noteLists);
        displayCards.filters(noteLists);
        if (!initialLoad) {
            storeItem(noteLists, "noteLists")
            NoteList.idCount++;
            storeItem(NoteList.idCount, "NoteListIdCount")
        }
    }

    const task = (title, description, dueDate, priority, status, listId, id=`${Task.idCount}`) => {
        const task = new Task(title, description, dueDate, priority, status, listId, id);
        console.log(MyList.findListById(listId))
        MyList.findListById(listId).tasks.unshift(task);
        if (!initialLoad) {
            storeItem(myLists, "myLists")
            Task.idCount++;
            storeItem(Task.idCount, "TaskIdCount")
        }
    }

    const note = (title, description, listId, id=`${Note.idCount}`) => {
        const note = new Note(title, description, listId, id);
        console.log(NoteList.findListById(listId))
        NoteList.findListById(listId).notes.unshift(note);
        if (!initialLoad) {
            storeItem(noteLists, "noteLists")
            Note.idCount++;
            storeItem(Note.idCount, "NoteIdCount")
        }  
    }

    return { myList, noteList, task, note }
}()

export const filterBy = function() {

    const all = (targetList) => {
        const allItems = [];
        for (let list of targetList) {
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

