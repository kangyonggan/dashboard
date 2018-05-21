<template>
  <div class="form-group">
    <div class="app-label nowrap">
      <label :class="{'required': required}">{{label}}</label>
    </div>
    <div class="col-md-7 controls">
      <select :id="uuid" :name="name" multiple="" class="chosen-select form-control"
              :data-placeholder="placeholder?placeholder:'请输入' + label">
        <slot></slot>
        <option v-for="item in list" :value="item[code]">{{item[disp]}}</option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Select2',
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
      placeholder: {
        required: false,
        type: String
      },
      required: {
        required: false,
        default: false,
        type: Boolean
      },
      url: {
        required: false,
        type: String
      },
      code: {
        required: false,
        type: String
      },
      disp: {
        required: false,
        type: String
      }
    },
    data() {
      return {
        uuid: this.uuid("ID"),
        list: []
      }
    },
    mounted: function () {
      if (this.id) {
        this.uuid = this.id;
      }
      const $select = $("#" + this.uuid);
      const inline = $select.parents("form").data('inline');
      if (inline) {
        $select.parent().addClass('col-xs-12');
        $select.parent().prev().addClass('col-md-5 col-xs-12');
        $select.parent().parent().addClass('col-lg-4 col-md-6 col-xs-12');
      } else {
        $select.parent().prev().addClass('col-md-3');
      }

      let that = this;
      this.get(this.url, function (data) {
        that.list = data.list;
      });
    }
  }
</script>

<style scoped>
</style>
