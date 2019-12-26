const menu = {
  state: {
    refreshMenu: false,
  },
  mutations: {
    REFRESH: state => {
      state.refreshMenu = !state.refreshMenu
    },

  },
  actions: {
    ToggleRefresh: context => {
      context.commit('REFRESH')
    },
  }
}

export default menu
