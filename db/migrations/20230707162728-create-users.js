'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email:{
        type: Sequelize.TEXT,
      },
      createdAt:{
        type: Sequelize.TEXT,
      },
      updatedAt:{
        type: Sequelize.TEXT,
      },
    });

  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');

  }
};
