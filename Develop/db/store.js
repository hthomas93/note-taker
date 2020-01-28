const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    constructor() {
        this.lastId = 0;
        var file = fs.readFileSync('./db.json', { encoding: 'utf8' });
        if (file.length > 0) {
            var existingNotes = JSON.parse(file);
            for (let i = 0; i < existingNotes.length; i++) {
                const note = existingNotes[i];
                if (this.lastId < note.id) {
                    this.lastId = note.id;
                }
            }
        }
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

    }

    saveNote(note) {
        note.id = this.lastId + 1
        this.lastId = note.id

        return this.read()
            .then(note => {
                let parseNotes = [].concat(JSON.parse(notes))

                parseNotes.push(note)
                console.log(parseNotes)
                this.write(parseNotes)
                return note;
            })
    }

    deleteNote(id) {
        return this.read()
            .then(notes => {

                notes = [].concat(JSON.parse(notes))
                for (let i = 0; i < notes.length; i++) {
                    const note = notes[i];
                    if (note.id === id) {
                        notes.splice(i, 1)
                        break;
                    }
                }
                this.write(notes)
            })

    }
}


module.exports = new Store();