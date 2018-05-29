<template>
  <div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="params" inline>
      <FormItem prop="username">
        <AppSelectRemote :model="params" prop="username" url="system/user/search" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem prop="realname">
        <AppSelectRemote :model="params" prop="realname" url="system/user/search" placeholder="请输入真实姓名"/>
      </FormItem>
      <FormItem prop="startCreatedTime">
        <AppDatePicker :model="params" prop="startCreatedTime" placeholder="请选择创建开始日期"/>
      </FormItem>
      <FormItem prop="endCreatedTime">
        <AppDatePicker :model="params" prop="endCreatedTime" placeholder="请选择创建结束日期"/>
      </FormItem>
      <Row>
        <FormItem>
          <Button type="info" icon="ios-search" @click="query($refs.queryForm)">查询</Button>
          <Button type="warning" icon="ios-refresh-empty" @click="reset($refs.queryForm)">清除</Button>
          <Button type="primary" icon="plus" @click="onCreate">新增</Button>
          <Button type="error" icon="trash-a" @click="onDeleteOrRecovery('delete')">删除</Button>
          <Button type="warning" icon="ios-undo" @click="onDeleteOrRecovery('recovery')">恢复</Button>
          <Button type="info" icon="locked" @click="onPassword">修改密码</Button>
        </FormItem>
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="system/user" :columns="columns" :form="$refs.queryForm"/>

    <!--新增/编辑-->
    <AppModal ref="userModal" :action="'system/user/' + (user.id ? 'update' : 'save')"
              :title="(user.id ? '编辑' : '新增') + '用户'" :model="user" :rules="userValidate" :success="onSuccess">
      <FormItem label="用户名" prop="username">
        <Input v-model="user.username" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem label="真实姓名" prop="realname">
        <Input v-model="user.realname" placeholder="请输入真实姓名"/>
      </FormItem>
      <FormItem label="密码" prop="password" v-if="!user.id">
        <Input type="password" v-model="user.password" placeholder="请输入密码"/>
      </FormItem>
    </AppModal>

    <!--修改密码-->
    <AppModal ref="passwordModal" action="system/user/password" title="修改密码" :model="user" :rules="userValidate"
              :success="onSuccess">
      <FormItem label="新密码" prop="password">
        <Input type="password" v-model="user.password" placeholder="请输入新密码"/>
      </FormItem>
    </AppModal>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data() {
      return {
        /**
         * 搜索表单的参数
         */
        params: {},
        /**
         * 模态框表单的参数
         */
        user: {},
        /**
         * 老的用户名
         */
        oldUsername: '',
        /**
         * 表格的列
         */
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'ID',
            key: 'id',
            sortable: true
          },
          {
            title: '用户名',
            key: 'username',
            sortable: true
          },
          {
            title: '真实姓名',
            key: 'realname',
            sortable: true
          },
          {
            title: '逻辑删除',
            key: 'isDeleted',
            sortable: true,
            render: (h, params) => {
              return this.yesNo(h, params);
            }
          },
          {
            title: '创建时间',
            key: 'createdTime',
            sortable: true
          },
          {
            title: '更新时间',
            key: 'updatedTime',
            sortable: true
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.user = {
                        id: params.row.id,
                        username: params.row.username,
                        realname: params.row.realname
                      };
                      this.oldUsername = params.row.username;
                      this.$refs.userModal.show();
                    }
                  }
                }, '编辑')]);
            }
          }],
        /**
         * 表单的校验
         */
        userValidate: {
          username: [
            {validator: this.validateUsername, trigger: 'blur'}
          ],
          realname: [
            {required: true, message: '真实姓名为必填项', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码为必填项', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      /**
       * 校验用户名是否存在
       */
      validateUsername: function (rule, value, callback) {
        if (!value) {
          callback(new Error('用户名为必填项'));
        }

        if (value === this.oldUsername) {
          callback();
        }

        this.get("validate/username/" + value, function () {
          callback();
        }, function () {
          callback(new Error('用户名已存在'));
        });
      },
      /**
       * 删除/恢复用户
       */
      onDeleteOrRecovery: function (operation) {
        let title = operation === 'delete' ? '删除' : '恢复';
        let that = this;
        let table = that.$refs.table;
        if (!table.hasSelection()) {
          that.$Message.warning("至少选择一行！");
          return;
        }

        that.$Modal.confirm({
          title: title + "确认",
          content: "确认" + title + "所选择的用户吗？",
          loading: true,
          closable: true,
          onOk: function () {
            this.post("system/user/" + operation, {
              "usernames": table.getSelectionFields("username").join(",")
            }, function (data) {
              that.$Message.success(data.respMsg);
              that.query(table);
            }, function () {
              that.$Message.error("网络错误，请稍后再试！");
            });
            this.$Modal.remove();
          }
        });
      },
      /**
       * 修改密码
       */
      onPassword: function () {
        if (this.$refs.table.hasSelection()) {
          this.user = {usernames: this.$refs.table.getSelectionFields("username").join(",")};
          this.$refs.passwordModal.show();
        } else {
          this.$Message.warning("至少选择一行！");
        }
      },
      /**
       * 新增用户
       */
      onCreate: function () {
        this.user = {};
        this.$refs.userModal.show();
      },
      /**
       * 提交成功
       */
      onSuccess: function () {
        this.query(this.$refs.table);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
