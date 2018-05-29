<template>
  <!--修改密码-->
  <AppModal ref="modal" action="system/user/password" title="修改密码" :model="user" :rules="rules">
    <FormItem label="新密码" prop="password">
      <Input type="password" v-model="user.password" placeholder="请输入新密码"/>
    </FormItem>
  </AppModal>
</template>

<script>
  export default {
    name: 'user-form-modal',
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
         * 表单的校验
         */
        rules: {
          password: [
            {required: true, message: '密码为必填项', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      show: function (user) {
        this.user = user;
        this.$refs.modal.show();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
