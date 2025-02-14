import { Task, Note } from "./filters";

const cardContainer = document.querySelector("#main");
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
        const card = makeCard.task(note);
        cardContainer.appendChild(card);
    }
 } 

 return { filters, tasks, notes }
}()

export const sidebar = function (){

    const display = (defaultLists, ...OtherLists) => {
        clean()
        for (let list of defaultLists) {
            const div = document.createElement("div");
    
            const icon = document.createElement("img");
            icon.src = list.icon;
            div.appendChild(icon);
    
            div.appendChild(document.createTextNode(list.name));
    
            sidebarElement[0].appendChild(div);
        }
    
        let index = 1;
    
        for (let lists of OtherLists) {
            for(let list of lists) {
                const div = document.createElement("div")
    
                const icon = document.createElement("img");
                icon.src = list.icon;
                div.appendChild(icon);
    
                div.appendChild(document.createTextNode(list.name));
                sidebarElement[index].append(div)
            }
            index++;
        }
     }
    
     const clean = () => {
        for (let list of sidebarElement) {
            while (list.children.length > 1) {
                list.removeChild(list.lastChild);
            }
        }
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
        priority.classList.add(`priority ${task.priority}`);
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
            button.setAttribute(type, "button");

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
            button.setAttribute(type, "button");

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