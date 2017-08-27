const db = require('./config');
const Sequelize = require('sequelize');
const PROJECT = require('./project').PROJECT;

const MODULE = db.define('module', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true,
});

MODULE.belongsTo(PROJECT);

function getAllModule() {
  return MODULE.findAll({
    order: [['parentId', 'DESC']],
  });
}

function createModule({ parentId, name, description }) {
  return MODULE.create({
    parentId,
    name,
    description,
  });
}

module.exports = {
  MODULE,
  getAllModule,
  createModule,
};
