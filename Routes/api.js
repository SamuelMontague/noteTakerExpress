const path = require("path");
const fs = require("fs").promises;
const savedNotes = require("../db/db.json");

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(savedNotes));

    app.post('/api/notes', (req, res) => {
        console.log(req.body)
        console.log(uniquid())
        let note = {
            title: req.body.title,
            text: req.body.text,
            id: uniquid()
        }
        console.log(note)
        savedNotes.push(note);
        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), err => {
            if(err){console.log(err)}
            res.json(savedNotes)
        })
    });

    app.delete("/api/notes/:id", (req, res) => {
        const id = req.params.id;
        deleteNote(id).then(data => res.json(data)).catch((err) => console.log(err));

    });

    const getNotes = async () => {
        const file = path.join(__dirname, "../db/db.json")
        const data = await fs.readFile(file);
        const notes = JSON.parse(data);
        return notes;
    };

    const createNote = async note => {
        const totalNotes = await getNotes();
        totalNotes.push(note);
        const file = path.join(__dirname, "../db/db.json" )
        await fs.writeFile(file, JSON.stringify(totalNotes));
        return note;
    }

    const deleteNote = async id => {
        const totalNotes = await retriveNotes();
        const filteredNotes = await totalNotes.filter((note) => id !== note.id);
        const file = path.join(__dirname, "../db/db.json" )
        await fs.writeFile(file, JSON.stringify(filteredNotes));
        return updateNotes = getNotes();

    }

}