<template>
  <div id="edit-opportunity">
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
            <el-input placeholder="请选择" v-model="formItems.products"></el-input>
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
            <el-input class="textarea" clearable placeholder="请输入" type="textarea"
                      v-model="formItems.competitor" resize="none"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="商机描述" class="textarea" prop="description">
            <el-input class="textarea" clearable placeholder="请输入" type="textarea"
                      v-model="formItems.description" resize="none"></el-input>
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
  </div>
</template>
<script>
  import { formMixin } from '../../common/js/formMixin'
  import PickCustomer from '../../components/pick/pickCustomer'
  import { undateOpportunity, getOppDetail } from '../../api/opportunity'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [formMixin],
    computed: {
      ...mapGetters(['opportunityId'])
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        pick: {
          customer: {
            data: [],
            display: '',
            isShow: false
          }
        },
        formItems: {
          bd: '',
          competitor: '',
          customer: '',
          description: '',
          estimate: '',
          expectedTime: '',
          oppName: '',
          products: '66686df4-43a1-11e8-bf3b-00163e121ec4',
          sale: '',
          status: '',
          type: ''
        },
        formRules: {
          customer: [{ required: true, message: '必填项' }],
          oppName: [{ required: true, message: '必填项' }],
          products: [{ required: true, message: '必填项' }],
          status: [{ required: true, message: '必填项' }],
          type: [{ required: true, message: '必填项' }]
        },
        dicts: {
          sale: { type: 'user', name: '2', items: [] }, // 销售
          bd: { type: 'user', name: '0', items: [] }, // bd
          status: { type: 'dict', name: 'BIZ_OPP_STAT', items: [] }, // 商机状态
          type: { type: 'dict', name: 'BIZ_OPP_KIND', items: [] } // 商机类型
        }
      }
    },
    methods: {
      pickCustomerFinish(data) {
        this.pick.customer.data = data
        const { tuid, custName } = data[0]
        this.pick.customer.display = custName
        this.formItems.customer = tuid
      },
      fetchData() {
        return undateOpportunity(this.opportunityId, this.formItems)
      },
      fetchDetail() {
        getOppDetail(this.opportunityId).then(data => {
          const oppDetail = data.obj
          for (const key of Object.keys(this.formItems)) {
            if (oppDetail[key]) {
              if (key === 'expectedTime') {
                this.formItems.expectedTime = new Date(oppDetail.expectedTime)
              } else if (key === 'customer') {
                this.formItems.customer = oppDetail.customer
                this.pick.customer.display = oppDetail.customerDname
                this.pick.customer.data = [
                  {
                    tuid: oppDetail.customer,
                    custName: oppDetail.customerDname
                  }
                ]
              } else {
                this.formItems[key] = oppDetail[key]
              }
            }
          }
        }).catch(error => {
          this.showError(error.message)
        })
      },
      success() {
        this.$alert('编辑商机成功！', '提示', {
          confirmButtonText: '确定',
          type: 'success',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          this.go()
        })
      }
    },
    components: {
      PickCustomer
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #edit-opportunity {
    @include form-page-css
  }
</style>
