import { makeNew } from "./filters";
import { toggleInitialLoad } from "./helper";

export function storeItem(item, key){

    localStorage.setItem(key, JSON.stringify(item));
}

export function getStoredItem (key) {
    const item = localStorage.getItem(key)
    if (item) {
        return Number(item);
    }
    else {
        return 0;
    }
    
}

export function retrieveLists() {
    toggleInitialLoad();

    const myLists = JSON.parse(localStorage.getItem("myLists"))
    const noteLists = JSON.parse(localStorage.getItem("noteLists"))

    if (myLists) {
        for (let list of myLists) {
            makeNew.myList(list.name, list.icon, [], (list.id).replace(/\D/g,''));
            (list.tasks).forEach(task => {
                makeNew.task(
                    task.title, 
                    task.description, 
                    task.dueDate,
                    task.priority,
                    task.status,
                    task.listId,
                    (task.id).replace(/\D/g,'')
                )
            });
        }
    }

    if (noteLists) {
        for (let list of noteLists) {
            makeNew.noteList(list.name, list.icon, [], (list.id).replace(/\D/g,''));
            (list.notes).forEach(note => {
                makeNew.note(
                    note.title, 
                    note.description, 
                    note.listId,
                    (note.id).replace(/\D/g,'')
                )
            });
        }
    }
    toggleInitialLoad();
} 

