<template>
  <div id="add-opportunity">
    <h3 class="form-title">基本信息</h3>
    <el-form :model="formItems" :rules="formRules" label-width="120px" inline :show-message="false" ref="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="商机名称" prop="oppName">
            <el-input clearable placeholder="请输入" v-model="formItems.oppName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="row_des">（提示：系统将根据您选择的产品、客户名称、创建时间自动组合为商机名称，您也可以自行录入)</p>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="customer">
            <pick-input v-model="formItems.customer" icon="customer"></pick-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="products">
            <select-tree v-model="formItems.products" :data="dicts.products.items"></select-tree>
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
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="BD" prop="bd">
            <el-select v-model="formItems.bd" clearable placeholder="请选择">
              <el-option v-for="item in dicts.bd.items" :key="item.tuid" :value="item.tuid" :label="item.realName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商机状态" prop="status">
            <el-select v-model="formItems.status" clearable placeholder="请选择">
              <el-option v-for="item in dicts.status.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计合同额(万元)" prop="estimate">
            <el-input clearable placeholder="请输入" v-model="formItems.estimate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预计合同签订时间" prop="expectedTime">
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
          <el-form-item label="商机类型" prop="type">
            <el-select v-model="formItems.type" clearable placeholder="请选择">
              <el-option v-for="item in dicts.type.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="竞争对手" class="textarea" prop="competitor">
            <el-input clearable placeholder="请输入" type="textarea"
                      v-model="formItems.competitor" resize="none"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="商机描述" class="textarea" prop="description">
            <el-input clearable placeholder="请输入" type="textarea"
                      v-model="formItems.description" resize="none"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-box">
      <el-button class="customer query" @click.native.prevent="__fetchData" v-waves :loading="loading">保存</el-button>
      <el-button class="customer reset" @click.native.prevent="back" v-waves>取消</el-button>
    </div>
    <pick-customer v-if="formItems.customer.isShow" :multiple="false" v-model="formItems.customer"></pick-customer>
  </div>
</template>
<script>
  import { formMixin } from '../../common/js/formMixin'
  import { opportunityData } from './js/data'
  import { addOpportunity } from '../../api/opportunity'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [formMixin, opportunityData],
    computed: {
      ...mapGetters(['addOpportunityParams'])
    },
    mounted() {
      this.fillData()
    },
    data() {
      return {
        successMsg: '注册商机成功！'
      }
    },
    methods: {
      fetchData() {
        return addOpportunity(this.getParams())
      },
      fillData() {
        if (this.addOpportunityParams.customer) {
          this.fillCustomer(this.addOpportunityParams.customer)
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #add-opportunity {
    @include form-page-css
  }
</style>
