const path = require('path');
const Sequelize = require('sequelize');

const db = new Sequelize('main', null, null, {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, './model.db'),
});

// db.sync({
//   force: true,
// });

module.exports = db;
