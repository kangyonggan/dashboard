<template>
  <div>
    <div v-if="well" class="clearfix form-actions">
      <div class="space-6"></div>
      <slot></slot>
    </div>
    <div v-if="!well" :class="'col-xs-12 align-' + align">
      <div class="space-6"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Actions',
    props: {
      well: {
        required: false,
        type: Boolean,
        default: false
      },
      align: {
        required: false,
        type: String,
        default: 'center'
      }
    }
  }
</script>
