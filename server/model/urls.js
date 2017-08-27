const db = require('./config');
const Sequelize = require('sequelize');
const PROJECT = require('./project').PROJECT;

const BASEURL = db.define('baseUrl', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  baseUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

BASEURL.belongsTo(PROJECT);

function getAllBaseUrl() {
  return BASEURL.findAll();
}

function createBaseUrl(baseUrl) {
  return BASEURL.create({
    baseUrl,
  });
}

function updateBaseUrl({ id, baseUrl }) {
  return BASEURL.update({
    baseUrl,
  }, {
    where: {
      id,
    },
  });
}

const MODULEURL = db.define('moduleUrl', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  moduleUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

MODULEURL.belongsTo(PROJECT);

function getAllModuleUrl() {
  return MODULEURL.findAll();
}

function createModuleUrl(moduleUrl) {
  return MODULEURL.create({
    moduleUrl,
  });
}

function updateModuleUrl({ id, moduleUrl }) {
  return MODULEURL.update({
    moduleUrl,
  }, {
    where: {
      id,
    },
  });
}

const SERVERURL = db.define('serverUrl', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serverUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  moduleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

SERVERURL.belongsTo(PROJECT);
SERVERURL.belongsTo(BASEURL);
SERVERURL.belongsTo(MODULEURL);

function getAllServerUrl() {
  return SERVERURL.findAll({
    include: [BASEURL, MODULEURL],
  });
}

function createServerUrl({ serverUrl, baseUrlId, moduleUrlId, moduleId }) {
  return SERVERURL.create({
    baseUrlId,
    moduleUrlId,
    serverUrl,
    moduleId,
  });
}

function updateServerUrl({ id, serverUrl, baseUrlId, moduleUrlId, moduleId }) {
  return SERVERURL.update({
    baseUrlId,
    moduleUrlId,
    serverUrl,
    moduleId,
  }, {
    where: {
      id,
    },
  });
}

function deleteServerUrl({ serverUrlId }) {
  return SERVERURL.destroy({
    where: {
      id: serverUrlId,
    },
  });
}

module.exports = {
  SERVERURL,
  getAllBaseUrl,
  createBaseUrl,
  updateBaseUrl,
  getAllModuleUrl,
  createModuleUrl,
  updateModuleUrl,
  getAllServerUrl,
  createServerUrl,
  updateServerUrl,
  deleteServerUrl,
};
