// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
var dbNotes = require('./db/db.json');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


// ROUTES GET METHOD

// //Route to index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//Route to notes.html file
app.get('/notes', (req, res) => {
   
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//Route to db file to create a new note
app.get('/api/notes', (req, res) => {
    res.json(dbNotes);
});

//Route to Html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//POST METHOD
app.post('/api/notes', (req, res) => {
    console.log("DATABASE ARRAY WE PUSHIN TO", dbNotes);

    const newEntry = req.body;
    req.body.id = nanoid();

    console.log(newEntry);
    console.log(newEntry.id);

    // PUSH newEntry to dbNotes
    dbNotes.push(newEntry);
    console.log(dbNotes);

    res.json(dbNotes);
});

// DELETE NOTES WITH DELETE METHOD

app.delete('/api/notes/:id', (req, res) => {

    console.log("ARRAY TO DELETE FROM", dbNotes)
    console.log("params.id", req.params.id)

    const deletedNotes = dbNotes.find(dbNotes => dbNotes.id === req.params.id)
    console.log("DELETED notes", deletedNotes)

    dbNotes = dbNotes.filter(dbNotes => dbNotes.id !== req.params.id)

    res.json(deletedNotes);
});





app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));







