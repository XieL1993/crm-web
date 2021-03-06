<template>
  <div id="contract" ref="root">
    <div ref="header">
      <div class="search-box">
        <el-row>
          <el-col :span="8">
            <span class="item-label">合同名称</span>
            <el-input clearable v-model="query.contractName"></el-input>
          </el-col>
          <el-col :span="8">
            <span class="item-label">客户名称</span>
            <pick-input v-model="query.customer" icon="customer"></pick-input>
          </el-col>
          <el-col :span="8">
            <span class="item-label">合同状态</span>
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
            <span class="item-label">签约类型</span>
            <el-select v-model="query.signType" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.signType.items"
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
        <el-button class="customer reset" v-waves @click.native.prevent="addContract">新建合同</el-button>
        <el-button class="customer reset" v-waves>新建收款</el-button>
        <el-button class="customer reset" v-waves @click.native.prevent="addActivity">新建活动</el-button>
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
  import { getContractList } from '../api/contract'
  import { tableMixin } from '../common/js/tableMixin'
  import { mapActions } from 'vuex'

  export default {
    mixins: [tableMixin],
    data() {
      return {
        query: {
          contractName: '',
          customer: { data: [], tuid: '', display: '', isShow: false },
          status: '',
          signType: ''
        },
        dicts: {
          status: { type: 'dict', name: 'BIZ_CON_STAT', items: [] }, // 合同状态
          signType: { type: 'dict', name: 'BIZ_OPP_KIND', items: [] }// 合同签约类型
        }
      }
    },
    methods: {
      ...mapActions([
        'addContractParams',
        'editContractParams',
        'detailContractParams',
        'addActivityParams'
      ]),
      fetchData() {
        return getContractList(
          this.isAll,
          this.query.contractName,
          this.query.customer.tuid,
          this.query.status,
          this.query.signType,
          this.page.pageSize,
          this.page.currentPage
        )
      },
      addContract() {
        this.addContractParams({})
        this.$router.push({
          path: '/contract/add'
        })
      },
      edit(tuid) {
        this.editContractParams({ tuid })
        this.$router.push({
          path: '/contract/edit'
        })
      },
      detail(tuid) {
        this.detailContractParams({ tuid })
        this.$router.push({
          path: '/contract/detail'
        })
      },
      addActivity() {
        if (this.selection.length === 0) {
          this.showError('请选择合同！')
        } else {
          const customer = { tuid: this.selection[0].customer, custName: this.selection[0].customerDname }
          const index = this.selection.findIndex(item => {
            return item.customer !== customer.tuid
          })
          if (index > -1) {
            this.showError('只能选择相同客户的合同！')
          } else {
            this.addActivityParams({ contract: this.selection, customer: [customer] })
            this.$router.push({
              path: '/activity/add'
            })
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/mixin";

  #contract {
    @include table-page-css()
  }
</style>
