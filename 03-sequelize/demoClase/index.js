const { Sequelize, DataTypes, or } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:PostgresLu*@localhost:5432/democlase', { logging: false });

sequelize.authenticate() // devuelve una promesa
    .then( () => {
        console.log('Conexión exitosa')
    })
    .catch(err => {
        console.log(err)
    });

 const Player = sequelize.define('Player', { // user: tabla
    firstName: {                             // fistName: columna       
        type: DataTypes.STRING,
        allowNull: false        
    },
    lastName: {                              // lastName: columna    
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    skill: {
        type: DataTypes.FLOAT,
        defaultValue: 50.0
    }
 }, { 
    timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'
 });

 const Team = sequelize.define('Team', {
    code: {
        type: DataTypes.STRING(3),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // uniqueOne y uniqueTwo funcionan juntos, sólo son únicos si la combinación de ambos no se repite
    uniqueOne:{
        type: DataTypes.STRING,
        unique: 'coincide'
    },
    uniqueTwo: {
        type: DataTypes.INTEGER,
        unique: 'coincide'
    }
 }, { 
    timestamps: false
 })

sequelize.sync({ force: true })
    .then( async () => {
        console.log('Modelos sincronizados');
        
        const player1 = await Player.create({
           firstName: 'Lucía',
           lastName: 'Meyer',
           age: 35,
           skill: 83
        })

        const player2 = await Player.create({
            firstName: 'Franco',
            lastName: 'Etcheverri',
            age: 27
         })
         
         const team1 = await Team.create({
            code:'RC',
            name: 'Rosario Central',
            uniqueOne: 'R',
            uniqueTwo: 1
         })

        //  player1.age = 36;
        //  await player1.save();

        //  await player2.destroy()

        //  console.log(player1.toJSON())

        // const players = await Player.findAll();
        // console.log(players.map(p => p.toJSON()));

        // const player = await Player.findByPk(2, {
        //     attributes: ['firstName', 'skill']
        // });
        // console.log(player.toJSON());

        const [player, created] = await Player.findOrCreate({
            where: {
                lastName: 'Di María'
            },
            defaults: {
                firstName: 'Angel'
            }
        })
        console.log(created)
        console.log(player.toJSON());
 })