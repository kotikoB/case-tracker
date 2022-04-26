const { DataTypes, Sequelize } = require('sequelize');

function createLawyer(sequelize) {
    const Lawyer = sequelize.define('Lawyer', {
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
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            unique: true,
            allowNull: false
        },
        idNo: {
            type: DataTypes.INTEGER,
            unique: true
        },
        managingPartnerNo: {
            type: DataTypes.STRING
        }
    });

    return Lawyer;
}

module.exports = {
    createLawyer
};
