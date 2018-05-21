<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      id: {
        required: true,
        type: String
      },
      title: {
        required: true,
        type: String
      }
    }
  }
</script>

<style scoped>
</style>
