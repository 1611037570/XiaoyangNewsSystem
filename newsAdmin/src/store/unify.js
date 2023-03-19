import { unify } from "@/service/api/unify"
import cache from "@/utils/cache"

const unifys = {
  namespaced: true,
  state() {
    return {
      list: [], // 表单数据
      data: {}, // 搜索参数
      page: {}, // 页面配置
      total: 0, // 总数
      visible: false, // 弹窗显示状态
      name: ""
    }
  },
  getters: {
    getList(state) {
      return state.list
    },
    getData(state) {
      return state.data
    },
    getPage(state) {
      return state.page
    },
    getTotal(state) {
      return state.total
    },
    getVisible(state) {
      return state.visible
    },
    getName(state) {
      return state.name
    }
  },
  mutations: {
    saveList(state, list) {
      state.list = list
    },
    saveData(state, data) {
      state.data = data
    },
    delData(state) {
      for (var k in state.data) {
        state.data[k] = ""
      }
    },
    savePage(state, page) {
      state.page = page
    },
    saveTotal(state, total) {
      state.total = total
    },
    saveVisible(state, visible) {
      state.visible = visible
    },
    saveName(state, name) {
      state.name = name
    }
  },
  actions: {
    async getList(state) {
      let { data, page, name } = state.state // 配置参数
      let { role, id } = cache.get("user")
      if (role == 1) {
        data = {
          ...data,
          strict: {
            uid: id
          }
        }
      }
      let res
      res = await unify({ name, conut: true, data })
      state.commit("saveTotal", res.data[0].rows)
      res = await unify({ name, data, ...page })
      state.commit("saveList", res.data)
    }
  }
}

export default unifys
