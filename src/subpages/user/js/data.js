export const userData = {
  data() {
    return {
      formItems: {
        userName: '',
        realName: '',
        orgId: '',
        userType: '',
        sex: '',
        birthday: '',
        phone: '',
        email: '',
        annualTask: '',
        address: '',
        description: ''
      },
      formRules: {
        userName: [{ required: true, message: '必填项' }],
        realName: [{ required: true, message: '必填项' }],
        orgId: [{ required: true, message: '必填项' }],
        userType: [{ required: true, message: '必填项' }]
      },
      dicts: {
        orgId: { type: 'org', items: [] }, // 部门
        userType: { type: 'dict', name: 'BIZ_USER_CATE', items: [] }, // 用户类型
        sex: { type: 'dict', name: 'BIZ_SEX', items: [] } // 用户状态
      }
    }
  },
  methods: {
    getParams() {
      const data = Object.assign({}, this.formItems)
      return data
    },
    dealDetail(data) {
      const userDetail = data.obj
      userDetail.userType = String(userDetail.userType)// 接口有个坑，返回的值是0，而不是字符串‘0’
      for (const key of Object.keys(this.formItems)) {
        if (userDetail[key]) {
          this.formItems[key] = userDetail[key]
        }
      }
    }
  }
}
