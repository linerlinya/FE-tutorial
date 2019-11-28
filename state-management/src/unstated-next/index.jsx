import React, { useState } from 'react'
import { createContainer } from 'unstated-next'

const useCounter = (initalState = 0) => {
  const [count, setCount] = useState(initalState)

  const incr = () => setCount(c => c + 1)
  const decr = () => setCount(c => c - 1)

  const asyncIncr = async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 1000))
    incr()
  }

  return { count, incr, decr, asyncIncr }
}

const Counter = createContainer(useCounter)

const CounterDisplayer = () => {
  const counter = Counter.useContainer()

  return <div>count: {counter.count}</div>
}

const CounterController = () => {
  const counter = Counter.useContainer()

  return (
    <>
      <button onClick={counter.incr}> + </button>
      <button onClick={counter.decr}> - </button>
      <button onClick={counter.asyncIncr}> async + </button>
    </>
  )
}

const UnstatedNextCounter = () => (
  <Counter.Provider>
    <h2>Unstated-next Counter</h2>
    <CounterDisplayer />
    <CounterController />
  </Counter.Provider>
)

export default UnstatedNextCounter

// unstated-next 这个库只做了一件事情：
// 提供 createContainer 将自定义 Hooks 封装为一个数据对象，提供 Provider 注入与 useContainer 获取 Store 这两个方法
// 纯 React Context 实现的版本可以看它的官网
// unstated-next 就是将状态封装到 hooks 中，由于我们可以随时 setCount，所以早已天然解决了 reducer 无法异步的问题
// 如果你还是喜欢派发 action（对修改的描述）的方式，你可以把 useReducer 这个 hooks 传进去，当然现在完全没必要，不如换成 redux

// 一个不是问题的问题：太多的 Provider 了
// 可以参考 combineReducer 对 Provider 进行合并成一个单一的 Provider，获取状态只要拿到对应 Context 就可以

// const combineProvider = (...Providers) => Providers.reduce(
//   (Acc, Cur) => ({ children }) => (
//     <Cur>
//       <Acc>
//         {children}
//       </Acc>
//     </Cur>
//   ),
//   ({ children }) => (<>{children}</>),
// )

// const Provider = combineProvider(Counter.Provider, Timer.Provider, Theme.Provider)

// 可以看看 reunx 🙈
