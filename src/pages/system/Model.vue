<template>
  <Form id="form">
    <Input name="username" label="用户名"/>
    <Input name="realname" label="真实姓名"/>

    <Actions>
      <Button name="提交" icon="fa-check" clazz="btn-sm btn-purple"/>
      <Button name="重置" icon="fa-undo" clazz="btn-sm btn-default" type="reset"/>
    </Actions>
  </Form>
</template>

<script>
  import Form from "../../components/form/Form.vue";
  import Input from "../../components/form/Input.vue";
  import Actions from "../../components/form/Actions.vue";
  import Button from "../../components/form/Button.vue";

  export default {
    components: {Form, Input, Actions, Button},
    name: 'Model'
  }
</script>
