const bcrypt = require('bcrypt');
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
        super.beforeCreate(
            function (user) {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        )
    }

    static isPassword(encodedPassword, password){
        return	bcrypt.compareSync(password, encodedPassword);
    }
}

module.exports = Professor;