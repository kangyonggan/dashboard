<template>
  <div class="table-pannel">
    <table :id="id" class="table table-striped table-bordered table-hover">
      <thead>
      <tr>
        <th v-for="field in fields" v-show="!field.hidden" :class="{'hidden-xs': field.hiddenXs}">{{field.title}}</th>
      </tr>
      </thead>

      <tbody>
      <tr class="no-records-found" v-if="!pageInfo.size">
        <td colspan="20">{{empty}}</td>
      </tr>
      <tr v-for="item in pageInfo.list">
        <td v-for="field in fields" v-show="!field.hidden" :class="{'hidden-xs': field.hiddenXs}">
          <span v-if="field.format">{{field.format(item[field.name], field.name, item)}}</span>
          <span v-else>{{item[field.name]}}</span>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="pull-right hidden-xs" v-if="pagination">
      <ul class="pagination">
        <li><a href="javascript:" class="page-info">第 {{pageInfo.startRow}}~{{pageInfo.endRow}} 条, 共 {{pageInfo.total}} 条,
          第 {{pageInfo.pageNum}} 页,
          共 {{pageInfo.pages}} 页</a></li>
      </ul>
    </div>

    <div class="pull-left" v-if="pagination">
      <ul class="pagination">
        <li v-if="pageInfo.hasPreviousPage" class="hidden-xs">
          <a @click="jump(1)">
            <i class="ace-icon fa fa-angle-double-left"></i>
          </a>
        </li>
        <li v-if="pageInfo.hasPreviousPage">
          <a @click="jump(pageInfo.prePage)">
            <i class="ace-icon fa fa-angle-left"></i>
          </a>
        </li>

        <li v-for="nav in pageInfo.navigatepageNums" :class="{'active': nav === pageInfo.pageNum}">
          <a href="javascript:" v-if="nav === pageInfo.pageNum">{{nav}}</a>
          <a v-else @click="jump(nav)">{{nav}}</a>
        </li>

        <li v-if="pageInfo.hasNextPage">
          <a @click="jump(pageInfo.nextPage)">
            <i class="ace-icon fa fa-angle-right"></i>
          </a>
        </li>

        <li v-if="pageInfo.hasNextPage" class="hidden-xs">
          <a @click="jump(pageInfo.pages)">
            <i class="ace-icon fa fa-angle-double-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      url: {
        required: true,
        type: String
      },
      fields: {
        required: true,
        type: Array
      },
      id: {
        required: false,
        type: String
      },
      pagination: {
        required: false,
        type: Boolean,
        default: true
      },
      form: {
        required: false,
        type: String,
        default: 'form'
      },
    },
    data() {
      return {
        empty: "没有找到匹配的记录",
        pageInfo: {}
      }
    },
    mounted: function () {
      this.load(this.url);
    },
    methods: {
      load: function (url) {
        let that = this;
        that.pageInfo = {};
        that.empty = "正在加载数据，请稍后...";
        this.get(url, function (data) {
          that.pageInfo = data.pageInfo;
          scroll(0, 0);
        }, function () {
          that.empty = "数据加载失败";
        });
      },
      jump: function (pageNum) {
        const params = $("#" + that.form).serialize();
        this.load(this.url + "?pageNum=" + pageNum + "&" + params);
      },
      query: function (e) {
        const params = $(e.target).parents("form").serialize();
        this.load(this.url + "?" + params);
      }
    }
  }
</script>

<style scoped>
  .table-pannel {
    width: 100%;
    float: left;
    margin-top: 16px;
  }

  .no-records-found {
    text-align: center;
  }

  .page-info {
    color: #545454;
    cursor: auto;
  }

  .page-info:hover {
    background-color: #fafafa;
  }
</style>
