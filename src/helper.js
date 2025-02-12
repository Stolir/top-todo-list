import { makeNew } from "./filters";

// imports all files (images/svgs/pngs etc) and maps them to a directory
export function importAll (directory) {
    let images = {};
    directory.keys().map((item) => {
    images[item.replace('./', '')] = directory(item);
  });
  return images;
}

// options would be an object of lists
function populateOptions (targetElm, options){
  const index = 0;
  targetElm.textContent = '';
  for (let option of options) {
    const optionElm = document.createElement("option");
    optionElm.setAttribute("value", `${index}`);
    optionElm.setAttribute("id", `${option.name}`);
    optionElm.textContent = `${option.name}`;
    targetElm.appendChild(optionElm);
    index++;
  }
}

const createListModal = document.querySelector("#createList");

// modal that prompts whether the use to choose "task" or "note" to then view the corresponding creation modal
const creationTypeModal = document.querySelector("#creationType");

const createTaskModal = document.querySelector("#createTask");
const myListSelect = createTaskModal.querySelector("#myLists");

const createNoteModal = document.querySelector("#createNote");
const noteListSelect = createNoteModal.querySelector("#noteLists");

export const showModal = function (){

// handle creating lists
   const createList = (createFunction) => {
    createListModal.showModal();
    const form = createListModal.querySelector("form");
    form.addEventListener("submit", (e) => {
      if (e.submitter.formMethod !== "dialog") {
        e.preventDefault();
  
        createFunction(form.querySelector("#listName").value);
        createListModal.close();
        form.reset()
      }
  
    }, {once: true})
  }

// handle creating tasks/notes
  const creationType = (myLists, noteLists) => {
    creationTypeModal.showModal()
    const form = creationTypeModal.querySelector("form");
    form.addEventListener("submit", (e) => {
      if (e.submitter.formMethod !== "dialog") {
        e.preventDefault();
        
        if (e.submitter.id === "task") {
          createTask(myListSelect ,myLists);
        }
        else {
          createNote(noteListSelect ,noteLists)
        }
  
      }
    })
  }

  const createTask = (selectElm, list) => {
    populateOptions(selectElm, list);
    createTaskModal.showModal()
    const form = createTaskModal.querySelector("form");
    form.addEventListener("submit", (e) => {
      if (e.submitter.formMethod !== "dialog") {
        e.preventDefault();
        
        const formData = new FormData(form);

        makeNew.task(
          formData.get("taskTitle"),
          formData.get("description"),
          formData.get("dueDate"),
          formData.get("priority"),
          "pending",
          formData.get("myLists")
        );

      }
    })

  }

  const createNote = (selectElm, list) => {
    populateOptions(selectElm, list);
    createNoteModal.showModal()
    const form = createNoteModal.querySelector("form");
    form.addEventListener("submit", (e) => {
      if (e.submitter.formMethod !== "dialog") {
        e.preventDefault();
        
        const formData = new FormData(form);

        makeNew.note(
          formData.get("taskTitle"),
          formData.get("description"),
          formData.get("noteLists")
        );

      }
    })
  }

  return { createList, creationType }
}()