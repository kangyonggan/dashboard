import Vue from 'vue'
import axios from 'axios'

// 定义全局方法
Vue.prototype.get = get;
Vue.prototype.post = post;
Vue.prototype.yesNo = yesNo;
Vue.prototype.sortChange = sortChange;
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
 * @param form
 */
function getFormParams(form) {
  let params = '';
  if (form) {
    let model = form.model;
    for (let key in model) {
      if (model[key]) {
        if (params === '') {
          params += '?';
        } else {
          params += '&';
        }
        params += key + "=";
        params += model[key];
      }
    }
  }

  return params;
}

/**
 * 排序
 *
 * @param e
 * @param table
 */
function sortChange(e, table) {
  let form = table.form;
  if (form) {
    let model = form.model;
    if (model) {
      if (e.order !== 'normal') {
        model.sort = e.key;
        model.order = e.order;
      } else {
        model.sort = null;
        model.order = null;
      }
    }
    query(table);
  }
}

/**
 * 查询
 *
 * @param table
 */
function query(table) {
  let url = table.url + getFormParams(table.form);
  table.loading = true;
  get(url, function (data) {
    table.pageInfo = data.pageInfo;
    table.loading = false;
  }, function () {
    table.$Message.error('网络错误，请稍后再试!');
    table.loading = false;
  });
}

/**
 * 分页跳转
 *
 * @param pageNum
 * @param table
 */
function jump(pageNum, table) {
  let form = table.form;
  if (form && form.model) {
    form.model.pageNum = pageNum;
  }

  query(table);
}

/**
 * 修改分页大小
 *
 * @param pageSize
 * @param table
 */
function changePageSize(pageSize, table) {
  let form = table.form;
  if (form && form.model) {
    form.model.pageSize = pageSize;
    form.model.pageNum = 1;
  }

  query(table);
}
