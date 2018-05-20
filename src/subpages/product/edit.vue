<template>
  <transition name="dialog-fade">
    <div id="mask-product-edit" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>编辑产品</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <el-form :model="formItems" :rules="formRules" label-width="100px" inline :show-message="false" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品名称" prop="productName">
                  <el-input clearable placeholder="请输入" v-model="formItems.productName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品编号" prop="productNo">
                  <el-input clearable placeholder="请输入" v-model="formItems.productNo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属产品线" prop="productLine">
                  <el-select v-model="formItems.productLine" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.productLine.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品类型" prop="productLine">
                  <el-select v-model="formItems.type" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.type.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品状态" prop="productLine">
                  <el-select v-model="formItems.status" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.status.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" class="textarea" prop="remarks">
                  <el-input clearable placeholder="请输入" type="textarea"
                            v-model="formItems.remarks" resize="none"></el-input>
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
  import { productData } from './js/data'
  import { getProductDetail, updateProduct } from '../../api/product'

  export default {
    mixins: [childFormMixin, productData],
    props: {
      productId: {
        type: String,
        default: ''
      }
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        successMsg: '编辑产品成功！'
      }
    },
    methods: {
      fetchData() {
        return updateProduct(this.productId, this.getParams())
      },
      fetchDetail() {
        getProductDetail(this.productId).then(data => {
          this.dealDetail(data)
        }).catch(error => {
          this.showError(error.message)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #mask-product-edit {
    @include dialog-form-css
  }
</style>
