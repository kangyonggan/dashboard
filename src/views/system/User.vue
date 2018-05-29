<template>
  <div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="params" inline>
      <FormItem prop="username">
        <Select
          v-model="params.username"
          filterable
          clearable
          remote
          :remote-method="selectUsername"
          :loading="searchLoading" placeholder="请输入用户名">
          <Option v-for="(option, index) in users" :value="option.username" :key="index">{{option.username}}</Option>
        </Select>
      </FormItem>
      <FormItem prop="realname">
        <Select
          v-model="params.realname"
          filterable
          clearable
          remote
          :remote-method="selectRealname"
          :loading="searchLoading" placeholder="请输入真实姓名">
          <Option v-for="(option, index) in users" :value="option.realname" :key="index">{{option.realname}}</Option>
        </Select>
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
    <Table :loading="loading" border :columns="columns" :data="pageInfo.list" @on-selection-change="selectionChange"
           @on-sort-change="sortChange($event, params, $refs.queryForm)"/>

    <!--分页-->
    <Page :total="pageInfo.total" show-total show-sizer show-elevator :style="{marginTop: '20px'}"
          @on-change="jump($event, $refs.queryForm)"
          @on-page-size-change="changePageSize($event, $refs.queryForm)"></Page>

    <!--新增/编辑-->
    <FormModal ref="userModal" :action="'system/user/' + (user.id ? 'update' : 'save')"
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
    </FormModal>

    <!--修改密码-->
    <FormModal ref="passwordModal" action="system/user/password" title="修改密码" :model="user" :rules="userValidate"
               :success="onSuccess">
      <FormItem label="新密码" prop="password">
        <Input type="password" v-model="user.password" placeholder="请输入新密码"/>
      </FormItem>
    </FormModal>
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
         * 远程搜索的用户
         */
        users: [],
        /**
         * 远程搜索用户加载中标识
         */
        searchLoading: false,
        /**
         * 老的用户名
         */
        oldUsername: '',
        /**
         * 分页信息
         */
        pageInfo: {},
        /**
         * 表格加载中
         */
        loading: false,
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
       * 批量删除
       */
      deleteBatch: function () {
        let usernames = this.getSelections();

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
        if (this.getSelections().length === 0) {
          return;
        }

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
        if (this.getSelections().length === 0) {
          return;
        }

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
      },
      /**
       * 搜索用户
       *
       * @param key
       * @param value
       */
      searchUser: function (key, value) {
        if (value !== '') {
          this.searchLoading = true;
          let that = this;
          this.get("system/user/search?" + key + "=" + value, function (data) {
            that.users = data.users;
            that.searchLoading = false;
          }, function () {
            that.searchLoading = false;
          });
        } else {
          this.users = [];
        }
      },
      /**
       * 按用户名搜索
       *
       * @param query
       */
      selectUsername: function (query) {
        this.searchUser("username", query);
      },
      /**
       * 按真实姓名搜索
       *
       * @param query
       */
      selectRealname: function (query) {
        this.searchUser("realname", query);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
