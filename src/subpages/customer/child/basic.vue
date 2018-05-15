<template>
  <div id="opp-basic">
    <div class="info-item">
      <h2>基本信息</h2>
      <el-row>
        <el-col :span="8">
          <span class="label">客户名称：</span>
          <span class="value">{{cusDetail.custName}}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">客户编号：</span>
          <span class="value">{{cusDetail.custNo}}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">客户简称：</span>
          <span class="value">{{cusDetail.custShortName}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="label">英文名称：</span>
          <span class="value">{{cusDetail.custEnglish}}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">省/县/市：</span>
          <span class="value">{{cusDetail.province}}{{cusDetail.city}}{{cusDetail.district}}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">工商登记号：</span>
          <span class="value">{{cusDetail.identificationNumber}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="label">邮政编码：</span>
          <span class="value">{{cusDetail.postcode}}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">办公地址：</span>
          <span class="value">{{cusDetail.address}}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      cusDetail: {
        type: Object,
        default: () => {
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../common/styles/variables";
  #opp-basic {
    width: 100%;
    padding-bottom: 20px;
    .info-item {
      margin: 20px;
      padding: 10px;
      background: #f6f6f6;
      h2{
        font-size: 16px;
        color: $color-main;
        font-weight: normal;
        line-height: 30px;
        height: 30px;
        border-bottom: 1px solid $border-main;
      }
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
