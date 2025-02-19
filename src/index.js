import "./styles.css"
import { displayCards, sidebar, displayDefaultList, defaultFiltersElements } from "./display.js"
import { defaultFilters, myLists, noteLists, makeNew } from "./filters.js";
import { showModal } from "./modals.js";
import { retrieveLists } from "./localStorage.js";

const logo = document.querySelector("#logo");
const defaultListsElement = document.querySelector("#default-lists");
const myListsElement = document.querySelector("#my-lists");
const noteListsElement = document.querySelector("#notes");

const newListButton = myListsElement.querySelector("img");
const newNoteListButton = noteListsElement.querySelector("img");

const createNewButton = document.querySelector("#createNew");

window.addEventListener("DOMContentLoaded", () => {
    displayCards.filters(defaultFilters);
    sidebar.display(defaultFilters, myLists, noteLists);
    retrieveLists()
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

