<template>
  <div id="add-invoice">
    <h3 class="form-title">基本信息</h3>
    <el-form :model="formItems" :rules="formRules" label-width="120px" inline :show-message="false" ref="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="合同名称" prop="contract">
            <div class="pick-box">
              <input v-model="pick.contract.display" readonly placeholder="请选择"
                     @click="pick.contract.isShow=true">
              <div class="icon-box" v-waves @click="pick.contract.isShow=true">
                <el-icon name="search"></el-icon>
              </div>
            </div>
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
              <el-option v-for="item in isInvoice" :key="item.key" :value="item.key" :label="item.value">
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
              <el-option v-for="item in isFinished" :key="item.key" :value="item.key" :label="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" class="textarea" prop="remarks">
            <el-input class="textarea" clearable placeholder="请输入" type="textarea"
                      v-model="formItems.remarks" resize="none"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-box">
      <el-button class="customer query" @click.native.prevent="__fetchData" v-waves :loading="loading">保存</el-button>
      <el-button class="customer reset" @click.native.prevent="cancel" v-waves>取消</el-button>
    </div>
    <pick-contract v-if="pick.contract.isShow" @close="pick.contract.isShow=false" @finish="pickContractFinish"
                   :multiple="false" :data="pick.contract.data"></pick-contract>
  </div>
</template>
<script>
  import { formMixin } from '../../common/js/formMixin'
  import PickContract from '../../components/pick/pickContract'
  import { addInvoice } from '../../api/invoice'

  export default {
    mixins: [formMixin],
    data() {
      return {
        isInvoice: [
          { key: 1, value: '已开' },
          { key: 0, value: '未开' }
        ],
        isFinished: [
          { key: 1, value: '是' },
          { key: 0, value: '否' }
        ],
        pick: {
          contract: {
            data: [],
            display: '',
            isShow: false
          }
        },
        formItems: {
          actualAmount: '',
          actualTime: '',
          contract: '',
          expectedTime: '',
          invoiceTime: '',
          isFinished: '',
          isInvoice: '',
          remarks: '',
          totalAmount: '',
          type: ''
        },
        formRules: {
          contract: [{ required: true, message: '必填项' }]
        },
        dicts: {
          type: { type: 'dict', name: 'BIZ_INV_KIND', items: [] } // 收款类型
        }
      }
    },
    methods: {
      pickContractFinish(data) {
        this.pick.contract.data = data
        const { tuid, contractName } = data[0]
        this.pick.contract.display = contractName
        this.formItems.contract = tuid
      },
      fetchData() {
        return addInvoice(this.formItems)
      },
      success() {
        this.$confirm('新建收款成功！', '提示', {
          confirmButtonText: '收款管理',
          cancelButtonText: '退出',
          type: 'success',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          this.go('/invoice')
        }).catch(() => {
          this.go()
        })
      }
    },
    components: {
      PickContract
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #add-invoice {
    @include form-page-css
  }
</style>
