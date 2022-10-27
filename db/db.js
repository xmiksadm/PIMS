'use strict'

const pgp = require('pg-promise')(/* options */)
// const db = pgp('postgres://postgres:postgres@localhost:5432/postgres')
const db = pgp('postgres://postgres:postgres@localhost:5433/postgres')

exports.db = db