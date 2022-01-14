const express = require('express');
const path = require('path');
const {readFromFile, readAndAppend} = require('./helpers/fsUtils.js');
// Helper method for generating unique ids
const {v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  console.info(`API ${req.method} request received for notes`);
  readFromFile('./db/db.json', 'utf8').then(data => {
    const parsedData = JSON.parse(data);
    res.json(parsedData);
    res.end();
  });
});

app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;
  const newNote = { title, text, id: uuidv4() }
  readAndAppend(newNote, './db/db.json');
  readFromFile('./db/db.json', 'utf8').then(data => {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
      res.end();
    });
});

app.delete('/api/notes/:id', (req, res) => {
  readFromFile('./db/db.json', 'utf8').then(data => {
    const parsedData = JSON.parse(data);
    res.json(parsedData);
    res.end();
  });
});

app.all('*', (req, res) =>{
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

module.exports = app;