<template>
  <transition name="dialog-fade">
    <div id="mask-contract-product-edit" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>编辑合同产品</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <el-form :model="formItems" :rules="formRules" label-width="100px" inline :show-message="false" ref="form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="合同名称" prop="contract">
                  <el-input clearable placeholder="请输入" v-model="contractName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品名称" prop="product">
                  <select-tree v-model="formItems.product" :data="dicts.product.items" :check-level="true"
                               check-key="tuid" check-label="productName" :multiple="false"></select-tree>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同金额(万元)" prop="productAmount">
                  <el-input clearable placeholder="请输入" v-model="formItems.productAmount"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" class="textarea" prop="description">
                  <el-input clearable placeholder="请输入" type="textarea"
                            v-model="formItems.description" resize="none"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="btn-box">
            <el-button class="customer query" @click.native.prevent="__fetchData" v-waves :loading="loading">保存
            </el-button>
            <el-button class="customer reset" @click.native.prevent="close" v-waves>取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { childFormMixin } from '../../common/js/childFormMixin'
  import { productData } from './js/productData'
  import { updateContractProduct } from '../../api/contract'
  import SelectTree from '../../components/selectTree'

  export default {
    mixins: [childFormMixin, productData],
    props: {
      product: {
        type: Object,
        default: ''
      }
    },
    created() {
      this.dealDetail(this.product)
    },
    data() {
      return {
        successMsg: '编辑合同产品成功！'
      }
    },
    methods: {
      fetchData() {
        return updateContractProduct(this.product.tuid, this.getParams())
      }
    },
    components: {
      SelectTree
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #mask-contract-product-edit {
    @include dialog-form-css
  }
</style>
