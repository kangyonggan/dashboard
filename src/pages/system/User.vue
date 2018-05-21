<template>
  <div>
    <Form id="searchForm" :border="true" :inline="true">
      <Input name="username" label="用户名"/>
      <Input name="realname" label="真实姓名"/>
      <Input name="beginDate" label="创建开始日期" type="date"/>
      <Input name="endDate" label="创建结束日期" type="date"/>

      <Actions>
        <Button name="查询" icon="fa-search" clazz="btn-sm btn-purple" table="table"/>
        <Button name="清除" icon="fa-undo" clazz="btn-sm btn-default" type="reset"/>
        <Button name="新增用户" icon="fa-plus" clazz="btn-sm btn-skin" modal="formModal"/>
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
        <td>{{app.item.isDeleted}}</td>
        <td>{{app.item.createdTime}}</td>
        <td>
          <Button name="编辑" :data-index="app.index" modal="formModal" clazz="btn-xs btn-inverse" :click="edit"/>
        </td>
      </template>
    </Table>

    <Modal id="formModal" :title="user.id ? '编辑用户' : '新增用户'" :static="true">
      <Form id="userForm" method="post" :action="'dashboard/system/user/' + user.id ? 'update' : 'save'" slot="body">
        <Input name="username" label="用户名" :value="user.username" :required="true" :readonly="!!user.id"/>
        <Input name="realname" label="真实姓名" :value="user.realname" :required="true"/>
        <Input v-if="!user.id" name="password" label="密码" type="password" :value="user.password" :required="true"/>
        <Select2 name="roleCodes" label="角色" :value="user.roleCodes" placeholder="请选择角色"
                 url="dashboard/system/user/roles"
                 code="code" disp="name"/>
      </Form>

      <template slot="actions">
        <Button name="提交" icon="fa-check" clazz="btn-skin" form="userForm"/>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Form from "../../components/form/Form.vue";
  import Input from "../../components/form/Input.vue";
  import Actions from "../../components/form/Actions.vue";
  import Button from "../../components/form/Button.vue";
  import Table from "../../components/table/Table.vue";
  import Modal from "../../components/Modal.vue";
  import Select2 from "../../components/form/Select2.vue";

  export default {
    components: {Form, Input, Actions, Button, Table, Modal, Select2},
    name: 'SystemUser',
    data() {
      return {
        user: {},
        roles: []
      }
    },
    methods: {
      edit: function (e) {
        let user = this.$refs.table.getItem($(e.target).data("index"));
        let that = this;
        this.get("dashboard/system/user/" + user.username, function (data) {
          that.user = data.user;
          that.roles = data.roles;
        });
      }
    }
  }
</script>
