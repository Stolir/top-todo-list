import { MyList, NoteList, Task, Note, filterBy } from "./filters";
import { assets } from "./filters";
import { noteLists, myLists } from "./filters";
import { edit } from "./modals";
import { showModal } from "./modals";

const cardContainer = document.querySelector("#main");

// testing purposes remove later
cardContainer.addEventListener("click", (e) => {
    if (e.target.closest("button")) {
        const button = e.target.closest("button");
        const parentCard = button.parentElement.parentElement;
        switch (true){ 
            case (button.classList.contains("delete")):
                if (parentCard.classList.contains("task-card")) {
                    removeElement.card(myLists, parentCard)
                }
                else if (parentCard.classList.contains("note-card")) {
                    removeElement.card(noteLists, parentCard)
                }
                break;

            case (button.classList.contains("edit")):
                if (parentCard.classList.contains("task-card")) {
                    editElement.task(myLists, parentCard)
                }
                else if (parentCard.classList.contains("note-card")) {
                    editElement.note(noteLists, parentCard)
              }
                break;
            case (button.classList.contains("checkbox")):
                if (parentCard.classList.contains("task-card")) {
                    toggleCheckbox(myLists, parentCard)
                }
                break;
            case (button.classList.contains("archive")):
                alert("This feature is unavailable")
                break;
            case (button.classList.contains("view")):
                if (parentCard.classList.contains("task-card")) {
                    viewElement.task(myLists, parentCard)
                }
                else if (parentCard.classList.contains("note-card")) {
                    showModal.viewNote();
              }

        }
    }
    else if (e.target.closest("div")){
        const card = e.target.closest("div");
        switch (card.id) {
            case ("all"):
                displayDefaultList.all();
                break;
            case ("today"):
                displayDefaultList.today();
                break;
            case ("this-week"):
                displayDefaultList.thisWeek();
                break;
            case ("overdue"):
                displayDefaultList.overdue();
                break;
            case ("archived"):
                alert("This feature is unavailable")
                break;
    }
}
    // switch (true) {
    //     case (button.classList.contains("delete")):

    // }
})
const sidebarContainer = document.querySelector("#sidebar");
sidebarContainer.addEventListener("click", (e) => {
    console.log(e.target.id)
    switch (e.target.id) {
        case ("all"):
            displayDefaultList.all();
            break;
        case ("today"):
            displayDefaultList.today();
            break;
        case ("this-week"):
            displayDefaultList.thisWeek();
            break;
        case ("overdue"):
            displayDefaultList.overdue();
            break;
        case ("archived"):
            alert("This feature is unavailable")
            break;
    }
})

const sidebarElement = document.querySelectorAll("#sidebar > div")


export const displayCards = function(){
  const filters = (filterList, type) => {
    cardContainer.textContent = "";
    
    for (let filter of filterList) {
        const card = makeCard.list(filter, type);
    
        cardContainer.appendChild(card)
    }
 } 

 const tasks = (taskList) => {
    cardContainer.textContent = "";

    for (let task of taskList) {
        const card = makeCard.task(task);
        cardContainer.appendChild(card);
    }
 }

 const notes = (noteList) => {
    cardContainer.textContent = "";

    for (let note of noteList) {
        const card = makeCard.note(note);
        cardContainer.appendChild(card);
    }
 } 

 return { filters, tasks, notes }
}()


export const sidebar = function (){

    const display = (defaultLists, myLists, noteLists) => {
        clean()
        for (let list of defaultLists) {
            const div = document.createElement("div");
    
            const icon = document.createElement("img");
            icon.src = list.icon;
            div.appendChild(icon);
    
            div.appendChild(document.createTextNode(list.name));
            div.setAttribute("id", (list.name).replace(/\s+/g, '-').toLowerCase())
            
    
            sidebarElement[0].appendChild(div);
        }

        for (let list of myLists) {
            const div = makeElement(list)

            div.addEventListener("click", () => {
                displayCards.tasks(list.getItems());
            })

            sidebarElement[1].append(div)
        }

        for (let list of noteLists) {
            const div = makeElement(list)

            div.addEventListener("click", () => {
                displayCards.notes(list.getItems());
            })

            sidebarElement[2].append(div)
        }
    }
    
     const clean = () => {
        for (let list of sidebarElement) {
            while (list.children.length > 1) {
                list.removeChild(list.lastChild);
            }
        }
     }
 
     const makeElement = (list) => {
        const div = document.createElement("div")

        const deleteButton = document.createElement("button");
        deleteButton.classList.add(`delete`);
        deleteButton.setAttribute("type", "button");

        const deleteIcon = document.createElement("img");
        deleteIcon.setAttribute("width", "20");
        deleteIcon.setAttribute("height", "20");
        deleteIcon.src = assets["trash-2.svg"];
        
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener("click", (e) => {
            if (e.target.closest("button")) {
                const button = e.target.closest("button");
                if (e.target.closest("button").classList.contains("delete")) {
                    list.removeSelf(list, button.parentElement);
                }
                e.stopPropagation();
            }
        })
    
        const icon = document.createElement("img");
        icon.src = list.icon;

        div.appendChild(icon);
        div.appendChild(document.createTextNode(list.name));
        div.appendChild(deleteButton)

        return div
     }

    return { display }
}()

const makeCard = function (){
    const list = (filter, type) => {
        const card = document.createElement("div");
        if (filter.getItems) {
            card.addEventListener("click", () => {
                if (type === "task") {
                    displayCards.tasks(filter.getItems());
                }
                else if (type === "note") {
                    displayCards.notes(filter.getItems()); 
                }
            })
        }
        else {
            card.id = (filter.name).replace(/\s+/g, '-').toLowerCase();
        }
        card.classList.add("list-card");
        if (filter.icon){
            const icon = document.createElement("img");
            icon.src = filter.icon;
            card.appendChild(icon);
        }

        card.appendChild(document.createTextNode(filter.name));
        return card;
    } 

    const task = (task) => {
        const card = document.createElement("div");
        card.classList.add("task-card");
        card.id = task.id;

        const title = document.createElement("h1");
        title.textContent = task.title;
        title.classList.add("title")
        card.appendChild(title);
        
        const priority = document.createElement("div");
        priority.textContent = task.priority;
        priority.setAttribute("class", `priority ${task.priority}`);
        card.appendChild(priority);

        const description = document.createElement("p");
        description.textContent = task.description;
        card.appendChild(description);

        const dueDate = document.createElement("div");
        dueDate.textContent = `Due: ${task.dueDate}`;
        dueDate.classList.add("date");
        card.appendChild(dueDate);

        const controls = document.createElement("div");
        controls.classList.add("controls");

        for (let icon in Task.icons) {


            const button = document.createElement("button");
            button.classList.add(`${icon}`);
            button.setAttribute("type", "button");

            const img = document.createElement("img");
            img.setAttribute("width", "20");
            img.setAttribute("height", "20");
            console.log(`icon = ${icon} \n Task.icon = ${Task.icons["checkbox"]}`)
            if (icon === "checkbox") {
                if (task.status === "completed") {
                    img.src = assets["check-square.svg"]
                    card.classList.add("completed")
                }
                else {
                    img.src = Task.icons[icon]
                }
            }
            else {
                img.src = Task.icons[icon];
            }

            
            button.appendChild(img);

            controls.appendChild(button);
        }

        card.appendChild(controls);
        return card;
    }

    const note = (note) => {
        const card = document.createElement("div");
        card.classList.add("note-card");
        card.id = note.id;

        const title = document.createElement("h1");
        title.textContent = note.title;
        title.classList.add("title")
        card.appendChild(title);

        const description = document.createElement("p");
        description.textContent = note.description;
        card.appendChild(description);


        const controls = document.createElement("div");
        controls.classList.add("controls");

        for (let icon in Note.icons) {

            const button = document.createElement("button");
            button.classList.add(`${icon}`);
            button.setAttribute("type", "button");

            const img = document.createElement("img");
            img.setAttribute("width", "20");
            img.setAttribute("height", "20");
            img.src = Note.icons[icon];
            
            button.appendChild(img);

            controls.appendChild(button);
        }

        card.appendChild(controls)
        return card;
    }

    return { list, task, note }
}()



export const displayDefaultList = function() {

    const all = () => {
        const tasks = filterBy.all(myLists);
        displayCards.tasks(tasks)
    }

    const today = () => {
        const tasks = filterBy.today();
        displayCards.tasks(tasks)
    }

    const thisWeek = () => {
        const tasks = filterBy.thisWeek();
        displayCards.tasks(tasks)
    }

    const overdue = () => {
        const tasks = filterBy.overdue();
        displayCards.tasks(tasks)
    }

    const archived = () => {

    }

    return { all, today, thisWeek, overdue }
}()

const removeElement = function () {
    const list = (list) => {
        list.removeSelf();
    }

    const card = (cardList, card) => {
        const allTasks = filterBy.all(cardList);
        for (let task of allTasks) {
            if (task.id === card.id) {
                task.removeSelf()
                card.remove()
            }
        }
    } 

    return { list, card }
}()

const editElement = function() {

    const task = (cardList, card) => {
        const allTasks = filterBy.all(cardList);
        for (let task of allTasks) {
            if (task.id === card.id) {
                const list = MyList.findListById(task.listId)
                edit.task(task, list)
            }
        }
    }
    const note = (cardList, card) => {
        const allNotes = filterBy.all(cardList);
        for (let note of allNotes) {
            if (note.id === card.id) {
                const list = NoteList.findListById(note.listId)
                edit.note(note, list)
            }
        }
    }

    return { task, note }
}()

function toggleCheckbox(cardList, card){
    const allTasks = filterBy.all(cardList);
        for (let task of allTasks) {
            if (task.id === card.id) {
                task.toggleStatus();
                const list = MyList.findListById(task.listId)
                displayCards.tasks(list.tasks)
                break;
            }
        }
}

const viewElement = function (){

    const task = (cardList, card) => {
        const task = findItemByElement(cardList, card);
        showModal.viewTask(task.title, task.description, task.priority, task.dueDate)
    }

    return {task, note}
}()

function findItemByElement(cardList, card) {
    const allItems = filterBy.all(cardList);
    for (let item of allItems) {
        if (item.id === card.id) {
            return item;
        }
    }
}