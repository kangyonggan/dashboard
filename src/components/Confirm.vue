<template>
  <Modal v-model="showModel" width="360">
    <p slot="header" :style="{textAlign: 'center', color: calcColor}">
      <Icon type="information-circled"></Icon>
      <span>{{title}}</span>
    </p>
    <div style="text-align:center">
      <p>{{content}}</p>
      <p>{{title}}吗?</p>
    </div>
    <div slot="footer">
      <Button :type="type" size="large" long :loading="isLoading" @click="click">{{title}}</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'Confirm',
    props: {
      title: {
        required: true,
        type: String
      },
      content: {
        required: true,
        type: String
      },
      type: {
        required: false,
        type: String,
        default: 'info'
      },
      ok: {
        required: true,
        type: Function
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
    },
    computed: {
      calcColor: function () {
        if (this.type === 'info') {
          return '#2db7f5';
        } else if (this.type === 'error') {
          return '#f60';
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
