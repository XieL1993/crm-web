<template>
  <transition name="page-fade">
    <div id="opp-basic">
      <div class="form">
        <el-row>
          <el-col :span="8">
            <span class="label">客户名称：</span>
            <span class="value">{{oppDetail.customerDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">产品名称：</span>
            <span class="value">{{oppDetail.productsDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">销售：</span>
            <span class="value">{{oppDetail.saleDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">BD：</span>
            <span class="value">{{oppDetail.bdDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">商机状态：</span>
            <span class="value">{{oppDetail.statusDname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">预计合同额(万元)：</span>
            <span class="value">{{oppDetail.estimate}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">预计合同签订时间：</span>
            <span class="value">{{oppDetail.expectedTime|formatDateTime}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label"> 商机类型：</span>
            <span class="value">{{oppDetail.typeDname}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label">竞争对手：</span>
            <span class="value single">{{oppDetail.competitor}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label">商机描述：</span>
            <span class="value single">{{oppDetail.description}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      oppDetail: {
        type: Object,
        default: () => {
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  #opp-basic {
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
