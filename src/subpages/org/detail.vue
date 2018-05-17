<template>
  <transition name="dialog-fade">
    <div id="mask-org-detail" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>部门详细信息</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <div class="form">
            <el-row>
              <el-col :span="12">
                <span class="label">部门名称：</span>
                <span class="value">{{orgDetail.orgName}}</span>
              </el-col>
              <el-col :span="12">
                <span class="label">部门类型：</span>
                <span class="value">{{orgDetail.orgType}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="label">上级部门：</span>
                <span class="value">{{orgDetail.parentOrgId}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="label">描述：</span>
                <span class="value single">{{orgDetail.orgDesc}}</span>
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
  import { getOrgDetail } from '../../api/org'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      orgId: {
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
        orgDetail: {}
      }
    },
    methods: {
      fetchDetail() {
        getOrgDetail(this.orgId).then(data => {
          this.orgDetail = data.obj
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

  #mask-org-detail {
    @include dialog-detail-css()
  }
</style>
