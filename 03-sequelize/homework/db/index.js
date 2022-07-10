const { Sequelize, Op } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize('postgres://postgres:PostgresLu*@localhost:5432/henry_sequelize', {
  logging: false,
});

// db.authenticate()
//   .then ( () => {
//     console.log('conexión exitosa')
//   })
//   .catch(err => {
//     console.log(err)
//   });


modelCharacter(db);
modelAbility(db);
modelRole(db);

module.exports = {
  ...db.models,
  db,
  Op
}