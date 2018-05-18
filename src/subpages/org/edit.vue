<template>
  <transition name="dialog-fade">
    <div id="mask-org-edit" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>编辑部门</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <el-form :model="formItems" :rules="formRules" label-width="100px" inline :show-message="false" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门名称" prop="orgName">
                  <el-input clearable placeholder="请输入" v-model="formItems.orgName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上级部门" prop="parentOrgId">
                  <select-tree v-model="formItems.parentOrgId" :data="dicts.parentOrgId.items" :check-level="false"
                               check-key="id" check-label="title" :multiple="false"></select-tree>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门类型" prop="orgType">
                  <el-select v-model="formItems.orgType" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.orgType.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述" class="textarea" prop="orgDesc">
                  <el-input clearable placeholder="请输入" type="textarea"
                            v-model="formItems.orgDesc" resize="none"></el-input>
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
  import { orgData } from './js/data'
  import { getOrgDetail, updateOrg } from '../../api/org'
  import SelectTree from '../../components/selectTree'

  export default {
    mixins: [childFormMixin, orgData],
    props: {
      orgId: {
        type: String,
        default: ''
      }
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        successMsg: '编辑部门成功！'
      }
    },
    methods: {
      fetchData() {
        return updateOrg(this.orgId, this.getParams())
      },
      fetchDetail() {
        getOrgDetail(this.orgId).then(data => {
          this.dealDetail(data)
        }).catch(error => {
          this.showError(error.message)
        })
      }
    },
    components: {
      SelectTree
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #mask-org-edit {
    @include dialog-form-css;
    .dialog {
      width: 70%;
      height: 60%;
    }
  }
</style>
