import Vue from 'vue'
import axios from 'axios'

// 定义全局方法
Vue.prototype.get = get;
Vue.prototype.post = post;
Vue.prototype.yesNo = yesNo;
Vue.prototype.reset = reset;
Vue.prototype.query = query;
Vue.prototype.jump = jump;
Vue.prototype.changePageSize = changePageSize;

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
    dealResponse(res, success, failure);
  }).catch(error => {
    if (failure) {
      failure();
    }
  });
}

/**
 * post请求
 *
 * @param url
 * @param data
 * @param success
 * @param failure
 */
function post(url, data, success, failure) {
  url = process.env.API_ROOT + url;
  let params = new FormData();
  for (let key in data) {
    if (key) {
      params.append(key, data[key]);
    }
  }

  axios.post(url, params).then(res => {
    dealResponse(res, success, failure);
  }).catch(error => {
    if (failure) {
      failure();
    }
  });
}

/**
 * 处理响应
 *
 * @param res
 * @param success
 * @param failure
 */
function dealResponse(res, success, failure) {
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
}

/**
 * 1/0格式化为是/否
 *
 * @param h
 * @param params
 */
function yesNo(h, params) {
  return h('div', [
    h('span', 1 === params.row.isDeleted * 1 ? "是" : "否")
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
  for (let key in params) {
    if (params[key]) {
      if (ps === '') {
        ps += '?';
      } else {
        ps += '&';
      }
      ps += key + "=";
      ps += params[key];
    }
  }

  return ps;
}

/**
 * 查询
 *
 * @param form
 */
function query(form) {
  let url = window.location.hash.substring(2) + getQueryParams(form.model);
  get(url, function (data) {
    form.$parent.pageInfo = data.pageInfo;
  }, function () {
    form.$Message.error('网络错误，请稍后再试!');
  });
}

/**
 * 分页跳转
 *
 * @param pageNum
 * @param form
 */
function jump(pageNum, form) {
  if (form && form.model) {
    form.model.pageNum = pageNum;
  }

  query(form);
}

/**
 * 修改分页大小
 *
 * @param pageSize
 * @param form
 */
function changePageSize(pageSize, form) {
  if (form && form.model) {
    form.model.pageSize = pageSize;
    form.model.pageNum = 1;
  }

  query(form);
}
