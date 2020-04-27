const { Model, DataTypes } = require('sequelize');

class Student extends Model{
    static init(sequelize){
        super.init({
            ra: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true,
                },
            },
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                }
            }
        },
        {
            sequelize,
        },
        );
    }
}

module.exports = Student;