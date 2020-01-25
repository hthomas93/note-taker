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
        return this.read()
            .then(notes => {
                let parseNotes;

                try {
                    // .concat combines strings together
                    parseNotes = [].concat(JSON.parse(notes));
                }
                catch (err) {
                    parseNotes = [];
                }
                return parseNotes;
            })


        // take the notes from db.json
        // turn it into a JSON object
        // add the note to the parseNotes array
        // return the array

    }

    addNote(note) {
        let note = note;

        console.log(note);

        this.getNotes()
            .then(note => {
                parseNotes.push(note)
            })



        // take the written note
        // prepend it to the db.json file


    }

    removeNote(id) {
        // return

    }
}

module.exports = new Store();