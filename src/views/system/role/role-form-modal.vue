<template>
  <!--新增/编辑角色-->
  <AppModal ref="modal" :action="'system/role/' + (role.id ? 'update' : 'save')"
            :title="(role.id ? '编辑' : '新增') + '角色'" :model="role" :rules="rules" :success="handleSuccess">
    <FormItem label="角色代码" prop="code">
      <Input v-model="role.code" placeholder="请输入角色代码"/>
    </FormItem>
    <FormItem label="角色名称" prop="name">
      <Input v-model="role.name" placeholder="请输入角色名称"/>
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
         * 角色信息
         */
        role: {},
        /**
         * 老的角色代码
         */
        oldCode: '',
        /**
         * 表单的校验
         */
        rules: {
          code: [
            {validator: this.validateCode, trigger: 'blur'}
          ],
          name: [
            {required: true, message: '角色名称为必填项', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      /**
       * 校验角色代码是否存在
       */
      validateCode: function (rule, value, callback) {
        if (!value) {
          callback(new Error('角色代码为必填项'));
          return;
        }

        if (value === this.oldCode) {
          callback();
          return;
        }

        this.get("validate/roleCode/" + value, function () {
          callback();
        }, function () {
          callback(new Error('角色代码已存在'));
        });
      },
      show: function (role) {
        this.role = role;
        this.oldCode = role.code;
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
