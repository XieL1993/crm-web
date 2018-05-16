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
            <pick-input v-model="query.customer" icon="customer"></pick-input>
          </el-col>
          <el-col :span="8">
            <span class="item-label">商机名称</span>
            <pick-input v-model="query.opportunity" icon="opportunity"></pick-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="item-label">合同名称</span>
            <pick-input v-model="query.contract" icon="contract"></pick-input>
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
    <pick-customer v-if="query.customer.isShow" :multiple="false" v-model="query.customer"></pick-customer>
    <pick-opportunity v-if="query.opportunity.isShow" :multiple="false" v-model="query.opportunity"></pick-opportunity>
    <pick-contract v-if="query.contract.isShow" :multiple="false" v-model="query.contract"></pick-contract>
  </div>
</template>
<script>
  import { getActivityList } from '../api/activity'
  import { tableMixin } from '../common/js/tableMixin'
  import { mapActions } from 'vuex'
  import { pickerOptions } from '../common/js/utils'

export default {
    mixins: [tableMixin],
    data() {
      return {
        pickerOptions: pickerOptions(),
        query: {
          subject: '',
          customer: { data: [], tuid: '', display: '', isShow: false },
          opportunity: { data: [], tuid: '', display: '', isShow: false },
          contract: { data: [], tuid: '', display: '', isShow: false },
          type: '',
          date: []
        },
        dicts: {
          type: { type: 'dict', name: 'BIZ_ACT_KIND', items: [] } // 活动类型
        }
      }
    },
    methods: {
      ...mapActions(['addActivityParams', 'editActivityParams', 'detailActivityParams']),
      fetchData() {
        return getActivityList(
          this.isAll,
          this.query.subject,
          this.query.customer.tuid,
          this.query.opportunity.tuid,
          this.query.contract.tuid,
          this.query.type,
          this.query.date[0],
          this.query.date[1],
          this.page.pageSize,
          this.page.currentPage
        )
      },
      addActivity() {
        this.addActivityParams({})
        this.$router.push({
          path: '/activity/add'
        })
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
  @import "../common/styles/mixin";

  #activity {
    @include table-page-css()
  }
</style>
