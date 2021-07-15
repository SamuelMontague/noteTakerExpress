const express = require("espress");
const path = require("path");
const savedNotes = require("./db/db.json");
const fs = require("fs");
const app = espress();
const uniquid = require("uniquid");
const PORT = process.env.PORT || 3306;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(savedNotes));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

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



