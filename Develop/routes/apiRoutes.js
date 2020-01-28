const router = require("express").Router();
const store = require("../db/store.js");

router.get("/notes", function (req, res) {
    console.log('apiR get /notes called')
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
});

router.post("/notes", function (req, res) {
    console.log('apiR post /notes called')
    store
        .saveNote(req.body)
        .then(note => res.json(note))
        .catch(err => res.status(500).json(err))
})

router.delete("/notes/:id", function (req, res) {
    store
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
});

module.exports = router;