const { Model, DataTypes } = require('sequelize');

class SubjectStudents extends Model{
    static init(sequelize){
        super.init({
            subject_id: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true,
                },
            },
            student_id: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize
        },
        );
    }

}

module.exports = SubjectStudents;