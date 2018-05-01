<template>
  <transition name="page-fade">
    <div id="act-basic">
      <div class="form">
        <el-row>
          <el-col :span="24">
            <span class="label">商机名称：</span>
            <span class="value">{{actDetail.oppIdsDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label">合同名称：</span>
            <span class="value">{{actDetail.contractIdsDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">客户名称：</span>
            <span class="value">{{actDetail.customerDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">产品名称：</span>
            <span class="value">{{actDetail.productsDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">BD：</span>
            <span class="value">{{actDetail.bdDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">客户联系人：</span>
            <span class="value">{{actDetail.contact}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">活动日期：</span>
            <span class="value">{{actDetail.date|formatDateTime}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">活动类型：</span>
            <span class="value">{{actDetail.typeDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">地点：</span>
            <span class="value">{{actDetail.address}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label">内容描述：</span>
            <span class="value single">{{actDetail.content}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      actDetail: {
        type: Object,
        default: () => {
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  #act-basic {
    width: 100%;
    padding-bottom: 20px;
    &.page-fade-enter-active, &.page-fade-leave-active {
      transition: opacity 0.4s ease-in-out;
    }
    &.page-fade-enter, &.page-fade-leave-to {
      opacity: 0;
    }
    .form {
      .el-row {
        padding: 0 30px;
        margin-top: 20px;
        .el-col {
          display: flex;
          font-size: 14px;
          color: #606266;
          .label {
            width: 130px;
            flex: 0 0 130px;
            height: 30px;
            line-height: 30px;
            text-align: right;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .value {
            height: 30px;
            line-height: 30px;
            flex: 1 1 auto;
            text-align: left;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            &.single {
              height: auto;
              min-height: 30px;
              line-height: 30px;
              white-space: normal;
            }
          }
        }
      }
    }
  }
</style>
