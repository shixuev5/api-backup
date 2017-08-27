import fetch from '../../config/fetch';
import config from '../../config';

const Urls = {
  state: {
    baseUrls: [],
    moduleUrls: [],
    serverUrls: [],
  },
  getters: {
    getServerUrls: state => state.serverUrls,
  },
  mutations: {
    SET_BASEURL(state, baseUrls) {
      state.baseUrls = baseUrls;
    },
    SET_MODULEURL(state, moduleUrls) {
      state.moduleUrls = moduleUrls;
    },
    SET_SERVERURL(state, serverUrls) {
      state.serverUrls = serverUrls;
    },
  },
  actions: {
    fetchBaseUrl({ commit }) {
      fetch.get(config.baseUrl).then((response) => {
        commit('SET_BASEURL', response.data);
      });
    },
    fetchModuleUrl({ commit }) {
      fetch.get(config.moduleUrl).then((response) => {
        commit('SET_MODULEURL', response.data);
      });
    },
    fetchServerUrl({ commit }) {
      fetch.get(config.serverUrl).then((response) => {
        commit('SET_SERVERURL', response.data);
      });
    },
    addServerUrl({ commit }, serverUrl) {
      return fetch.post(config.serverUrl, serverUrl);
    },
    updateServerUrl({ commit }, serverUrl) {
      return fetch.post(config.updateServerUrl, serverUrl);
    },
  },
};

export default Urls;
