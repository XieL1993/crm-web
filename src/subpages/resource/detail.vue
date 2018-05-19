<template>
  <transition name="dialog-fade">
    <div id="mask-user-detail" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>用户详细信息</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <div class="form">
            <el-row>
              <el-col :span="8">
                <span class="label">登陆名：</span>
                <span class="value">{{userDetail.userName}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">姓名：</span>
                <span class="value">{{userDetail.realName}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">部门：</span>
                <span class="value">{{userDetail.orgDname}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span class="label">类别：</span>
                <span class="value">{{userDetail.userTypeDname}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">性别：</span>
                <span class="value">{{userDetail.sexDname}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">生日：</span>
                <span class="value">{{userDetail.birthday|formatDateTime}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span class="label">电话：</span>
                <span class="value">{{userDetail.phone}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">Email：</span>
                <span class="value">{{userDetail.email}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">任务(万元)：</span>
                <span class="value">{{userDetail.annualTask}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="label">地址：</span>
                <span class="value">{{userDetail.address}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="label">描述：</span>
                <span class="value single">{{userDetail.description}}</span>
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
  import { getUserDetail } from '../../api/user'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      userId: {
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
        userDetail: {}
      }
    },
    methods: {
      fetchDetail() {
        getUserDetail(this.userId).then(data => {
          this.userDetail = data.obj
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

  #mask-user-detail {
    @include dialog-detail-css()
  }
</style>
