<template>
  <div id="role-resource">
    <el-row class="header">
      <el-col :span="12">
        <el-input placeholder="输入关键字进行过滤" clearable v-model="filterText" suffix-icon="el-icon-search">
        </el-input>
      </el-col>
      <el-col :span="12"><h3>当前分配用户：{{roleParams.roleName}}</h3></el-col>
    </el-row>
    <div class="tree">
      <el-tree :data="treeData" ref="tree" default-expand-all :expand-on-click-node="false"
               :render-content="renderContent" :filter-node-method="filterNode"></el-tree>
    </div>
    <div class="btn-box">
      <el-radio-group v-model="isAll">
        <el-radio :label="1">全部</el-radio>
        <el-radio :label="0">已授权</el-radio>
      </el-radio-group>
      <el-button class="customer query" @click.native.prevent="fetchData" v-waves :loading="loading">保存</el-button>
      <el-button class="customer reset" @click.native.prevent="back" v-waves>取消</el-button>
    </div>
  </div>
</template>
<script>
  import { getResourceTree, roleGrantResource } from '../../api/role'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['roleParams'])
    },
    created() {
      this.getTrees()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
      isAll() {
        this.$refs.tree.filter(this.filterText)
      }
    },
    data() {
      return {
        filterText: '',
        treeData: [],
        loading: false,
        isAll: 1
      }
    },
    methods: {
      ...mapActions(['delTab']),
      getTrees() {
        getResourceTree(this.roleParams.tuid).then(res => {
          this.treeData = res.obj
        }).catch(error => {
          this.$message.info(error.message)
        })
      },
      renderContent(h, { node, data }) {
        return (
          <span class='custom-tree-node'>
            <svg-icon icon-class={data.children && data.children.length > 0 ? 'file' : 'childFile'}
              class='pre'></svg-icon>
            <span class='label'>{data.name}</span>
            <span class='operate'>
              <el-checkbox value={data.hasAuthRight} on-input={value => {
                data.hasAuthRight = value
              }}>授权</el-checkbox>
            </span>
          </span>)
      },
      filterNode(value, data) {
        return (!value || data.name.includes(value)) && (this.isAll === 1 || data.hasAuthRight)
      },
      fetchData() {
        this.loading = true
        const resourceIds = this.getResourceIds([], this.treeData)
        roleGrantResource(this.roleParams.tuid, resourceIds).then(() => {
          this.loading = false
          this.success()
        }).catch(error => {
          this.loading = false
          this.$message.info(error.message)
        })
      },
      getResourceIds(resIds, data) {
        for (const { id, hasAuthRight, children } of data) {
          if (hasAuthRight) {
            resIds.push(id)
          }
          if (children && children.length > 0) {
            this.getResourceIds(resIds, children)
          }
        }
        return resIds
      },
      success() {
        this.$alert('资源分配成功！', '提示', {
          confirmButtonText: '确定',
          type: 'success',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          this.back()
        })
      },
      back() {
        this.delTab(this.$route).then(() => {
          this.$router.go(-1)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/variables";

  #role-resource {
    padding: 10px 20px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .header {
      flex: 0 0 46px;
      height: 46px;
      padding-bottom: 10px;
      .el-col {
        height: 36px;
        h3 {
          font-size: 14px;
          line-height: 36px;
          color: $color-main;
          padding-left: 20px;
        }
      }
    }
    .tree {
      overflow: auto;
      flex: 1 1 auto;
      background: #F5F7FA;
      border: 1px solid #d5e4f7;
      .el-tree {
        background: #F5F7FA;
        .el-tree-node__content:hover {
          background-color: #daeeff;
        }
        .el-tree-node__expand-icon {
          color: #657180;
          font-size: 14px;
          &.is-leaf {
            color: transparent;
          }
        }
        .custom-tree-node {
          flex: 1 1 auto;
          position: relative;
          display: flex;
          align-items: center;
          .pre {
            color: #657180;
            font-size: 18px;
            padding-right: 3px;
            margin-top: -3px;
          }
          .label {
            font-size: 13px;
            color: $color-main;
          }
          .operate {
            position: absolute;
            right: 300px;
          }
        }
      }
    }
    .btn-box {
      flex: 0 0 40px;
      padding-top: 10px;
      height: 40px;
      display: flex;
      justify-content: center;
      position: relative;
      .el-radio-group {
        position: absolute;
        left: 0;
        top: 22px;
        .el-radio__input.is-checked + .el-radio__label {
          color: #0275d8;
        }
      }
    }
  }
</style>
