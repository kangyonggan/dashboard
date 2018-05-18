import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import SystemUser from '@/pages/system/User'
import SystemRole from '@/pages/system/Role'
import SystemMenu from '@/pages/system/Menu'
import UserInfo from '@/pages/user/Info'

Vue.use(Router);

// 全部路由，及所属角色
const allRoutes = [
  {
    path: '/system/user',
    name: 'SystemUser',
    component: SystemUser
  },
  {
    path: '/system/role',
    name: 'SystemRole',
    component: SystemRole
  },
  {
    path: '/system/menu',
    name: 'SystemMenu',
    component: SystemMenu
  },
  {
    path: '/user/info',
    name: 'UserInfo',
    component: UserInfo
  }
];

// 创建路由
const router = new Router();

// 从服务器获取用户的菜单，动态加载对应的路由
get("dashboard/menus", function (data) {
  const userRoutes = [];
  userRoutes.push({
    path: '/',
    name: 'Index',
    component: Index
  });

  loadUserRoute(data.list, userRoutes);

  userRoutes.push({
    path: '*',
    name: 'NotFound',
    component: NotFound
  });
  router.addRoutes(userRoutes);
});

router.beforeEach((to, from, next) => {
  // 更新标题、面包屑、菜单状态
  updateState('/' + window.location.hash);
  next();
});

export default router;

/**
 * 加载用户路由
 *
 * @param list
 * @param userRoutes
 */
function loadUserRoute(list, userRoutes) {
  for (var i in list) {
    const menu = list[i];
    if (menu.leaf.length > 0) {
      loadUserRoute(menu.leaf, userRoutes);
    } else {
      const route = findRoute('/' + menu.url);
      if (route) {
        userRoutes.push(route);
      }
    }
  }
}

/**
 * 根据url查找路由
 *
 * @param url
 */
function findRoute(url) {
  for (var i in allRoutes) {
    if (allRoutes[i].path === url) {
      return allRoutes[i];
    }
  }

  return null;
}

Vue.prototype.get = get;

/**
 * get请求
 *
 * @param url
 */
function get(url, callback) {
  url = process.env.API_ROOT + url;
  if (process.env.NODE_ENV === 'development') {
    url += ".json";
  }
  axios.get(url).then(res => {
    if (res.status === 200) {
      if (res.data.respCo === '0000') {
        if (callback) {
          callback(res.data);
        }
      } else {
        Message.error(res.data.respMsg);
      }
    } else {
      Message.error("网络异常，请稍后重试！");
    }
  }).catch(error => {
    Message.error(error);
  });
};


