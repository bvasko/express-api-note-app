const notes = require('express').Router();
// const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
// const { v4: uuidv4 } = require('uuid');


// notes.get('/',(req, res) => {
//   console.info(`${req.method} request received for tips`);
//   readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
// });

module.exports = notes;