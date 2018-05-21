<template>
  <button :id="id" :class="'btn ' + clazz" :type="type" @click="func($event)"
          :data-toggle="modal ? 'modal' : ''" :data-target="modal ? '#' + modal : ''"
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
      },
      modal: {
        required: false,
        type: String
      },
      form: {
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
          e.preventDefault();

          let ref = this.getTableRef(this.$parent);
          let $form = this.getForm($btn);

          if (ref) {
            // 如果绑定了table， 则提交查询后渲染table
            $btn.button('loading');
            ref.query($btn, $form);
          }
        } else if (this.form) {
          e.preventDefault();
          let $form = this.getForm($btn);
          // 如果绑定form，则提交form
          $btn.button('loading');
          // TODO form参数
          this.post($form.attr("action"), {"username": "admin"}, function () {
            $btn.button('reset');
            if ($btn.parents(".modal")) {
              $btn.parents(".modal").modal('hide');
            }
          }, function () {
            $btn.button('reset');
          });
        } else if (this.type === 'reset') {
          // 重置
          let $form = this.getForm($btn);
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
      },
      getForm: function ($btn) {
        let $form = $btn.parents("form");
        if (this.form) {
          $form = $("#" + this.form);
        }

        return $form;
      }
    }
  }
</script>
