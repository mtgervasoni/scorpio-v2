"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "TUsers",
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "demo@demo.com"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TUsers", null, {});
  }
};
