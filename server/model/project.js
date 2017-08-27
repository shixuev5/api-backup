const db = require('./config');
const Sequelize = require('sequelize');

const PROJECT = db.define('project', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

function getAllProject() {
  return PROJECT.findAll();
}

function createProject({ name, description }) {
  return PROJECT.create({
    name,
    description,
  });
}

function updateProject({ id, name, description }) {
  return PROJECT.update({
    name,
    description,
  }, {
    where: {
      id,
    },
  });
}

module.exports = {
  PROJECT,
  getAllProject,
  createProject,
  updateProject,
};
