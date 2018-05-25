<template>
  <div>
    <Form :action="'dashboard/system/user/' + (user.id !== undefined ? 'update' : 'save')">
      <input v-if="user.id !== undefined" name="id" :value="user.id" type="hidden"/>
      <Input name="username" label="用户名222" v-model="user.username" :required="true" :readonly="user.id !== undefined"/>
      <Input name="realname" label="真实姓名" v-model="user.realname" :required="true"/>
      <Input v-if="user.id === undefined" name="password" label="密码" v-model="user.password" :required="true" type="password"/>

      <Actions>
        <Button name="提交" icon="fa-check" clazz="btn-sm btn-purple" :click="submit"/>
      </Actions>
    </form>
  </div>
</template>

<script>
  import Form from "../../components/form/Form.vue";
  import Input from "../../components/form/Input.vue";
  import Actions from "../../components/form/Actions.vue";
  import Button from "../../components/form/Button.vue";

  export default {
    components: {Form, Input, Actions, Button},
    name: 'Model',
    props: {
      "user": {
        required: true,
        type: Object
      }
    },
    methods: {
      submit: function (e) {
        e.preventDefault();
        let $btn = $(e.target);
        $btn.button('loading');
        let $form = $btn.parents("form");
        let that = this;

        this.post($form.attr('action'), this.user, function (data) {
          $btn.button('reset');
        }, function () {
          $btn.button('reset');
          that.$layer.closeAll();
        });
      }
    }
  }
</script>
