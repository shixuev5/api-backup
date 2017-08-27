/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import Methods from './modules/methods';
import Urls from './modules/urls';
import Setting from './modules/setting';
import Project from './modules/project';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Methods,
    Urls,
    Setting,
    Project,
  },
});

export default store;
