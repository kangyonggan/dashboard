<template>
  <div id="app" class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo">工作台</div>
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
          <Menu active-name="SYSTEM_USER" theme="dark" width="auto" :open-names="['SYSTEM']" :class="menuitemClasses"
                :style="{'border-top': '1px solid #999'}">
            <MenuItem name="DASHBOARD">
              <Icon type="laptop"></Icon>
                工作台
            </MenuItem>
            <Submenu name="SYSTEM">
              <template slot="title">
                <Icon type="ios-gear"></Icon>
                系统
              </template>
              <MenuItem name="SYSTEM_USER">用户管理</MenuItem>
              <MenuItem name="SYSTEM_ROLE">角色管理</MenuItem>
              <MenuItem name="SYSTEM_MENU">菜单管理</MenuItem>
            </Submenu>
            <Submenu name="USER">
              <template slot="title">
                <Icon type="person"></Icon>
                我的
              </template>
              <MenuItem name="USER_INFO">个人信息</MenuItem>
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
          <Footer class="layout-footer-center">2018 &copy; 康永敢</Footer>
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
      }
    }
  }
</script>

<style scoped>
  .layout-logo {
    position: relative;
    top: 2px;
    width: 100px;
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
