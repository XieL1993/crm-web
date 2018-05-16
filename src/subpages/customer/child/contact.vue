<template>
  <div id="cus-active">
    <div ref="header" class="header">
      <el-button class="customer reset" v-waves @click.native.prevent="isShowAdd=true">新建联系人
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
          prop="contactName"
          label="联系人名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sexDname"
          label="性别"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="办公电话"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="typeDname"
          label="类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="140"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="edit(scope.row.tuid)">编辑</el-button>
            <el-button type="text" size="small" @click.native.prevent="detail(scope.row.tuid)">查看</el-button>
            <el-button type="text" size="small" @click.native.prevent="deleteContact(scope.row.tuid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer" ref="footer"></div>
    <add-contact :cus-no="cusNo" v-if="isShowAdd" @close="isShowAdd=false" @success="fetchData"></add-contact>
    <edit-contact :cus-no="cusNo" :contact-id="currentId" v-if="isShowEdit" @close="isShowEdit=false"
                  @success="fetchData"></edit-contact>
    <contact-detail :contact-id="currentId" v-if="isShowDetail" @close="isShowDetail=false"></contact-detail>

  </div>
</template>
<script>
  import { getCusContact, deleteContact } from '../../../api/customer'
  import AddContact from '../addContact'
  import EditContact from '../editContact'
  import ContactDetail from '../contactDetail'

  export default {
    props: {
      cusNo: {
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
        currentId: ''
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
        getCusContact(this.cusNo).then(res => {
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
      edit(tuid) {
        this.currentId = tuid
        this.isShowEdit = true
      },
      detail(tuid) {
        this.currentId = tuid
        this.isShowDetail = true
      },
      deleteContact(tuid) {
        this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteContact(tuid).then(() => {
            this.$message.info('删除联系人成功！')
            this.fetchData()
          }).catch(error => {
            this.$message.info(error.message)
          })
        }).catch(() => {
        })
      }
    },
    components: {
      AddContact,
      EditContact,
      ContactDetail
    }
  }
</script>
<style scoped lang="scss">
  #cus-active {
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
