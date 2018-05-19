<template>
  <div>
    <Form :border="true" :inline="true">
      <Input name="username" label="用户名"/>
      <Input name="realname" label="真实姓名"/>
      <Input name="beginDate" label="创建开始日期" type="date"/>
      <Input name="endDate" label="创建结束日期" type="date"/>

      <Actions>
        <Button name="查询" icon="fa-search" clazz="btn-purple" table="table"/>
        <Button name="清除" icon="fa-undo" clazz="btn-warning" type="reset"/>
        <Button name="新增用户" icon="fa-plus"/>
      </Actions>
    </Form>

    <Table url="dashboard/system/user">
      <Th title="ID" field="id" :sortable="true"/>
      <Th title="用户名" field="username"/>
      <Th title="真实姓名" field="realname"/>
      <Th title="创建时间" field="createdTime"/>
    </Table>
  </div>
</template>

<script>
  import Form from "../../components/form/Form.vue";
  import Input from "../../components/form/Input.vue";
  import Actions from "../../components/form/Actions.vue";
  import Button from "../../components/form/Button.vue";
  import Table from "../../components/table/Table.vue";
  import Th from "../../components/table/Th.vue";

  export default {
    components: {Form, Input, Actions, Button, Table, Th},
    name: 'SystemUser'
  }
</script>
