'use strict';

const Person = require('../json/person');
var db = require('../db/db.js');

class PersonRepository {

    // persons = [];

    constructor() {
        this.setPersonList();
    }

    setPersonList() {
        this.persons = [];
        db.db.query('SELECT * FROM users;')
            .then(result => {
                result.forEach(user => {
                    // console.log(user)
                    this.persons.push(new Person(user.id, user.first_name, user.last_name, user.email))
                });
            }).catch(err => {
                console.log(err);
                return [];
            })
    }

    getById(id) {
        // var query = 'SELECT * FROM users WHERE id='+id;
        // db.db.query(query)
        // .then(result => {     
          
        //     console.log("json " + JSON.stringify(result[0]));
        //     return result[0];
        // }).catch(err => {
        //     console.log(err);
        //     // return "";
        // })

        var item = this.persons.find(item => item.id == id) || {};
        return item;
    }

    getAll() {
        return Array.from(this.persons.values());
    }

    remove(id) {
        var query = "DELETE FROM users WHERE id = '" + id + "'";
        db.db.query(query)
        .then(() => {
            console.log("Deleted person with name: " + this.getById(id).first_name);
            this.setPersonList();
        }).catch(err => {
            console.log(err);
            return "Error: Can't delete person with name: " + this.getById(id).first_name;
        }) 
    }

    save(person) {

        // EDIT
        if (Object.hasOwnProperty.bind(person)('id') && this.getById(person.id) !== undefined) {
            var update = "UPDATE users SET first_name = '"+person.first_name+"', last_name = '"+person.last_name+"', email = '"+person.email+"' WHERE id = '"+ person.id +"'";
            db.db.query(update)
            .then(() => {
                console.log("Updated Person with name: " + person.first_name)
                this.setPersonList();
            }).catch(err => {
                console.log(err);
                return "Error: Can't update person with name: " + person.first_name;
            })
        }
        // INSERT NEW
        else {
            var insert = "INSERT INTO users (first_name, last_name, email) VALUES ('"+person.first_name+"','"+person.last_name+"','"+person.email+"')";
            db.db.query(insert)
            .then(() => {
                console.log("Added Person with name: " + person.first_name)
                this.setPersonList();
            }).catch(err => {
                console.log(err);
                console.log("Error: Can't add person with name: " + person.first_name);
                return "Error: Can't add person with name: " + person.first_name;
            })
        }
    }
}

const personRepository = new PersonRepository();

module.exports = personRepository;