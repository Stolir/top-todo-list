const cardContainer = document.querySelector("#main");

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