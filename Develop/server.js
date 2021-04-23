const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const app = express() //Command center
const PORT = process.env.PORT || 3000 // Parking space

app.use(express.urlencoded({ extended: true })); // User added query-terms 
app.use(express.json()); // Converting data to JSON, parsing inputted data
app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../Develop/public/notes.html')));
app.get('/api/notes', (req, res) => res.json(db));
// app.get('/api/waitlist', (req, res) => res.json(waitlist));
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      let newNote = req.body;
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (e, d) => {
        res.json(200);
      })
//       fs.writeFile('./db/db.json', JSON.stringify(db), function(err){
//         if (err) {
//             return false;
//         } else {
//             return res.json(true);
//         }
//     });
// });
    })}
); 
// app.post('/api/notes', (req, res) => {
//     const newRes = req.body;
//     console.log(newRes);
//     if (newRes.title > 1 && newRes.text > 1) {
//         db.push(newRes);

//         res.json(true);
//     } else {
//         res.json({err: 'Title or text is too short!'})
//     }
// })

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));