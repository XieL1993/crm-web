import { getCollection } from '../../../common/js/utils'

export const invoiceData = {
  data() {
    return {
      formItems: {
        actualAmount: '',
        actualTime: '',
        contract: { data: [], tuid: '', display: '', isShow: false },
        expectedTime: '',
        invoiceTime: '',
        isFinished: '',
        isInvoice: '',
        remarks: '',
        totalAmount: '',
        type: ''
      },
      formRules: {
        contract: [{
          required: true, message: '必填项', validator: (rule, value, callback) => {
            if (value.tuid !== '') {
              callback()
            } else {
              callback(new Error('合同不能为空'))
            }
          }
        }]
      },
      dicts: {
        type: { type: 'dict', name: 'BIZ_INV_KIND', items: [] }, // 收款类型
        isInvoice: {
          items: [
            { key: '1', value: '已开' },
            { key: '0', value: '未开' }
          ]
        },
        isFinished: {
          items: [
            { key: '1', value: '是' },
            { key: '0', value: '否' }
          ]
        }
      }
    }
  },
  methods: {
    getParams() {
      const data = Object.assign({}, this.formItems)
      data.contract = data.contract.tuid
      return data
    },
    dealDetail(data) {
      const invDetail = data.obj
      for (const key of Object.keys(this.formItems)) {
        if (invDetail[key]) {
          if (key === 'invoiceTime' || key === 'expectedTime' || key === 'actualTime') {
            this.formItems[key] = new Date(invDetail[key])
          } else if (key === 'contract') {
            this.formItems.contract.data = getCollection(invDetail.contract, invDetail.contractDname, 'contractName')
            this.formItems.contract.tuid = invDetail.contract
            this.formItems.contract.display = invDetail.contractDname
          } else {
            this.formItems[key] = invDetail[key]
          }
        }
      }
    }
  }
}
