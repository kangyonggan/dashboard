import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'

Vue.use(Router);

// 全部路由
const allRoutes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
];

// 创建路由
const router = new Router();
router.addRoutes(allRoutes);
export default router;


