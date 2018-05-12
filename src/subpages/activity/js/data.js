import { getCollection } from '../../../common/js/utils'

export const activityData = {
  data() {
    return {
      formItems: {
        address: '',
        attachements: [],
        bd: '',
        contact: '',
        content: '',
        contractIds: { data: [], tuid: '', display: '', isShow: false },
        customer: { data: [], tuid: '', display: '', isShow: false },
        date: '',
        oppIds: { data: [], tuid: '', display: '', isShow: false },
        products: '',
        subject: '',
        type: ''
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
    getParams() {
      const data = Object.assign({}, this.formItems)
      data.attachements = this.fixAttach()
      data.contractIds = data.contractIds.tuid.split(',')
      data.customer = data.customer.tuid
      data.oppIds = data.oppIds.tuid.split(',')
      return data
    },
    dealDetail(data) {
      const actDetail = data.obj
      for (const key of Object.keys(this.formItems)) {
        if (actDetail[key]) {
          if (key === 'date') {
            this.formItems.date = new Date(actDetail.date)
          } else if (key === 'oppIds') {
            this.formItems.oppIds.data = getCollection(actDetail.oppIds, actDetail.oppIdsDname, 'oppName')
            this.formItems.oppIds.tuid = actDetail.oppIds
            this.formItems.oppIds.display = actDetail.oppIdsDname
          } else if (key === 'contractIds') {
            this.formItems.contractIds.data = getCollection(actDetail.contractIds, actDetail.contractIdsDname, 'contractName')
            this.formItems.contractIds.tuid = actDetail.contractIds
            this.formItems.contractIds.display = actDetail.contractIdsDname
          } else if (key === 'customer') {
            this.formItems.customer.data = getCollection(actDetail.customer, actDetail.customerDname, 'custName')
            this.formItems.customer.tuid = actDetail.customer
            this.formItems.customer.display = actDetail.customerDname
          } else if (key === 'attachements') {
            const list = []
            for (const item of actDetail.attachements) {
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
            this.formItems[key] = actDetail[key]
          }
        }
      }
    }
  }
}
