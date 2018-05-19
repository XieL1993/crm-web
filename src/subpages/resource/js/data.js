export const resourceData = {
  data() {
    return {
      formItems: {
        sourceKey: '',
        sourceName: '',
        sourceType: '',
        sourceUrl: '',
        sourceIcon: '',
        routerVue: '',
        routerJwt: '',
        requestMethod: '',
        sourceLevel: '',
        sourceSort: '',
        isHide: '',
        sourceDesc: '',
        parentResId: ''
      },
      formRules: {
        sourceKey: [{ required: true, message: '必填项' }],
        sourceName: [{ required: true, message: '必填项' }],
        sourceType: [{ required: true, message: '必填项' }],
        sourceUrl: [{ required: true, message: '必填项' }],
        sourceLevel: [{ required: true, message: '必填项' }],
        sourceSort: [{ required: true, message: '必填项' }],
        isHide: [{ required: true, message: '必填项' }],
        routerVue: [{ required: true, message: '必填项' }]
      },
      dicts: {
        sourceType: { type: 'dict', name: 'BIZ_RES_TYPE', items: [] }, // 资源类型
        parentResId: { type: 'res', items: [] }, // 上级资源
        isHide: { type: 'dict', name: 'BIZ_YES_OR_NO', items: [] } // 是否隐藏
      }
    }
  },
  methods: {
    getParams() {
      const data = Object.assign({}, this.formItems)
      return data
    },
    dealDetail(data) {
      const resDetail = data.obj
      resDetail.sourceType = String(resDetail.sourceType)// 接口有个坑，返回的值是0，而不是字符串‘0’
      resDetail.isHide = String(resDetail.isHide)// 接口有个坑，返回的值是0，而不是字符串‘0’
      resDetail.sourceLevel = String(resDetail.sourceLevel)// 接口有个坑，返回的值是0，而不是字符串‘0’
      for (const key of Object.keys(this.formItems)) {
        if (resDetail[key]) {
          this.formItems[key] = resDetail[key]
        }
      }
    }
  }
}
