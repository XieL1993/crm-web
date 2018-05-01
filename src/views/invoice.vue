<template>
  <div id="invoice" ref="root">
    <div ref="header">
      <div class="search-box">
        <el-row>
          <el-col :span="8">
            <span class="item-label">客户名称</span>
            <div class="pick-box">
              <input v-model="pick.customer.display" readonly placeholder="请选择" @click="pick.customer.isShow=true">
              <div class="icon-box" v-waves @click="pick.customer.isShow=true">
                <el-icon name="search"></el-icon>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <span class="item-label">合同名称</span>
            <div class="pick-box">
              <input v-model="pick.contract.display" readonly placeholder="请选择"
                     @click="pick.contract.isShow=true">
              <div class="icon-box" v-waves @click="pick.contract.isShow=true">
                <el-icon name="search"></el-icon>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <span class="item-label">是否收款完毕</span>
            <el-select v-model="query.isFinished" clearable placeholder="请选择">
              <el-option v-for="item in isFinished" :key="item.key" :value="item.key" :label="item.value">
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
        <el-button class="customer reset" v-waves @click.native.prevent="addInvoice">新建收款</el-button>
      </div>
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
          type="selection"
          width="60"
          align="center">
        </el-table-column>
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
    <pick-customer v-if="pick.customer.isShow" @close="pick.customer.isShow=false" @finish="pickCustomerFinish"
                   :multiple="false" :data="pick.customer.data"></pick-customer>
    <pick-contract v-if="pick.contract.isShow" @close="pick.contract.isShow=false" @finish="pickContractFinish"
                   :multiple="true" :data="pick.contract.data"></pick-contract>
  </div>
</template>
<script>
  import { getInvoiceList } from '../api/invoice'
  import { tableMixin } from '../common/js/tableMixin'
  import { mapActions } from 'vuex'
  import PickCustomer from '../components/pick/pickCustomer'
  import PickContract from '../components/pick/pickContract'

  export default {
    mixins: [tableMixin],
    data() {
      return {
        isFinished: [
          { key: '1', value: '是' },
          { key: '0', value: '否' }
        ],
        pick: {
          contract: {
            data: [],
            display: '',
            isShow: false
          },
          customer: {
            data: [],
            display: '',
            isShow: false
          }
        },
        query: {
          customer: '',
          contract: '',
          isFinished: ''
        },
        dicts: {
          isFinished: { type: 'dict', name: 'BIZ_INV_KIND', items: [] } // 是否收款完毕
        }
      }
    },
    methods: {
      ...mapActions(['setInvoiceId']),
      fetchData() {
        return getInvoiceList(
          this.isAll,
          this.query.customer,
          this.query.contract,
          this.query.isFinished,
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
      },
      pickContractFinish(data) {
        this.pick.contract.data = data
        let names = ''
        let ids = ''
        for (const { tuid, contractName } of data) {
          if (tuid && contractName) {
            names += `,${contractName}`
            ids += `,${tuid}`
          }
        }
        this.pick.contract.display = names.substring(1)
        this.query.contract = ids.substring(1)
      },
      pickCustomerFinish(data) {
        this.pick.customer.data = data
        const { tuid, custName } = data[0]
        this.pick.customer.display = custName
        this.query.customer = tuid
      }
    },
    components: {
      PickContract,
      PickCustomer
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/mixin";

  #invoice {
    @include table-page-css()
  }
</style>
