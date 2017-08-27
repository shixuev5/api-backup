const db = require('./config');
const Sequelize = require('sequelize');
const MODULE = require('./modules').MODULE;
const SERVERURL = require('./urls').SERVERURL;
const PROJECT = require('./project').PROJECT;

const Methods = db.define('methods', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  method: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  params: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  mock: {
    type: Sequelize.TEXT,
  },
}, {
  freezeTableName: true,
});

Methods.belongsTo(PROJECT);
Methods.belongsTo(SERVERURL);
Methods.belongsTo(MODULE);

function getAllMethod() {
  return Methods.findAll({
    include: [MODULE],
  });
}

function createMethod({ name, method, description, data, params, mock, serverUrlId, moduleId }) {
  return Methods.create({
    name,
    method,
    description,
    data,
    params,
    mock,
    serverUrlId,
    moduleId,
  });
}

// eslint-disable-next-line
function updateMethod({ id, name, method, description, data, params, mock, serverUrlId, moduleId }) {
  return Methods.update({
    name,
    method,
    description,
    data,
    params,
    mock,
    serverUrlId,
    moduleId,
  }, {
    where: {
      id,
    },
  });
}

function deleteMethod({ id }) {
  return Methods.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
  getAllMethod,
  createMethod,
  updateMethod,
  deleteMethod,
};

