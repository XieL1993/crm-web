<template>
  <transition name="dialog-fade">
    <div id="mask">
      <div class="dialog" ref="root">
        <div ref="header">
          <div class="header">
            <h3>选择客户</h3>
            <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
          </div>
          <div class="search-box">
            <span class="item-label">客户类型</span>
            <el-select v-model="isAll" clearable>
              <el-option v-for="item in types" :key="item.key" :value="item.key" :label="item.value">
              </el-option>
            </el-select>
            <span class="item-label">关键词</span>
            <el-input placeholder="请输入客户名称" v-model="query.cusName" clearable></el-input>
            <el-button class="customer query" @click.native.prevent="__fetchData" v-waves>查询</el-button>
          </div>
        </div>
        <div class="table-box">
          <el-table
            ref="table"
            row-key="tuid"
            :height="tableHeight"
            size="mini"
            tooltip-effect="dark"
            border
            v-loading="loading"
            :data="tableData"
            @selection-change="onChange">
            <el-table-column
              :reserve-selection="true"
              type="selection"
              width="60"
              align="center">
            </el-table-column>
            <el-table-column
              prop="custNo"
              label="客户编号"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="custName"
              label="客户名称"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="industry"
              label="行业"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="salesDname"
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
              prop="typeDname"
              label="客户类型"
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
          <el-button class="customer query" @click.native.prevent="confirm" v-waves>确定</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { getCustomerList } from '../../api/customer'
  import { dialogMixin } from '../../common/js/dialogMixin'

  export default {
    mixins: [dialogMixin],
    data() {
      return {
        labelKey: 'custName',
        types: [
          { key: 0, value: '我的客户' },
          { key: 1, value: '全部客户' }
        ],
        query: {
          cusName: ''
        }
      }
    },
    methods: {
      fetchData() {
        return getCustomerList(
          this.isAll,
          this.query.cusName,
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
  @import "../../common/styles/mixin";

  #mask {
    @include pick-dialog
  }

</style>
