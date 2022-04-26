const { Sequelize } = require('sequelize');
const { setupModels } = require('./models');

const env = process.env;

const sequelize = new Sequelize(`postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@db:5432/${env.POSTGRES_DB}`);

let models;
async function connect() {
    try {
        await sequelize.authenticate();
        console.log('POSTGRES: connection successfull');
        models = setupModels(sequelize);
        await sequelize.sync({ force: false });
        return models;
    } catch (err) {
        throw new Error('POSTGRES: connection not successfull', err);
    }
}

function getModels() {
    return models;
}

module.exports = {
    connect,
    getModels
};
