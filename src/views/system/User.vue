<template>
  <div>
    <Form ref="form" :model="params" inline>
      <FormItem prop="username">
        <Input v-model="params.username" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem prop="realname">
        <Input v-model="params.realname" placeholder="请输入真实姓名"/>
      </FormItem>
      <FormItem prop="startCreatedTime">
        <DatePicker v-model="params.startCreatedTime" placeholder="请选择创建开始日期" @on-change="params.startCreatedTime=$event"/>
      </FormItem>
      <FormItem prop="endCreatedTime">
        <DatePicker v-model="params.endCreatedTime" placeholder="请选择创建结束日期" @on-change="params.endCreatedTime=$event"/>
      </FormItem>
      <Row>
        <FormItem>
          <Button type="info" icon="ios-search" @click="query($refs.form)">查询</Button>
          <Button type="warning" icon="ios-refresh-empty" @click="reset($refs.form)">清除</Button>
          <Button type="primary" icon="plus">新增</Button>
          <Button type="error" icon="trash-a" @click="$refs.deleteConfirm.show()">删除</Button>
          <Button type="warning" icon="ios-undo" @click="$refs.recoveryConfirm.show()">恢复</Button>
        </FormItem>
      </Row>
    </Form>

    <Table border :columns="columns" :data="pageInfo.list" @on-selection-change="selectionChange"/>

    <Page :total="pageInfo.total" show-total show-sizer show-elevator :style="{marginTop: '20px'}"
          @on-change="jump($event, $refs.form)" @on-page-size-change="changePageSize($event, $refs.form)"></Page>

    <Confirm ref="deleteConfirm" title="删除确认" content="此次删除为逻辑删除，可以对已删除的数据进行恢复！" btnText="确认删除" type="error" :ok="deleteBatch"/>
    <Confirm ref="recoveryConfirm" title="恢复确认" content="此次恢复为逻辑恢复，可以对已恢复的数据进行删除！" btnText="确认恢复" :ok="recoveryBatch"/>
  </div>
</template>

<script>
  import Confirm from '@/components/Confirm';

  export default {
    name: 'User',
    components: {Confirm},
    data() {
      return {
        /**
         * 搜索表单的参数
         */
        params: {},
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
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '设置密码')
              ]);
            }
          }]
      }
    },
    mounted: function () {
      /**
       * 初始化完成后发起查询
       */
      this.query(this.$refs.form);
    },
    methods: {
      /**
       * 批量删除
       */
      deleteBatch: function() {
        let usernames = [];
        for (let i = 0; i < this.selection.length; i++) {
          usernames.push(this.selection[i].username);
        }

        if (usernames.length === 0) {
          this.$Message.warning("至少选择一行！");
          this.$refs.deleteConfirm.hide();
          return;
        }

        let that = this;
        this.post("system/user/delete", {
          "usernames": usernames.join(",")
        }, function (data) {
          that.$Message.success(data.respMsg);
          that.query(that.$refs.form);
        });
        that.$refs.deleteConfirm.hide();
      },
      /**
       * 批量恢复
       */
      recoveryBatch: function() {
        let usernames = [];
        for (let i = 0; i < this.selection.length; i++) {
          usernames.push(this.selection[i].username);
        }

        if (usernames.length === 0) {
          this.$Message.warning("至少选择一行！");
          this.$refs.recoveryConfirm.hide();
          return;
        }

        let that = this;
        this.post("system/user/recovery", {
          "usernames": usernames.join(",")
        }, function (data) {
          that.$Message.success(data.respMsg);
          that.query(that.$refs.form);
        });
        that.$refs.recoveryConfirm.hide();
      },
      /**
       * 选中项发生变化
       *
       * @param selection 已选项数据
       */
      selectionChange: function (selection) {
        this.selection = selection;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
