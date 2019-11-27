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
