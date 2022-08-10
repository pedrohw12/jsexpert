"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("arguments", Array.prototype.slice.call(arguments)); // its not a good practice to use arguments
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

// watch(__filename, async(event, filename)=> {
//   console.log((await readFile(filename)).toString());
// })

const file = new File();
// in this way, it ignores the 'this' from the class 'File' and
// inherit 'this' from the 'watch'
// watch(__filename, file.watch);

// alternative to not inherit the 'this' from the 'watch' function
// but its not the best way to code it
watch(__filename, (event, filename) => file.watch(event, filename));

// we can explicit which context the function should follow
// .bind substitute the 'this' from the 'watch' function and returns the 'this' from the 'file' class
watch(__filename, file.watch.bind(file));

file.watch.call(
  { showContent: () => console.log("call: hey sinon!") },
  null,
  __filename
);

file.watch.apply({ showContent: () => console.log("call: hey sinon!") }, [
  null,
  __filename,
]);
