const user = {
  namespaced: true,
  state() {
    return {
      name: "",
      role: "",
      uid: ""
    }
  },
  getters: {
    getName(state) {
      return state.name
    },
    getRole(state) {
      return state.role
    },
    getUID(state) {
      return state.uid
    }
  },
  mutations: {
    saveName(state, name) {
      state.name = name
    },
    saveRole(state, role) {
      state.role = role
    },

    saveUID(state, id) {
      state.uid = id
    }
  },
  actions: {}
}

export default user
