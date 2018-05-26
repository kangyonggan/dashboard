<template>
  <div>
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data() {
      return {
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
              return h('div', [
                h('span', this.yesNo(params.row.isDeleted))
              ]);
            },
            filters: [
              {
                label: '未删除',
                value: '0'
              },
              {
                label: '已删除',
                value: '1'
              }
            ],
            filterMethod (value, row) {
              return row.isDeleted.indexOf(value) > -1;
            }
          },
          {
            title: '创建时间',
            key: 'createdTime',
            render: (h, params) => {
              return h('div', [
                h('span', this.dateTime(params.row.createdTime))
              ]);
            }
          },
          {
            title: '更新时间',
            key: 'updatedTime',
            render: (h, params) => {
              return h('div', [
                h('span', this.dateTime(params.row.updatedTime))
              ]);
            }
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
                }, '详情'),
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
          }],
        data: [{
          id: '1',
          username: 'admin',
          realname: '管理员',
          isDeleted: '0',
          createdTime: '1527330702000',
          updatedTime: '1527333702000'
        }, {
          id: '2',
          username: 'xiaotiao',
          realname: '小跳',
          isDeleted: '1',
          createdTime: '1527330502000',
          updatedTime: '1527333502000'
        }, {
          id: '3',
          username: 'xiaoxin',
          realname: '小新',
          isDeleted: '0',
          createdTime: '1527330602000',
          updatedTime: '1527330902000'
        }]
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '用户详情',
          content: `ID：${this.data[index].id}<br>用户名：${this.data[index].username}<br>真实姓名：${this.data[index].realname}`
        })
      },
      remove (index) {
        this.data.splice(index, 1);
      },
      dateTime (time) {
        let date = new Date();
        date.setTime(time);
        return date.format('yyyy-MM-dd HH:mm:ss');
      },
      yesNo (value) {
        return value === '1' ? "是" : "否";
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
