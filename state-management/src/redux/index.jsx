import React from 'react'
import { createStore } from 'redux'

const initalState = { count: 0 }

const counterReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'increase':
      return { count: state.count + 1 }
    case 'decrease':
      return { count: state.count - 1 }
    default:
      return state
  }
}

// 这里就直接命名 counter 了，一般都是命名 store，因为是单一数据源（combine 了一堆 xxxStore）
const counter = createStore(counterReducer)

class CountDisplay extends React.Component {
  constructor() {
    super()

    this.state = counter.getState()
    this.unsubscribe = counter.subscribe(() => this.setState(counter.getState()))
  }

  componentWillUnmount() { this.unsubscribe() }

  render() {
    return <div>count: {this.state.count}</div>
  }
}

class CountController extends React.Component {
  incr = () => counter.dispatch({ type: 'increase' })

  decr = () => counter.dispatch({ type: 'decrease' })

  render() {
    return (
      <>
        <button onClick={this.incr}> + </button>
        <button onClick={this.decr}> - </button>
      </>
    )
  }
}

export default () => (
  <div>
    <h2>Redux Counter</h2>
    <CountDisplay />
    <CountController />
  </div>
)

// redux 让 reducer 必须是纯函数，也和 React 的 state 的 set 有关，必须是一个新的对象
// 这样有很多好处：可预测性、可维护、组织方便……
// 其实 reducer 不纯也可以，vue 因为是响应式的，我们先想一下为什么 vue2 要 hack 那几个数组方法
// 对象的话可以在一开始把所有属性都写好，附好初始值
// 而数组的长度是变化的（数组的“属性”（0、1、2……））不能提前知道，新添加的就不是响应式的，所以只 hack 了数组的几个方法
// 而 vue3 使用 Proxy 后就没有这个问题

// 我用 redux 实现了下类似 vuex 的状态管理工具，使用的 reducer 是不纯的，同样可以实现状态管理

// react 提倡单向数据流，flux 本身也是对 react 单向数据流的一种扩展，redux 是 flux 的一种实现
