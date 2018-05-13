<template>
  <div id="customer" ref="root">
    <div ref="header">
      <div class="search-box">
        <el-row>
          <el-col :span="8">
            <span class="item-label">客户名称</span>
            <el-input clearable v-model="query.cusName"></el-input>
          </el-col>
          <el-col :span="8">
            <span class="item-label">客户行业</span>
            <el-select v-model="query.cusIndustry" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.cusIndustry.items"
                :key="item.dictEntryCode"
                :label="item.dictItemName"
                :value="item.dictEntryCode">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span class="item-label">客户类型</span>
            <el-select v-model="query.cusType" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.cusType.items"
                :key="item.dictEntryCode"
                :label="item.dictItemName"
                :value="item.dictEntryCode">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="btn-box">
        <el-button class="customer query" @click.native.prevent="__fetchData" v-waves>查询</el-button>
        <el-button class="customer reset" @click.native.prevent="resetQuery" v-waves>清空</el-button>
      </div>
      <div class="tab-box">
        <div class="tab-list">
          <span class="tab-item" :class="{active:isAll===0}" @click="isAll=0">我的</span>
          <span class="tab-item" :class="{active:isAll===1}" @click="isAll=1">全部</span>
          <i class=" line" :class="{active:isAll}"></i>
        </div>
      </div>
      <div class="operate-box">
        <el-button class="customer reset" v-waves @click.native.prevent="addOpportunity">注册商机</el-button>
        <el-button class="customer reset" v-waves @click.native.prevent="addActivity">新建活动</el-button>
        <el-button class="customer reset" v-waves>新增合同</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
        :height="tableHeight"
        size="mini"
        tooltip-effect="dark"
        border
        v-loading="loading"
        :data="tableData"
        row-key="tuid"
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
</template>
<script>
  import { getCustomerList } from '../api/customer'
  import { tableMixin } from '../common/js/tableMixin'
  import { mapActions } from 'vuex'

  export default {
    mixins: [tableMixin],
    data() {
      return {
        query: {
          cusName: '',
          cusIndustry: '',
          cusType: ''
        },
        dicts: {
          cusIndustry: { type: 'dict', name: 'BIZ_CUST_TRADE', items: [] }, // 客户行业
          cusType: { type: 'dict', name: 'BIZ_CUST_KIND', items: [] }// 客户类别
        }
      }
    },
    methods: {
      ...mapActions(['addActivityParams']),
      fetchData() {
        return getCustomerList(
          this.isAll,
          this.query.cusName,
          this.query.cusIndustry,
          this.query.cusType,
          this.page.pageSize,
          this.page.currentPage
        )
      },
      addOpportunity() {
        this.$router.push({
          path: '/addOpportunity'
        })
      },
      addActivity() {
        if (this.selection.length === 0) {
          this.showError('请选择客户！')
        } else if (this.selection.length > 1) {
          this.showError('最多只能选择一条客户！')
        } else {
          this.addActivityParams({ customer: this.selection })
          this.$router.push({
            path: '/activity/add'
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/mixin";

  #customer {
    @include table-page-css()
  }
</style>
