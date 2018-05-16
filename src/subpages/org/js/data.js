export const orgData = {
  data() {
    return {
      formItems: {
        orgName: '',
        orgType: '',
        parentOrgId: '',
        orgDesc: ''
      },
      formRules: {
        orgName: [{ required: true, message: '必填项' }],
        orgType: [{ required: true, message: '必填项' }]
      },
      dicts: {
        orgType: { type: 'dict', name: 'BIZ_ORG_LEVEL', items: [] } // 类型
      }
    }
  },
  methods: {
    getParams() {
      const data = Object.assign({}, this.formItems)
      return data
    },
    dealDetail(data) {
      const orgDetail = data.obj
      for (const key of Object.keys(this.formItems)) {
        if (orgDetail[key]) {
          this.formItems[key] = orgDetail[key]
        }
      }
    }
  }
}
