import { makeNew } from "./filters";
import { populateOptions } from "./helper";
import { myLists, noteLists } from "./filters";

const editMode = {
  active: false, 
  currentTarget: undefined,
  resetToDefault() {
    this.active = false;
    this.currentTarget = undefined;
  }
}

  const createMyListModal = document.querySelector("#createMyList");
  const createMyListForm = createMyListModal.querySelector("form");
  createMyListForm.addEventListener("submit", (e) => {
    if (e.submitter.formMethod !== "dialog") {
      console.log(e.submitter)
      e.preventDefault();
  
      makeNew.myList(createMyListForm.querySelector("#listName").value);
      createMyListModal.close();
      createMyListForm.reset()
    }
  })
  
  const createNoteListModal = document.querySelector("#createNoteList");
  const createNoteListForm = createNoteListModal.querySelector("form");
  createNoteListForm.addEventListener("submit", (e) => {
    if (e.submitter.formMethod !== "dialog") {
      console.log(e.submitter)
      e.preventDefault();
  
      makeNew.noteList(createNoteListForm.querySelector("#listName").value);
      createNoteListModal.close();
      createNoteListForm.reset()
    }
  })
  

  const createTaskModal = document.querySelector("#createTask");
  const myListSelect = createTaskModal.querySelector("#myLists");
  const createTaskForm = createTaskModal.querySelector("form");
  createTaskForm.addEventListener("submit", (e) => {
    if (e.submitter.formMethod !== "dialog") {
      e.preventDefault();
      
      const formData = new FormData(createTaskForm);
      console.log(Number(formData.get("taskLists")))
      makeNew.task(
        formData.get("taskTitle"),
        formData.get("description"),
        formData.get("dueDate"),
        formData.get("priority"),
        "pending",
        myLists[Number(formData.get("myLists"))].id
      );

      if (editMode.active) {
        editMode.currentTarget.removeSelf()
      }
    }
    editMode.resetToDefault();
    createTaskModal.close()
    createTaskForm.reset()
  })
  
  
  
  const createNoteModal = document.querySelector("#createNote");
  const noteListSelect = createNoteModal.querySelector("#noteLists");
  const createNoteForm = createNoteModal.querySelector("form");
  createNoteForm.addEventListener("submit", (e) => {
    if (e.submitter.formMethod !== "dialog") {
      e.preventDefault();
  
      const formData = new FormData(createNoteForm);
      console.log(Number(formData.get("noteLists")))
      makeNew.note(
        formData.get("noteTitle"),
        formData.get("description"),
        noteLists[Number(formData.get("noteLists"))].id
      );
  
      if (editMode.active) {
        editMode.currentTarget.removeSelf()
      }
    }
    editMode.resetToDefault()
    createNoteModal.close();
    createNoteForm.reset();
  })
  
  // modal that prompts whether the use to choose "task" or "note" to then view the corresponding creation modal
  const creationTypeModal = document.querySelector("#creationType");
  const creationTypeForm = creationTypeModal.querySelector("form");
  creationTypeForm.addEventListener("submit", (e) => {
    if (e.submitter.formMethod !== "dialog") {
      e.preventDefault();
      
      if (e.submitter.id === "task") {
        showModal.createTask();
        
      }
      else {
        showModal.createNote()
        

      }
      creationTypeModal.close()
    }
  })

  export const showModal = function (){
  
  // handle creating lists
     const myList = () => {
      createMyListModal.showModal();
     }
  
     const noteList = () => {
      createNoteListModal.showModal();
     }
  
  // handle creating tasks/notes
    const creationType = () => {
      creationTypeModal.showModal()
    }
  
    const createTask = () => {
      createTaskModal.showModal()
      populateOptions(myListSelect, myLists)
    }
  
    const createNote = () => {
      createNoteModal.showModal()
      populateOptions(noteListSelect, noteLists)
    }
  
    return { myList, noteList, creationType, createTask, createNote }
  }()

  export const edit = function() {
    const task = (task) => {
      createTaskModal.querySelector("#taskTitle").value = task.title;
      createTaskModal.querySelector("#priority").value = task.priority;
      createTaskModal.querySelector("#description").value = task.description;
      createTaskModal.querySelector("#dueDate").value = task.dueDate;
      // createTaskModal.querySelector("#myLists").value = ???; current list
      editMode.active = true;
      editMode.currentTarget = task;
      showModal.createTask();
    }
    
    const note = (note) => {

    }

    return { task, note }
  }()