import React from 'react'

const store = { count: 0 }

const reducer = (state = store, action) => {
  switch (action.type) {
    case 'increase':
      return { count: state.count + 1 }
    case 'decrease':
      return { count: state.count - 1 }
    default:
      return state
  }
}

// 对不起，这个没有状态管理
// 有点像 class 版的 useReducer ？？？
// 但如果我们继续写，只用 react，要实现就只能把 state 和修改 state 的方法（dispatch？this.setState?）进行提升
// Context
class UseReducerWithClass extends React.Component {
  state = store

  dispatch = (action) => {
    this.setState(prevState => reducer(prevState, action))
  }

  incr = () => this.dispatch({ type: 'increase' })

  decr = () => this.dispatch({ type: 'decrease' })

  render() {
    return (
      <div>
        <h2>对不起这个没有状态管理</h2>
        <div>count: {this.state.count}</div>
        <button onClick={this.incr}> + </button>
        <button onClick={this.decr}> - </button>
      </div>
    )
  }
}

export default UseReducerWithClass
