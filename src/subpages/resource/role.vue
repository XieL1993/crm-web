<template>
  <div id="role-resource">
    <div class="search-box">
      <el-row>
        <el-col :span="8">
          <span class="item-label">角色名称</span>
          <el-input clearable></el-input>
        </el-col>
        <el-col :span="8">
          <span class="user-info">当前分配用户：{{`${userParams.realName}(${userParams.userName})`}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="btn-box">
      <el-button class="customer query" @click.native.prevent="fetchData" v-waves>查询</el-button>
      <el-button class="customer reset" @click.native.prevent="resetQuery" v-waves>清空</el-button>
      <el-button class="customer reset" @click.native.prevent="submitLeft" v-waves>分配</el-button>
      <el-button class="customer reset" @click.native.prevent="submitRight" v-waves>取消分配</el-button>
    </div>
    <div class="tab-box">
      <div class="tab-item">
        <div class="title">待分配角色</div>
        <el-table
          size="mini"
          tooltip-effect="dark"
          border
          stripe
          v-loading="loading"
          :data="dataLeft"
          row-key="tuid"
          @selection-change="onChangeLeft">
          <el-table-column
            type="selection"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="roleName"
            width="100"
            label="角色名称"
            align="left"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="roleDesc"
            label="角色描述"
            align="left"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <div class="tab-divide"></div>
      <div class="tab-item">
        <div class="title">已分配角色</div>
        <el-table
          size="mini"
          tooltip-effect="dark"
          border
          stripe
          v-loading="loading"
          :data="dataRight"
          row-key="tuid"
          @selection-change="onChangeRight">
          <el-table-column
            type="selection"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="roleName"
            width="100"
            label="角色名称"
            align="left"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="roleDesc"
            label="角色描述"
            align="left"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import { getUserResource, setUserResource } from '../../api/resourse'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['userParams'])
    },
    data() {
      return {
        dataLeft: [],
        selectionLeft: [],
        dataRight: [],
        selectionRight: [],
        loading: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      ...mapActions(['delTab']),
      fetchData() {
        this.loading = true
        getUserResource(this.userParams.tuid).then(({ roles, roleIds }) => {
          const left = []
          const right = []
          roles.forEach(item => {
            roleIds.includes(item.tuid) ? right.push(item) : left.push(item)
          })
          this.dataLeft = left
          this.dataRight = right
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.info(error.message)
        })
      },
      back() {
        this.delTab(this.$route).then(() => {
          this.$router.go(-1)
        })
      },
      onChangeLeft(selection) {
        this.selectionLeft = selection
      },
      onChangeRight(selection) {
        this.selectionRight = selection
      },
      submitLeft() {
        if (this.selectionLeft.length === 0) {
          this.$message.info('请至少选择一条未分配角色！')
        } else {
          const roleIds = []
          this.dataRight.forEach(item => {
            roleIds.push(item.tuid)
          })
          this.selectionLeft.forEach(item => {
            roleIds.push(item.tuid)
          })
          setUserResource(this.userParams.tuid, roleIds).then(() => {
            this.$message.info('角色分配成功！')
            this.fetchData()
          })
        }
      },
      submitRight() {
        if (this.selectionRight.length === 0) {
          this.$message.info('请至少选择一条已分配角色！')
        } else {
          const roleIds = []
          this.dataRight.forEach(item => {
            if (!this.selectionRight.includes(item)) {
              roleIds.push(item.tuid)
            }
          })
          setUserResource(this.userParams.tuid, roleIds).then(() => {
            this.$message.info('角色取消分配成功！')
            this.fetchData()
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../common/styles/variables";

  #role-resource {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    .search-box {
      flex: 0 0 auto;
      padding: 20px 40px;
      .el-col {
        display: flex;
        height: 32px;
        .item-label {
          flex: 0 0 auto;
          height: 32px;
          line-height: 32px;
          font-size: 13px;
          color: $color-normal;
          text-align: right;
        }
        .el-input {
          flex: 1 1 auto;
          margin: 0 20px;
        }
        .user-info {
          height: 32px;
          line-height: 32px;
          font-size: 13px;
          color: $color-main;
          text-align: left;
        }
      }
    }
    .btn-box {
      flex: 0 0 auto;
      height: 30px;
      display: flex;
      justify-content: start;
      padding-left: 40px;
    }
    .tab-box {
      flex: 1 1 auto;
      padding: 20px 40px 0 40px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .tab-divide {
        flex: 0 0 40px;
      }
      .tab-item {
        flex: 1 1 auto;
        border: 1px solid $border-main;
        border-radius: 3px;
        .title {
          height: 30px;
          background: #515a71;
          color: white;
          font-size: 15px;
          text-align: center;
          line-height: 30px;
          border-radius: 3px 3px 0 0;
        }
        .el-table {
          border: none !important;
        }
      }
    }
  }
</style>
