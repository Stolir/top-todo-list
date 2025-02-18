import { Task, Note, filterBy } from "./filters";

const cardContainer = document.querySelector("#main");

// testing purposes remove later
cardContainer.addEventListener("click", (e) => {
    console.log(e.target.parentElement.parentElement)
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
            displayDefaultList.archived();
            break;
    }
})

const sidebarElement = document.querySelectorAll("#sidebar > div")


export const displayCards = function(){
  const filters = (filterList) => {
    cardContainer.textContent = "";
    
    for (let filter of filterList) {
        const card = makeCard.list(filter);
    
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

export const defaultFiltersElements = [];

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
            
            defaultFiltersElements.push(div);
            // console.log(defaultFiltersElements)
    
            sidebarElement[0].appendChild(div);
        }
        displayDefaultList.updateElements(defaultFiltersElements);

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
        defaultFiltersElements.length = 0;
     }
 
     const makeElement = (list) => {
        const div = document.createElement("div")
    
        const icon = document.createElement("img");
        icon.src = list.icon;
        div.appendChild(icon);

        div.appendChild(document.createTextNode(list.name));
        return div
     }

    return { display }
}()

const makeCard = function (){
    const list = (filter) => {
        const card = document.createElement("div");
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
            img.src = Task.icons[icon];
            
            button.appendChild(img);

            controls.appendChild(button);
        }

        card.appendChild(controls);
        return card;
    }

    const note = (note) => {
        const card = document.createElement("div");
        card.classList.add("task-card");

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


const todayList = document.querySelector("#today")
const thisWeekList = document.querySelector("#this-week")
const overdueList = document.querySelector("#overdue")
const archivedList = document.querySelector("#archived")

export const displayDefaultList = function() {

    const updateElements = (elementsList) => {
        const allList = elementsList.find(element => element.id === "all")
        allList.addEventListener("click", () => {
            all();
        })

        const todayList = elementsList.find(element => element.id === "today")
        todayList.addEventListener("click", () => {
            today();
        })

        const thisWeekList = elementsList.find(element => element.id === "this-week")
        thisWeekList.addEventListener("click", () => {
            thisWeek();
        })

        const overdueList = elementsList.find(element => element.id === "overdue")
        overdueList.addEventListener("click", () => {
            overdue();
        })

        const archivedList = elementsList.find(element => element.id === "archived")
        archivedList.addEventListener("click", () => {
            archived();
        })
    }

    const all = () => {
        const tasks = filterBy.all();
        displayCards.tasks(tasks)
    }

    return { updateElements, all }
}()

