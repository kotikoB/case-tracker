const config = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: 'db',
  dialect: 'postgres'
}

module.exports = {
  development: config,
  test: config,
  production: config
}
