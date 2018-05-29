<template>
  <!--新增/编辑用户-->
  <AppModal ref="modal" :action="'system/user/' + (user.id ? 'update' : 'save')"
            :title="(user.id ? '编辑' : '新增') + '用户'" :model="user" :rules="rules" :success="handleSuccess">
    <FormItem label="用户名" prop="username">
      <Input v-model="user.username" placeholder="请输入用户名"/>
    </FormItem>
    <FormItem label="真实姓名" prop="realname">
      <Input v-model="user.realname" placeholder="请输入真实姓名"/>
    </FormItem>
    <FormItem label="密码" prop="password" v-if="!user.id">
      <Input type="password" v-model="user.password" placeholder="请输入密码"/>
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
         * 老的用户名
         */
        oldUsername: '',
        /**
         * 表单的校验
         */
        rules: {
          username: [
            {validator: this.validateUsername, trigger: 'blur'}
          ],
          realname: [
            {required: true, message: '真实姓名为必填项', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码为必填项', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      /**
       * 校验用户名是否存在
       */
      validateUsername: function (rule, value, callback) {
        if (!value) {
          callback(new Error('用户名为必填项'));
          return;
        }

        if (value === this.oldUsername) {
          callback();
          return;
        }

        this.get("validate/username/" + value, function () {
          callback();
        }, function () {
          callback(new Error('用户名已存在'));
        });
      },
      show: function (user) {
        this.user = user;
        this.oldUsername = user.username;
        this.$refs.modal.show();
      },
      handleSuccess (event) {
        this.$emit('success', event);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
