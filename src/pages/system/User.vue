<template>
  <div>
    <Form id="searchForm" :border="true" :inline="true">
      <Input name="username" label="用户名"/>
      <Input name="realname" label="真实姓名"/>
      <Input name="beginDate" label="创建开始日期" type="date"/>
      <Input name="endDate" label="创建结束日期" type="date"/>

      <Actions>
        <Button name="查询" icon="fa-search" clazz="btn-sm btn-purple" table="table"/>
        <Button name="重置" icon="fa-undo" clazz="btn-sm btn-default" type="reset"/>
        <Button name="新增用户" icon="fa-plus" clazz="btn-sm btn-skin" :click="create"/>
      </Actions>
    </Form>

    <Table ref="table" url="dashboard/system/user" form="searchForm">
      <template slot="ths">
        <th>ID</th>
        <th>用户名</th>
        <th>真实姓名</th>
        <th>逻辑删除</th>
        <th>创建时间</th>
        <th>操作</th>
      </template>

      <template slot-scope="app" slot="tds">
        <td>{{app.item.id}}</td>
        <td>{{app.item.username}}</td>
        <td>{{app.item.realname}}</td>
        <td>{{app.item.isDeleted | YesNo}}</td>
        <td>{{app.item.createdTime | DateTime}}</td>
        <td>
          <Button name="编辑" :data-index="app.index" clazz="btn-xs btn-inverse" :click="edit"/>
        </td>
      </template>
    </Table>
  </div>
</template>

<script>
  import Form from "../../components/form/Form.vue";
  import Input from "../../components/form/Input.vue";
  import Actions from "../../components/form/Actions.vue";
  import Button from "../../components/form/Button.vue";
  import Table from "../../components/table/Table.vue";
  import Modal from "./Modal.vue";

  export default {
    components: {Form, Input, Actions, Button, Table},
    name: 'SystemUser',
    data() {
      return {
        user: {}
      }
    },
    methods: {
      create: function () {
        this.user = {};
        this.modal('新增用户');
      },
      edit: function (e) {
        this.user = this.$refs.table.getItem($(e.target).data("index"));
        this.modal('编辑用户');
      },
      modal: function (title) {
        this.$layer.iframe({
          title: title,
          area: ['600px', '400px'],
          shadeClose: false,
          content: {
            content: Modal,
            parent: this,
            data: {
              'user': this.user
            }
          },
          end: function () {
            console.log("关闭后回调");
          }
        });
      }
    }
  }
</script>
