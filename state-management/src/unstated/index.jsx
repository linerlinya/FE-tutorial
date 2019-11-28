import React from 'react'
import { Provider, Subscribe, Container } from 'unstated'

class CounterContanier extends Container {
  state = { count: 0 }

  incr = () => this.setState(s => ({ count: s.count + 1 }))

  asyncIncr = async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 1000))
    this.incr()
  }

  decr = () => this.setState(s => ({ count: s.count - 1 }))
}

const CounterDisplayer = () => (
  <Subscribe to={[CounterContanier]}>
    {counter => <div>count: {counter.state.count}</div>}
  </Subscribe>
)

const CounterController = () => (
  <Subscribe to={[CounterContanier]}>
    {counter => (
      <>
        <button onClick={counter.incr}> + </button>
        <button onClick={counter.decr}> - </button>
        <button onClick={counter.asyncIncr}> async + </button>
      </>
    )}
  </Subscribe>
)

const UnstatedCounter = () => (
  <Provider>
    <h2>Unstated Counter</h2>
    <CounterDisplayer />
    <CounterController />
  </Provider>
)

export default UnstatedCounter

// unstated 方案本质上利用了 setState，但将 setState 与 UI 剥离，并可以很方便的注入到任何组件中。

// 好了，我们知道 hooks 提供了一种更简单的方式进行逻辑复用
// 所以 hooks 出来后有很多使用 Context + useReducer 实现的简易的 Redux 库
// 比如：chrox（
