<template>
  <div class="input-box" :class="{'hasValue':text!==''}" @click="onClick">
    <input readonly placeholder="请选择" v-model="text" ref="input">
    <svg-icon :icon-class="icon" class="icon"></svg-icon>
    <svg-icon icon-class="delete" class="delete" @click.native.stop="clear"></svg-icon>
  </div>
</template>
<script>
  export default {
    props: {
      icon: {
        type: String,
        default: 'customer'
      },
      value: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        text: ''
      }
    },
    watch: {
      value: {
        handler(val) {
          if (this.text !== val.display) {
            this.text = val.display
          }
        },
        deep: true
      }
    },
    methods: {
      clear() {
        this.$emit('input', { data: [], tuid: '', display: '', isShow: false })
      },
      onClick() {
        this.$emit('input', Object.assign({}, this.value, { isShow: true }))
      }
    }
  }
</script>
<style scoped lang="scss">
  .input-box {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #d7dde4;
    background-color: #fff;
    border-radius: 4px;
    input {
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
    .icon {
      position: absolute;
      top: 50%;
      margin-top: -9px;
      right: 5px;
      font-size: 18px;
      color: #999;
      cursor: pointer;
      display: block;
    }
    .delete {
      position: absolute;
      top: 50%;
      margin-top: -9px;
      right: 5px;
      font-size: 18px;
      cursor: pointer;
      color: #c0c4cc;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      display: none;
      &:hover {
        color: #909399;
      }
    }
    &:hover {
      border-color: #3591e0
    }
    &.hasValue:hover {
      .icon {
        display: none;
      }
      .delete {
        display: block;
      }
    }
  }
</style>
