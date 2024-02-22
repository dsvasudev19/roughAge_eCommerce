'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mediable_id: {
        type: Sequelize.INTEGER
      },
      mediable_type: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.TEXT
      },
      name: {
        type: Sequelize.TEXT
      },
      file_name: {
        type: Sequelize.TEXT
      },
      file_type: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      file_size: {
        type: Sequelize.INTEGER
      },
      featured: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Media');
  }
};