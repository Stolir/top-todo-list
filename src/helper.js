// imports all files (images/svgs/pngs etc) and maps them to a directory
export function importAll (directory) {
    let images = {};
    directory.keys().map((item) => {
    images[item.replace('./', '')] = directory(item);
  });
  return images;
}



const createListModal = document.querySelector("#createList");
const creationTypeModal = document.querySelector("#creationType");
const createTaskModal = document.querySelector("#createTask");
const createNoteModal = document.querySelector("#createNote");


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
  const creationType = () => {
    creationTypeModal.showModal()
    const form = creationTypeModal.querySelector("form");
    form.addEventListener("submit", (e) => {
      if (e.submitter.formMethod !== "dialog") {
        e.preventDefault();
        
        if (e.submitter.id === "task") {
          createTask(form);
        }
        else {
          createNote(form)
        }
  
      }
    })
  }

  const createTask = () => {
    createTaskModal.showModal()

  }

  const createNote = () => {
    createNoteModal.showModal()
  }

  return { createList, creationType }
}()