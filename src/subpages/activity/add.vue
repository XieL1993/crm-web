<template>
  <div id="add-activity">
    <h3 class="form-title">基本信息</h3>
    <el-form :model="formItems" :rules="formRules" label-width="120px" inline :show-message="false" ref="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="活动主题" prop="subject">
            <el-input clearable placeholder="请输入" v-model="formItems.subject"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="row_des">（提示：系统将根据您选择的产品、客户名称、创建时间自动组合为商机名称，您也可以自行录入)</p>
      <el-row>
        <el-col :span="24">
          <el-form-item label="商机名称" prop="oppId">
            <div class="pick-box">
              <input v-model="pick.oppIds.display" readonly placeholder="请选择" @click="pick.oppIds.isShow=true">
              <div class="icon-box" v-waves @click="pick.oppIds.isShow=true">
                <el-icon name="search"></el-icon>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="合同名称" prop="contractId">
            <div class="pick-box">
              <input v-model="pick.contractIds.display" readonly placeholder="请选择"
                     @click="pick.contractIds.isShow=true">
              <div class="icon-box" v-waves @click="pick.contractIds.isShow=true">
                <el-icon name="search"></el-icon>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="customer">
            <div class="pick-box">
              <input v-model="pick.customer.display" readonly placeholder="请选择" @click="pick.customer.isShow=true">
              <div class="icon-box" v-waves @click="pick.customer.isShow=true">
                <el-icon name="search"></el-icon>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="products">
            <select-tree v-model="formItems.products" :data="dicts.products.items"></select-tree>
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
          <el-form-item label="活动对接人" prop="contact">
            <el-input placeholder="请选择" v-model="formItems.contact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动日期" prop="date">
            <el-date-picker
              size="mini"
              v-model="formItems.date"
              placeholder="选择日期"
              align="center"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动类型" prop="type">
            <el-select v-model="formItems.type" clearable placeholder="请选择">
              <el-option v-for="item in dicts.type.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="地点" prop="address">
            <el-input placeholder="请输入" v-model="formItems.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="内容描述" class="textarea" prop="content">
            <el-input class="textarea" clearable placeholder="请输入" type="textarea"
                      v-model="formItems.content" resize="none"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-box">
      <el-button class="customer query" @click.native.prevent="__fetchData" v-waves :loading="loading">保存</el-button>
      <el-button class="customer reset" @click.native.prevent="cancel" v-waves>取消</el-button>
    </div>
    <pick-customer v-if="pick.customer.isShow" @close="pick.customer.isShow=false" @finish="pickCustomerFinish"
                   :multiple="false" :data="pick.customer.data"></pick-customer>
    <pick-opportunity v-if="pick.oppIds.isShow" @close="pick.oppIds.isShow=false" @finish="pickOpportunityFinish"
                      :multiple="true" :data="pick.oppIds.data"></pick-opportunity>
    <pick-contract v-if="pick.contractIds.isShow" @close="pick.contractIds.isShow=false" @finish="pickContractFinish"
                   :multiple="true" :data="pick.contractIds.data"></pick-contract>
  </div>
</template>
<script>
  import { formMixin } from '../../common/js/formMixin'
  import PickCustomer from '../../components/pick/pickCustomer'
  import PickOpportunity from '../../components/pick/pickOpportunity'
  import PickContract from '../../components/pick/pickContract'
  import { addActivity } from '../../api/activity'
  import SelectTree from '../../components/selectTree'

  export default {
    mixins: [formMixin],
    data() {
      return {
        pick: {
          oppIds: {
            data: [],
            display: '',
            isShow: false
          },
          contractIds: {
            data: [],
            display: '',
            isShow: false
          },
          customer: {
            data: [],
            display: '',
            isShow: false
          }
        },
        formItems: {
          address: '',
          bd: '',
          contact: '',
          content: '',
          contractIds: [],
          customer: '',
          date: '',
          oppIds: [],
          products: '',
          subject: '',
          type: ''
        },
        formRules: {
          customer: [{ required: true, message: '必填项' }],
          date: [{ required: true, message: '必填项' }],
          subject: [{ required: true, message: '必填项' }]
        },
        dicts: {
          bd: { type: 'user', name: '0', items: [] }, // bd
          type: { type: 'dict', name: 'BIZ_ACT_KIND', items: [] }, // 活动类型
          products: { type: 'products', items: [] } //  产品树
        }
      }
    },
    methods: {
      pickOpportunityFinish(data) {
        this.pick.oppIds.data = data
        let names = ''
        const ids = []
        for (const { tuid, oppName } of data) {
          if (tuid && oppName) {
            names += `,${oppName}`
            ids.push(tuid)
          }
        }
        this.pick.oppIds.display = names.substring(1)
        this.formItems.oppIds = ids
      },
      pickContractFinish(data) {
        this.pick.contractIds.data = data
        let names = ''
        const ids = []
        for (const { tuid, contractName } of data) {
          if (tuid && contractName) {
            names += `,${contractName}`
            ids.push(tuid)
          }
        }
        this.pick.contractIds.display = names.substring(1)
        this.formItems.contractIds = ids
      },
      pickCustomerFinish(data) {
        this.pick.customer.data = data
        const { tuid, custName } = data[0]
        this.pick.customer.display = custName
        this.formItems.customer = tuid
      },
      fetchData() {
        return addActivity(this.formItems)
      },
      success() {
        this.$confirm('新建活动成功！', '提示', {
          confirmButtonText: '活动',
          cancelButtonText: '退出',
          type: 'success',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          this.go('/activity')
        }).catch(() => {
          this.go()
        })
      }
    },
    components: {
      PickOpportunity,
      PickContract,
      PickCustomer,
      SelectTree
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #add-activity {
    @include form-page-css
  }
</style>
