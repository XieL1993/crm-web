<template>
  <transition name="dialog-fade">
    <div id="image-preview" @click="close" :class="{hideSidebar:!sidebar.opened}">
      <img v-lazy="img" class="dialog" @click.stop>
    </div>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      img: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters(['sidebar'])
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/animation";

  #image-preview {
    @include dialog-animation();
    position: fixed;
    top: 0;
    left: 0;
    padding-left: 180px;
    padding-top: 85px;
    bottom: 0;
    right: 0;
    z-index: 2999;
    background-color: rgba(60, 60, 60, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    &.hideSidebar {
      padding-left: 36px;
    }
    .dialog {
      max-width: 80%;
      max-height: 80%;
      border-radius: 4px;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
</style>
