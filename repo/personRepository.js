'use strict';

const Person = require('../json/person');
var db = require('../db/db.js');

class PersonRepository {

    persons = [];

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
        // console.log(query)
        // db.db.query(query)
        // .then(result => {     
          
        //     console.log("result " + result[0].first_name);
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
        .then(result => {
            console.log("Deleted person with name: " + this.getById(id).first_name);
            this.setPersonList();
        }).catch(err => {
            console.log(err);
            return "Error: Can't delete person with name: " + this.getById(id).first_name;
        })
        // return "Deleted person with name: " + this.getById(id).first_name;
        // this.persons.delete(this.persons.get(id))
        // const keys = Array.from(this.persons.keys());
        // this.persons.delete(keys[keys.length - 1]);
    }

    save(person) {
        
        if (person.hasOwnProperty('id') && this.getById(person.id).id !== undefined) {
            this.persons[person.id] = person;

            var update = "UPDATE users SET first_name = '"+person.first_name+"', last_name = '"+person.last_name+"', email = '"+person.email+"' WHERE id = '"+ person.id +"'";
            db.db.query(update)
            .then(result => {
                // console.log("result = " + result)
                this.setPersonList();
            }).catch(err => {
                console.log(err);
                return "Error: Can't update person with name: " + person.first_name;
            })

            return "Updated Person with name: " + person.first_name;
        }
        else {
            // var values = new Person(undefined, person.first_name, person.last_name, person.email)
            var insert = "INSERT INTO users (first_name, last_name, email) VALUES ('"+person.first_name+"','"+person.last_name+"','"+person.email+"')";
            db.db.query(insert)
            .then(result => {
                // console.log("result = " + result)
                this.setPersonList();
            }).catch(err => {
                console.log(err);
                return "Error: Can't add person with name: " + person.first_name;
            })
            // this.persons.push(new Person(person.id, person.first_name, person.last_name, person.email))
            return "Added Person with name: " + person.first_name;
        }
    }
}

const personRepository = new PersonRepository();

module.exports = personRepository;