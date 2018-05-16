<template>
  <transition name="dialog-fade">
    <div id="mask-contact-edit" :class="{hideSidebar:!sidebar.opened}">
      <div class="dialog">
        <div class="header">
          <h3>编辑联系人</h3>
          <svg-icon icon-class="closedialog" @click.native.prevent="close"></svg-icon>
        </div>
        <div class="main">
          <el-form :model="formItems" :rules="formRules" label-width="80px" inline :show-message="false" ref="form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名" prop="contactName">
                  <el-input clearable placeholder="请输入" v-model="formItems.contactName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态" prop="status">
                  <el-select v-model="formItems.status" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.status.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主要联系人" prop="isMain">
                  <el-select v-model="formItems.isMain" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.isMain.items" :key="item.key"
                               :value="item.key"
                               :label="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="手机" prop="mobile">
                  <el-input placeholder="请输入" clearable v-model="formItems.mobile"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="办公电话" prop="phone">
                  <el-input placeholder="请输入" clearable v-model="formItems.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Email" prop="email">
                  <el-input placeholder="请输入" clearable v-model="formItems.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="QQ" prop="qq">
                  <el-input placeholder="请输入" clearable v-model="formItems.qq"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门" prop="department">
                  <el-input placeholder="请输入" clearable v-model="formItems.department"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职位" prop="position">
                  <el-input placeholder="请输入" clearable v-model="formItems.position"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="类型" prop="type">
                  <el-select v-model="formItems.type" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.type.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别" prop="sex">
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
                  <el-input placeholder="请输入" clearable v-model="formItems.birthday"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="学历" prop="education">
                  <el-select v-model="formItems.education" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.education.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="毕业院校" prop="university">
                  <el-input placeholder="请输入" clearable v-model="formItems.university"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="对本公司态度" prop="preference">
                  <el-select v-model="formItems.preference" clearable placeholder="请选择">
                    <el-option v-for="item in dicts.preference.items" :key="item.dictEntryCode"
                               :value="item.dictEntryCode"
                               :label="item.dictItemName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" class="textarea" prop="remarks">
                  <el-input clearable placeholder="请输入" type="textarea"
                            v-model="formItems.remarks" resize="none"></el-input>
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
  import { contactData } from './js/contactData'
  import { undateContact, getContactDetail } from '../../api/customer'

  export default {
    mixins: [childFormMixin, contactData],
    props: {
      contactId: {
        type: String,
        default: ''
      }
    },
    created() {
      this.fetchDetail()
    },
    data() {
      return {
        successMsg: '编辑联系人成功！'
      }
    },
    methods: {
      fetchData() {
        return undateContact(this.contactId, this.getParams())
      },
      fetchDetail() {
        getContactDetail(this.contactId).then(data => {
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

  #mask-contact-edit {
    @include dialog-form-css;
    .dialog {
      width: 85%;
      height: 85%;
    }
  }
</style>
