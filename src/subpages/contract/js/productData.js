export const productData = {
  props: {
    contract: {
      type: String,
      default: ''
    },
    contractName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formItems: {
        contract: '',
        description: '',
        product: '',
        productAmount: ''
      },
      formRules: {
        product: [{ required: true, message: '必填项' }]
      },
      dicts: {
        product: { type: 'products', items: [] } //  产品树
      }
    }
  },
  methods: {
    getParams() {
      const data = Object.assign({}, this.formItems)
      data.contract = this.contract
      return data
    },
    dealDetail(data) {
      for (const key of Object.keys(this.formItems)) {
        if (data[key]) {
          this.formItems[key] = data[key]
        }
      }
    }
  }
}
