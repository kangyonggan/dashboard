<template>
  <div id="app">
    <Navbar/>

    <div class="main-container" id="main-container">
      <Sidebar/>

      <div class="main-content">
        <div class="main-content-inner">
          <div class="breadcrumbs" id="breadcrumbs">
            <ul class="breadcrumb">
              <li>
                <i class="ace-icon fa fa-tachometer home-icon"></i>
                <a data-url="index" href="/#/">工作台</a>
              </li>
            </ul>
          </div>

          <div class="page-content">
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

  export default {
    components: {Navbar, Footer, Sidebar},
    name: 'App'
  }
</script>

<style>

</style>
