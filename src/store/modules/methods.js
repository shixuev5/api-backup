import fetch from '../../config/fetch';
import config from '../../config';
import { createMethodTree } from '../../utils';

const Methods = {
  state: {
    methods: [],
  },
  getters: {
    methodTree: (state, getters) => {
      const moduleTree = JSON.parse(JSON.stringify(getters.moduleTree));
      return createMethodTree(moduleTree, state.methods);
    },
    methods: state => state.methods,
  },
  mutations: {
    SET_METHODS(state, method) {
      state.methods = method;
    },
  },
  actions: {
    fetchMethod({ commit }) {
      return fetch.get(config.method).then((response) => {
        response.data.forEach((val) => {
          val.data = JSON.parse(val.data);
          val.params = JSON.parse(val.params);
        });
        commit('SET_METHODS', response.data);
      });
    },
    addMethod({ commit, dispatch }, { url, ...method }) {
      url.moduleId = method.moduleId;
      return dispatch('addServerUrl', url).then((response) => {
        method.serverUrlId = response.data.id;
        return fetch.post(config.addMethod, method).then(() => {
          dispatch('fetchServerUrl');
          dispatch('fetchMethod');
        });
      });
    },
    updateMethod({ commit, dispatch }, { url, ...method }) {
      url.moduleId = method.moduleId;
      return dispatch('updateServerUrl', url).then(() => fetch.post(config.updateMethod, method)
      .then(() => {
        dispatch('fetchServerUrl');
        dispatch('fetchMethod');
      }));
    },
    deleteMethod({ dispatch }, method) {
      return fetch.post(config.deleteMethod, method).then(() => {
        dispatch('fetchServerUrl');
        dispatch('fetchMethod');
      });
    },
  },
};

export default Methods;
