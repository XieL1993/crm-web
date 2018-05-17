export const roleData = {
  data() {
    return {
      formItems: {
        roleName: '',
        roleStatus: '',
        roleDesc: ''
      },
      formRules: {
        roleName: [{ required: true, message: '必填项' }],
        roleStatus: [{ required: true, message: '必填项' }]
      },
      dicts: {
        roleStatus: { type: 'dict', name: 'BIZ_DATA_STAT', items: [] } // 角色状态
      }
    }
  },
  methods: {
    getParams() {
      const data = Object.assign({}, this.formItems)
      return data
    },
    dealDetail(data) {
      const roleDetail = data.obj
      roleDetail.roleStatus = String(roleDetail.roleStatus)// 接口有个坑，返回的值是0，而不是字符串‘0’
      for (const key of Object.keys(this.formItems)) {
        if (roleDetail[key]) {
          this.formItems[key] = roleDetail[key]
        }
      }
    }
  }
}
