<template>
  <div id="opp-detail" ref="root">
    <div ref="header">
      <div class="header">
        <img class="avatar" src="../../common/image/opportunity.png"/>
        <div class="header-right">
          <div class="title-box">
            <span class="opp-name">{{oppDetail.oppName}}</span>
            <svg-icon iconClass="edit" title="修改商机" @click.native.prevent="edit"></svg-icon>
          </div>
          <div class="info-box">
            <div class="info-item">
              <span class="info-label">创建时间：</span>
              <span class="info-value">{{oppDetail.createTime | formatDateTime}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">商机状态：</span>
              <span class="info-value">{{oppDetail.statusDname}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-box">
        <div class="tab-list">
          <span class="tab-item" :class="{active:isAll===0}" @click="isAll=0">基本信息</span>
          <span class="tab-item" :class="{active:isAll===1}" @click="isAll=1">合同</span>
          <span class="tab-item" :class="{active:isAll===2}" @click="isAll=2">活动计划</span>
          <i class=" line" :style="{left: 30+80*isAll + 'px'}"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <basic :opp-detail="oppDetail" v-if="isAll===0"></basic>
      <contract v-if="isAll===1" :height="subHeight" :cusNo="oppDetail.customer"></contract>
      <activity v-if="isAll===2" :height="subHeight" :oppId="oppDetail.tuid"></activity>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getOppDetail } from '../../api/opportunity'
  import Basic from './child/basic'
  import Contract from './child/contract'
  import Activity from './child/activity'

  export default {
    data() {
      return {
        isAll: 0,
        oppDetail: {},
        subHeight: 0
      }
    },
    computed: {
      ...mapGetters(['opportunityId'])
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
      ...mapActions(['setOpportunityId']),
      fetchDetail() {
        getOppDetail(this.opportunityId).then(data => {
          this.oppDetail = data.obj
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
        this.setOpportunityId(this.oppDetail.tuid)
        this.$router.push({
          path: '/opportunity/edit'
        })
      }
    },
    components: {
      Basic,
      Contract,
      Activity
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/mixin";

  #opp-detail {
    @include page-detail;
  }
</style>
