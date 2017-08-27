import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import Project from '@/components/Project';
import Layout from '@/components/Layout';
import ViewApi from '@/components/ViewApi';
import EditApi from '@/components/EditApi';
import AddApi from '@/components/AddApi';
import ReadMe from '@/components/ReadMe';
import Download from '@/components/Download';
import ApiConfig from '@/components/ApiConfig';
import store from '../store';


Vue.use(Router);

const routes = [{
  path: '/',
  name: '首页',
  component: Layout,
  children: [{
    path: '',
    name: '选择项目',
    component: Project,
  },
  {
    path: 'viewapi',
    name: 'Api查看',
    component: ViewApi,
  },
  {
    path: 'addapi',
    name: 'Api新增',
    component: AddApi,
  },
  {
    path: 'editapi',
    name: 'Api编辑',
    component: EditApi,
  },
  {
    path: 'download',
    name: '打包下载',
    component: Download,
  },
  {
    path: 'readme',
    name: '说明文档',
    component: ReadMe,
  },
  {
    path: 'apiconfig',
    name: '系统配置',
    component: ApiConfig,
  },
  ],
}];

// 路由配置
const routerConfig = {
  // mode: 'history',
  routes,
  scrollBehavior: () => ({
    y: 0,
  }),
};

const router = new Router(routerConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
  if (store.getters.projectId.length) {
    // eslint-disable-next-line
    if (to.path = '/') {
      next('/viewapi');
    } else {
      next();
    }
  } else {
    next('/');
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
});

export default router;
