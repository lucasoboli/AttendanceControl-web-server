const { Model, DataTypes } = require('sequelize');

class Student extends Model{
    static init(sequelize){
        super.init({
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                }
            },
            phone: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                }
            },
        },
        {
            sequelize,
        },
        );
    }

    static associate(models){
        this.belongsToMany(models.Subject, { foreignKey: 'student_id', through: 'subject_students', as: 'subjects' });
        this.belongsToMany(models.Subject, { foreignKey: 'student_id', through: 'attendance', as: 'attendanceSubject' });
    }

}

module.exports = Student;