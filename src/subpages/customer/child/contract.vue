<template>
  <div id="cus-contract">
    <div ref="header" class="header"></div>
    <div class="table-box">
      <el-table
        :height="tableHeight"
        size="mini"
        tooltip-effect="dark"
        border
        v-loading="loading"
        :data="tableData">
        <el-table-column
          prop="contractNo"
          label="合同编号"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="contractName"
          label="合同名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="productsDname"
          label="产品名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="typeDname"
          label="合同类型"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="statusDname"
          label="合同状态"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="bdDname"
          label="BD"
          show-overflow-tooltip
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer" ref="footer">
      <el-pagination
        background
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total, prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { getContractList } from '../../../api/contract'
  import { childTableMixin } from '../../../common/js/childTableMixin'

  export default {
    mixins: [childTableMixin],
    props: {
      cusNo: {
        type: String,
        default: ''
      }
    },
    methods: {
      fetchData() {
        return getContractList(
          1,
          '',
          this.cusNo,
          '',
          '',
          this.page.pageSize,
          this.page.currentPage
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  #cus-contract {
    .header {
      padding: 15px 30px;
    }
    .table-box {
      margin: 0 30px;
    }
    .table-footer {
      padding: 10px 30px;
      height: 48px;
      .el-pagination {
        height: 28px;
        padding: 0;
        text-align: left;
        font-size: 12px;
        color: #555555;
      }
    }
  }

</style>
