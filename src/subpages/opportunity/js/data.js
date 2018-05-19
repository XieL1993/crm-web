import { getCollection } from '../../../common/js/utils'

export const opportunityData = {
  data() {
    return {
      formItems: {
        bd: '',
        attachements: [],
        competitor: '',
        customer: { data: [], tuid: '', display: '', isShow: false },
        description: '',
        estimate: '',
        expectedTime: '',
        oppName: '',
        products: '',
        sale: '',
        status: '',
        type: '',
        successRate: ''
      },
      formRules: {
        customer: [{
          required: true, message: '必填项', validator: (rule, value, callback) => {
            if (value.tuid !== '') {
              callback()
            } else {
              callback(new Error('客户不能为空'))
            }
          }
        }],
        oppName: [{ required: true, message: '必填项' }],
        products: [{ required: true, message: '必填项' }],
        status: [{ required: true, message: '必填项' }],
        type: [{ required: true, message: '必填项' }],
        successRate: [{ required: true, message: '必填项' }]
      },
      dicts: {
        sale: { type: 'user', name: '2', items: [] }, // 销售
        bd: { type: 'user', name: '0', items: [] }, // bd
        status: { type: 'dict', name: 'BIZ_OPP_STAT', items: [] }, // 商机状态
        type: { type: 'dict', name: 'BIZ_OPP_KIND', items: [] }, // 商机类型
        successRate: { type: 'dict', name: 'BIZ_OPP_RATE', items: [] }, // 成功率
        products: { type: 'products', items: [] } //  产品树
      }
    }
  },
  methods: {
    getParams() {
      const data = Object.assign({}, this.formItems)
      data.customer = data.customer.tuid
      data.attachements = this.fixAttach()
      return data
    },
    dealDetail(data) {
      const oppDetail = data.obj
      for (const key of Object.keys(this.formItems)) {
        if (oppDetail[key]) {
          if (key === 'date') {
            this.formItems.expectedTime = new Date(oppDetail.expectedTime)
          } else if (key === 'customer') {
            this.formItems.customer.data = getCollection(oppDetail.customer, oppDetail.customerDname, 'custName')
            this.formItems.customer.tuid = oppDetail.customer
            this.formItems.customer.display = oppDetail.customerDname
          } else if (key === 'attachements') {
            const list = []
            for (const item of oppDetail.attachements) {
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
            this.formItems[key] = oppDetail[key]
          }
        }
      }
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
