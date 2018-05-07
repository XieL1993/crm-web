<template>
  <div class="x-tree" v-clickoutside="handleHide">
    <div class="x-input-wrapper" @click="toggleDropVisible" :title="model"
         :class="{'active':dropVisible,'hasValue':model!==''}">
      <input readonly class="x-input" placeholder="请选择" v-model="model">
      <svg-icon icon-class="arrowbottom" class="arrow"></svg-icon>
      <svg-icon icon-class="delete" class="delete" @click.native.prevent.stop="clear"></svg-icon>
    </div>
    <transition name="el-zoom-in-top">
      <div class="x-drop" v-show="dropVisible">
        <el-tree :data="data" show-checkbox size="mini" ref="tree"
                 :node-key="checkKey" @check="onCheckChange" default-expand-all></el-tree>
      </div>
    </transition>
  </div>
</template>
<script>
  import clickoutside from '../../common/directive/clickoutside'

  export default {
    directives: {
      clickoutside
    },
    props: {
      data: {
        type: Array,
        default: () => []
      },
      value: {
        type: String,
        default: ''
      },
      checkLevel: {
        type: Boolean,
        default: true
      },
      checkKey: {
        type: String,
        default: 'tuid'
      }
    },
    computed: {
      flag() {
        return this.data && this.data.length > 0 && this.value && this.value.length > 0 && this.firstValue
      }
    },
    watch: {
      flag(val) {
        if (val) {
          this.firstValue = false
          const tuids = this.value.split(',')
          const names = this.checkData([], tuids, this.data)
          this.$refs.tree.setCheckedKeys(tuids)
          this.model = names.join(',')
        }
      }
    },
    data() {
      return {
        dropVisible: false,
        model: '',
        firstValue: true
      }
    },
    methods: {
      toggleDropVisible() {
        this.dropVisible = !this.dropVisible
      },
      handleHide() {
        this.dropVisible = false
      },
      checkData(names, ids, data) {
        data.forEach(item => {
          if (ids.includes(item.tuid)) {
            names.push(item.label)
          }
          const children = item.children
          if (children && children.length > 0) {
            this.checkData(names, ids, children)
          }
        })
        return names
      },
      onCheckChange(view, { checkedNodes }) {
        const keys = []
        const values = []
        for (const item of checkedNodes) {
          const key = item[this.checkKey]
          const title = item.label
          const level = item.level
          if (level === '1' || !this.checkLevel) {
            keys.push(key)
            values.push(title)
          }
        }
        this.firstValue = false
        this.model = values.join(',')
        this.$emit('input', keys.join(','))
      },
      getTitle() {
        return this.model
      },
      clear() {
        this.model = ''
        this.$emit('input', '')
        this.$refs.tree.setCheckedKeys([])
        this.dropVisible = false
      }
    }
  }
</script>
<style scoped lang="scss">
  .x-tree {
    height: 100%;
    background: #ffffff;
    .x-input-wrapper {
      position: relative;
      height: 100%;
      border: 1px solid #d7dde4;
      border-radius: 4px;
      .x-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        font-size: 12px;
        color: #657180;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        outline: none;
        border: none;
        border-radius: 4px;
        padding-left: 7px;
        padding-right: 28px;
        &::-webkit-input-placeholder {
          color: #c3cbd6;
        }
      }
      .arrow {
        position: absolute;
        top: 50%;
        margin-top: -6px;
        right: 8px;
        color: #c0c4cc;
        font-size: 12px;
        display: block;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      .delete {
        position: absolute;
        top: 50%;
        margin-top: -9px;
        right: 5px;
        font-size: 18px;
        color: #c0c4cc;
        display: none;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        &:hover {
          color: #909399;
        }
      }
      &:hover {
        border-color: #3591e0;
      }
      &.active {
        .arrow {
          transform: rotateZ(-180deg);
        }
      }
      &.hasValue:hover {
        .delete {
          display: block;
        }
        .arrow {
          display: none;
        }
      }
    }
    .x-drop {
      width: 100%;
      position: absolute;
      max-height: 250px;
      padding: 5px 0;
      overflow: auto;
      background: #ffffff;
      z-index: 99;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      margin-top: 8px;
      transform-origin: center top;
    }
  }
</style>
