<template>
  <div id="navbar" class="navbar navbar-default">
    <div class="navbar-container" id="navbar-container">
      <button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar" v-if="login">
        <span class="sr-only">Toggle sidebar</span>

        <span class="icon-bar"></span>

        <span class="icon-bar"></span>

        <span class="icon-bar"></span>
      </button>

      <div class="navbar-header pull-left">
        <a class="navbar-brand" href="/#/">
          <small>
            <i class="fa fa-leaf"></i>
            工作台
          </small>
        </a>
      </div>

      <div class="navbar-buttons navbar-header pull-right" role="navigation">
        <ul class="nav ace-nav" v-if="login">
          <li>
            <a data-toggle="dropdown" href="#" class="dropdown-toggle" id="user-info-toggle">
              <img class="nav-user-photo" id="userAvatar" src="/static/ace/dist/avatars/avatar5.png">
              <span class="user-info">
                  <small>欢迎,</small>
                  <span id="navFullname">康永敢</span>
              </span>

              <i class="ace-icon fa fa-caret-down"></i>
            </a>

            <ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
              <li>
                <a @click="logout()">
                  <i class="ace-icon fa fa-power-off"></i>
                  安全退出
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        login: false
      }
    },
    created: function () {
      this.login = this.isLogin();
    },
    methods: {
      logout: function () {
        // TODO 调服务端登出
        sessionStorage.removeItem("token");
        window.location.reload();
      }
    }
  }
</script>

<style scoped>
</style>
