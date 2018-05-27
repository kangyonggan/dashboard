import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import Index from '@/views/Index'
import User from '@/views/system/User'
import Role from '@/views/system/Role'
import Menu from '@/views/system/Menu'
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

// 定义全局方法
Vue.prototype.get = get;
Vue.prototype.yesNo = yesNo;
Vue.prototype.reset = reset;
Vue.prototype.getQueryParams = getQueryParams;

/**
 * get请求
 *
 * @param url
 * @param success
 * @param failure
 */
function get(url, success, failure) {
  url = process.env.API_ROOT + url;

  axios.get(url).then(res => {
    if (res.status === 200) {
      if (res.data.respCo === '0000') {
        if (success) {
          success(res.data);
        }
      } else {
        if (failure) {
          failure();
        }
      }
    } else {
      if (failure) {
        failure();
      }
    }
  }).catch(error => {
    if (failure) {
      failure();
    }
  });
}

/**
 * 1/0格式化为是/否
 *
 * @param h
 * @param params
 */
function yesNo(h, params) {
  return h('div', [
    h('span', '1' === params.row.isDeleted ? "是" : "否")
  ])
}

/**
 * 表单重置
 *
 * @param form
 */
function reset(form) {
  form.resetFields();
}

/**
 * 拼接查询表单的请求参数
 *
 * @param params
 */
function getQueryParams(params) {
  let ps = '';
  for (let key in this.params) {
    if (this.params[key]) {
      if (ps === '') {
        ps += '?';
      } else {
        ps += '&';
      }
      ps += key + "=";
      ps += this.params[key];
    }
  }

  return ps;
}

