const cardContainer = document.querySelector("#main");
const sidebar = document.querySelectorAll("#sidebar > div")


 export function displayFilterCards(filters){
    cardContainer.textContent = "";
    
    for (let filter of filters) {
        const card = document.createElement("div");
        card.classList.add("list-card");
        if (filter.icon){
            const icon = document.createElement("img");
            icon.src = filter.icon;
            card.appendChild(icon);
        }

        card.appendChild(document.createTextNode(filter.name));
    
        cardContainer.appendChild(card)
    }
 } 

 export function displaySidebar(defaultLists, ...OtherLists){
    
    for (let list of defaultLists) {
        const div = document.createElement("div");

        const icon = document.createElement("img");
        icon.src = list.icon;
        div.appendChild(icon);

        div.appendChild(document.createTextNode(list.name));

        sidebar[0].appendChild(div);
    }

    let index = 1;

    for (let lists of OtherLists) {
        for(let list of lists) {
            const div = document.createElement("div")

            const icon = document.createElement("img");
            icon.src = list.icon;
            div.appendChild(icon);

            div.appendChild(document.createTextNode(list.name));
            sidebar[index].append(div)
        }
        index++;
    }
 }