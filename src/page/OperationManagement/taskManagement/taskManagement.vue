<template>
    <div>
        <template>
            <div>
                <el-row class="mr20">
                    <el-col :span="24">
                        <span class="float-left ml20 mt20 ">步数兑换管理</span>
                        <router-link to="/addTask" class="el-icon-circle-plus  float-right mr20 mt20 ">新建
                        </router-link>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col :span="24">
            <div class="float-left w240">
                <el-input class="ml20 mt20" v-model="searchParams.id" clearable placeholder="奖品ID"></el-input>
            </div>
            <div class="float-left ml10 w240">
                <el-select class="ml40 mt20" v-model="searchParams.cityCode" clearable placeholder="配置城市" @change="cityChange()">
                    <el-option
                    v-for="(item,index) in allCityList"
                    :key="index"
                    :label="item.cityName"
                    :value="item.cityCode"
                    ></el-option>
                </el-select>
            </div>
            <div class="float-left ml20 w120">
                <el-button class="ml20 mt20" @click="searchClick">搜索</el-button>
            </div>
            </el-col>
            </el-row>
            <div class="mt20">
                <el-table :data="taskDataTable">
                    <el-table-column prop="id" label="奖品ID" min-width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="prizeName" label="奖品名称" min-width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="prizeSubtitle" label="奖品副标题" min-width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="typeName" label="奖品类型" min-width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="statueName" label="状态" min-width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作" min-width="160" align="center">
                        <template slot-scope="scope" style="text-align:center">
                            <div style="display:flex;justify-content: center">
                                <el-button
                                    class="ml10"
                                    type="text"
                                    @click="taskCheck(scope.row)">查看
                                </el-button>
                                <el-button v-if="scope.row.statue === 1"
                                    type="text"
                                    @click="updateTask(scope.row)">编辑
                                </el-button>
                                <el-button v-if="scope.row.statue === 1"
                                    type="text"
                                    v-model="scope.row.statusName"
                                    @click="statusChange(scope.row)">启用
                                </el-button>
                                <el-button v-else-if="scope.row.statue === 0"
                                    type="text"
                                    @click="statusChange(scope.row)">禁用
                                </el-button>
                                <el-button v-else
                                    type="text"
                                    @click="statusChange(scope.row)">启用
                                </el-button>
                                <el-button
                                    type="text"
                                    @click="cityConfig(scope.row)">配置城市
                                </el-button>
                                <el-dialog title="城市配置" :visible.sync="dialogCityVisible">
                                    <el-row>
                                        <el-col :span="24" v-for="item in cityList" :key="item.value">
                                            <el-checkbox v-model="item.hasCheck"  class="mt10" :label="item.cityName" :checked="item.hasCheck" :key="item.cityCode" @change="checkCity(item)">
                                            </el-checkbox>
                                        </el-col>
                                    <el-button class="mt20" @click="cityCommit()">确认</el-button>
                                    </el-row>
                                </el-dialog>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="foot-page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchParams.page"
                    :page-sizes="[10,20, 30, 50, 100]"
                    :page-size="searchParams.pageSize"
                    layout="total, prev, pager,next,sizes,jumper "
                    :total="totalSize"
                ></el-pagination>
            </div>
        </template>
    </div>
</template>
<script>
import taskManageService from '../../../service/OperationManagement/taskManagement.js'

export default {
  data() {
    return {
      taskTypeOptions: [],
      allCityList: [],
      cityList: [],
      commonCity: {
        cityCode: '',
        cityName: '通用',
        hasCheck: false
      },
      searchParams: {
        id: '',
        name: '',
        categoryId: '',
        page: 1,
        pageSize: 10
      },
      statusChangeParams: {
        id: 0,
        statue: 0
      },
      cityListParams: {
        relationId: 1,
        relationType: 4
      },
      addCityListParams: {
        cityCodes: [],
        hasAllCity: false,
        relationId: 1,
        relationType: 4
      },
      taskDataTable: [],
      totalSize: 0,
      dialogCityVisible: false
    }
  },
  created() {
    this.getAllCity()
    this.getTaskTableList()
  },
  methods: {
    //点击搜索
    searchClick() {
      // console.debug('搜索点击')
      this.searchParams.page = 1
      this.getTaskTableList()
    },
    // 启用状态更新
    statusChange(row) {
      this.statusChangeParams.id = row.id
      const statue = row.statue
      if (statue === 0) {
        this.statusChangeParams.statue = 1
      } else if (statue === 1) {
        this.statusChangeParams.statue = 0
      } else {
        this.statusChangeParams.statue = 0
      }
      const data = this.handparams(this.statusChangeParams)
      taskManageService.updateStatus(data).then(
        response => {
          this.getTaskTableList()
        },
        response => {
          this.$message.error(
            response.sub_msg || response.msg || '请求服务器连接失败!'
          )
        }
      )
    },
    //获取城市列表
    cityConfig(row) {
      this.cityListParams.relationId = row.id
      this.cityListParams.relationType = 4
      const data = this.handparams(this.cityListParams)
      taskManageService.getCityList(data).then(
        response => {
          // console.debug('response===',response)
          const cityData = response.data || ''
          this.commonCity.hasCheck = cityData.hasAllCheck || false
          const cityList = cityData.cityList
          if (cityList instanceof Array) {
            this.cityList = cityList
            this.cityList.unshift(this.commonCity)
          } else {
            this.cityList = []
          }
          this.dialogCityVisible = true
        },
        response => {
          this.$message.error(
            response.sub_msg || response.msg || '请求服务器连接失败!'
          )
        }
      )
    },
    // 选择城市
    checkCity(item) {
      // console.debug('item.cityName',item.cityName)
      if (item.cityName === '通用') {
        if (item.hasCheck) {
          for (let index = 0; index < this.cityList.length; index++) {
            const element = this.cityList[index]
            element.hasCheck = true
          }
        } else {
          for (let index = 0; index < this.cityList.length; index++) {
            const element = this.cityList[index]
            element.hasCheck = false
          }
        }
      } else {
        if (item.hasCheck) {
          let count = 0
          for (let index = 0; index < this.cityList.length; index++) {
            const element = this.cityList[index]
            if (element.hasCheck) {
              count++
            }
          }
          if (count == this.cityList.length - 1) {
            this.cityList[0].hasCheck = true
          }
        } else {
          this.cityList[0].hasCheck = false
        }
      }
    },
    // 添加配置城市
    cityCommit(row) {
      if (this.cityList[0].hasCheck) {
        this.addCityListParams.hasAllCity = true
      } else {
        this.addCityListParams.hasAllCity = false
      }
      this.addCityListParams.cityCodes = []
      for (let index = 0; index < this.cityList.length; index++) {
        const element = this.cityList[index]
        if (index != 0 && this.cityList[index].hasCheck) {
          this.addCityListParams.cityCodes.push(this.cityList[index].cityCode)
        }
      }
      this.addCityListParams.relationId = this.cityListParams.relationId
      this.addCityListParams.relationType = 4
      const data = this.handparams(this.addCityListParams)
      taskManageService.addCityList(data).then(
        response => {
          // console.debug('response===',response)
          this.dialogCityVisible = false
        },
        response => {
          this.$message.error(
            response.sub_msg || response.msg || '请求服务器连接失败!'
          )
        }
      )
    },
    cityChange() {
      this.searchParams.page = 1
      this.getTaskTableList()
    },
    // 查看任务
    taskCheck(row) {
      // console.debug('id===',row.id)
      this.$router.push({ name: 'checkTask', query: { id: row.id } })
    },
    // 编辑任务
    updateTask(row) {
      this.$router.push({ name: 'updateTask', query: { id: row.id } })
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val
      this.getTaskTableList()
    },
    handleCurrentChange(val) {
      this.searchParams.page = val
      // console.debug('CurrentChange==',val)
      this.getTaskTableList()
    },
    // 获取任务列表
    getTaskTableList() {
      const data = this.handparams(this.searchParams)
      taskManageService.getTaskList(data).then(
        response => {
          if (response.list instanceof Array) {
            this.taskDataTable = response.list
          } else {
            this.taskDataTable = []
          }
          this.totalSize = response.sum || 0
        },
        response => {
          this.$message.error(
            response.sub_msg || response.msg || '请求服务器连接失败!'
          )
        }
      )
    },
    //参数处理
    handparams(param) {
      const params = JSON.parse(JSON.stringify(param))
      for (const i in params) {
        if (params[i] === '') {
          delete params[i]
        }
      }
      return params
    },
    // 获取全部城市
    getAllCity() {
      this.allCityList = []
      taskManageService.getCityList().then(response => {
        this.allCityList = (response.data && response.data.cityList) || []
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.foot-page {
  float: right;
  margin-top: 10px;
  margin-bottom: 50px;
}
.select {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  line-height: 40px;
  outline: none;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 160px;
  margin-right: 20px;
  margin-top: 20px;
}
</style>

