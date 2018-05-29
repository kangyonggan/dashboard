<template>
    <Select
      v-model="model[prop]"
      filterable
      clearable
      remote
      :remote-method="search"
      :loading="loading" :placeholder="placeholder">
      <Option v-for="(option, index) in list" :value="option[prop]" :key="index">{{option[prop]}}</Option>
    </Select>
</template>

<script>
  export default {
    name: 'app-select-remote',
    props: {
      model: {
        required: true,
        type: Object
      },
      prop: {
        required: true,
        type: String
      },
      url: {
        required: true,
        type: String
      },
      placeholder: {
        type: String
      }
    },
    data() {
      return {
        loading: false,
        list: []
      }
    },
    methods: {
      search: function (value) {
        if (value !== '') {
          this.loading = true;
          let that = this;
          this.get(this.url + "?" + this.prop + "=" + value, function (data) {
            that.list = data.list;
            that.loading = false;
          }, function () {
            that.loading = false;
          });
        } else {
          this.list = [];
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
