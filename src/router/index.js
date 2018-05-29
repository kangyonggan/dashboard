import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import User from '@/views/system/user/index'
import Role from '@/views/system/role/index'
import Menu from '@/views/system/menu/index'
import Info from '@/views/user/Info'
import NotFound from '@/views/NotFound'

Vue.use(Router);

// 全部路由
const allRoutes = [
  {
    path: '/',
    name: 'Index',
    meta: {title: '首页'},
    component: Index
  },
  {
    path: '/system/user',
    name: 'User',
    meta: {title: '用户管理'},
    component: User
  },
  {
    path: '/system/role',
    name: 'Role',
    meta: {title: '角色管理'},
    component: Role
  },
  {
    path: '/system/menu',
    name: 'Menu',
    meta: {title: '菜单管理'},
    component: Menu
  },
  {
    path: '/user/info',
    name: 'Info',
    meta: {title: '个人信息'},
    component: Info
  },
  {
    path: '*',
    name: '404',
    meta: {title: '404'},
    component: NotFound
  }
];

// 创建路由
const router = new Router();
router.addRoutes(allRoutes);

router.beforeEach((to, from, next) => {
  // 更新title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});

export default router;

