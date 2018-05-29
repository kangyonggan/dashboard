<template>
  <Modal :title="title" v-model="showModel" :mask-closable="false" :closable="false">
    <Form :model="model" :rules="rules">
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
    name: 'app-modal',
    props: {
      title: {
        required: true,
        type: String
      },
      model: {
        required: true,
        type: Object
      },
      action: {
        required: true,
        type: String
      },
      success: {
        required: false,
        type: Function
      },
      failure: {
        required: false,
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
        this.$children[0].$children[0].resetFields();
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
        this.$children[0].$children[0].validate((valid) => {
          if (valid) {
            this.loading();
            let that = this;
            this.post(this.action, this.model, function (data) {
              that.$Message.success(data.respMsg);
              that.hide();
              if (that.success) {
                that.success(data);
              }
            }, function () {
              that.stop();
              that.$Message.error("网络错误，请稍后再试！");
              if (that.failure) {
                that.failure(data);
              }
            });
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
