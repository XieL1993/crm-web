<template>
  <div id="main-index">
    <el-row class="header">
      <el-col :span="12">
        <div class="overview ">
          <div class="title">
            <span>我的数据概览</span>
            <el-date-picker
              size="mini"
              :clearable="false"
              v-model="overviewDate"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <div class="content">
            <patch v-for="(item,index) in overviewData" :key="index" :data="item"></patch>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="remind">
          <div class="title">
            <span>我的重要提醒</span>
            <el-date-picker
              :clearable="false"
              size="mini"
              v-model="remindDate"
              align="center"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <div class="week-box">
            <div class="week">
              <week-item v-for="(item,index) in remindData" :key="index" :data="item"
                         @click.native.prevent.stop="showRemind(index)"></week-item>
            </div>
            <week-item :data="remindData[currentRemind]" class="slider" ref="slider"></week-item>
          </div>
          <div class="content">
            <div class="item" v-for="(item,index) in remindData[currentRemind].entity" :key="index">
              <span class="type">{{item.reminfType}}</span>
              <span class="info">{{item.remindInfo}}</span>
            </div>
            <div class="empty-box" v-show="!remindData[currentRemind].entity.length">
              <svg-icon icon-class="nodata"></svg-icon>
              <span>暂无数据</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="chart-box">
      <home-chart></home-chart>
    </div>
  </div>
</template>
<script>
  import { getCurrentWeek, getCurrentDay, pickerOptions, formatDateTime } from '../common/js/utils'
  import { getOverView, getRemind } from '../api'
  import Patch from '../components/patch'
  import WeekItem from '../components/week-item'
  import HomeChart from '../components/chart/home-chart'

  export default {
    created() {
      this.getOverView()
      this.createWeekForm()
    },
    data() {
      return {
        overviewDate: getCurrentWeek(),
        overviewData: [],
        remindDate: getCurrentDay(),
        remindData: [],
        currentRemind: 0,
        pickerOptions: pickerOptions()
      }
    },
    watch: {
      overviewDate() {
        this.getOverView()
      },
      remindDate() {
        this.createWeekForm()
      },
      currentRemind(val) {
        this.$refs.slider.$el.style.left = val * 100 / 7 + '%'
      }
    },
    methods: {
      getOverView() {
        getOverView(this.overviewDate[0], this.overviewDate[1]).then(res => {
          this.overviewData = res.obj
        }).catch(error => {
          this.$message.info({ showClose: true, message: error.message, duration: 3000 })
        })
      },
      createWeekForm() {
        const data = {}
        for (let i = 0; i < 7; i++) {
          const date = new Date(this.remindDate)
          date.setDate(date.getDate() + i)
          const weekday = ['日', '一', '二', '三', '四', '五', '六']
          const object = {
            week: weekday[date.getDay()],
            day: `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            entity: [],
            active: false,
            current: false
          }
          if (i === 0) {
            object.current = true
          }
          data[formatDateTime(date)] = object
        }
        this.getRemindData(data)
      },
      getRemindData(data) {
        getRemind(this.remindDate).then(res => {
          res.obj.forEach(item => {
            const day = item.remindDate
            if (data[day]) {
              data[day].active = true
              data[day].entity.push(item)
            }
          })
        })
        this.remindData = Object.values(data)
      },
      showRemind(index) {
        for (let i = 0; i < this.remindData.length; i++) {
          this.remindData[i].current = i === index
        }
        this.currentRemind = index
      }
    },
    components: {
      Patch,
      WeekItem,
      HomeChart
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/variables";
  @import "../common/styles/mixin";

  #main-index {
    background: white;
    .header {
      height: 250px;
      .el-col {
        height: 100%;
        padding: 10px;
        .overview {
          background: #F8F8F8;
          height: 100%;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.12);
          .title {
            height: 40px;
            background: #F2F2F2;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #E4E7ED;
            span {
              flex: 0 0 auto;
              font-size: 13px;
              line-height: 40px;
              margin-left: 15px;
              color: $color-text-table;
            }

            .el-date-editor {
              flex: 0 0 auto;
              margin-left: 15px;
              height: 27px;
            }
          }
          .content {
            width: 100%;
            height: 160px;
            margin-top: 15px;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
        .remind {
          background: #F8F8F8;
          height: 100%;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.12);
          border-left: 1px solid #E4E7ED;
          display: flex;
          flex-direction: column;
          .title {
            flex: 0 0 auto;
            height: 40px;
            background: #F2F2F2;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #E4E7ED;
            span {
              flex: 0 0 auto;
              font-size: 13px;
              line-height: 40px;
              margin-left: 15px;
              color: $color-text-table;
            }

            .el-date-editor {
              flex: 0 0 auto;
              margin-left: 15px;
              height: 27px;
            }
          }
          .week-box {
            flex: 0 0 auto;
            height: 65px;
            border-bottom: 1px solid #E4E7ED;
            position: relative;
            .week {
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              display: flex;
            }
            .slider {
              width: calc(100% / 7);
              position: absolute;
              top: 0;
              left: 0;
              /*transition: all 0.3s;*/
            }
          }
          .content {
            flex: 1 1 auto;
            height: 100%;
            background: #ffffff;
            overflow-y: auto;
            overflow-x: hidden;
            position: relative;
            .item {
              height: 30px;
              border-bottom: 1px solid #E4E7ED;
              display: flex;
              cursor: pointer;
              .type {
                flex: 0 0 auto;
                color: #FF6600;
                padding: 0 10px;
                font-size: 12px;
                line-height: 30px;
                font-weight: bold;
              }
              .info {
                color: $color-text-table;
                font-size: 12px;
                line-height: 30px;
                @include no-wrap()
              }
            }
            .empty-box {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              .svg-icon {
                font-size: 50px;
                color: #909399;
              }
              span {
                display: block;
                font-size: 14px;
                color: #909399;
                margin-top: 10px;
                padding-left: 15px;
              }
            }
          }
        }
      }
    }
    .chart-box{
      width: 100%;
      height: 550px;
      padding: 20px 15px;
    }
  }
</style>
