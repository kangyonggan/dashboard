// 提示信息
var last_gritter;
var showMessage = function (type, message) {
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

var Message = {
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
  var $menu = $($('a[data-url="' + hash + '"]')[0]).parent("li");

  // 所有菜单
  var $all_menus = $menu.parents("ul.nav-list").find("li");

  // 清除所有菜单状态
  $all_menus.removeClass("open");
  $all_menus.removeClass("active");
  $(".submenu").css("display", "");

  // 父菜单
  var $parent = $menu.parents("li");
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
  var $menu = $('a[data-url="' + hash + '"]');

  // 下面这坨代码摘自ace.ajax-content.js
  var $breadcrumbs = $('.breadcrumb');
  if ($breadcrumbs.length > 0 && $breadcrumbs.is(':visible')) {
    $breadcrumbs.find('> li:not(:first-child)').remove();

    var i = 0;
    $menu.parents('.nav li').each(function () {
      var $link = $(this).find('> a');

      var $link_clone = $link.clone();
      $link_clone.find('i,.fa,.glyphicon,.ace-icon,.menu-icon,.badge,.label').remove();
      var text = $link_clone.text();
      $link_clone.remove();

      var href = $link.attr('href');

      if (i == 0) {
        var li = $('<li class="active"></li>').appendTo($breadcrumbs);
        li.text(text);
      } else {
        var li = $('<li><a /></li>').insertAfter($breadcrumbs.find('> li:first-child'));
        li.find('a').attr('href', href).text(text);
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
  var $menu = $($('a[data-url="' + hash + '"]')[0]);
  var title = $.trim($menu.text());

  if (title != '') {
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
