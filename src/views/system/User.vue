<template>
  <div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="params" inline>
      <FormItem prop="username">
        <Input v-model="params.username" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem prop="realname">
        <Input v-model="params.realname" placeholder="请输入真实姓名"/>
      </FormItem>
      <FormItem prop="startCreatedTime">
        <DatePicker v-model="params.startCreatedTime" placeholder="请选择创建开始日期"
                    @on-change="params.startCreatedTime=$event"/>
      </FormItem>
      <FormItem prop="endCreatedTime">
        <DatePicker v-model="params.endCreatedTime" placeholder="请选择创建结束日期" @on-change="params.endCreatedTime=$event"/>
      </FormItem>
      <Row>
        <FormItem>
          <Button type="info" icon="ios-search" @click="query($refs.queryForm)">查询</Button>
          <Button type="warning" icon="ios-refresh-empty" @click="reset($refs.queryForm)">清除</Button>
          <Button type="primary" icon="plus" @click="onCreate">新增</Button>
          <Button type="error" icon="trash-a" @click="onDelete">删除</Button>
          <Button type="warning" icon="ios-undo" @click="onRecovery">恢复</Button>
          <Button type="info" icon="locked" @click="onPassword">修改密码</Button>
        </FormItem>
      </Row>
    </Form>

    <!--表格-->
    <Table border :columns="columns" :data="pageInfo.list" @on-selection-change="selectionChange"/>

    <!--分页-->
    <Page :total="pageInfo.total" show-total show-sizer show-elevator :style="{marginTop: '20px'}"
          @on-change="jump($event, $refs.queryForm)"
          @on-page-size-change="changePageSize($event, $refs.queryForm)"></Page>

    <!--新增/编辑-->
    <FormModal ref="userModal" :action="'system/user/' + (user.id ? 'update' : 'save')" :title="(user.id ? '编辑' : '新增') + '用户'" :model="user" :rules="userValidate" :success="onSuccess">
      <FormItem label="用户名" prop="username">
        <Input v-model="user.username" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem label="真实姓名" prop="realname">
        <Input v-model="user.realname" placeholder="请输入真实姓名"/>
      </FormItem>
      <FormItem label="密码" prop="password" v-if="!user.id">
        <Input type="password" v-model="user.password" placeholder="请输入密码"/>
      </FormItem>
    </FormModal>

    <!--修改密码-->
    <FormModal ref="passwordModal" action="system/user/password" title="修改密码" :model="user" :rules="userValidate" :success="onSuccess">
      <FormItem label="新密码" prop="password">
        <Input type="password" v-model="user.password" placeholder="请输入新密码"/>
      </FormItem>
    </FormModal>
  </div>
</template>

<script>
  import FormModal from "@/components/FormModal";

  export default {
    name: 'User',
    components: {FormModal},
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
         * 分页信息
         */
        pageInfo: {},
        /**
         * 已选择的行
         */
        selection: [],
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
            key: 'id'
          },
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '真实姓名',
            key: 'realname'
          },
          {
            title: '逻辑删除',
            key: 'isDeleted',
            render: (h, params) => {
              return this.yesNo(h, params);
            }
          },
          {
            title: '创建时间',
            key: 'createdTime'
          },
          {
            title: '更新时间',
            key: 'updatedTime'
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
            {required: true, message: '用户名为必填项'}
          ],
          realname: [
            {required: true, message: '真实姓名为必填项'}
          ],
          password: [
            {required: true, message: '密码为必填项'}
          ]
        }
      }
    },
    methods: {
      /**
       * 批量删除
       */
      deleteBatch: function () {
        let usernames = this.getSelections();
        if (usernames.length === 0) {
          return;
        }

        let that = this;
        this.post("system/user/delete", {
          "usernames": usernames.join(",")
        }, function (data) {
          that.$Message.success(data.respMsg);
          that.query(that.$refs.queryForm);
          that.selection = [];
        }, function () {
          that.$Message.error("网络错误，请稍后再试！");
        });
        this.$Modal.remove();
      },
      /**
       * 批量恢复
       */
      recoveryBatch: function () {
        let usernames = this.getSelections();
        if (usernames.length === 0) {
          return;
        }

        let that = this;
        this.post("system/user/recovery", {
          "usernames": usernames.join(",")
        }, function (data) {
          that.$Message.success(data.respMsg);
          that.query(that.$refs.queryForm);
          that.selection = [];
        }, function () {
          that.$Message.error("网络错误，请稍后再试！");
        });
        this.$Modal.remove();
      },
      /**
       * 选中行发生变化时调用
       *
       * @param selection 已选项数据
       */
      selectionChange: function (selection) {
        this.selection = selection;
      },
      /**
       * 删除用户
       */
      onDelete: function () {
        let that = this;
        this.$Modal.confirm({
          title: "删除确认",
          content: "确认删除所选择的用户吗？",
          loading: true,
          closable: true,
          onOk: function () {
            that.deleteBatch();
          }
        });
      },
      /**
       * 恢复用户
       */
      onRecovery: function () {
        let that = this;
        this.$Modal.confirm({
          title: "恢复确认",
          content: "确认恢复所选择的用户吗？",
          loading: true,
          closable: true,
          onOk: function () {
            that.recoveryBatch();
          }
        });
      },
      /**
       * 修改密码
       */
      onPassword: function () {
        let that = this;
        let usernames = this.getSelections();
        if (usernames.length > 0) {
          this.user = {usernames: usernames};
          this.$refs.passwordModal.show();
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
        this.query(this.$refs.queryForm);
      },
      /**
       * 获取选中的行
       *
       * @returns {Array}
       */
      getSelections: function () {
        let usernames = [];
        for (let i = 0; i < this.selection.length; i++) {
          usernames.push(this.selection[i].username);
        }

        if (usernames.length === 0) {
          this.$Message.warning("至少选择一行！");
          this.$Modal.remove();
        }

        return usernames;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
