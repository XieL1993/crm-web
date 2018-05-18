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
        orgType: { type: 'dict', name: 'BIZ_ORG_LEVEL', items: [] }, // 类型
        parentOrgId: { type: 'org', items: [] } // 上级部门
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
      orgDetail.orgType = String(orgDetail.orgType)// 接口有个坑，返回的值是0，而不是字符串‘0’
      for (const key of Object.keys(this.formItems)) {
        if (orgDetail[key]) {
          this.formItems[key] = orgDetail[key]
        }
      }
    }
  }
}
