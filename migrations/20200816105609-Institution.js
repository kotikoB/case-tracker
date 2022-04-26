module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Institutions', 'contactPersonName', Sequelize.STRING)
    await queryInterface.addColumn('Institutions', 'contactPersonMobileNo', Sequelize.STRING)
    await queryInterface.addColumn('Institutions', 'contactPersonEmail', Sequelize.STRING)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Institutions', 'contactPersonName')
    await queryInterface.removeColumn('Institutions', 'contactPersonMobileNo')
    await queryInterface.removeColumn('Institutions', 'contactPersonEmail')
  }
};
