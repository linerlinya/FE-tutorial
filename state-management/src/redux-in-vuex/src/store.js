import Store from './vuex'

const state = {
  count: 0
}

const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
}

const actions = {
  increment: ({ commit }) => commit({ type: 'increment' }),
  decrement: ({ commit }) => commit({ type: 'decrement' }),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit({ type: 'increment' })
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit({ type: 'increment' })
        resolve()
      }, 1000)
    })
  }
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

export default Store({
  state,
  getters,
  actions,
  mutations
})
