'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const category = JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8'))
   .map(el=>{
    return {
      name : el.category,
      createdAt : new Date(),
      updatedAt : new Date()
    }
   })
   return queryInterface.bulkInsert('Categories', category, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Categories', null, {});
  }
};
