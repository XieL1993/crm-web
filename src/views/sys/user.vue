<template>
  <div id="user" ref="root">
    <div ref="header">
      <div class="search-box">
        <el-row>
          <el-col :span="8">
            <span class="item-label">用户姓名</span>
            <el-input clearable v-model="query.realName"></el-input>
          </el-col>
          <el-col :span="8">
            <span class="item-label">所属部门</span>
            <select-tree v-model="query.orgId" :data="dicts.orgId.items" :check-level="false" check-key="id"
                         check-label="title" :multiple="false"></select-tree>
          </el-col>
          <el-col :span="8">
            <span class="item-label">用户类型</span>
            <el-select v-model="query.userType" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.userType.items"
                :key="item.dictEntryCode"
                :label="item.dictItemName"
                :value="item.dictEntryCode">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="item-label">用户状态</span>
            <el-select v-model="query.userStatus" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.userStatus.items"
                :key="item.dictEntryCode"
                :label="item.dictItemName"
                :value="item.dictEntryCode">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span class="item-label">是否锁定</span>
            <el-select v-model="query.isLocked" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.isLocked.items"
                :key="item.dictEntryCode"
                :label="item.dictItemName"
                :value="item.dictEntryCode">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="btn-box">
        <el-button class="customer query" @click.native.prevent="__fetchData" v-waves>查询</el-button>
        <el-button class="customer reset" @click.native.prevent="resetQuery" v-waves>清空</el-button>
      </div>
      <div class="tab-box">
        <div class="tab-list">
        </div>
      </div>
      <div class="operate-box">
        <el-button class="customer reset" icon="el-icon-circle-plus-outline" v-waves
                   @click.native.prevent="isShowAdd=true"> 新建用户
        </el-button>
        <el-button class="customer reset" icon="el-icon-setting" v-waves @click.native.prevent="setRole">分配资源
        </el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
        :height="tableHeight"
        size="mini"
        tooltip-effect="dark"
        border
        v-loading="loading"
        :data="tableData"
        row-key="tuid"
        @selection-change="onChange">
        <el-table-column
          :reserve-selection="true"
          type="selection"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="登陆名"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="用户姓名"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="orgDname"
          label="部门名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="userTypeDname"
          label="用户类别"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="statusDname"
          label="用户状态"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="isLockedDname"
          label="是否锁定"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="sexDname"
          label="性别"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.birthday | formatDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="140"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="edit(scope.row.tuid)">编辑</el-button>
            <el-button type="text" size="small" @click.native.prevent="detail(scope.row.tuid)">查看</el-button>
            <el-button type="text" size="small" @click.native.prevent="deleteOrg(scope.row.tuid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer" ref="footer">
      <el-pagination
        background
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total, prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <add v-if="isShowAdd" @close="isShowAdd=false" @success="__fetchData"></add>
    <edit v-if="isShowEdit" @close="isShowEdit=false" :user-id="currentId" @success="__fetchData"></edit>
    <detail v-if="isShowDetail" @close="isShowDetail=false" :user-id="currentId"></detail>
  </div>
</template>
<script>
  import { getUserList, deleteUser } from '../../api/user'
  import { tableMixin } from '../../common/js/tableMixin'
  import Add from '../../subpages/user/add'
  import Edit from '../../subpages/user/edit'
  import Detail from '../../subpages/user/detail'
  import SelectTree from '../../components/selectTree'
  import { mapActions } from 'vuex'

  export default {
    mixins: [tableMixin],
    data() {
      return {
        isShowAdd: false,
        isShowEdit: false,
        isShowDetail: false,
        currentId: '',
        query: {
          realName: '',
          userType: '',
          orgId: '',
          userStatus: '',
          isLocked: ''
        },
        dicts: {
          userType: { type: 'dict', name: 'BIZ_USER_CATE', items: [] }, // 用户类型
          userStatus: { type: 'dict', name: 'BIZ_USER_STATUS', items: [] }, // 用户状态
          orgId: { type: 'org', items: [] }, // 所属部门
          isLocked: { type: 'dict', name: 'BIZ_YES_OR_NO', items: [] }// 是否锁定
        }
      }
    },
    methods: {
      ...mapActions(['userParams']),
      fetchData() {
        return getUserList(
          this.query.realName,
          this.query.userType,
          this.query.orgId,
          this.query.userStatus,
          this.query.isLocked,
          this.page.pageSize,
          this.page.currentPage
        )
      },
      edit(tuid) {
        this.currentId = tuid
        this.isShowEdit = true
      },
      detail(tuid) {
        this.currentId = tuid
        this.isShowDetail = true
      },
      deleteOrg(tuid) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(tuid).then(() => {
            this.showError('删除用户成功！')
            this.__fetchData()
          }).catch(error => {
            this.showError(error.message)
          })
        }).catch(() => {
        })
      },
      setRole() {
        if (this.selection.length === 0) {
          this.showError('请选择用户！')
        } else if (this.selection.length > 1) {
          this.showError('只能选择一个用户！')
        } else {
          this.userParams({
            tuid: this.selection[0].tuid,
            realName: this.selection[0].realName,
            userName: this.selection[0].userName
          })
          this.$router.push({
            path: '/resource/role'
          })
        }
      }
    },
    components: {
      Add,
      Edit,
      Detail,
      SelectTree
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/mixin";

  #user {
    @include table-page-css()
  }
</style>
