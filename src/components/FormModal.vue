<template>
  <Modal :title="title" v-model="showModel" :mask-closable="false" :closable="false">
    <slot></slot>
  </Modal>
</template>

<script>
  export default {
    name: 'FormModal',
    props: {
      title: {
        required: true,
        type: String
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
      click: function () {
        this.loading();
        this.ok();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
