<template>
  <transition name="dialog-fade">
    <div id="mask-product-detail" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>{{productDetail.productName}}</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="form">
          <el-row>
            <el-col :span="12">
              <span class="label">产品名称：</span>
              <span class="value">{{productDetail.productName}}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">产品编号：</span>
              <span class="value">{{productDetail.productNo}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="label">产品编号：</span>
              <span class="value">{{productDetail.productNo}}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">所属产品线：</span>
              <span class="value">{{productDetail.productLineDname}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="label">产品状态：</span>
              <span class="value">{{productDetail.statusDname}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="label">备注：</span>
              <span class="value single">{{productDetail.remarks}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="btn-box">
          <el-button class="customer reset" @click.native.prevent="close" v-waves>取消</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { getProductDetail } from '../../api/product'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      productId: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters(['sidebar'])
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        productDetail: {}
      }
    },
    methods: {
      fetchDetail() {
        getProductDetail(this.productId).then(data => {
          this.productDetail = data.obj
        })
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #mask-product-detail {
    @include dialog-detail-css()
  }
</style>
