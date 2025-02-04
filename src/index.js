import "./styles.css"
import { displayFilterCards } from "./display.js"
import { defaultFilters } from "./filters.js";


window.addEventListener("load", () => {
    displayFilterCards(defaultFilters);
})