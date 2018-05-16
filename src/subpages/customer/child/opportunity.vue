<template>
  <div id="cus-opportunity">
    <div ref="header" class="header">
      <el-button class="customer reset" v-waves @click.native.prevent="addActivity">新建商机</el-button>
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
          prop="oppName"
          label="商机名称"
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
          prop="saleDname"
          label="销售"
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
          prop="statusDname"
          label="商机状态"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="estimate"
          label="预计合同额（万元）"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="expectedTime"
          label="预计合同签订时间"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.expectedTime | formatDateTime}}</span>
          </template>
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
</template>
<script>
  import { getOpportunityList } from '../../../api/opportunity'
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
      ...mapActions(['editOpportunityParams', 'detailOpportunityParams']),
      fetchData() {
        return getOpportunityList(
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
        this.$emit('addOpportunity')
      },
      edit(tuid) {
        this.editOpportunityParams({ tuid })
        this.$router.push({
          path: '/opportunity/edit'
        })
      },
      detail(tuid) {
        this.detailOpportunityParams({ tuid })
        this.$router.push({
          path: '/opportunity/detail'
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  #cus-opportunity {
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
