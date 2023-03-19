const user = {
	namespaced: true,
	state() {
		return {
			name: "1111",
			role: ""
		}
	},
	getters: {
		getName(state) {
			return state.name
		},
		getRole(state) {
			return state.role
		},
	},
	mutations: {
		saveName(state, name) {
			state.name = name
		},
		saveRole(state, role) {
			state.role = role
		}
	},
	actions: {}
}

export default user
