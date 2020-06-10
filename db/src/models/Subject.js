const { Model, DataTypes } = require('sequelize');

class Subject extends Model{
    static init(sequelize){
        super.init({
            code_subject: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                }
            },
            code_class: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            code_time: {
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

    static associate(models){
        this.belongsTo(models.Professor, { foreignKey: 'professor_id', as: 'professor' });
        this.belongsToMany(models.Student, { foreignKey: 'subject_id', through: 'subject_students', as: 'students' });
        this.belongsToMany(models.Student, { foreignKey: 'subject_id', through: 'attendance', as: 'studentPresent' });
    }

}

module.exports = Subject;