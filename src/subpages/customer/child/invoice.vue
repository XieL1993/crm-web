<template>
  <div id="contract-invoice">
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
          prop="contractDname"
          label="合同名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="typeDname"
          label="收款类型"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          label="收款额"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="expectedTime"
          label="预计收款时间"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.expectedTime | formatDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="actualAmount"
          label="实际收款额"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="actualTime"
          label="实际收款时间"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.actualTime | formatDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isFinishedDname"
          label="是否收款完毕"
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
  import { getInvoiceList } from '../../../api/invoice'
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
        return getInvoiceList(
          1,
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
  #contract-invoice {
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
