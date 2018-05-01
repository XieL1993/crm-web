<template>
  <transition name="page-fade">
    <div id="inv-basic">
      <div class="form">
        <el-row>
          <el-col :span="24">
            <span class="label">合同名称：</span>
            <span class="value">{{invDetail.contractDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">收款类型：</span>
            <span class="value">{{invDetail.typeDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">收款额(万元)：</span>
            <span class="value">{{invDetail.totalAmount}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">是否开发票：</span>
            <span class="value">{{invDetail.isInvoice}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">开发票时间：</span>
            <span class="value">{{invDetail.invoiceTime|formatDateTime}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">预计收款时间：</span>
            <span class="value">{{invDetail.expectedTime|formatDateTime}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">实际收款额(万元)：</span>
            <span class="value">{{invDetail.actualAmount}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">实际收款时间：</span>
            <span class="value">{{invDetail.actualTime|formatDateTime}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">是否收款完毕：</span>
            <span class="value">{{invDetail.isFinishedDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label">备注：</span>
            <span class="value single">{{invDetail.remarks}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      invDetail: {
        type: Object,
        default: () => {
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  #inv-basic {
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
