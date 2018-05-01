<template>
  <transition name="page-fade">
    <div id="opp-contract">
      <div ref="header" class="header">
        <el-button class="customer reset" v-waves @click.native.prevent="addActivity">新建合同</el-button>
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
            prop="customerDname"
            label="客户名称"
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
            prop=""
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
          <el-table-column
            fixed="right"
            label="操作"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">查看</el-button>
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
  import { getContractList } from '../../../api/contract'
  import { childTableMixin } from '../../../common/js/childTableMixin'
  import { mapActions } from 'vuex'

  export default {
    mixins: [childTableMixin],
    props: {
      cusNo: {
        type: String,
        default: ''
      }
    },
    methods: {
      ...mapActions(['setActivityId']),
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
      },
      addActivity() {
        this.$router.push({
          path: '/activity/add'
        })
      },
      edit(tuid) {
        this.setActivityId(tuid)
        this.$router.push({
          path: '/activity/edit'
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  #opp-contract {
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
