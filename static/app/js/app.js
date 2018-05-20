/**
 * 日期时间格式化
 *
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "H+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

// 日期插件汉化
$.fn.datepicker.dates['zh-CN'] = {
  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
  daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  today: "今天",
  suffix: [],
  meridiem: ["上午", "下午"]
};

// 日期插件通用配置
$.fn.datepicker.defaults.language = "zh-CN";
$.fn.datepicker.defaults.autoclose = true;
$.fn.datepicker.defaults.todayHighlight = true;
$.fn.datepicker.defaults.format = "yyyy-mm-dd";

// 提示信息
let last_gritter;
const showMessage = function (type, message) {
  if (last_gritter) {
    $.gritter.remove(last_gritter);
  }
  last_gritter = $.gritter.add({
    title: '消息',
    text: message,
    time: 1500,
    class_name: type
  });
};

const Message = {
  success: function (message) {
    showMessage('gritter-success', message);
  },

  warning: function (message) {
    showMessage('gritter-warning', message);
  },

  error: function (message) {
    showMessage('gritter-error', message);
  },

  info: function (message) {
    showMessage('gritter-info', message);
  }
};

/**
 * 更新菜单激活状态
 *
 * @param hash
 */
function updateMenuActive(hash) {
  //  当前菜单
  const $menu = $($('a[data-url="' + hash + '"]')[0]).parent("li");

  // 所有菜单
  const $all_menus = $menu.parents("ul.nav-list").find("li");

  // 清除所有菜单状态
  $all_menus.removeClass("open");
  $all_menus.removeClass("active");
  $(".submenu").css("display", "");

  // 父菜单
  const $parent = $menu.parents("li");
  if ($parent.length > 0) {
    $parent.addClass("open active");
  }
  $menu.addClass("active");
}

/**
 * 更新面包屑
 *
 * @param hash
 */
function updateBreadcrumbs(hash) {
  const $menu = $('a[data-url="' + hash + '"]');

  // 下面这坨代码摘自ace.ajax-content.js
  const $breadcrumbs = $('.breadcrumb');
  if ($breadcrumbs.length > 0 && $breadcrumbs.is(':visible')) {
    $breadcrumbs.find('> li:not(:first-child)').remove();

    let i = 0;
    $menu.parents('.nav li').each(function () {
      const $link = $(this).find('> a');

      const $link_clone = $link.clone();
      $link_clone.find('i,.fa,.glyphicon,.ace-icon,.menu-icon,.badge,.label').remove();
      const text = $link_clone.text();
      $link_clone.remove();

      const href = $link.attr('href');

      if (i === 0) {
        const $li = $('<li class="active"></li>').appendTo($breadcrumbs);
        $li.text(text);
      } else {
        const $li = $('<li><a/></li>').insertAfter($breadcrumbs.find('> li:first-child'));
        $li.find('a').attr('href', href).text(text);
      }
      i++;
    })
  }
}

/**
 * 更新标题
 *
 * @param hash
 */
function updateTitle(hash) {
  const $menu = $($('a[data-url="' + hash + '"]')[0]);
  const title = $.trim($menu.text());

  if (title !== '') {
    document.title = title;
  }
}

/**
 * 更新状态
 *
 * @param hash
 */
function updateState(hash) {
  updateBreadcrumbs(hash);
  updateMenuActive(hash);
  updateTitle(hash);
}

/**
 * 日期格式化
 *
 * @param value
 */
function date(value) {
  let date = new Date();
  date.setTime(value);
  return date.format("yyyy-MM-dd");
}

/**
 * 日期时间格式化
 *
 * @param value
 */
function datetime(value) {
  let date = new Date();
  date.setTime(value);
  return date.format("yyyy-MM-dd HH:mm:ss");
}

/**
 * 是/否格式化
 *
 * @param value
 */
function yesNo(value) {
  return value === '1' ? '是' : '否';
}
