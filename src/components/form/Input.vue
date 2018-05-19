<template>
  <div class="form-group">
    <div class="app-label nowrap">
      <label :class="{'required': required}">{{label}}</label>
    </div>
    <div class="col-md-7 controls">
      <input :type="type != 'date' ? type : 'text'" :id="name" :name="name" :readonly="readonly || type==='date'" :value="value"
             :class="{'form-control': true, 'readonly': readonly || type==='date', 'date-picker': type==='date'}"
             :placeholder="placeholder?placeholder:'请输入' + label"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      name: {
        required: true,
        type: String
      },
      label: {
        required: true,
        type: String
      },
      type: {
        default: 'text',
        type: String
      },
      value: {
        required: false
      },
      placeholder: {
        required: false
      },
      required: {
        default: false,
        type: Boolean
      },
      readonly: {
        default: false,
        type: Boolean
      }
    },
    mounted: function () {
      const $input = $("#" + this.name);
      if (this.type === 'date') {
        $input.datepicker();
      }

      const inline = $input.parents("form").data('inline');
      if (inline) {
        $input.parent().addClass('col-xs-12');
        $input.parent().prev().addClass('col-md-5 col-xs-12');
        $input.parent().parent().addClass('col-lg-4 col-md-6 col-xs-12');
      } else {
        $input.parent().prev().addClass('col-md-3');
      }
    }
  }
</script>
