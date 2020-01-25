const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    constructor() {
        this.lastId = 0;
    }

    read() {
        return readFileAsync("./db.json", "utf8");
    }

    write(note) {
        return writeFileAsync("./db.json", JSON.stringify(note));
    }

    getNotes() {

    }

    addNote(note) {

    }

    removeNote(id) {

    }
}

module.exports = new Store();