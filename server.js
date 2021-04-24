const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const app = express() //Command center
const PORT = process.env.PORT || 3000 // Parking space
const uuid = require('uuid-random');

app.use(express.urlencoded({ extended: true })); // User added query-terms 
app.use(express.json()); // Converting data to JSON, parsing inputted data
app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));



//Write inputs to database of objects
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        let newNote = req.body;
        newNote.id = uuid();
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes),"utf-8", (e, d) => {
            return res.json(newNote);
        })
        
    });
});

// Get data from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        console.log(JSON.parse(data));
        res.json(JSON.parse(data));
    });
});

// Delete button
app.delete("/api/notes/:id", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(error, data) {
      let noteId = req.params.id;
      let noteData = JSON.parse(data);
      noteData = noteData.filter(function(note) {
          if (noteId != note.id) {
            return true;
          } else {
            return false;
          };
      }); 
      fs.writeFile("./db/db.json", JSON.stringify(noteData), function(error){
        if (error)
        throw error;
        res.end(console.log("Deleted Successfully"));
      })
    });

  });

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));