<template>
  <div id="contract-detail" ref="root">
    <div ref="header">
      <div class="header">
        <svg-icon icon-class="cuscontract" class="avatar contract"></svg-icon>
        <div class="header-right">
          <div class="title-box">
            <span class="opp-name">{{contractDetail.contractName}}</span>
            <svg-icon iconClass="edit" title="修改合同" @click.native.prevent="edit"></svg-icon>
          </div>
          <div class="info-box">
            <div class="info-item">
              <span class="info-label">合同编号：</span>
              <span class="info-value">{{contractDetail.contractNo}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间：</span>
              <span class="info-value">{{contractDetail.createTime | formatDateTime}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-box">
        <div class="tab-list">
          <span class="tab-item" :class="{active:isAll===0}" @click="isAll=0">基本信息</span>
          <span class="tab-item" :class="{active:isAll===1}" @click="isAll=1">收款</span>
          <span class="tab-item" :class="{active:isAll===2}" @click="isAll=2">活动计划</span>
          <span class="tab-item" :class="{active:isAll===2}" @click="isAll=3">产品</span>
          <i class=" line" :style="{left: 30+80*isAll + 'px'}"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <basic :contract-detail="contractDetail" v-if="isAll===0"></basic>
      <invoice v-if="isAll===1" :height="subHeight" :contract-id="contractDetail.tuid"
               @addInvoice="addInvoice"></invoice>
      <activity v-if="isAll===2" :height="subHeight" :contract-id="contractDetail.tuid"
                @addActivity="addActivity"></activity>
      <product v-if="isAll===3" :height="subHeight" :contract-id="contractDetail.tuid"
               :contract-name="contractDetail.contractName"></product>

    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getContractDetail } from '../../api/contract'
  import Basic from './child/basic'
  import Invoice from './child/invoice'
  import Activity from './child/activity'
  import Product from './child/product'

  export default {
    data() {
      return {
        isAll: 0,
        contractDetail: {},
        subHeight: 0
      }
    },
    computed: {
      ...mapGetters(['detailContractParams'])
    },
    created() {
      this.fetchDetail()
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
        'editContractParams',
        'addActivityParams',
        'addInvoiceParams'
      ]),
      fetchDetail() {
        getContractDetail(this.detailContractParams.tuid).then(data => {
          this.contractDetail = data.obj
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
        this.editContractParams({ tuid: this.detailContractParams.tuid })
        this.$router.push({ path: '/contract/edit' })
      },
      addActivity() {
        this.addActivityParams({
          contract: [{
            tuid: this.contractDetail.tuid,
            contractName: this.contractDetail.contractName
          }],
          customer: [{
            tuid: this.contractDetail.customer,
            custName: this.contractDetail.customerDname
          }]
        })
        this.$router.push({ path: '/activity/add' })
      },
      addInvoice() {
        this.addInvoiceParams({
          contract: [{
            tuid: this.contractDetail.tuid,
            contractName: this.contractDetail.contractName
          }]
        })
        this.$router.push({ path: '/invoice/add' })
      }
    },
    components: {
      Basic,
      Invoice,
      Activity,
      Product
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/mixin";

  #contract-detail {
    @include page-detail;
  }
</style>
