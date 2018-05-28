<template>
  <Modal :title="title" v-model="showModel" :mask-closable="false" :closable="false">
    <Form :ref="formRef" :model="model" :rules="rules">
      <slot></slot>
    </Form>

    <template slot="footer">
      <Button icon="close" @click="cancel">取消</Button>
      <Button type="success" icon="checkmark" :loading="isLoading" @click="submit">提交</Button>
    </template>
  </Modal>
</template>

<script>
  export default {
    name: 'FormModal',
    props: {
      title: {
        required: true,
        type: String
      },
      model: {
        required: true,
        type: Object
      },
      formRef: {
        required: true,
        type: String
      },
      ok: {
        required: true,
        type: Function
      },
      rules: {
        required: false,
        type: Object
      }
    },
    data() {
      return {
        isLoading: false,
        showModel: false
      }
    },
    methods: {
      show: function () {
        this.stop();
        this.$refs[this.formRef].resetFields();
        this.showModel = true;
      },
      hide: function () {
        this.stop();
        this.showModel = false;
      },
      loading: function () {
        this.isLoading = true;
      },
      stop: function () {
        this.isLoading = false;
      },
      submit: function () {
        this.$refs[this.formRef].validate((valid) => {
          if (valid) {
            this.loading();
            this.ok();
          }
        })
      },
      cancel: function () {
        this.hide();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
