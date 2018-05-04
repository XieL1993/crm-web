<template>
  <div id="activity" ref="root">
    <div ref="header">
      <div class="search-box">
        <el-row>
          <el-col :span="8">
            <span class="item-label">活动主题</span>
            <el-input clearable v-model="query.subject"></el-input>
          </el-col>
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
            <span class="item-label">商机名称</span>
            <div class="pick-box">
              <input v-model="pick.opportunity.display" readonly placeholder="请选择"
                     @click="pick.opportunity.isShow=true">
              <div class="icon-box" v-waves @click="pick.opportunity.isShow=true">
                <el-icon name="search"></el-icon>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
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
            <span class="item-label">活动类型</span>
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
            <span class="item-label">活动时间</span>
            <el-date-picker
              size="mini"
              v-model="query.date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
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
        :data="tableData">
        <el-table-column
          type="selection"
          width="60"
          align="center">
        </el-table-column>
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
    <pick-customer v-if="pick.customer.isShow" @close="pick.customer.isShow=false" @finish="pickCustomerFinish"
                   :multiple="false" :data="pick.customer.data"></pick-customer>
    <pick-opportunity v-if="pick.opportunity.isShow" @close="pick.opportunity.isShow=false"
                      @finish="pickOpportunityFinish"
                      :multiple="true" :data="pick.opportunity.data"></pick-opportunity>
    <pick-contract v-if="pick.contract.isShow" @close="pick.contract.isShow=false" @finish="pickContractFinish"
                   :multiple="true" :data="pick.contract.data"></pick-contract>
  </div>
</template>
<script>
  import { getActivityList } from '../api/activity'
  import { tableMixin } from '../common/js/tableMixin'
  import { mapActions } from 'vuex'
  import PickCustomer from '../components/pick/pickCustomer'
  import PickOpportunity from '../components/pick/pickOpportunity'
  import PickContract from '../components/pick/pickContract'

  export default {
    mixins: [tableMixin],
    data() {
      return {
        pick: {
          opportunity: {
            data: [],
            display: '',
            isShow: false
          },
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
          subject: '',
          customer: '',
          opportunity: '',
          contract: '',
          type: '',
          date: []
        },
        dicts: {
          type: { type: 'dict', name: 'BIZ_ACT_KIND', items: [] } // 活动类型
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    methods: {
      ...mapActions(['setActivityId']),
      fetchData() {
        return getActivityList(
          this.isAll,
          this.query.subject,
          this.query.customer,
          this.query.opportunity,
          this.query.contract,
          this.query.type,
          (this.query.date && this.query.date[0]) || '',
          (this.query.date && this.query.date[1]) || '',
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
      },
      detail(tuid) {
        this.setActivityId(tuid)
        this.$router.push({
          path: '/activity/detail'
        })
      },
      pickOpportunityFinish(data) {
        this.pick.opportunity.data = data
        let names = ''
        let ids = ''
        for (const { tuid, oppName } of data) {
          if (tuid && oppName) {
            names += `,${oppName}`
            ids += `,${tuid}`
          }
        }
        this.pick.opportunity.display = names.substring(1)
        this.query.opportunity = ids.substring(1)
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
      PickOpportunity,
      PickContract,
      PickCustomer
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/mixin";

  #activity {
    @include table-page-css()
  }
</style>
