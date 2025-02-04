import "./styles.css"
import { displayFilterCards, displaySidebar } from "./display.js"
import { defaultFilters, myLists, noteLists } from "./filters.js";


window.addEventListener("load", () => {
    displayFilterCards(defaultFilters);
    displaySidebar(defaultFilters ,myLists, noteLists);
})