<template>
  <div id="edit-invoice">
    <h3 class="form-title">基本信息</h3>
    <el-form :model="formItems" :rules="formRules" label-width="120px" inline :show-message="false" ref="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="合同名称" prop="contract">
            <pick-input v-model="formItems.contract" icon="contract"></pick-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="收款类型" prop="type">
            <el-select v-model="formItems.type" clearable placeholder="请选择">
              <el-option v-for="item in dicts.type.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款额(万元)" prop="totalAmount">
            <el-input placeholder="请选择" v-model="formItems.totalAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否开发票" prop="isInvoice">
            <el-select v-model="formItems.isInvoice" clearable placeholder="请选择">
              <el-option v-for="item in dicts.isInvoice.items" :key="item.key" :value="item.key" :label="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开发票时间" prop="invoiceTime">
            <el-date-picker
              size="mini"
              v-model="formItems.invoiceTime"
              placeholder="选择日期"
              align="center"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计收款时间" prop="expectedTime">
            <el-date-picker
              size="mini"
              v-model="formItems.expectedTime"
              placeholder="选择日期"
              align="center"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际收款额(万元)" prop="actualAmount">
            <el-input placeholder="请选择" v-model="formItems.actualAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="实际收款时间" prop="expectedTime">
            <el-date-picker
              size="mini"
              v-model="formItems.actualTime"
              placeholder="选择日期"
              align="center"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否收款完毕" prop="isFinished">
            <el-select v-model="formItems.isFinished" clearable placeholder="请选择">
              <el-option v-for="item in dicts.isFinished.items" :key="item.key" :value="item.key" :label="item.value">
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
    <pick-contract v-if="formItems.contract.isShow" :multiple="false" v-model="formItems.contract"></pick-contract>
  </div>
</template>
<script>
  import { formMixin } from '../../common/js/formMixin'
  import { invoiceData } from './js/data'
  import { getinvDetail, undateInvoice } from '../../api/invoice'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [formMixin, invoiceData],
    computed: {
      ...mapGetters(['editInvoiceParams'])
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        successMsg: '编辑收款成功！'
      }
    },
    methods: {
      fetchData() {
        return undateInvoice(this.editInvoiceParams.tuid, this.getParams())
      },
      fetchDetail() {
        getinvDetail(this.editInvoiceParams.tuid).then(data => {
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

  #edit-invoice {
    @include form-page-css
  }
</style>
