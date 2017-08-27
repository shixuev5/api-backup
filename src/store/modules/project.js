import fetch from '../../config/fetch';
import config from '../../config';

const Project = {
  state: {
    project: [],
    projectId: [],
  },
  getters: {
    project: state => state.project,
    projectId: state => state.projectId,
  },
  mutations: {
    SET_PROJECT(state, project) {
      state.project = project;
    },
    SET_PROJECT_ID(state, projectId) {
      state.projectId = projectId;
    },
  },
  actions: {
    fetchProject({ commit }) {
      return fetch.get(config.project).then((response) => {
        commit('SET_PROJECT', response.data);
      });
    },
    addProject({ dispatch }, project) {
      return fetch.post(config.project, project).then(() => {
        dispatch('fetchProject');
      });
    },
    updateProject({ dispatch }, project) {
      return fetch.post(config.updateProject, project).then(() => {
        dispatch('fetchProject');
      });
    },
  },
};

export default Project;
