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
      table: {
        required: false,
        type: String
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
        } else if (this.table) {
          let ref = this.getTableRef(this.$parent);
          if (ref) {
            e.preventDefault();
            ref.query(e);
          }
        }
      },
      getTableRef: function ($parent) {
        if (!$parent) {
          return;
        }
        if ($parent.$refs[this.table]) {
          return $parent.$refs[this.table];
        } else {
          return this.getTableRef($parent.$parent);
        }
      }
    }
  }
</script>
