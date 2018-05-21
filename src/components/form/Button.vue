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
          // 绑定了table
          let ref = this.getTableRef(this.$parent);
          if (ref) {
            e.preventDefault();
            let $form = $btn.parents("form");
            if (this.form) {
              $form = $("#" + this.form);
            }

            $btn.button('loading');
            ref.query($btn, $form);
          }
        } else if (this.form) {
          // 绑定了form，则提交form
          let $form = $("#" + this.form);

          $btn.button('loading');
          this.post($form.attr("action"), {"username": "admin"}, function () {
            $btn.button('reset');
            if ($btn.parents(".modal")) {
              $btn.parents(".modal").modal('hide');
            }
          }, function () {
            $btn.button('reset');
          });

        } else if ($btn.parents("form")) {
          // 看看有没有父form，有则提交

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
