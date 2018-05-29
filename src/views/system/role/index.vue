<template>
  <div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="role" inline>
      <FormItem prop="code">
        <AppSelectRemote :model="role" prop="code" url="system/role/search" placeholder="请输入角色代码"/>
      </FormItem>
      <FormItem prop="name">
        <AppSelectRemote :model="role" prop="name" url="system/role/search" placeholder="请输入角色名称"/>
      </FormItem>
      <FormItem prop="startCreatedTime">
        <AppDatePicker :model="role" prop="startCreatedTime" placeholder="请选择创建开始日期"/>
      </FormItem>
      <FormItem prop="endCreatedTime">
        <AppDatePicker :model="role" prop="endCreatedTime" placeholder="请选择创建结束日期"/>
      </FormItem>
      <Row>
        <FormItem>
          <Button type="info" icon="ios-search" @click="refresh($refs.table)">查询</Button>
          <Button type="warning" icon="ios-refresh-empty" @click="reset($refs.queryForm)">清除</Button>
          <Button type="primary" icon="plus" @click="$refs.roleModal.show({})">新增</Button>
          <Button type="error" icon="trash-a" @click="onDeleteOrRecovery('delete')">删除</Button>
          <Button type="warning" icon="ios-undo" @click="onDeleteOrRecovery('recovery')">恢复</Button>
        </FormItem>
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="system/role" :columns="columns" :form="$refs.queryForm"/>

    <!--新增/编辑角色的界面-->
    <RoleFormModal ref="roleModal" @success="refresh($refs.table)"/>
  </div>
</template>

<script>
  import RoleFormModal from "./role-form-modal.vue";

  export default {
    components: {RoleFormModal},
    data() {
      return {
        /**
         * 搜索表单的参数
         */
        role: {},
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
            title: '角色代码',
            key: 'code',
            sortable: true
          },
          {
            title: '角色名称',
            key: 'name',
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
                      this.$refs.roleModal.show({
                        id: params.row.id,
                        code: params.row.code,
                        name: params.row.name
                      });
                    }
                  }
                }, '编辑')]);
            }
          }]
      }
    },
    methods: {
      /**
       * 删除/恢复角色
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
          content: "确认" + title + "所选择的角色吗？",
          loading: true,
          closable: true,
          onOk: function () {
            this.post("system/role/" + operation, {
              "codes": table.getSelectionFields("code").join(",")
            }, function (data) {
              that.$Message.success(data.respMsg);
              that.refresh(table);
            }, function () {
              that.$Message.error("网络错误，请稍后再试！");
            });
            this.$Modal.remove();
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
