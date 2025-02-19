import { makeNew } from "./filters";
import { toggleInitialLoad } from "./helper";

export function storeList(list, key){

    localStorage.setItem(key, JSON.stringify(list));
}

export function retrieveLists() {
    toggleInitialLoad();

    const myLists = JSON.parse(localStorage.getItem("myLists"))
    const noteLists = JSON.parse(localStorage.getItem("noteLists"))

    if (myLists) {
        for (let list of myLists) {
            makeNew.myList(list.name, list.icon);
            (list.tasks).forEach(task => {
                makeNew.task(
                    task.title, 
                    task.description, 
                    task.dueDate,
                    task.priority,
                    task.status,
                    task.listIndex,
                    task.id
                )
            });
        }
    }

    if (noteLists) {
        for (let list of noteLists) {
            makeNew.noteList(list.name, list.icon);
            (list.notes).forEach(note => {
                makeNew.note(
                    note.title, 
                    note.description, 
                    note.listIndex,
                    note.id
                )
            });
        }
    }
    toggleInitialLoad();
} 

