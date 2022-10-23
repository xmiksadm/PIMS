'use strict';
var express = require('express');
var Router = express.Router();

const path = require('path');
var app = module.exports = express();
app.set('view engine','ejs'); 
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Parser to set `req.body`
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const personRepo = require('../repo/personRepository');

Router
  .get('/get/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const result = personRepo.getById(id);
        res.render('editPerson', {
            user: result,
            title: "Person"
        });
  })
  .get('/all', (req, res) => {
        const result = personRepo.getAll();
        res.render('personList', {
            users: result,
            title: "List"
        });
  })
  .get('/addPerson', (req, res) => {
      res.render('addPerson', {
          title: "Add"
      });
})
  .get('/remove/:id', (req, res) => {
        const id = parseInt(req.params.id);
        personRepo.remove(id);
        res.redirect('/person/all');
  })
  .post('/save', urlencodedParser, (req, res) => {
      const person = req.body;
      console.log("Form values: " + JSON.stringify(person));
      try {
        personRepo.save(person);
        res.redirect('/person/all');
      } catch (error) {
        res.status(500).json({ message: 'server error' });
      }
  });

module.exports = Router;