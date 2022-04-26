const { DataTypes } = require('sequelize');

function createInstitution(sequelize) {
    const Institution = sequelize.define('Institution', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        contactPersonName: DataTypes.STRING,
        contactPersonEmail: DataTypes.STRING,
        contactPersonMobileNo: DataTypes.STRING
    });

    return Institution;
}

module.exports = { createInstitution };
