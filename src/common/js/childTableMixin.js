export const childTableMixin = {
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      tableHeight: 0,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.__fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.setTableHeight()
    })
  },
  watch: {
    height() {
      this.setTableHeight()
    }
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val
      this.page.currentPage = 1
      this.__fetchData()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.__fetchData()
    },
    __fetchData() {
      this.loading = true
      this.fetchData().then(res => {
        this.tableData = res.obj.list
        this.page.total = res.obj.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.showError(error.message)
      })
    },
    fetchData() {
      throw new Error('component must implement fetchData method')
    },
    showError(val) {
      this.$message.closeAll()
      this.$message.warning({ showClose: true, message: val, duration: 3000 })
    },
    setTableHeight() {
      if (this.$refs.header && this.$refs.footer) {
        const hHeight = this.$refs.header.clientHeight // 搜索框、按钮等header容器
        const fHeight = this.$refs.footer.clientHeight // 分页footer
        this.tableHeight = this.height - hHeight - fHeight
      }
    }
  }
}
