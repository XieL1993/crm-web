<template>
  <div id="act-detail" ref="root">
    <div ref="header">
      <div class="header">
        <svg-icon icon-class="cusactivity" class="avatar activity"></svg-icon>
        <div class="header-right">
          <div class="title-box">
            <span class="opp-name">{{actDetail.subject}}</span>
            <svg-icon iconClass="edit" title="修改商机" @click.native.prevent="edit"></svg-icon>
          </div>
          <div class="info-box">
            <div class="info-item">
              <span class="info-label">活动日期：</span>
              <span class="info-value">{{actDetail.date | formatDateTime}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">活动类型：</span>
              <span class="info-value">{{actDetail.typeDname}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <basic :act-detail="actDetail"></basic>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getActDetail } from '../../api/activity'
  import Basic from './child/basic'

  export default {
    data() {
      return {
        actDetail: {}
      }
    },
    computed: {
      ...mapGetters(['detailActivityParams'])
    },
    created() {
      this.fetchDetail()
    },
    methods: {
      ...mapActions(['editActivityParams']),
      fetchDetail() {
        getActDetail(this.detailActivityParams.tuid).then(data => {
          this.actDetail = data.obj
        }).catch(error => {
          this.$message.info(error.message)
        })
      },
      edit() {
        this.editActivityParams({ tuid: this.detailActivityParams.tuid })
        this.$router.push({
          path: '/activity/edit'
        })
      }
    },
    components: {
      Basic
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/mixin";

  #act-detail {
    @include page-detail;
  }
</style>
