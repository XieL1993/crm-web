<template>
  <div id="opportunity" ref="root">
    <div ref="header">
      <div class="search-box">
        <el-row>
          <el-col :span="8">
            <span class="item-label">商机名称</span>
            <el-input clearable v-model="query.oppName"></el-input>
          </el-col>
          <el-col :span="8">
            <span class="item-label">客户名称</span>
            <pick-input v-model="query.customer" icon="customer"></pick-input>
          </el-col>
          <el-col :span="8">
            <span class="item-label">商机状态</span>
            <el-select v-model="query.status" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.status.items"
                :key="item.dictEntryCode"
                :label="item.dictItemName"
                :value="item.dictEntryCode">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="item-label">商机类型</span>
            <el-select v-model="query.type" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.type.items"
                :key="item.dictEntryCode"
                :label="item.dictItemName"
                :value="item.dictEntryCode">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span class="item-label">成功率</span>
            <el-select v-model="query.successRate" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.successRate.items"
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
        <el-button class="customer reset" v-waves @click.native.prevent="addContract">新增合同</el-button>
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
          prop="customerDname"
          label="客户"
          show-overflow-tooltip
          align="center">
        </el-table-column>
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
          prop="successRateDname"
          label="成功率"
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
    <pick-customer v-if="query.customer.isShow" :multiple="false" v-model="query.customer"></pick-customer>
  </div>
</template>
<script>
  import { getOpportunityList } from '../api/opportunity'
  import { tableMixin } from '../common/js/tableMixin'
  import { mapActions } from 'vuex'

  export default {
    mixins: [tableMixin],
    data() {
      return {
        query: {
          oppName: '',
          customer: { data: [], tuid: '', display: '', isShow: false },
          status: '',
          type: '',
          successRate: ''
        },
        dicts: {
          status: { type: 'dict', name: 'BIZ_OPP_STAT', items: [] }, // 商机状态
          successRate: { type: 'dict', name: 'BIZ_OPP_RATE', items: [] }, // 商机状态
          type: { type: 'dict', name: 'BIZ_OPP_KIND', items: [] }// 商机类型
        }
      }
    },
    methods: {
      ...mapActions([
        'addOpportunityParams',
        'editOpportunityParams',
        'detailOpportunityParams',
        'addActivityParams',
        'addContractParams'
      ]),
      fetchData() {
        return getOpportunityList(
          this.isAll,
          this.query.oppName,
          this.query.customer.tuid,
          this.query.status,
          this.query.type,
          this.query.successRate,
          this.page.pageSize,
          this.page.currentPage
        )
      },
      addOpportunity() {
        this.addOpportunityParams({})
        this.$router.push({
          path: '/opportunity/add'
        })
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
      },
      addActivity() {
        if (this.selection.length === 0) {
          this.showError('请选择商机！')
        } else {
          const customer = { tuid: this.selection[0].customer, custName: this.selection[0].customerDname }
          const index = this.selection.findIndex(item => {
            return item.customer !== customer.tuid
          })
          if (index > -1) {
            this.showError('只能选择相同客户的商机！')
          } else {
            this.addActivityParams({ opportunity: this.selection, customer: [customer] })
            this.$router.push({
              path: '/activity/add'
            })
          }
        }
      },
      addContract() {
        if (this.selection.length === 0) {
          this.showError('请选择商机！')
        } else if (this.selection.length > 1) {
          this.showError('最多只能选择一条商机！')
        } else {
          const customer = { tuid: this.selection[0].customer, custName: this.selection[0].customerDname }
          this.addContractParams({ opportunity: this.selection, customer: [customer] })
          this.$router.push({
            path: '/contract/add'
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/mixin";

  #opportunity {
    @include table-page-css()
  }
</style>
