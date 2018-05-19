<template>
  <transition name="dialog-fade">
    <div id="mask-role-add" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>新建角色</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <el-form :model="formItems" :rules="formRules" label-width="100px" inline :show-message="false" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input clearable placeholder="请输入" v-model="formItems.roleName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色状态" prop="roleStatus">
                  <el-select v-model="formItems.roleStatus" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.roleStatus.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述" class="textarea" prop="roleDesc">
                  <el-input clearable placeholder="请输入" type="textarea"
                            v-model="formItems.roleDesc" resize="none"></el-input>
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
  import { roleData } from './js/data'
  import { addRole } from '../../api/role'

  export default {
    mixins: [childFormMixin, roleData],
    data() {
      return {
        successMsg: '新建角色成功！'
      }
    },
    methods: {
      fetchData() {
        return addRole(this.getParams())
      }
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #mask-role-add {
    @include dialog-form-css;
  }
</style>
