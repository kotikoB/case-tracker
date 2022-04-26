const { DataTypes, Sequelize } = require('sequelize');

function createCase(sequelize) {
    const Case = sequelize.define('Case', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        idNo: {
            type: DataTypes.INTEGER,
            unique: true
        },
        occupation: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        stage: {
            type: DataTypes.STRING
        }
    });

    return Case;
}

module.exports = {
    createCase
};
