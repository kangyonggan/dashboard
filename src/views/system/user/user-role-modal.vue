<template>
  <!--设置角色-->
  <AppModal ref="modal" :action="'system/user/' + user.username + '/role'" title="设置角色" :model="user">
    <FormItem prop="roleCodes">
      <CheckboxGroup v-model="user.roleCodes">
        <Checkbox v-for="(role, index) in roles" :key="index" :label="role.code">
          <span>{{role.name}}</span>
        </Checkbox>
      </CheckboxGroup>
    </FormItem>
  </AppModal>
</template>

<script>
  export default {
    props: {
      success: {
        type: Function
      }
    },
    data() {
      return {
        /**
         * 用户信息
         */
        user: {},
        /**
         * 全部角色
         */
        roles: []
      }
    },
    methods: {
      show: function (user) {
        this.user = user;
        this.$refs.modal.show();

        let that = this;
        this.get("system/user/" + user.username + "/role", function (data) {
          that.user.roleCodes = data.roleCodes;
          that.get("system/role/all", function (data) {
            that.roles = data.roles;
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
