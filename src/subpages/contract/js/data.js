import { getCollection } from '../../../common/js/utils'

export const contractData = {
  computed: {
    customer() {
      return this.formItems.customer.tuid
    }
  },
  watch: {
    customer(n, o) {
      if (o === '') return
      this.formItems.opportunity = { data: [], tuid: '', display: '', isShow: false }
    }
  },
  data() {
    return {
      formItems: {
        contractName: '',
        attachements: [],
        opportunity: { data: [], tuid: '', display: '', isShow: false },
        customer: { data: [], tuid: '', display: '', isShow: false },
        products: '',
        contractNo: '',
        sale: '',
        bd: '',
        signType: '',
        contractType: '',
        status: '',
        amount: '',
        isFinished: '',
        signTime: '',
        startTime: '',
        expiryTime: '',
        adjustTime: '',
        isBusiness: '',
        receiptInfo: '',
        description: ''
      },
      formRules: {
        contractName: [{ required: true, message: '必填项' }],
        opportunity: [{
          required: true, message: '必填项', validator: (rule, value, callback) => {
            if (value.tuid !== '') {
              callback()
            } else {
              callback(new Error('商机不能为空'))
            }
          }
        }],
        customer: [{
          required: true, message: '必填项', validator: (rule, value, callback) => {
            if (value.tuid !== '') {
              callback()
            } else {
              callback(new Error('客户不能为空'))
            }
          }
        }],
        products: [{ required: true, message: '必填项' }],
        contractNo: [{ required: true, message: '必填项' }],
        sale: [{ required: true, message: '必填项' }],
        bd: [{ required: true, message: '必填项' }]
      },
      dicts: {
        sale: { type: 'user', name: '2', items: [] }, // 销售
        bd: { type: 'user', name: '0', items: [] }, // bd
        signType: { type: 'dict', name: 'BIZ_OPP_KIND', items: [] }, // 合同签约类型
        contractType: { type: 'dict', name: 'BIZ_CON_KIND', items: [] }, // 合同类型
        status: { type: 'dict', name: 'BIZ_CON_STAT', items: [] }, // 合同类型
        products: { type: 'products', items: [] }, //  产品树
        isFinished: { // 是否收款完毕
          items: [
            { key: '1', value: '是' },
            { key: '0', value: '否' }
          ]
        },
        isBusiness: { // 是否开展业务
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
      data.attachements = this.fixAttach()
      data.customer = data.customer.tuid
      data.opportunity = data.opportunity.tuid
      return data
    },
    dealDetail(data) {
      const catDetail = data.obj
      for (const key of Object.keys(this.formItems)) {
        if (catDetail[key]) {
          if (key === 'adjustTime' || key === 'expiryTime' || key === 'signTime' || key === 'startTime') {
            this.formItems[key] = new Date(catDetail[key])
          } else if (key === 'opportunity') {
            this.formItems.opportunity.data = getCollection(catDetail.opportunity, catDetail.opportunityDname, 'oppName')
            this.formItems.opportunity.tuid = catDetail.opportunity
            this.formItems.opportunity.display = catDetail.opportunityDname
          } else if (key === 'customer') {
            this.formItems.customer.data = getCollection(catDetail.customer, catDetail.customerDname, 'custName')
            this.formItems.customer.tuid = catDetail.customer
            this.formItems.customer.display = catDetail.customerDname
          } else if (key === 'attachements') {
            const list = []
            for (const item of catDetail.attachements) {
              list.push({
                name: item.attachName,
                response: {
                  data: { obj: item.tuid }
                },
                url: item.attachPath
              })
            }
            this.defaultFileList = list
            this.fileList = [...list]
          } else {
            this.formItems[key] = catDetail[key]
          }
        }
      }
    },
    fillOpportunity(data) {
      const names = []
      const ids = []
      for (const { tuid, oppName } of data) {
        ids.push(tuid)
        names.push(oppName)
      }
      this.formItems.opportunity.data = data
      this.formItems.opportunity.tuid = ids.join(',')
      this.formItems.opportunity.display = names.join(',')
    },
    fillCustomer(data) {
      if (this.formItems.customer.tuid !== '') return
      const names = []
      const ids = []
      for (const { tuid, custName } of data) {
        ids.push(tuid)
        names.push(custName)
      }
      this.formItems.customer.data = data
      this.formItems.customer.tuid = ids.join(',')
      this.formItems.customer.display = names.join(',')
    }
  }
}
