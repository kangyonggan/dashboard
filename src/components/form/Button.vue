<template>
  <button :id="id" :class="'btn ' + clazz" :type="type" @click="func($event)"
          :data-loading-text="'正在' + name + '...'">
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
      }
    },
    methods: {
      func: function (e) {
        let $btn = $(e.target);
        if (this.click) {
          // 自定义事件优先执行
          e.preventDefault();
          this.click(e);
        } else if (this.table) {
          // 表单
          e.preventDefault();
          let ref = this.getTableRef(this.$parent);
          if (ref) {
            $btn.button('loading');
            ref.query($btn, $btn.parents("form"));
          }
        } else if (this.type === 'reset') {
          // 重置
          let $form = $btn.parents("form");
          if ($form) {
            $form.find(".chosen-select").val('').trigger("chosen:updated");
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
