module.exports = {
  development: {
    username: 'root',
    password: 'admin',
    database: 'ecommerce',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'boilerplate_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectModule: 'mysql2',
    logging: null
  },
  production: {
    username: 'root',
    password: 'admin',
    database: 'ecommerce',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql'
  },
};
//production: process.env.DATABASE_URL