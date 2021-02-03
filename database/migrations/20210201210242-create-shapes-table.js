"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("shapes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
        }
      },
      shape: {
        type: Sequelize.ENUM("RECTANGLE", "SQUARE", "CIRCLE", "TRIANGLE"),
        allowNull: false
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("shapes");
  }
};
