import React, { useContext } from 'react'
import createChrox from 'chrox'

const initialState = { count: 0 }

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increase':
      return { ...state, count: state.count + 1 }
    case 'decrease':
      return { ...state, count: state.count - 1 }
    default:
      return { ...state }
  }
}

const {
  Context: CounterContext,
  Provider: CounterProvider,
} = createChrox(counterReducer, initialState)

const CounterDisplayer = () => {
  const state = useContext(CounterContext.state)

  return <div>count: {state.count}</div>
}

const CounterController = () => {
  const dispatch = useContext(CounterContext.dispatch)

  const incr = () => dispatch({ type: 'increase' })
  const decr = () => dispatch({ type: 'decrease' })

  return (
    <>
      <button onClick={incr}> + </button>
      <button onClick={decr}> - </button>
    </>
  )
}

const ChroxCounter = () => (
  <CounterProvider>
    <h2>Chrox Counter</h2>
    <CounterDisplayer />
    <CounterController />
  </CounterProvider>
)

export default ChroxCounter


// 用了两个 Context，分别创建 state 和 dispatch
// 其实用一个 Context 就可以（<Context.Provider value={{ state, dispatch }}>）
// 现在的问题就是副作用：http，定时器。。。
// 这些异步任务在 redux 中是通过中间件的方式解决
// （中间件通过拦截 action，查看 action 类型，函数的话（redux-thunk）就调用处理副作用，但等副作用处理完成后最终还是会派发一个对象类型的 action（一般 payload 是副作用的结果））
// 因为 redux 的 reducer 是一个纯函数，不能处理副作用
// chrox（和其他类似的库）因为用的 redux 的方式实现，没有提供中间件的机制，如果处理副作用只能在 reducer 中处理，让 reducer 不纯（asyncReducer ？？？）
// 所以 chrox 只是 redux 用 hooks 的方式的简易的实现
// 要实现更完整的 1. 加入 middleware 的机制 2. 另一种方式（完全是 hooks）：unstated-next

// import * as React from 'react'

// type ProviderProps = {
//   children: React.ReactNode
// }

// export default function createChrox (
//   reducer: (state: object, action: object) => object, 
//   initialState: object
// ) {
//   const StateContext = React.createContext<object>({})
//   const DispatchContext = React.createContext<React.Dispatch<object>>(() => {})

//   const Provider: React.FC<ProviderProps> = props => {
//     const [state, dispatch] = React.useReducer(reducer, initialState)

//     return (
//       <DispatchContext.Provider value={dispatch}>
//          <StateContext.Provider value={state}>
//             {props.children}
//          </StateContext.Provider>
//       </DispatchContext.Provider>
//     )
//   }

//   const Context = {
//     state: StateContext,
//     dispatch: DispatchContext
//   }

//   return {
//     Context,
//     Provider
//   }
// }
