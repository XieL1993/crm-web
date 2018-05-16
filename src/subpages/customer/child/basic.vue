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
    <div class="info-item">
      <h2>市场信息</h2>
      <el-row>
        <el-col :span="8">
          <span class="label">公司电话：</span>
          <span class="value">{{cusDetail.phone}}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">传真号码：</span>
          <span class="value">{{cusDetail.fax}}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">所属行业：</span>
          <span class="value">{{cusDetail.industryDname}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="info-item">
      <h2>其他信息</h2>
      <el-row>
        <el-col :span="8">
          <span class="label">销售：</span>
          <span class="value">{{cusDetail.salesDname}}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">BD：</span>
          <span class="value">{{cusDetail.bdDname}}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">客户类型：</span>
          <span class="value">{{cusDetail.typeDname}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">备注：</span>
          <span class="value single">{{cusDetail.remarks}}</span>
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
  @import "../../../common/styles/mixin";

  #opp-basic {
    width: 100%;
    padding-bottom: 20px;
    .info-item {
      margin: 20px;
      background: #F1F6FB;
      padding-bottom: 20px;
      border: 1px solid #d5e4f7;
      h2 {
        font-size: 16px;
        color: $color-normal;
        font-weight: bold;
        line-height: 40px;
        height: 40px;
        border-bottom: 1px solid $border-main;
        padding-left: 20px;
      }
      .el-row {
        padding: 0 20px;
        margin-top: 20px;
        .el-col {
          display: flex;
          font-size: 14px;
          color: $color-normal;
          .label {
            width: 130px;
            flex: 0 0 130px;
            height: 30px;
            line-height: 30px;
            text-align: right;
            @include no-wrap;
          }
          .value {
            height: 30px;
            line-height: 30px;
            flex: 1 1 auto;
            text-align: left;
            @include no-wrap;
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
