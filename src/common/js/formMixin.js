import { getDictItem, getUserList, productTree } from '../../api/login'
import { mapActions } from 'vuex'
import PickInput from '../../components/pickInput'
import PickCustomer from '../../components/pick/pickCustomer'
import PickOpportunity from '../../components/pick/pickOpportunity'
import PickContract from '../../components/pick/pickContract'
import SelectTree from '../../components/selectTree'

export const formMixin = {
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.getDicts()
  },
  methods: {
    ...mapActions(['delTab']),
    __fetchData() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.fetchData().then(() => {
            this.loading = false
            this.success()
          }).catch(error => {
            this.loading = false
            this.showError(error.message)
          })
        } else {
          this.showError('请将表单必填项填写完整！')
        }
      })
    },
    fetchData() {
      throw new Error('component must implement fetchData method')
    },
    getDicts() {
      if (this.dicts) {
        for (const item of Object.values(this.dicts)) {
          if (item.type === 'dict') {
            getDictItem(item.name).then(res => {
              item.items = res.obj
            })
          } else if (item.type === 'user') {
            getUserList(item.name).then(res => {
              item.items = res.obj.list
            })
          } else if (item.type === 'products') {
            productTree().then(res => {
              item.items = this.filterTreesBydata([], [res.obj])
            })
          }
        }
      }
    },
    filterTreesBydata(trees, data) { // 递归遍历产品树
      if (data && data.length > 0) {
        for (const { tuid, productName, level, children } of data) {
          const parent = { label: productName, tuid, level }
          trees.push(parent)
          if (children && children.length > 0) {
            parent.children = []
            this.filterTreesBydata(parent.children, children)
          } else if (level === '0') { // 无children并且level为0禁止选中
            parent.disabled = true
          }
        }
      }
      return trees
    },
    showError(val) {
      this.$message.closeAll()
      this.$message.info({ showClose: true, message: val, duration: 3000 })
    },
    success() {
      this.$alert(this.successMsg, '提示', {
        confirmButtonText: '确定',
        type: 'success',
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false
      }).then(() => {
        this.back()
      })
    },
    back() {
      this.delTab(this.$route).then(() => {
        this.$router.go(-1)
      })
    }
  },
  components: {
    PickInput,
    PickCustomer,
    PickOpportunity,
    PickContract,
    SelectTree
  }
}
