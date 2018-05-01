import { getDictItem, getUserList } from '../../api/login'
import { mapActions } from 'vuex'

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
          }
        }
      }
    },
    showError(val) {
      this.$message.closeAll()
      this.$message.warning({ showClose: true, message: val, duration: 3000 })
    },
    success() {
    },
    go(path) {
      this.delTab(this.$route).then(() => {
        path ? this.$router.push(path) : this.$router.go(-1)
      })
    },
    cancel() {
      this.go()
    }
  }
}
