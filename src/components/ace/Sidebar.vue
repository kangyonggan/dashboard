<template>
  <div id="sidebar" class="sidebar responsive">
    <div class="sidebar-shortcuts" id="sidebar-shortcuts">
      <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
        <button class="btn btn-success">
          <i class="ace-icon fa fa-signal"></i>
        </button>

        <button class="btn btn-info">
          <i class="ace-icon fa fa-pencil"></i>
        </button>

        <button class="btn btn-warning">
          <i class="ace-icon fa fa-users"></i>
        </button>

        <button class="btn btn-danger">
          <i class="ace-icon fa fa-cogs"></i>
        </button>
      </div>

      <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
        <span class="btn btn-success"></span>

        <span class="btn btn-info"></span>

        <span class="btn btn-warning"></span>

        <span class="btn btn-danger"></span>
      </div>
    </div>

    <ul class="nav nav-list">
      <Menu v-for="(menu, index) in menus" :menu="menu" :key="index"/>
    </ul>

    <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
      <i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left"
         data-icon2="ace-icon fa fa-angle-double-right"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Menu from "./Menu.vue";

  export default {
    components: {Menu},
    name: 'Sidebar',
    data() {
      return {
        menus: []
      }
    },
    created: function () {
      let that = this;
      this.get("dashboard/menus", function (data) {
        that.menus = data.list;
        Vue.nextTick(function () {
          updateState('/' + window.location.hash);

          // sidebar highlight init
          if (ace.settings.exists('sidebar', 'highlight')) {
            document.getElementById("ace-settings-highlight").checked = true;
            $('#sidebar .nav-list > li').addClass('highlight');

            if (ace.vars['old_ie']) ace.helper.redraw($('#sidebar')[0]);
          }

          // sidebar hover init
          if (ace.settings.exists('sidebar', 'hover')) {
            document.getElementById("ace-settings-hover").checked = true;
            $('#sidebar li').addClass('hover').filter('.open').removeClass('open').find('> .submenu').css('display', 'none');

            $('.sidebar[data-sidebar-hover=true]').ace_sidebar_hover('reset')
            $('.sidebar[data-sidebar-scroll=true]').ace_sidebar_scroll('reset')

            if(ace.vars['old_ie']) ace.helper.redraw($('#sidebar')[0]);
          }

          // sidebar compact init
          if (ace.settings.exists('sidebar', 'compact')) {
            document.getElementById("ace-settings-compact").checked = true;
            $('#sidebar').addClass('compact');
            var hover = $('#ace-settings-hover');
            if( hover.length > 0 ) {
              hover.removeAttr('checked').trigger('click');
            }

            if(ace.vars['old_ie']) ace.helper.redraw($('#sidebar')[0], true);
          }
        })
      });
    }
  }
</script>

