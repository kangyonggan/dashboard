<template>
  <div class="ace-settings-container" id="ace-settings-container">
    <div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
      <i class="ace-icon fa fa-cog bigger-130"></i>
    </div>

    <div class="ace-settings-box clearfix" id="ace-settings-box">
      <div class="pull-left width-50">
        <div class="ace-settings-item">
          <div class="pull-left">
            <select id="skin-colorpicker" class="hide">
              <option data-skin="no-skin" value="#438EB9">#438EB9</option>
              <option data-skin="skin-1" value="#222A2D">#222A2D</option>
              <option data-skin="skin-2" value="#C6487E">#C6487E</option>
              <option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
            </select>
          </div>
          <span>&nbsp; 选择皮肤</span>
        </div>

        <div class="ace-settings-item">
          <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-navbar"/>
          <label class="lbl" for="ace-settings-navbar"> 固定导航条</label>
        </div>

        <div class="ace-settings-item">
          <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-sidebar"/>
          <label class="lbl" for="ace-settings-sidebar"> 固定菜单栏</label>
        </div>

        <div class="ace-settings-item">
          <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-breadcrumbs"/>
          <label class="lbl" for="ace-settings-breadcrumbs"> 固定面包屑</label>
        </div>

        <div class="ace-settings-item">
          <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-add-container"/>
          <label class="lbl" for="ace-settings-add-container">
            小屏幕
          </label>
        </div>

      </div>

      <div class="pull-left width-50">
        <div class="ace-settings-item">
          <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-hover"/>
          <label class="lbl" for="ace-settings-hover"> 悬浮菜单</label>
        </div>

        <div class="ace-settings-item">
          <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-compact"/>
          <label class="lbl" for="ace-settings-compact"> 简洁菜单</label>
        </div>

        <div class="ace-settings-item">
          <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-highlight"/>
          <label class="lbl" for="ace-settings-highlight"> 高亮菜单</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Settings',
    mounted: function () {
      // 渲染完该组件之后再去加载ace.min.js，不然本组件的事件无法绑定，本组件的事件参考ace.settings.js
      document.write("<script src='/static/ace/dist/js/ace.min.js'>" + "<" + "/script>");

      // navbar fixed init
      if (ace.settings.exists('navbar', 'fixed')) {
        ace.settings.navbar_fixed(null, true, true, true);
      }
      // sidebar fixed init
      if (ace.settings.exists('sidebar', 'fixed')) {
        ace.settings.sidebar_fixed(null, true, true, true);
      }
      // breadcrumbs fixed init
      if (ace.settings.exists('breadcrumbs', 'fixed')) {
        ace.settings.breadcrumbs_fixed(null, true, true, true);
      }
      // main_container fixed init
      if (ace.settings.exists('main-container', 'fixed')) {
        ace.settings.main_container_fixed(null, true, true, true);
      }
    }
  }

  $(function () {
    // skin init
    const skins = {"#438EB9": "no-skin", "#222A2D": "skin-1", "#C6487E": "skin-2", "#D0D0D0": "skin-3"};
    const skin = ace.data.get('skin') || 'skin-1';
    document.getElementsByTagName("body")[0].className = skin;
    const color = findColor(skin);

    $(".btn-colorpicker").css("background", color);
    $(".dropdown-colorpicker li a").removeClass("selected");
    const as = $(".dropdown-colorpicker li a");
    for (var i = 0; i < as.length; i++) {
      if ($(as[i]).data("color") === color) {
        $(as[i]).addClass("selected");
        break;
      }
    }

    /**
     * 查找皮肤颜色
     *
     * @param skin
     * @returns {*}
     */
    function findColor(skin) {
      for (var color in skins) {
        if (skins[color] === skin) {
          return color;
        }
      }

      return "#438EB9";
    }
  });
</script>
