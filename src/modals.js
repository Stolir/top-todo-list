import { makeNew } from "./filters";
import { populateOptions } from "./helper";
import { myLists, noteLists } from "./filters";
import { displayCards } from "./display";

const editMode = {
  active: false, 
  currentTarget: undefined,
  parentList: undefined,

  resetToDefault() {
    this.active = false;
    this.currentTarget = undefined;
    this.parentList = undefined;
  },

  setValues(active, target, parentList) {
    this.active = active;
    this.currentTarget = target;
    this.parentList = parentList;
  }
}

  const viewTaskModal = document.querySelector("#view-task");
  const viewNoteModal = document.querySelector("#view-note");

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
        displayCards.tasks(editMode.parentList.tasks)
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
        displayCards.notes(editMode.parentList.notes)
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
  
    const viewTask = (title, description, priority, dueDate) => {
      viewTaskModal.querySelector(".title").textContent = title;
      viewTaskModal.querySelector(".description").textContent = description;
      viewTaskModal.querySelector(".priority").textContent = priority;
      viewTaskModal.querySelector(".priority").classList.add(priority);
      viewTaskModal.querySelector(".date").textContent = `Due: ${dueDate}`
      viewTaskModal.showModal();
    } 

    const viewNote = () => {
      viewNoteModal.showModal();
    }

    return { myList, noteList, creationType, createTask, createNote, viewTask, viewNote }
  }()

  export const edit = function() {
    const task = (task, list) => {
      createTaskModal.querySelector("#taskTitle").value = task.title;
      createTaskModal.querySelector("#priority").value = task.priority;
      createTaskModal.querySelector("#description").value = task.description;
      createTaskModal.querySelector("#dueDate").value = task.dueDate;
      // createTaskModal.querySelector("#myLists").value = ???; current list
      editMode.setValues(true, task, list)
      showModal.createTask();
    }
    
    const note = (note, list) => {
      createNoteModal.querySelector("#noteTitle").value = note.title;
      createNoteModal.querySelector("#description").value = note.description;
      editMode.setValues(true, note, list)
      showModal.createNote();
    }

    return { task, note }
  }()