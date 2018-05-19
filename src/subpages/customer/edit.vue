<template>
  <div id="edit-customer">
    <h3 class="form-title">基本信息</h3>
    <el-form :model="formItems" :rules="formRules" label-width="120px" inline :show-message="false" ref="form">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户全称" prop="custName">
            <el-input placeholder="请选择" v-model="formItems.custName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户编号" prop="custNo">
            <el-input placeholder="请选择" v-model="formItems.custNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户简称" prop="custShortName">
            <el-input placeholder="请选择" v-model="formItems.custShortName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户英文名称" prop="custEnglish">
            <el-input placeholder="请选择" v-model="formItems.custEnglish"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工商登记号" prop="identificationNumber">
            <el-input placeholder="请选择" v-model="formItems.identificationNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户邮编" prop="postcode">
            <el-input placeholder="请选择" v-model="formItems.postcode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="省 / 市 / 区" prop="area">
            <el-cascader expand-trigger="hover" :options="dicts.area.items" v-model="formItems.area">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户地址" prop="address">
            <el-input placeholder="请选择" v-model="formItems.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户联系电话" prop="phone">
            <el-input placeholder="请选择" v-model="formItems.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户行业" prop="type">
            <el-select v-model="formItems.industry" clearable placeholder="请选择">
              <el-option v-for="item in dicts.industry.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户传真" prop="fax">
            <el-input placeholder="请输入" v-model="formItems.fax"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户销售" prop="sales">
            <el-select v-model="formItems.sales" clearable placeholder="请选择">
              <el-option v-for="item in dicts.sales.items" :key="item.tuid" :value="item.tuid" :label="item.realName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户类别" prop="type">
            <el-select v-model="formItems.type" clearable placeholder="请选择">
              <el-option v-for="item in dicts.type.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户bd" prop="bd">
            <el-select v-model="formItems.bd" clearable placeholder="请选择">
              <el-option v-for="item in dicts.bd.items" :key="item.tuid" :value="item.tuid" :label="item.realName">
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
      <el-button class="customer query" @click.native.prevent="__fetchData" v-waves :loading="loading">保存</el-button>
      <el-button class="customer reset" @click.native.prevent="back" v-waves>取消</el-button>
    </div>
  </div>
</template>
<script>
  import { formMixin } from '../../common/js/formMixin'
  import { customerData } from './js/data'
  import { getCusDetail, updateCustomer } from '../../api/customer'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [formMixin, customerData],
    computed: {
      ...mapGetters(['editCustomerParams'])
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        successMsg: '编辑客户成功！'
      }
    },
    methods: {
      fetchData() {
        return updateCustomer(this.editCustomerParams.tuid, this.getParams())
      },
      fetchDetail() {
        getCusDetail(this.editCustomerParams.tuid).then(data => {
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

  #edit-customer {
    @include form-page-css
  }
</style>
