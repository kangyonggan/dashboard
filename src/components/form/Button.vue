<template>
  <button :id="id" :class="'btn ' + clazz" :type="type" @click="func($event)" :data-toggle="modal ? 'modal' : ''" :data-target="modal ? '#' + modal : ''">
    <i :class="'ace-icon fa ' + icon" v-if="icon"></i>
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
        default: 'btn-default'
      },
      icon: {
        required: false,
        type: String
      },
      type: {
        required: false,
        type: String,
        default: 'button'
      },
      click: {
        required: false,
        type: Function
      },
      tableRef: {
        required: false,
        type: String
      },
      parentRefs: {
        required: false,
        type: Object
      },
      modal: {
        required: false,
        type: String
      }
    },
    methods: {
      func: function (e) {
        if (this.click) {
          e.preventDefault();
          this.click(e);
        } else if (this.parentRefs && this.tableRef && this.parentRefs[this.tableRef]) {
          e.preventDefault();
          this.parentRefs[this.tableRef].query(e);
        }
      }
    }
  }
</script>
