// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

// 注册是/否过滤器
Vue.filter('YesNo', function (value) {
  return value === 1 ? "是" : "否";
});

// 注册日期时间过滤器
Vue.filter('DateTime', function (value) {
  let date = new Date();
  date.setTime(value);
  return date.format('yyyy-MM-dd HH:mm:ss');
});

// 注册日期过滤器
Vue.filter('Date', function (value) {
  let date = new Date();
  date.setTime(value);
  return date.format('yyyy-MM-dd');
});

// 注册时间过滤器
Vue.filter('Time', function (value) {
  let date = new Date();
  date.setTime(value);
  return date.format('HH:mm:ss');
});
