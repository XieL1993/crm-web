<template>
  <transition name="dialog-fade">
    <div id="mask-role-detail" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>角色详情信息</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <div class="form">
            <el-row>
              <el-col :span="12">
                <span class="label">角色名称：</span>
                <span class="value">{{roleDetail.roleName}}</span>
              </el-col>
              <el-col :span="12">
                <span class="label">角色状态：</span>
                <span class="value">{{roleDetail.roleStatus}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="label">描述：</span>
                <span class="value single">{{roleDetail.roleDesc}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="btn-box">
            <el-button class="customer reset" @click.native.prevent="close" v-waves>关闭</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { getRoleDetail } from '../../api/role'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      roleId: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters(['sidebar'])
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        roleDetail: {}
      }
    },
    methods: {
      fetchDetail() {
        getRoleDetail(this.roleId).then(data => {
          this.roleDetail = data.obj
        })
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #mask-role-detail {
    @include dialog-detail-css()
    .dialog {
      width: 70%;
      height: 50%;
    }
  }
</style>
