import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // { path: '/tree', component: '@/pages/tree/index' },
    // { path: '/graph', component: '@/pages/graph/index' },
    { path: '/', component: '@/pages/bigScreen/index', title: '智融云链综合数据' },
    {
      path: '/scrollNum', component: '@/pages/ScrollNum/index', title: '数字滚动',
    },
  ],
  fastRefresh: {},
  favicon: 'favicon.ico',
});
