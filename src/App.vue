<template>
  <div id="app" class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Header :style="{position: 'fixed', width: '100%', background: '#2d8cf0'}">
        <Menu mode="horizontal" theme="primary">
          <div class="layout-logo">后台管理系统</div>
          <div class="layout-nav">
            <MenuItem name="welcome">
              欢迎，康永敢
            </MenuItem>
            <MenuItem name="logout">
              <Icon type="log-out"></Icon>
              退出
            </MenuItem>
          </div>
        </Menu>
      </Header>

      <Layout :style="{marginTop: '64px'}">
        <Sider collapsible :collapsed-width="78" v-model="isCollapsed"
               :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
          <Menu :active-name="activeName" theme="dark" width="auto" :open-names="openNames" :class="menuitemClasses" @on-select="menuSelect">
            <MenuItem name="/">
              <Icon type="monitor"></Icon>
                工作台
            </MenuItem>
            <Submenu name="system">
              <template slot="title">
                <Icon type="ios-gear"></Icon>
                系统
              </template>
              <MenuItem name="/system/user">用户管理</MenuItem>
              <MenuItem name="/system/role">角色管理</MenuItem>
              <MenuItem name="/system/menu">菜单管理</MenuItem>
            </Submenu>
            <Submenu name="user">
              <template slot="title">
                <Icon type="person"></Icon>
                我的
              </template>
              <MenuItem name="/user/info">个人信息</MenuItem>
            </Submenu>
          </Menu>
        </Sider>

        <Layout :style="contentMarginLeft">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>工作台</BreadcrumbItem>
            <BreadcrumbItem>系统</BreadcrumbItem>
            <BreadcrumbItem>用户管理</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', background: '#fff'}">
            <router-view/>
          </Content>
          <Footer class="layout-footer-center">2018 &copy; 后台管理系统 由康永敢搭建</Footer>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isCollapsed: false
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item', this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      contentMarginLeft: function () {
        return {
          'padding': '0 24px 24px',
          'marginLeft': this.isCollapsed ? '78px' : '200px'
        }
      },
      activeName: function () {
        return window.location.hash.substring(1);
      },
      openNames: function () {
        let hash = window.location.hash.substring(1);
        let arr = hash.split('/');
        let openNames = [];
        if (arr.length > 2) {
            for (let i = 1; i < arr.length - 1; i++) {
              openNames[i - 1] = arr[i];
            }
        }

        return openNames;
      }
    },
    methods: {
      menuSelect: function (menuCode) {
        this.$router.push(menuCode)
      }
    }
  }
</script>

<style scoped>
  .layout-logo {
    position: relative;
    top: 2px;
    width: 120px;
    font-size: 20px;
    color: #fff;
    float: left;
  }

  .layout-nav {
    float: right;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>
