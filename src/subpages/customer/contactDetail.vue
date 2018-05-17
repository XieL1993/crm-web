<template>
  <transition name="dialog-fade">
    <div id="mask-contact-detail" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>联系人详细信息</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <div class="form">
            <el-row>
              <el-col :span="8">
                <span class="label">姓名：</span>
                <span class="value">{{contactDetail.contactName}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">状态：</span>
                <span class="value">{{contactDetail.statusDname}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">主要联系人：</span>
                <span class="value">{{contactDetail.isMain}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span class="label">手机：</span>
                <span class="value">{{contactDetail.mobile}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">办公电话：</span>
                <span class="value">{{contactDetail.phone}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">Email：</span>
                <span class="value">{{contactDetail.email}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span class="label">QQ：</span>
                <span class="value">{{contactDetail.qq}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">部门：</span>
                <span class="value">{{contactDetail.department}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">职位：</span>
                <span class="value">{{contactDetail.position}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span class="label">类型：</span>
                <span class="value">{{contactDetail.typeDname}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">性别：</span>
                <span class="value">{{contactDetail.sexDname}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">生日：</span>
                <span class="value">{{contactDetail.birthday}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span class="label">学历：</span>
                <span class="value">{{contactDetail.educationDname}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">毕业院校：</span>
                <span class="value">{{contactDetail.university}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">对本公司态度：</span>
                <span class="value">{{contactDetail.preferenceDname}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="label">备注：</span>
                <span class="value single">{{contactDetail.remarks}}</span>
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
  import { getContactDetail } from '../../api/customer'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      contactId: {
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
        contactDetail: {}
      }
    },
    methods: {
      fetchDetail() {
        getContactDetail(this.contactId).then(data => {
          this.contactDetail = data.obj
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

  #mask-contact-detail {
    @include dialog-detail-css();
    .dialog {
      width: 85%;
      height: 85%;
    }
  }
</style>
