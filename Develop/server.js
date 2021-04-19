const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const app = express() //Command center
const PORT = process.env.PORT || 3000 // Parking space

app.use(express.urlencoded({ extended: true })); // User added query-terms 
app.use(express.json()); // Converting data to JSON, parsing inputted data
app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../Develop/public/notes.html')));
app.get('/api/notes', (req, res) => res.json(db));
// app.get('/api/waitlist', (req, res) => res.json(waitlist));

app.post('/api/notes', (req, res) => {
    const newRes = req.body;
    console.log(newRes);
    if (newRes.title > 1 && newRes.text > 1) {
        db.push(newRes);
        fs.writeFile('./db/db.json', JSON.stringify(db), function(err){
            if (err) {
                return false;
            } else {
                return res.json(true);
            }
        })
        res.json(true);
    } else {
        res.json({err: 'Title or text is too short!'})
    }
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));