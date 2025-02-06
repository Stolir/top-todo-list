import "./styles.css"
import { displayFilterCards, displaySidebar } from "./display.js"
import { defaultFilters, myLists, noteLists, makeList, makeNoteList } from "./filters.js";
import { showCreateListModal } from "./helper";


const logo = document.querySelector("#logo");
const myListsElement = document.querySelector("#my-lists");
const noteListsElement = document.querySelector("#notes");

const newListButton = myListsElement.querySelector("img")
const newNoteListButton = noteListsElement.querySelector("img")

window.addEventListener("load", () => {
    displayFilterCards(defaultFilters);
    displaySidebar(defaultFilters ,myLists, noteLists);
})

logo.addEventListener("click", () => {
    displayFilterCards(defaultFilters)
});

myListsElement.addEventListener("click", () => {
    displayFilterCards(myLists)
});

noteListsElement.addEventListener("click", () => {
    displayFilterCards(noteLists);
});

newListButton.addEventListener("click", () => {
    showCreateListModal(makeList);

})

newNoteListButton.addEventListener("click", () => {
    showCreateListModal(makeNoteList)
})