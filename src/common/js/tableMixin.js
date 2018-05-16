import { getDictItem, getUserList, productTree } from '../../api/login'
import { clone } from './utils'
import PickInput from '../../components/pickInput'
import PickCustomer from '../../components/pick/pickCustomer'
import PickOpportunity from '../../components/pick/pickOpportunity'
import PickContract from '../../components/pick/pickContract'

export const tableMixin = {
  data() {
    return {
      tableData: [],
      selection: [],
      baseQuery: {},
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
    this.baseQuery = clone(this.query)
    this.__fetchData()
    this.getDicts()
  },
  mounted() {
    this.$nextTick(() => {
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
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.__fetchData()
      }, 200)
    }
  },
  methods: {
    resetQuery() {
      this.query = clone(this.baseQuery)
      this.__fetchData()
    },
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
        for (const { tuid, productName, children } of data) {
          const parent = { label: productName, tuid }
          trees.push(parent)
          if (children && children.length > 0) {
            parent.children = []
            this.filterTreesBydata(parent.children, children)
          }
        }
      }
      return trees
    },
    showError(val) {
      this.$message.closeAll()
      this.$message.info({ showClose: true, message: val, duration: 3000 })
    },
    setTableHeight() {
      if (this.$refs.root && this.$refs.header && this.$refs.footer) {
        const rHeight = this.$refs.root.clientHeight// 根容器
        const hHeight = this.$refs.header.clientHeight // 搜索框、按钮等header容器
        const fHeight = this.$refs.footer.clientHeight // 分页footer
        this.tableHeight = rHeight - hHeight - fHeight
        // console.error(rHeight, hHeight, fHeight, this.tableHeight)
      }
    },
    onChange(selection) {
      this.selection = selection
    }
  },
  components: {
    PickInput,
    PickCustomer,
    PickOpportunity,
    PickContract
  }
}
