<template>
  <Modal :title="title" v-model="showModel" :mask-closable="false" :closable="false" @on-ok="ok">
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
      },
      ok: {
        required: true,
        type: Function
      }
    },
    data() {
      return {
        showModel: false
      }
    },
    methods: {
      show: function () {
        this.showModel = true;
      },
      hide: function () {
        this.showModel = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
