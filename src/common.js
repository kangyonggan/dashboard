import Vue from 'vue'
import axios from 'axios'

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
