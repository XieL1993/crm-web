<template>
  <transition name="dialog-fade">
    <div id="mask-user-add" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>新增用户</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <el-form :model="formItems" :rules="formRules" label-width="100px" inline :show-message="false" ref="form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="登陆名" prop="userName">
                  <el-input clearable placeholder="请输入" v-model="formItems.userName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名" prop="realName">
                  <el-input clearable placeholder="请输入" v-model="formItems.realName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门" prop="orgId">
                  <select-tree v-model="formItems.orgId" :data="dicts.orgId.items" :check-level="false"
                               check-key="id" check-label="title" :multiple="false"></select-tree>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="类别" prop="orgType">
                  <el-select v-model="formItems.userType" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.userType.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别" prop="orgType">
                  <el-select v-model="formItems.sex" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.sex.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="生日" prop="birthday">
                  <el-date-picker
                    size="mini"
                    v-model="formItems.birthday"
                    placeholder="选择日期"
                    align="center"
                    format="yyyy 年 MM 月 dd 日">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="电话" prop="phone">
                  <el-input clearable placeholder="请输入" v-model="formItems.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Email" prop="email">
                  <el-input clearable placeholder="请输入" v-model="formItems.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="任务(万元)" prop="annualTask">
                  <el-input clearable placeholder="请输入" v-model="formItems.annualTask"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="地址" prop="address">
                  <el-input clearable placeholder="请输入" v-model="formItems.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述" class="textarea" prop="description">
                  <el-input clearable placeholder="请输入" type="textarea"
                            v-model="formItems.description" resize="none"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="btn-box">
            <el-button class="customer query" @click.native.prevent="__fetchData" v-waves :loading="loading">保存
            </el-button>
            <el-button class="customer reset" @click.native.prevent="close" v-waves>取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { childFormMixin } from '../../common/js/childFormMixin'
  import { userData } from './js/data'
  import { addUser } from '../../api/user'
  import SelectTree from '../../components/selectTree'

  export default {
    mixins: [childFormMixin, userData],
    data() {
      return {
        successMsg: '新增用户成功！'
      }
    },
    methods: {
      fetchData() {
        return addUser(this.getParams())
      }
    },
    components: {
      SelectTree
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #mask-user-add {
    @include dialog-form-css;
    .dialog {
      width: 85%;
      height: 80%;
    }
  }
</style>
