// imports all files (images/svgs/pngs etc) and maps them to a directory
export function importAll (directory) {
    let images = {};
    directory.keys().map((item) => {
    images[item.replace('./', '')] = directory(item);
  });
  return images;
}


// options would be an object of lists
export function populateOptions (targetElm, options){
    let index = 0;
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
  
export let initialLoad = false;
export function toggleInitialLoad(value) { 
  initialLoad === false ? initialLoad = true : initialLoad = false; 
}