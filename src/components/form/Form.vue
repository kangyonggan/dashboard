<template>
  <form :id="uuid" :method="method" :class="{'form-horizontal': true, 'col-xs-12': border, 'fa-border': border, 'radius-base': border}" enctype="multipart/form-data"
        :action="action" :data-inline="inline">
    <div class="space-6"></div>
    <slot></slot>
    <div class="col-xs-12 space-6"></div>
  </form>
</template>

<script>
  export default {
    name: 'Form',
    props: {
      id: {
        required: false,
        type: String
      },
      method: {
        required: false,
        type: String,
        default: "get"
      },
      border: {
        required: false,
        default: false,
        type: Boolean
      },
      action: {
        required: false,
        type: String
      },
      inline: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        uuid: this.uuid("ID")
      }
    },
    mounted: function () {
      if (this.id) {
        this.uuid = this.id;
      }
    }
  }
</script>
