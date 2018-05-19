<template>
  <table :id="id" data-toggle="table" :data-pagination="pagination"
         data-side-pagination="server" :data-undefined-text="undefinedText" data-striped="true"
         data-click-to-select="true">
    <thead>
    <tr>
      <slot></slot>
    </tr>
    </thead>
  </table>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      url: {
        required: true,
        type: String
      },
      id: {
        required: false,
        type: String,
        default: 'table'
      },
      pagination: {
        required: false,
        type: Boolean,
        default: true
      },
      undefinedText: {
        required: false,
        type: String,
        default: ''
      }
    },
    mounted: function () {
      var url = process.env.API_ROOT + this.url;
      if (process.env.NODE_ENV === 'development') {
        url += ".json";
      }
      $('#' + this.id).bootstrapTable({
        url: url
      });
    }
  }
</script>

