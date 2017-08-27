import fetch from '../../config/fetch';
import config from '../../config';
import { createModuleTree } from '../../utils';

const Setting = {
  state: {
    module: [],
  },
  getters: {
    moduleTree: state => createModuleTree(JSON.parse(JSON.stringify(state.module))),
    module: state => state.module,
  },
  mutations: {
    SET_MODULE(state, module) {
      state.module = module;
    },
  },
  actions: {
    fetchModule({ commit }) {
      fetch(config.module).then((response) => {
        commit('SET_MODULE', response.data);
      });
    },
  },
};

export default Setting;
