const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:PostgresLu*@localhost:5432/democlase', { logging: false });

sequelize.authenticate() // devuelve una promesa
    .then( () => {
        console.log('Conexión exitosa');
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
        defaultValue: 50.0,
        // get() {
        //     return this.getDataValue('skill') + ' points';
        // },
        validate: {
          isEven(value) {
            if (parseInt(value) % 2 !== 0) {
                throw new Error('Only even vaues are allowed!')
            }
          }  
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('password', (this.firstName + this.lastName + value).split('').sort(() => 0.5 - Math.random()).join(''));
        }
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.firstName + ' ' + this.lastName;
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
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

Team.belongsToMany(Player, { through: 'Team_Player'});
Player.belongsToMany(Team, { through: 'Team_Player'});


sequelize.sync({ force: true })
    .then( async () => {
        console.log('Modelos sincronizados');
        
        const player1 = await Player.create({
           firstName: 'Lucía',
           lastName: 'Meyer',
           age: 35,
           skill: 82,
           password: 12345
        })

        const player2 = await Player.create({
            firstName: 'Franco',
            lastName: 'Etcheverri',
            age: 35
         })

        const player3 = await Player.create({
            firstName: 'Rodrigo',
            lastName: 'Etcheverri',
            age:25,
            skill: 98,
            email: 'hola@mail.com'
        });

        const player4 = await Player.create({
            firstName: 'Julian',
            lastName: 'Alvarez'
        });

        const player5 = await Player.create({
            firstName: 'Angel',
            lastName: 'Di María'
        });           

         const team1 = await Team.create({
            code:'RC',
            name: 'Rosario Central',
            uniqueOne: 'R',
            uniqueTwo: 1
         });

         const team2 = await Team.create({
            code:'NOB',
            name: 'Nievels',
            uniqueOne: 'N',
            uniqueTwo: 1
         });

        await player1.setTeams(['RC', 'NOB']); // en la tabla intermedia relaciono al jugador 1 con 2 equipos
        await team1.addPlayers([3, 4]); // en la tabla intermedia relaciono al team1 con 2 jugadores
        
        const teamRC = await Team.findByPk('RC', {
            include: Player
        });
        console.log(teamRC.toJSON()); // esta búsqueda me trae al equipo {} y un [] de jugadores asociados a ese equipo
        

        //  await team1.setPlayers([player1, player2]); // puedo pasarle il id también [1,2]

        //  player2.setTeam('RC');
        //  player3.setTeam(team2);
         
        //  const teamPlayer2 = await player2.getTeam(); // pregunto en qué equipo está el jugador 2
        //  console.log(teamPlayer2.toJSON());

        //  player5.createTeam({
        //     code:'OTR',
        //     name: 'Otro Equipo',
        //     uniqueOne: 'O',
        //     uniqueTwo: 1
        //  }) // crea un equipo nuevo y se lo asigna al jugador 5


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

        // const [player, created] = await Player.findOrCreate({
        //     where: {
        //         lastName: 'Di María'
        //     },
        //     defaults: {
        //         firstName: 'Angel'
        //     }
        // })
        // console.log(created)
        // console.log(player.toJSON());

        // const player = await Player.findOne({
        //     where: {
        //         lastName: 'Etcheverri',
        //         age: 27
        //     }
        // })

        // await Player.destroy({
        //     truncate: true
        // });

        // const players = await Player.findAll(); 
        // console.log(players.map(p => p.toJSON()));
 })