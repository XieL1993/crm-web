<template>
  <div id="role" ref="root">
    <div ref="header">
      <div class="search-box">
        <el-row>
          <el-col :span="8">
            <span class="item-label">角色姓名</span>
            <el-input clearable v-model="query.roleName"></el-input>
          </el-col>
          <el-col :span="8">
            <span class="item-label">角色状态</span>
            <el-select v-model="query.roleStatus" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.roleStatus.items"
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
                   @click.native.prevent="isShowAdd=true">新建角色
        </el-button>
        <el-button class="customer reset" icon="el-icon-setting" v-waves @click.native.prevent="setRight">分配资源
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
          prop="roleName"
          label="角色名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="roleStatusDname"
          label="角色状态"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="140"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="edit(scope.row.tuid)">编辑</el-button>
            <el-button type="text" size="small" @click.native.prevent="detail(scope.row.tuid)">查看</el-button>
            <el-button type="text" size="small" @click.native.prevent="deleteRole(scope.row.tuid)">删除</el-button>
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
    <edit v-if="isShowEdit" @close="isShowEdit=false" :role-id="currentId" @success="__fetchData"></edit>
    <detail v-if="isShowDetail" @close="isShowDetail=false" :role-id="currentId"></detail>
  </div>
</template>
<script>
  import { getRoleList, deleteRole } from '../../api/role'
  import { tableMixin } from '../../common/js/tableMixin'
  import Add from '../../subpages/role/add'
  import Edit from '../../subpages/role/edit'
  import Detail from '../../subpages/role/detail'
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
          roleName: '',
          roleStatus: ''
        },
        dicts: {
          roleStatus: { type: 'dict', name: 'BIZ_DATA_STAT', items: [] }// 角色状态
        }
      }
    },
    methods: {
      ...mapActions(['roleParams']),
      fetchData() {
        return getRoleList(
          this.query.roleName,
          this.query.roleStatus,
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
      deleteRole(tuid) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole(tuid).then(() => {
            this.showError('删除角色成功！')
            this.__fetchData()
          }).catch(error => {
            this.showError(error.message)
          })
        }).catch(() => {
        })
      },
      setRight() {
        if (this.selection.length === 0) {
          this.showError('请选中角色！')
        } else if (this.selection.length > 1) {
          this.showError('只能选择一条角色！')
        } else {
          this.roleParams({ tuid: this.selection[0].tuid, roleName: this.selection[0].roleName })
          this.$router.push({
            path: '/role/resource'
          })
        }
      }
    },
    components: {
      Add,
      Edit,
      Detail
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/mixin";

  #role {
    @include table-page-css()
  }
</style>
