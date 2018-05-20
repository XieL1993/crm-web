<template>
  <transition name="dialog-fade">
    <div id="mask-contract-product-detail" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>产品详细信息</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <div class="form">
          <el-row>
            <el-col :span="24">
              <span class="label">姓名：</span>
              <span class="value">{{product.contractDname}}</span>
            </el-col>
          </el-row>
            <el-row>
              <el-col :span="12">
                <span class="label">产品名称：</span>
                <span class="value">{{product.productDname}}</span>
              </el-col>
              <el-col :span="12">
                <span class="label">合同金额：</span>
                <span class="value">{{product.productAmount}} 万元</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="label">备注：</span>
                <span class="value single">{{product.description}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="btn-box">
            <el-button class="customer reset" @click.native.prevent="close" v-waves>关闭</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      product: {
        type: Object,
        default: ''
      }
    },
    computed: {
      ...mapGetters(['sidebar'])
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #mask-contract-product-detail {
    @include dialog-detail-css();
  }
</style>
