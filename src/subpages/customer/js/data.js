export const customerData = {
  data() {
    return {
      formItems: {
        custName: '',
        custNo: '',
        custShortName: '',
        custEnglish: '',
        identificationNumber: '',
        postcode: '',
        province: '',
        district: '',
        city: '',
        address: '',
        phone: '',
        industry: '',
        fax: '',
        sales: '',
        type: '',
        bd: '',
        remarks: '',
        area: []// 省市区
      },
      formRules: {
        custName: [{ required: true, message: '必填项' }],
        bd: [{ required: true, message: '必填项' }],
        industry: [{ required: true, message: '必填项' }],
        sales: [{ required: true, message: '必填项' }]
      },
      dicts: {
        industry: { type: 'dict', name: 'BIZ_CUST_TRADE', items: [] }, // 客户行业
        type: { type: 'dict', name: 'BIZ_CUST_KIND', items: [] }, // 客户类别
        bd: { type: 'user', name: '0', items: [] }, // bd
        sales: { type: 'user', name: '2', items: [] }, // 销售
        area: { type: 'area', items: [] } // 省市区
      }
    }
  },
  methods: {
    getParams() {
      const data = Object.assign({}, this.formItems)
      if (data.area) {
        data.province = data.area[0]
        data.city = data.area[1]
        data.district = data.area[2]
      }
      delete data.area
      return data
    },
    dealDetail(data) {
      const cusDetail = data.obj
      this.formItems.area.push(cusDetail.province)
      this.formItems.area.push(cusDetail.city)
      this.formItems.area.push(cusDetail.district)
      for (const key of Object.keys(this.formItems)) {
        if (cusDetail[key]) {
          this.formItems[key] = cusDetail[key]
        }
      }
    }
  }
}
