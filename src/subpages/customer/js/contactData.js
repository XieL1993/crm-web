export const contactData = {
  props: {
    cusNo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formItems: {
        birthday: '',
        contactName: '',
        customerId: this.cusNo,
        department: '',
        education: '',
        email: '',
        isMain: '',
        mobile: '',
        phone: '',
        position: '',
        preference: '',
        qq: '',
        remarks: '',
        sex: '',
        status: '',
        type: '',
        university: ''
      },
      formRules: {
        contactName: [{ required: true, message: '必填项' }],
        phone: [{ required: true, message: '必填项' }],
        sex: [{ required: true, message: '必填项' }],
        type: [{ required: true, message: '必填项' }]
      },
      dicts: {
        status: { type: 'dict', name: 'BIZ_DATA_STAT', items: [] }, // 状态
        preference: { type: 'dict', name: 'BIZ_CTC_PREF', items: [] }, // 对本公司的态度
        sex: { type: 'dict', name: 'BIZ_SEX', items: [] }, // 性别
        type: { type: 'dict', name: 'BIZ_CTC_KIND', items: [] }, // 联系人类型
        education: { type: 'dict', name: 'BIZ_EDUCATION', items: [] }, // 学历
        isMain: { // 是否主要联系人
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
      return data
    },
    dealDetail(data) {
      const contactDetail = data.obj
      for (const key of Object.keys(this.formItems)) {
        if (contactDetail[key]) {
          this.formItems[key] = contactDetail[key]
        }
      }
    }
  }
}
