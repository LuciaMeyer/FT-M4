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

const { Character, Ability, Role} = db.models;


// Character -1-----*- Ability 
Character.hasMany(Ability);
Ability.belongsTo(Character);

// Character -*-----*- Role --> Character_Role
Character.belongsToMany(Role, { through: 'Character_Role' });
Role.belongsToMany(Character, { through: 'Character_Role' })

module.exports = {
  ...db.models,
  db,
  Op
}