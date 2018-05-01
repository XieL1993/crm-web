export const dialogMixin = {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selection: [],
      tableData: [],
      loading: false,
      isAll: 0,
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
      this.resetSelection()
      this.setTableHeight()
    })
    let timer = 0
    window.addEventListener('resize', () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.setTableHeight()
      })
    }, 100)// 100毫秒内只执行一次resize
  },
  watch: {
    isAll() {
      this.__fetchData()
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
      if (this.$refs.root && this.$refs.header && this.$refs.footer) {
        const rHeight = this.$refs.root.clientHeight// 根容器
        const hHeight = this.$refs.header.clientHeight // 搜索框、按钮等header容器
        const fHeight = this.$refs.footer.clientHeight // 分页footer
        this.tableHeight = rHeight - hHeight - fHeight
      }
    },
    resetSelection() {
      if (this.data && this.data.length > 0) {
        this.data.forEach(row => {
          this.$refs.table.toggleRowSelection(row, true)
        })
      }
    },
    onChange(selection) {
      this.selection = selection
    },
    close() {
      this.$emit('close')
    },
    confirm() {
      if (!this.selection || this.selection.length === 0) {
        this.showError('请选择至少一条数据')
      } else if (this.selection.length > 1 && !this.multiple) {
        this.showError('最多只能选择一条数据')
      } else {
        this.$emit('close')
        this.$emit('finish', this.selection)
      }
    }
  }
}
