<template>
  <div id="app">
    <Navbar/>

    <div class="main-container" id="main-container">
      <Sidebar v-if="login"/>

      <div class="main-content">
        <div class="main-content-inner">
          <div class="breadcrumbs" id="breadcrumbs" v-if="login">
            <ul class="breadcrumb">
              <li>
                <i class="ace-icon fa fa-tachometer home-icon"></i>
                <a data-url="index" href="/#/">工作台</a>
              </li>
            </ul>
          </div>

          <div class="page-content">
            <Settings/>
            <router-view/>
          </div>
        </div>
      </div>

      <Footer/>
    </div>

    <a href="javascript:" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
      <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
    </a>
  </div>
</template>

<script>
  import Navbar from "./components/ace/Navbar.vue";
  import Footer from "./components/ace/Footer.vue";
  import Sidebar from "./components/ace/Sidebar.vue";
  import Settings from "./components/ace/Settings.vue";

  export default {
    components: {Navbar, Footer, Sidebar, Settings},
    name: 'App',
    data() {
      return {
        login: false
      }
    },
    created: function () {
      this.login = this.isLogin();
    }
  }
</script>
