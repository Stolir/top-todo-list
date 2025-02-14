import "./styles.css"
import { displayCards, sidebar } from "./display.js"
import { defaultFilters, myLists, noteLists, makeNew } from "./filters.js";
import { showModal } from "./create.js";

const logo = document.querySelector("#logo");
const defaultListsElement = document.querySelector("#default");
const myListsElement = document.querySelector("#my-lists");
const noteListsElement = document.querySelector("#notes");

const newListButton = myListsElement.querySelector("img");
const newNoteListButton = noteListsElement.querySelector("img");

const createNewButton = document.querySelector("#createNew");

window.addEventListener("load", () => {
    displayCards.filters(defaultFilters);
    sidebar.display(defaultFilters, myLists, noteLists);
})

logo.addEventListener("click", () => {
    displayCards.filters(defaultFilters);
});

defaultListsElement.addEventListener("click", () => {
    displayCards.filters(defaultFilters);
});

myListsElement.addEventListener("click", () => {
    displayCards.filters(myLists);
});

noteListsElement.addEventListener("click", () => {
    displayCards.filters(noteLists);
});

newListButton.addEventListener("click", () => {
    showModal.myList();

})

newNoteListButton.addEventListener("click", () => {
    showModal.noteList();
})

createNewButton.addEventListener("click", () => {
    showModal.creationType()
})