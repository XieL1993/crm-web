<template>
  <div id="inv-detail" ref="root">
    <div ref="header">
      <div class="header">
        <img class="avatar" src="../../common/image/opportunity.png"/>
        <div class="header-right">
          <div class="title-box">
            <span class="opp-name">{{invDetail.contractDname+'收款'}}</span>
            <svg-icon iconClass="edit" title="修改商机" @click.native.prevent="edit"></svg-icon>
          </div>
          <div class="info-box">
            <div class="info-item">
              <span class="info-label">实际收款时间：</span>
              <span class="info-value">{{invDetail.actualTime | formatDateTime}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">收款类型：</span>
              <span class="info-value">{{invDetail.typeDname}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <basic :inv-detail="invDetail"></basic>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getinvDetail } from '../../api/invoice'
  import Basic from './child/basic'

  export default {
    data() {
      return {
        invDetail: {}
      }
    },
    computed: {
      ...mapGetters(['detailInvoiceParams'])
    },
    created() {
      this.fetchDetail()
    },
    methods: {
      ...mapActions(['editInvoiceParams']),
      fetchDetail() {
        getinvDetail(this.detailInvoiceParams.tuid).then(data => {
          this.invDetail = data.obj
        })
      },
      edit() {
        this.editInvoiceParams({ tuid: this.detailInvoiceParams.tuid })
        this.$router.push({
          path: '/invoice/edit'
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

  #inv-detail {
    @include page-detail;
  }
</style>
