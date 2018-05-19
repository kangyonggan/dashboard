<template>
  <button :id="id" :class="'btn btn-sm ' + clazz" :data-table-id="tableId" :type="type" @click="click($event)">
    <i :class="'ace-icon fa ' + icon" v-if="icon != ''"></i>
    {{name}}
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      name: {
        required: true,
        type: String
      },
      id: {
        required: false,
        type: String
      },
      clazz: {
        required: false,
        type: String,
        default: 'btn-skin'
      },
      tableId: {
        required: false,
        type: String
      },
      icon: {
        required: false,
        type: String,
        default: ''
      },
      type: {
        required: false,
        type: String
      },
      table: {
        required: false,
        type: String
      }
    },
    methods: {
      click: function (e) {
        if (this.table) {
          e.preventDefault();
          // 查询
          const $table = $("#" + this.table);

          const params = $(e.target).parents("form").serializeForm();
          $table.bootstrapTable("refresh", {query: params});
        }
      }
    }
  }
</script>
