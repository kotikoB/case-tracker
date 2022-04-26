const { DataTypes, Sequelize } = require('sequelize');

function createUser(sequelize) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'Basic'
        }
    });

    return User;
}

module.exports = {
    createUser
};
