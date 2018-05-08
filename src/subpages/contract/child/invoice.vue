<template>
  <transition name="page-fade">
    <div id="contract-invoice">
      <div ref="header" class="header">
        <el-button class="customer reset" v-waves @click.native.prevent="addInvoice">新建收款</el-button>
      </div>
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
          <el-table-column
            fixed="right"
            label="操作"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.native.prevent="edit(scope.row.tuid)">编辑</el-button>
              <el-button type="text" size="small" @click.native.prevent="detail(scope.row.tuid)">查看</el-button>
            </template>
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
  </transition>
</template>
<script>
  import { getInvoiceList } from '../../../api/invoice'
  import { childTableMixin } from '../../../common/js/childTableMixin'
  import { mapActions } from 'vuex'

  export default {
    mixins: [childTableMixin],
    props: {
      contractId: {
        type: String,
        default: ''
      }
    },
    methods: {
      ...mapActions(['setInvoiceId']),
      fetchData() {
        return getInvoiceList(
          1,
          '',
          this.contractId,
          '',
          this.page.pageSize,
          this.page.currentPage
        )
      },
      addInvoice() {
        this.$router.push({
          path: '/invoice/add'
        })
      },
      edit(tuid) {
        this.setInvoiceId(tuid)
        this.$router.push({
          path: '/invoice/edit'
        })
      },
      detail(tuid) {
        this.setInvoiceId(tuid)
        this.$router.push({
          path: '/invoice/detail'
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  #contract-invoice {
    &.page-fade-enter-active, &.page-fade-leave-active {
      transition: opacity 0.4s ease-in-out;
    }
    &.page-fade-enter, &.page-fade-leave-to {
      opacity: 0;
    }
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
