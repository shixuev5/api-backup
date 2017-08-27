import Vue from 'vue';
import iView from 'iview';
import { Tree, Input } from 'element-ui';
import 'highlight.js/styles/solarized-light.css';
import 'iview/dist/styles/iview.css';
import './style/style.less';
import App from './App';
import router from './router';
import store from './store';


Vue.use(iView);
Vue.use(Tree);
Vue.use(Input);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
