<template>
  <div id="cus-detail" ref="root">
    <div ref="header">
      <div class="header">
        <img class="avatar" src="../../common/image/opportunity.png"/>
        <div class="header-right">
          <div class="title-box">
            <span class="opp-name">{{cusDetail.custName}}</span>
            <span class="type-name">{{cusDetail.typeDname}}</span>
            <svg-icon iconClass="edit" title="修改商机" @click.native.prevent="edit"></svg-icon>
          </div>
          <div class="info-box">
            <div class="info-item">
              <span class="info-label">客户编号：</span>
              <span class="info-value">{{cusDetail.custNo}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间：</span>
              <span class="info-value">{{cusDetail.createTime | formatDateTime}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">联系方式：</span>
              <span class="info-value">{{cusDetail.phone}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">地址：</span>
              <span class="info-value">{{cusDetail.address}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-box">
        <div class="tab-list">
          <span class="tab-item" :class="{active:isAll===0}" @click="isAll=0">概况</span>
          <span class="tab-item" :class="{active:isAll===1}" @click="isAll=1">基本信息</span>
          <span class="tab-item" :class="{active:isAll===2}" @click="isAll=2">合同</span>
          <span class="tab-item" :class="{active:isAll===3}" @click="isAll=3">活动计划</span>
          <i class=" line" :style="{left: 30+80*isAll + 'px'}"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <over-view v-if="isAll===0" :overviewData="overviewData" :remindData="remindData"></over-view>
      <basic :cus-detail="cusDetail" v-if="isAll===1"></basic>
      <contract v-if="isAll===2" :height="subHeight" :cusNo="cusDetail.tuid" @addContract="addContract"></contract>
      <activity v-if="isAll===3" :height="subHeight" :oppId="cusDetail.tuid" @addActivity="addActivity"></activity>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getCusDetail, getCustOverview, getCustRemind } from '../../api/customer'
  import OverView from './child/overview'
  import Basic from './child/basic'
  import Contract from './child/contract'
  import Activity from './child/activity'

  export default {
    data() {
      return {
        isAll: 0,
        cusDetail: {},
        subHeight: 0,
        overviewData: [],
        remindData: []
      }
    },
    computed: {
      ...mapGetters(['detailCustomerParams'])
    },
    created() {
      this.fetchDetail()
      getCustOverview(this.detailCustomerParams.tuid).then(res => {
        this.overviewData = res.obj
      })
      getCustRemind(this.detailCustomerParams.tuid).then(res => {
        this.remindData = res.obj
      })
    },
    mounted() {
      this.setSubHeight()
      let timer = 0
      window.addEventListener('resize', () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.setSubHeight()
        })
      }, 100)// 100毫秒内只执行一次resize
    },
    methods: {
      ...mapActions([
        'editOpportunityParams',
        'addActivityParams',
        'addContractParams'
      ]),
      fetchDetail() {
        getCusDetail(this.detailCustomerParams.tuid).then(data => {
          this.cusDetail = data.obj
        })
      },
      setSubHeight() { // 计算带表格的子页面高度
        if (this.$refs.root && this.$refs.header) {
          const rHeight = this.$refs.root.parentElement.parentElement.clientHeight - 8// 根容器
          const hHeight = this.$refs.header.clientHeight
          this.subHeight = rHeight - hHeight - 1
        }
      },
      edit() {
        this.editOpportunityParams({ tuid: this.detailOpportunityParams.tuid })
        this.$router.push({ path: '/opportunity/edit' })
      },
      addActivity() {
        this.addActivityParams({
          opportunity: [{
            tuid: this.cusDetail.tuid,
            oppName: this.cusDetail.oppName
          }],
          customer: [{
            tuid: this.cusDetail.customer,
            custName: this.cusDetail.customerDname
          }]
        })
        this.$router.push({ path: '/activity/add' })
      },
      addContract() {
        this.addContractParams({
          opportunity: [{
            tuid: this.cusDetail.tuid,
            oppName: this.cusDetail.oppName
          }],
          customer: [{
            tuid: this.cusDetail.customer,
            custName: this.cusDetail.customerDname
          }]
        })
        this.$router.push({ path: '/contract/add' })
      }
    },
    components: {
      OverView,
      Basic,
      Contract,
      Activity
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/mixin";

  #cus-detail {
    @include page-detail;
  }
</style>
