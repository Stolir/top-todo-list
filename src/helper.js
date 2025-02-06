// imports all files (images/svgs/pngs etc) and maps them to a directory
export function importAll (directory) {
    let images = {};
    directory.keys().map((item) => {
    images[item.replace('./', '')] = directory(item);
  });
  return images;
}

const createListModal = document.querySelector("#createList");

export function showCreateListModal(createFunction) {
  console.log("running")
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