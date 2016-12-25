var Sequelize = require('sequelize');

sequelize = new Sequelize ('butkus', 'postgres', 'd1anaross', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
