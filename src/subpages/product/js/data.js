export const productData = {
  data() {
    return {
      formItems: {
        productName: '',
        productNo: '',
        productLine: '',
        type: '',
        status: '',
        remarks: ''
      },
      formRules: {
        productName: [{ required: true, message: '必填项' }],
        productLine: [{ required: true, message: '必填项' }],
        type: [{ required: true, message: '必填项' }],
        status: [{ required: true, message: '必填项' }]
      },
      dicts: {
        productLine: { type: 'dict', name: 'BIZ_PRO_LINE', items: [] }, // 产品线
        type: { type: 'dict', name: 'BIZ_PRO_KIND', items: [] }, // 产品类型
        status: { type: 'dict', name: 'BIZ_DATA_STAT', items: [] } // 产品状态
      }
    }
  },
  methods: {
    getParams() {
      const data = Object.assign({}, this.formItems)
      return data
    },
    dealDetail(data) {
      const productDetail = data.obj
      for (const key of Object.keys(this.formItems)) {
        if (productDetail[key]) {
          this.formItems[key] = productDetail[key]
        }
      }
    }
  }
}
