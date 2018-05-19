<template>
  <button :id="id" :class="'btn btn-sm ' + clazz" :data-table-id="tableId">
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
      }
    }
  }
</script>
