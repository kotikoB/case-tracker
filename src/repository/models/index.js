const { createUser } = require('./User');
const { createLawyer } = require('./Lawyer');
const { createCase } = require('./Case');
const { createInstitution } = require('./Institution');

function setupModels(sequelize) {
    try {
        const User = createUser(sequelize);
        const Lawyer = createLawyer(sequelize);
        const Case = createCase(sequelize);
        const Institution = createInstitution(sequelize);

        // Associations
        Case.belongsTo(Lawyer);
        Lawyer.belongsTo(Institution);
        User.hasOne(Lawyer);

        return {
            User,
            Lawyer,
            Case,
            Institution
        };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    setupModels
};
