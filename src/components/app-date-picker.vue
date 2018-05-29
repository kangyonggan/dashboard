<template>
  <DatePicker v-model="model[prop]" :placeholder="placeholder" @on-change="model[prop]=$event"/>
</template>

<script>
  export default {
    props: {
      model: {
        required: true,
        type: Object
      },
      prop: {
        required: true,
        type: String
      },
      placeholder: {
        type: String
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
