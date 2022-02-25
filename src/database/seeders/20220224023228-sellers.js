'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert(
      "Sellers",
      [
        {
          name : "José de Oliveira",
          email: "j_oliveira@mail.com",
          password: "123",
        },
        {
          name : "Maria Carla",
          email: "mcarla@mail.com",
          password: "123",
        },
        {
          name : "Felipe Candido",
          email: "felipe@mail.com",
          password: "123",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Sellers",null,{});
  },
};
