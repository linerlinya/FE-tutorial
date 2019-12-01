import { createStore } from 'redux'
import Vue from 'vue'

const Store = ({ state, getters, mutations, actions } = {}) => {
  const currentState = new Vue({
    data: state,
  })

  const reducer = (state = currentState, action) => {
    if (action.type in mutations) mutations[action.type](state, action.payload)
    return state
  }

  const { dispatch: storeDispatch } = createStore(reducer)

  const commit = (action) => {
    storeDispatch(action)
  }

  // 别看了，getters 没实现
  const handledGetters = Object.keys(getters).reduce((acc, cur) => {
    acc[cur] = getters[cur](currentState, handledGetters)
    return acc
  }, {})

  const ctx = {
    state: currentState,
    getters: handledGetters,
    commit,
  }

  const dispatch = ({ type, payload } = {}) => {
    return Promise.resolve(actions[type](ctx, payload))
  }

  ctx.dispatch = dispatch

  return ctx
}

export default Store
