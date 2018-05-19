<template>
  <transition name="dialog-fade">
    <div id="mask-resource-edit" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>新增资源</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <el-form :model="formItems" :rules="formRules" label-width="100px" inline :show-message="false" ref="form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="Key" prop="sourceKey">
                  <el-input clearable placeholder="请输入" v-model="formItems.sourceKey"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="名称" prop="sourceName">
                  <el-input clearable placeholder="请输入" v-model="formItems.sourceName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="sourceType">
                  <el-select v-model="formItems.sourceType" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.sourceType.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="Url" prop="sourceUrl">
                  <el-input clearable placeholder="请输入" v-model="formItems.sourceUrl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="图标" prop="sourceIcon">
                  <el-input clearable placeholder="请输入" v-model="formItems.sourceIcon"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上级资源" prop="parentResId">
                  <select-tree v-model="formItems.parentResId" :data="dicts.parentResId.items" :check-level="false"
                               check-key="id" check-label="name" :multiple="false"></select-tree>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="Vue路由" prop="routerVue">
                  <el-input clearable placeholder="请输入" v-model="formItems.routerVue"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="jwt路由" prop="routerJwt">
                  <el-input clearable placeholder="请输入" v-model="formItems.routerJwt"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="请求方法" prop="requestMethod">
                  <el-input clearable placeholder="请输入" v-model="formItems.requestMethod"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="层级" prop="sourceLevel">
                  <el-input clearable placeholder="请输入" v-model="formItems.sourceLevel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="排序" prop="sourceSort">
                  <el-input clearable placeholder="请输入" v-model="formItems.sourceSort"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="是否隐藏" prop="isHide">
                  <el-select v-model="formItems.isHide" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.isHide.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述" class="textarea" prop="sourceDesc">
                  <el-input clearable placeholder="请输入" type="textarea"
                            v-model="formItems.sourceDesc" resize="none"></el-input>
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
  import { resourceData } from './js/data'
  import { getResDetail, updateResource } from '../../api/resourse'
  import SelectTree from '../../components/selectTree'

  export default {
    mixins: [childFormMixin, resourceData],
    props: {
      resId: {
        type: String,
        default: ''
      }
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        successMsg: '编辑资源成功！'
      }
    },
    methods: {
      fetchData() {
        return updateResource(this.resId, this.getParams())
      },
      fetchDetail() {
        getResDetail(this.resId).then(data => {
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

  #mask-resource-edit {
    @include dialog-form-css;
  }
</style>
