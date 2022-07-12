const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      validate: {
        functValidate (value) {
          if(value.toLowerCase() === 'henry') {
            throw new Error('Error')
          }
        }
      }
      // allowNull: false --> al ser PK por defecto no es null
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notIn: [[ "Henry", "SoyHenry", "Soy Henry" ]]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      get() {
        const value = this.getDataValue('age')
        return value ? value + ' years old' : null;
      }
    },
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: 'Other'
    },
    hp: {
      type: DataTypes.FLOAT, // numero con decimales
      allowNull: false
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  }, { 
    timestamps: false
 })
}