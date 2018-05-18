<template>
  <div class="col-lg-4 col-lg-offset-4 col-md-6 col-sm-6 col-sm-offset-3 col-xs-12">
    <div class="space-20"></div>
    <div class="space-30"></div>
    <div id="login-box" class="login-box visible widget-box">
      <div class="widget-body">
        <div class="widget-main">
          <h4 class="header skin-color lighter bigger">
            <i class="ace-icon fa fa-coffee skin-color"></i>
            登录
          </h4>

          <div class="space-16"></div>

          <form method="post" novalidate="novalidate">
            <div>
              <label class="required">用户名</label>
              <div class="input-icon input-icon-right">
                <input type="text" name="username" class="form-control"
                       placeholder="8至20位的字母和数字的组合" autocomplete="off"/>
                <i class="ace-icon fa fa-user"></i>
              </div>
            </div>

            <div class="space space-16"></div>

            <div>
              <label class="required">密码</label>
              <div class="input-icon input-icon-right">
                <input type="password" name="password" class="form-control"
                       placeholder="8至20位的字母和数字的组合" autocomplete="off">
                <i class="ace-icon fa fa-key"></i>
              </div>
            </div>

            <div class="space-16"></div>

            <div class="clearfix">
              <button type="reset" class="width-30 pull-left btn btn-sm">
                <i class="ace-icon fa fa-refresh"></i>
                重置
              </button>
              <button id="submit" @click="login($event)" class="width-35 pull-right btn btn-sm btn-skin"
                      data-loading-text="登录中...">
                <i class="ace-icon fa fa-key"></i>
                登录
              </button>
            </div>

            <div class="space-6"></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    methods: {
      login: function (e) {
        e.preventDefault();
        $(e.target).button('loading');
        // TODO 登录请求
        sessionStorage.setItem("token", "123123123123123");
        window.location.hash = "#/";
        window.location.reload();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
