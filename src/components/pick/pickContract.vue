<template>
  <transition name="dialog-fade">
    <div id="mask">
      <div class="dialog" ref="root">
        <div ref="header">
          <div class="header">
            <h3>选择合同</h3>
            <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
          </div>
          <div class="search-box">
            <span class="item-label">合同类型</span>
            <el-select v-model="isAll" clearable>
              <el-option v-for="item in types" :key="item.key" :value="item.key" :label="item.value">
              </el-option>
            </el-select>
            <span class="item-label">关键词</span>
            <el-input placeholder="请输入合同名称" v-model="query.contractName" clearable></el-input>
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
  import { getContractList } from '../../api/contract'
  import { dialogMixin } from '../../common/js/dialogMixin'

  export default {
    mixins: [dialogMixin],
    data() {
      return {
        types: [
          { key: 0, value: '我的合同' },
          { key: 1, value: '全部合同' }
        ],
        query: {
          contractName: ''
        }
      }
    },
    methods: {
      fetchData() {
        return getContractList(
          this.isAll,
          this.query.contractName,
          '',
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
