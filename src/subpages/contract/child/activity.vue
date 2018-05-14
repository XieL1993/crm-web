<template>
  <transition name="page-fade">
    <div id="contract-active">
      <div ref="header" class="header">
        <el-button class="customer reset" v-waves @click.native.prevent="addActivity">新建活动</el-button>
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
            prop="typeDname"
            label="活动类型"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="date"
            label="活动日期"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.date | formatDateTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="customerDname"
            label="客户名称"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="bdDname"
            label="BD"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="subject"
            label="活动主题"
            align="center"
            show-overflow-tooltip>
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
  import { getActivityList } from '../../../api/activity'
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
      ...mapActions(['editActivityParams', 'detailActivityParams']),
      fetchData() {
        return getActivityList(
          1,
          '',
          '',
          '',
          this.contractId,
          '',
          '',
          '',
          this.page.pageSize,
          this.page.currentPage
        )
      },
      addActivity() {
        this.$emit('addActivity')
      },
      edit(tuid) {
        this.editActivityParams({ tuid })
        this.$router.push({
          path: '/activity/edit'
        })
      },
      detail(tuid) {
        this.detailActivityParams({ tuid })
        this.$router.push({
          path: '/activity/detail'
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  #contract-active {
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
