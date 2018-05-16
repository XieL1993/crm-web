<template>
  <div id="org" ref="root">
    <div ref="header">
      <div class="search-box">
        <el-row>
          <el-col :span="8">
            <span class="item-label">部门名称</span>
            <el-input clearable v-model="query.orgName"></el-input>
          </el-col>
          <el-col :span="8">
            <span class="item-label">部门类型</span>
            <el-select v-model="query.orgType" clearable placeholder="请选择">
              <el-option
                v-for="item in dicts.orgType.items"
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
        <el-button class="customer reset" v-waves @click.native.prevent="isShowAdd=true">新建部门</el-button>
        <el-button class="customer reset" v-waves @click.native.prevent="">删除部门</el-button>
      </div>
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
          type="selection"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="部门名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="orgTypeDname"
          label="部门类型"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="parentIdDname"
          label="上级部门"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="orgDesc"
          label="说明"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click.native.prevent="detail(scope.row.tuid)">查看</el-button>
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
  </div>
</template>
<script>
  import { getOrgList } from '../../api/org'
  import { tableMixin } from '../../common/js/tableMixin'
  import Add from '../../subpages/org/add'

  export default {
    mixins: [tableMixin],
    data() {
      return {
        isShowAdd: false,
        isShowEdit: false,
        isShowDetail: false,
        currentId: '',
        query: {
          orgName: '',
          orgType: ''
        },
        dicts: {
          orgType: { type: 'dict', name: 'BIZ_ORG_LEVEL', items: [] }// 部门类型
        }
      }
    },
    methods: {
      fetchData() {
        return getOrgList(
          this.query.orgName,
          this.query.orgType,
          this.page.pageSize,
          this.page.currentPage
        )
      }
    },
    components: {
      Add
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/mixin";

  #org {
    @include table-page-css()
  }
</style>
