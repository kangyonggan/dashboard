<template>
  <div>
    <!--表格-->
    <Table :loading="loading" border :columns="columns" :data="pageInfo.list" @on-selection-change="selectionChange"
           @on-sort-change="sortChange($event, table)"/>

    <!--分页-->
    <Page v-if="pagination" :total="pageInfo.total" show-total show-sizer show-elevator :style="{marginTop: '20px'}"
          @on-change="jump($event, table)"
          @on-page-size-change="changePageSize($event, table)"></Page>
  </div>
</template>

<script>
  export default {
    props: {
      url: {
        required: true,
        type: String
      },
      columns: {
        required: true,
        type: Array
      },
      form: {
        type: Object
      },
      pagination: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        /**
         * 组件自身
         */
        table: this,
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
        selection: []
      }
    },
    mounted: function () {
      if (!this.pagination) {
        this.query(this);
      }
    },
    methods: {
      /**
       * 选中行发生变化时调用
       *
       * @param selection 已选项数据
       */
      selectionChange: function (selection) {
        this.selection = selection;
      },
      /**
       * 判断是否有选中的行
       *
       * @returns {boolean}
       */
      hasSelection: function () {
        return this.selection.length > 0;
      },
      /**
       * 获取选中的行
       *
       * @returns {*|Array}
       */
      getSelection: function () {
        return this.selection;
      },
      /**
       * 获取选中的行（指定字段）
       *
       * @param field
       * @returns {Array}
       */
      getSelectionFields: function (field) {
        let arr = [];
        for (let i = 0; i < this.selection.length; i++) {
          arr.push(this.selection[i][field]);
        }

        return arr;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
