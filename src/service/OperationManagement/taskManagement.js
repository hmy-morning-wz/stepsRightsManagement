import HOST_CONFIG from 'hostconfig'
// import * as ajax from 'ajax'
import { getJSON, postJSON, putJSON, delData } from '../../utils/ajax'

let host = HOST_CONFIG.nethost
export default {
  async searchVoucher(data) {
    const url = `${host}operation-activity/nactivity/searchVoucher`
    try{
      let res = await postJSON(url, data)
      console.log('返回优惠券', res)
      if (res.code === '20000') return res.data
      else return false
    } catch(err) {
      return false
    }
  },
  //获取任务列表接口
  getTaskList(data) {
    const url = `${host}operation-free-bus/stepPrizeBackstage/selectStepPrizeList`
    // console.log(url)
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  //获取任务类型
  getTaskType() {
    const url = `${host}operation-free-bus/task/getTaskType`
    return getJSON(url).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  // 获取全部城市列表
  getAllCityList() {
    const url = `${host}/operation-free-bus/task/getCityList`
    return getJSON(url).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  //获取关联城市列表
  getCityList(data) {
    const url = `${host}operation-free-bus/admin/cityRelation/getCity`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  //配置城市列表
  addCityList(data) {
    const url = `${host}operation-free-bus/admin/cityRelation/addUpdateCity`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  //获取任务分类
  getTaskClassify(data) {
    const url = `${host}operation-free-bus/taskCategory/getTaskCategoryList`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  //获取跳转类型
  getLinkType() {
    const url = `${host}operation-free-bus/task/getLinkType`
    return getJSON(url).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  //新增任务
  addTask(data) {
    const url = `${host}operation-free-bus/stepPrizeBackstage/addStepPrize`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  //编辑任务
  updateTask(data) {
    const url = `${host}operation-free-bus/stepPrizeBackstage/updateStepPrize`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  //更新任务状态
  updateStatus(data) {
    const url = `${host}operation-free-bus/stepPrizeBackstage/updateStepPrizeStatue`
    return getJSON(url, data).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  //获取任务详情
  getTaskDetails(id) {
    const url = `${host}operation-free-bus/stepPrizeBackstage/selectOneStepPrize?id=${id}`
    return getJSON(url).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
  getCategoryNameList() {
    const url = `${host}operation-free-bus/taskCategory/getCategoryNameList`
    return getJSON(url).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  }
}

