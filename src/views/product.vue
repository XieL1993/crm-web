<template>
  <div id="product">
    <div class="tree">
      <el-tree :data="productTrees" show-checkbox ref="tree" default-expand-all :expand-on-click-node="false"></el-tree>
    </div>
  </div>
</template>
<script>
  import { productTree } from '../api/login'

  export default {
    data() {
      return {
        productTrees: []
      }
    },
    created() {
      this.getProductTrees()
    },
    methods: {
      getProductTrees() {
        productTree().then(res => {
          this.productTrees = this.filterTreesBydata([], [res.obj])
        }).catch(error => {
          this.$message.warning({ showClose: true, message: error.message, duration: 3000 })
        })
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
      }
    }
  }
</script>
<style scoped lang="scss">
  #product {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    .tree {
      flex: 0 0 250px;
      width: 250px;
      border-right: 1px solid #DCDFE6;
      height: 100%;
      padding: 10px;
    }
  }
</style>
