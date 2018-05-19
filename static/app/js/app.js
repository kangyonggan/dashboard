$(function () {
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

  /**
   * 序列化表单
   */
  $.fn.serializeForm = function () {
    const json = {};
    const arr = this.serializeArray();
    $.each(arr, function () {
      if (json[this.name]) {
        if (!json[this.name].push) {
          json[this.name] = [json[this.name]];
        }
        json[this.name].push(this.value || '');
      } else {
        json[this.name] = this.value || '';
      }
    });

    return json;
  };
});

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
