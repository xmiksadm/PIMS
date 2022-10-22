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
app.use(require('body-parser').json());
//app.use(urlencoded({extended: false}));
//app.use(bodyParser.json());
//var jsonParser = bodyParser.json();
const personRepo = require('../repo/personRepository');

Router
  .get('/get/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const result = personRepo.getById(id);
        res.render('editPerson', {
            user: result,
            title: "EJS example"
        });
  })
  .get('/all', (req, res) => {
        const result = personRepo.getAll();
        res.render('personList', {
            users: result,
            title: "EJS example"
        });
  })
  .get('/addPerson', (req, res) => {
      //const result = personRepo.getAll();
      res.render('addPerson', {
          title: "EJS example"
      });
})
  .get('/remove/:id', (req, res) => {
        const id = parseInt(req.params.id);
        personRepo.remove(id);
        res.redirect(307, '/person/all');
        // const result = 'Last person remove. Total count: ' + personRepo.persons.size;
        // res.send(result);
  })
  .post('/save', (req, res) => {
      console.log('this ran');
      //   res.status(200).json({ message: 'ok' });
      const person = req.body;
      console.log(person);
      const result = personRepo.save(person);
      res.send(result);
      res.redirect(307, '/person/all')
      //console.log(JSON.stringify(req.body));
      /*res.send(JSON.stringify(req.body));*/
        /*const person = req.body;
        const result = personRepo.save(person);
        res.send(result);*/
       // res.redirect(307, '/person/all');
  });

module.exports = Router;