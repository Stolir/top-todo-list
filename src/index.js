import "./styles.css"
import { displayFilterCards, displaySidebar } from "./display.js"
import { defaultFilters, myLists, noteLists } from "./filters.js";

const logo = document.querySelector("#logo");
const myListsElement = document.querySelector("#my-lists");
const noteListsElement = document.querySelector("#notes");

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