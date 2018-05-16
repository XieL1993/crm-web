<template>
  <transition name="page-fade">
    <div id="contract-basic">
      <div class="form">
        <el-row>
          <el-col :span="24">
            <span class="label">商机名称：</span>
            <span class="value">{{contractDetail.opportunityDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">客户名称：</span>
            <span class="value">{{contractDetail.customerDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">产品名称：</span>
            <span class="value">{{contractDetail.productsDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">销售：</span>
            <span class="value">{{contractDetail.saleDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">BD：</span>
            <span class="value">{{contractDetail.bdDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">签约类型：</span>
            <span class="value">{{contractDetail.signTypeDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">合同类型：</span>
            <span class="value">{{contractDetail.typeDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">合同状态：</span>
            <span class="value">{{contractDetail.statusDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label"> 合同总金额(万元)：</span>
            <span class="value">{{contractDetail.amount}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label"> 是否收款完毕：</span>
            <span class="value">{{contractDetail.isFinishedDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">合同签订时间：</span>
            <span class="value">{{contractDetail.signTime|formatDateTime}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label"> 服务开始时间：</span>
            <span class="value">{{contractDetail.startTime|formatDateTime}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label"> 服务到期时间：</span>
            <span class="value">{{contractDetail.expiryTime|formatDateTime}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">合同核算日：</span>
            <span class="value">{{contractDetail.adjustTime|formatDateTime}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label"> 是否开展业务：</span>
            <span class="value">{{contractDetail.isBusinessDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label">收款信息：</span>
            <span class="value single">{{contractDetail.receiptInfo}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label">合同描述：</span>
            <span class="value single">{{contractDetail.description}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      contractDetail: {
        type: Object,
        default: () => {
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  #contract-basic {
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
