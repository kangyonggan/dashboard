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
          <Button type="info" icon="ios-search" @click="query">查询</Button>
          <Button type="warning" icon="ios-refresh-empty" @click="reset($refs.form)">清除</Button>
          <Button type="primary" icon="plus">新增</Button>
          <Button type="error" icon="minus">删除</Button>
        </FormItem>
      </Row>
    </Form>

    <Table border :columns="columns" :data="pageInfo.list"/>
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
         * 分页信息
         */
        pageInfo: {},
        /**
         * 表格的列
         */
        columns: [
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
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }]
      }
    },
    mounted: function () {
      /**
       * 初始化完成后发起查询
       */
      this.query();
    },
    methods: {
      /**
       * 查询
       */
      query: function () {
        let that = this;
        this.get("system/user" + that.getQueryParams(this.params), function (data) {
          that.pageInfo = data.pageInfo;
        }, function () {
          that.$Message.error('网络错误，请稍后再试!');
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
