<template>
  <div id="add-activity">
    <h3 class="form-title">基本信息</h3>
    <el-form :model="formItems" :rules="formRules" label-width="120px" inline :show-message="false" ref="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="合同名称" prop="contractName">
            <el-input clearable placeholder="请输入" v-model="formItems.contractName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="customer">
            <pick-input v-model="formItems.customer" icon="customer"></pick-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商机名称" prop="opportunity">
            <pick-input v-model="formItems.opportunity" icon="opportunity"></pick-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="products">
            <select-tree v-model="formItems.products" :data="dicts.products.items" check-key="tuid"
                         check-label="productName" :check-level="true"></select-tree>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同编号" prop="contractNo">
            <el-input clearable placeholder="请输入" v-model="formItems.contractNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="销售" prop="sale">
            <el-select v-model="formItems.sale" clearable placeholder="请选择">
              <el-option v-for="item in dicts.sale.items" :key="item.tuid" :value="item.tuid" :label="item.realName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="BD" prop="bd">
            <el-select v-model="formItems.bd" clearable placeholder="请选择">
              <el-option v-for="item in dicts.bd.items" :key="item.tuid" :value="item.tuid" :label="item.realName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="签约类型" prop="signType">
            <el-select v-model="formItems.signType" clearable placeholder="请选择">
              <el-option v-for="item in dicts.signType.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型" prop="contractType">
            <el-select v-model="formItems.contractType" clearable placeholder="请选择">
              <el-option v-for="item in dicts.contractType.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同状态" prop="status">
            <el-select v-model="formItems.status" clearable placeholder="请选择">
              <el-option v-for="item in dicts.status.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同总金额 (万元)" prop="amount">
            <el-input clearable placeholder="请输入" v-model="formItems.amount"></el-input>
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
        <el-col :span="8">
          <el-form-item label="合同签订时间" prop="signTime">
            <el-date-picker
              size="mini"
              v-model="formItems.signTime"
              placeholder="选择日期"
              align="center"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="服务开始时间" prop="startTime">
            <el-date-picker
              size="mini"
              v-model="formItems.startTime"
              placeholder="选择日期"
              align="center"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="服务到期时间" prop="expiryTime">
            <el-date-picker
              size="mini"
              v-model="formItems.expiryTime"
              placeholder="选择日期"
              align="center"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同核算日" prop="adjustTime">
            <el-date-picker
              size="mini"
              v-model="formItems.adjustTime"
              placeholder="选择日期"
              align="center"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否开展业务" prop="isBusiness">
            <el-select v-model="formItems.isBusiness" clearable placeholder="请选择">
              <el-option v-for="item in dicts.isBusiness.items" :key="item.key" :value="item.key" :label="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="收款信息" class="textarea" prop="receiptInfo">
            <el-input clearable placeholder="请输入" type="textarea"
                      v-model="formItems.receiptInfo" resize="none"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="内容描述" class="textarea" prop="description">
            <el-input clearable placeholder="请输入" type="textarea"
                      v-model="formItems.description" resize="none"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-upload class="attach-box" :action="uploadUrl" multiple :on-success="uplodSuccess" :on-remove="uploadRemove"
               :on-preview="preview" :headers="headers" :file-list="defaultFileList">
      <div class="header">
        <span class="info" @click.prevent.stop="">附件</span>
        <el-button class="customer query" v-waves>点击上传</el-button>
      </div>
      <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg .png</div>
    </el-upload>
    <div class="btn-box">
      <el-button class="customer query" @click.native.prevent="__fetchData" v-waves :loading="loading">保存</el-button>
      <el-button class="customer reset" @click.native.prevent="back" v-waves>取消</el-button>
    </div>
    <pick-opportunity v-if="formItems.opportunity.isShow" :multiple="false" v-model="formItems.opportunity"
                      :customer="customer" @link-customer="fillCustomer"></pick-opportunity>
    <pick-customer v-if="formItems.customer.isShow" :multiple="false" v-model="formItems.customer"></pick-customer>
    <image-preview v-if="showPreview" :img="currentAttach" @close="showPreview=false"></image-preview>
  </div>
</template>
<script>
  import { formMixin } from '../../common/js/formMixin'
  import { attachMixin } from '../../common/js/attachMixin'
  import { contractData } from './js/data'
  import { updateContract, getContractDetail } from '../../api/contract'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [formMixin, attachMixin, contractData],
    computed: {
      ...mapGetters(['editContractParams'])
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        successMsg: '编辑合同成功！'
      }
    },
    methods: {
      fetchData() {
        return updateContract(this.editContractParams.tuid, this.getParams())
      },
      fetchDetail() {
        getContractDetail(this.editContractParams.tuid).then(data => {
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

  #add-activity {
    @include form-page-css
  }
</style>
