<template>
  <div class="form-group">
    <div class="app-label nowrap col-md-3">
      <label :class="{'required': required}">{{label}}</label>
    </div>
    <div class="col-md-7 controls">
      <input :type="type != 'date' ? type : 'text'" :id="uuid" :name="name" :readonly="readonly || type==='date'"
             v-bind:value="value"
             v-on:input="$emit('input', $event.target.value)"
             :class="{'form-control': true, 'readonly': readonly || type==='date', 'date-picker': type==='date'}"
             :placeholder="placeholder?placeholder:'请输入' + label"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      name: {
        required: true,
        type: String
      },
      label: {
        required: true,
        type: String
      },
      id: {
        required: false,
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
        required: false,
        type: String
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
    data() {
      return {
        uuid: this.uuid("ID")
      }
    },
    mounted: function () {
      if (this.id) {
        this.uuid = this.id;
      }
      const $input = $("#" + this.uuid);
      if (this.type === 'date') {
        $input.datepicker();
      }

      const inline = $input.parents("form").data('inline');
      if (inline) {
        $input.parent().addClass('col-xs-12');
        $input.parent().prev().removeClass('col-md-3');
        $input.parent().prev().addClass('col-md-5 col-xs-12');
        $input.parent().parent().addClass('col-lg-4 col-md-6 col-xs-12');
      }
    }
  }
</script>
