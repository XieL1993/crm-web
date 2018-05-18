<template>
  <div id="product">
    <div class="tree">
      <el-tree :data="dicts.products.items" default-expand-all :expand-on-click-node="true"
               :render-content="renderContent"></el-tree>
    </div>
    <div class="right" ref="root">
      <div class="operate-box" ref="header">
        <el-button class="customer reset" v-waves icon="el-icon-circle-plus-outline"
                   @click.native.prevent="isShowAdd=true">新增产品
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
            label="产品线"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="typeDname"
            label="产品类型"
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
              <el-button type="text" size="small" @click.native.prevent="deleteProduct(scope.row.tuid)">删除</el-button>
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
    </div>
    <add v-if="isShowAdd" @close="isShowAdd=false" @success="refresh"></add>
    <edit v-if="isShowEdit" @close="isShowEdit=false" :product-id="currentId" @success="refresh"></edit>
    <detail v-if="isShowDetail" @close="isShowDetail=false" :product-id="currentId"></detail>
  </div>
</template>
<script>
  import { getProductList, deleteProduct } from '../api/product'
  import { tableMixin } from '../common/js/tableMixin'
  import Add from '../subpages/product/add'
  import Edit from '../subpages/product/edit'
  import Detail from '../subpages/product/detail'

  export default {
    mixins: [tableMixin],
    data() {
      return {
        isShowAdd: false,
        isShowEdit: false,
        isShowDetail: false,
        currentId: '',
        dicts: {
          products: { type: 'products', items: [] } //  产品树
        }
      }
    },
    methods: {
      fetchData() {
        return getProductList(
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
      deleteProduct(tuid) {
        this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProduct(tuid).then(() => {
            this.showError('删除产品成功！')
            this.refresh()
          }).catch(error => {
            this.showError(error.message)
          })
        }).catch(() => {
        })
      },
      refresh() {
        this.__fetchData()
        this.getDicts()
      },
      renderContent(h, { node, data }) {
        return (
          <span class='custom-tree-node'>{data.productName}</span>
        )
      }
    },
    components: {
      Add,
      Edit,
      Detail
    }
  }
</script>
<style lang="scss">
  @import "../common/styles/variables";
  @import "../common/styles/mixin";

  #product {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .tree {
      width: 250px;
      border-right: 1px solid #DCDFE6;
      height: 100%;
      padding: 10px;
      .el-tree-node__expand-icon {
        color: $color-main;
        font-size: 14px;
        &.is-leaf {
          color: transparent;
        }
      }
      .custom-tree-node {
        font-size: 13px;
        color: $color-normal;
      }
    }
    /*就布局而论完全可以用flex的，不需要定位，*/
    /*但奇怪的是用了flex之后计算表格高度不对，有bug，所以先用定位吧*/
    .right {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 250px;
      .operate-box {
        text-align: center;
        padding: 15px 25px;
        height: 60px;
        display: flex;
        justify-content: left;
      }
      .table-box {
        font-size: 12px;
        margin: 0 25px;
        color: $color-text-table;
      }
      .table-footer {
        padding: 10px 25px;
        height: 48px;
        .el-pagination {
          height: 28px;
          padding: 0;
          text-align: left;
          font-size: 12px;
          color: $color-text-table;
        }
      }
    }
  }
</style>
