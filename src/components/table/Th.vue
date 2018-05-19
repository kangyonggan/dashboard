<template>
  <th :data-field="field" :data-sortable="sortable" :data-checkbox="checkbox">
    {{title}}
  </th>
</template>

<script>
  export default {
    name: 'Th',
    props: {
      title: {
        required: true,
        type: String
      },
      field: {
        required: false,
        type: String
      },
      sortable: {
        required: false,
        type: Boolean,
        default: false
      },
      checkbox: {
        required: false,
        type: Boolean,
        default: false
      }
    }
  }
</script>
