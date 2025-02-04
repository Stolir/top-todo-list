// imports all files (images/svgs/pngs etc) and maps them to a directory
export function importAll (directory) {
    const directory = require.context(directory, false, /\.(png|jpe?g|svg)$/);
    let images = {};
  directory.keys().map((item) => {
    images[item.replace('./', '')] = directory(item);
  });
  return images;
}