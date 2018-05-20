<template>
  <div id="contract-product">
    <div ref="header" class="header">
      <el-button class="customer reset" v-waves @click.native.prevent="isShowAdd=true">新建产品
      </el-button>
    </div>
    <div class="table-box">
      <el-table
        :height="tableHeight"
        size="mini"
        tooltip-effect="dark"
        border
        v-loading="loading"
        :data="tableData">
        <el-table-column
          prop="productLineDname"
          label="产品线名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="productDname"
          label="产品名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="productAmount"
          label="合同金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="140"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click.native.prevent="detail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer" ref="footer"></div>
    <add-product :contract="contractId" :contract-name="contractName" v-if="isShowAdd" @close="isShowAdd=false"
                 @success="fetchData"></add-product>
    <edit-product :contract="contractId" :contract-name="contractName" :product="currentItem" v-if="isShowEdit"
                  @close="isShowEdit=false" @success="fetchData"></edit-product>
    <product-detail :product="currentItem" v-if="isShowDetail" @close="isShowDetail=false"></product-detail>

  </div>
</template>
<script>
  import { getContractProductList } from '../../../api/contract'
  import AddProduct from '../addProduct'
  import EditProduct from '../editProduct'
  import ProductDetail from '../productDetail'

  export default {
    props: {
      contractId: {
        type: String,
        default: ''
      },
      contractName: {
        type: String,
        default: ''
      },
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
        isShowAdd: false,
        isShowEdit: false,
        isShowDetail: false,
        currentItem: ''
      }
    },
    created() {
      this.fetchData()
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
      fetchData() {
        this.loading = true
        getContractProductList(this.contractId).then(res => {
          this.tableData = res.obj
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.info({ showClose: true, message: error.message, duration: 3000 })
        })
      },
      setTableHeight() {
        if (this.$refs.header && this.$refs.footer) {
          const hHeight = this.$refs.header.clientHeight
          const fHeight = this.$refs.footer.clientHeight
          this.tableHeight = this.height - hHeight - fHeight
        }
      },
      edit(item) {
        this.currentItem = item
        this.isShowEdit = true
      },
      detail(item) {
        this.currentItem = item
        this.isShowDetail = true
      }
    },
    components: {
      AddProduct,
      EditProduct,
      ProductDetail
    }
  }
</script>
<style scoped lang="scss">
  #contract-product {
    .header {
      padding: 15px 30px;
    }
    .table-box {
      margin: 0 30px;
    }
    .table-footer {
      height: 20px;
    }
  }

</style>
