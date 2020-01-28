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

    saveNote(newNote) {
        newNote.id = this.lastId + 1;
        this.lastId = newNote.id;
        return this.getNotes()
            .then(notes => {
                const newNoteList = [...notes, newNote];
                console.log(newNoteList);
                return this.write(newNoteList);
            })
            .then(() => {
                return this.getNotes();
            })
    }


    deleteNote(id) {
        return this.getNotes()
            .then(notes => {
                for (var i = 1; i < notes.length; i++) {
                    if (notes[i].id == id) {
                        notes.splice(i, 1)
                        break;
                    }
                }
                this.write(notes)
            }
            )
    }
}



module.exports = new Store();