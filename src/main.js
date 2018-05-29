// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import FormModal from "@/components/form-modal";

Vue.use(iView);
Vue.config.productionTip = true;

/**
 * 全局组件注册
 */
Vue.component('FormModal', FormModal);

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

/**
 * 全局配置消息体距离顶部的距离，默认为24像素，会被固定的导航条遮挡
 */
app.$Message.config({top: 88});
