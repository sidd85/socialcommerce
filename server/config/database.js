module.exports = {
development: {
username: 'root',
password: 'R00tr00t',
database: 'ecommerce',
host: 'http://server.soccofresh.com/',//'127.0.0.1',
port: 4080,//'3307',
dialect: 'mysql'
},
test: {
username: 'root',
password: 'R00tr00t',
database: 'boilerplate_test',
host: '127.0.0.1',
dialect: 'mysql',
dialectModule: 'mysql2',
logging: null
},
production: {
username: 'root',
password: 'R00tr00t',
database: 'ecommerce',
host: 'http://server.soccofresh.com/',//'127.0.0.1',
port: 4080,//'3307',
dialect: 'mysql'
},
};

//production: process.env.DATABASE_URL