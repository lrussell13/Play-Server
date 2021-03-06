const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const apps = require('./play-data.js');

app.get('/apps', (req, res) => {
    const { genre, sort} = req.query;

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be one of rating or app');
        }
      } 

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
          return res
            .status(400)
            .send('Sort must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
        }
      } 
    
    let results = apps;

    if(genre){
        results = apps
        .filter(app=> 
            app
                .Genres
                .toLowerCase()
                .includes(genre.toLowerCase()));
    } 

    if(sort) {
        results.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        }); 
    } 

    res
        .json(results)
});

module.exports = app;

