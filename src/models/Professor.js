const { Model, DataTypes } = require('sequelize');

class Professor extends Model{
    static init(sequelize){
        super.init({
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true,
                    notEmpty: true,
                },
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
        },
        );
    }
}

module.exports = Professor;