<template>
  <button :id="id" :class="'btn btn-sm ' + clazz" :data-table-id="tableId" :type="type" @click="func($event)">
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
      click: {
        required: false,
        type: Function
      },
      table: {
        required: false,
        type: String,
        default: 'table'
      },
      parentRefs: {
        required: false,
        type: Object
      }
    },
    methods: {
      func: function (e) {
        if (this.click) {
          e.preventDefault();
          this.click(e);
        } else if (this.parentRefs[this.table]) {
          e.preventDefault();
          this.parentRefs[this.table].query(e);
        }
      }
    }
  }
</script>
