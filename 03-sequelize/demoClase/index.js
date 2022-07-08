const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:PostgresLu*@localhost:5432/democlase');

sequelize.authenticate() // devuelve una promesa
    .then( () => {
        console.log('conexión exitosa')
    })
    .catch(err => {
        console.log(err)
    });

 const User = sequelize.define('User', { // user: tabla
    firstName: {                         // fistName: columna       
        type: DataTypes.STRING
    },
    lastName: {                          // lastName: columna    
        type: DataTypes.STRING
    }
 });

User.sync()
 .then( () => {
    console.log('User sincronizado')
 })