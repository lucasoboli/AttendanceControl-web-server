'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subjects', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code_subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code_class: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      professor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'professors', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',        
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subjects');
  }
};