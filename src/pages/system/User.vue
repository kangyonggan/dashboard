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

    <Table ref="table" url="dashboard/system/user" :fields="fields" form="searchForm"/>

    <Modal id="formModal" title="新增用户" :static="true">
      <Form id="userForm" method="post" action="dashboard/system/user/save" slot="body">
        <Input name="username" label="用户名"/>
        <Input name="realname" label="真实姓名"/>
        <Input name="password" label="密码" type="password"/>
        <Input name="roleCodes" label="角色"/>
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

  export default {
    components: {Form, Input, Actions, Button, Table, Modal},
    name: 'SystemUser',
    data() {
      return {
        fields: [{
          title: 'ID',
          name: 'id',
          hiddenXs: true
        }, {
          title: "用户名",
          name: 'username'
        }, {
          title: "真实姓名",
          name: 'realname'
        }, {
          title: "逻辑删除",
          name: 'isDeleted',
          format: yesNo
        }, {
          title: "创建时间",
          name: 'createdTime',
          format: datetime,
          hiddenXs: true
        }]
      }
    }
  }
</script>
