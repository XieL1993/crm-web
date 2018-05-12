<template>
  <div id="edit-activity">
    <h3 class="form-title">基本信息</h3>
    <el-form :model="formItems" :rules="formRules" label-width="120px" inline :show-message="false" ref="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="活动主题" prop="subject">
            <el-input clearable placeholder="请输入" v-model="formItems.subject"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="row_des">（提示：系统将根据您选择的产品、客户名称、创建时间自动组合为商机名称，您也可以自行录入)</p>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="customer">
            <pick-input v-model="formItems.customer" icon="customer"></pick-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商机名称" prop="oppIds">
            <pick-input v-model="formItems.oppIds" icon="opportunity"></pick-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同名称" prop="contractIds">
            <pick-input v-model="formItems.contractIds" icon="contract"></pick-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="products">
            <select-tree v-model="formItems.products" :data="dicts.products.items"></select-tree>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="BD" prop="bd">
            <el-select v-model="formItems.bd" clearable placeholder="请选择">
              <el-option v-for="item in dicts.bd.items" :key="item.tuid" :value="item.tuid" :label="item.realName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动对接人" prop="contact">
            <el-input placeholder="请选择" v-model="formItems.contact"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="活动日期" prop="date">
            <el-date-picker
              size="mini"
              v-model="formItems.date"
              placeholder="选择日期"
              align="center"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动类型" prop="type">
            <el-select v-model="formItems.type" clearable placeholder="请选择">
              <el-option v-for="item in dicts.type.items" :key="item.dictEntryCode" :value="item.dictEntryCode"
                         :label="item.dictItemName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地点" prop="address">
            <el-input placeholder="请输入" v-model="formItems.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="内容描述" class="textarea" prop="content">
            <el-input class="textarea" clearable placeholder="请输入" type="textarea"
                      v-model="formItems.content" resize="none"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-upload class="attach-box" :action="uploadUrl" multiple :on-success="uplodSuccess" :on-remove="uploadRemove"
               :on-preview="preview" :headers="headers" :file-list="defaultFileList">
      <div class="header">
        <span class="info" @click.prevent.stop="">附件</span>
        <el-button class="customer query" v-waves>点击上传</el-button>
      </div>
      <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg .png</div>
    </el-upload>
    <div class="btn-box">
      <el-button class="customer query" @click.native.prevent="__fetchData" v-waves :loading="loading">保存</el-button>
      <el-button class="customer reset" @click.native.prevent="back" v-waves>取消</el-button>
    </div>
    <pick-customer v-if="formItems.customer.isShow" :multiple="false" v-model="formItems.customer"></pick-customer>
    <pick-opportunity v-if="formItems.oppIds.isShow" :multiple="true" v-model="formItems.oppIds"></pick-opportunity>
    <pick-contract v-if="formItems.contractIds.isShow" :multiple="true" v-model="formItems.contractIds"></pick-contract>
    <image-preview v-if="showPreview" :img="currentAttach" @close="showPreview=false"></image-preview>
  </div>
</template>
<script>
  import { formMixin } from '../../common/js/formMixin'
  import { attachMixin } from '../../common/js/attachMixin'
  import { activityData } from './js/data'
  import { undateActivity, getActDetail } from '../../api/activity'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [formMixin, attachMixin, activityData],
    computed: {
      ...mapGetters(['activityId'])
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        successMsg: '编辑活动成功！'
      }
    },
    methods: {
      fetchData() {
        return undateActivity(this.activityId, this.getParams())
      },
      fetchDetail() {
        getActDetail(this.activityId).then(data => {
          this.dealDetail(data)
        }).catch(error => {
          this.showError(error.message)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../common/styles/mixin";

  #edit-activity {
    @include form-page-css
  }
</style>
