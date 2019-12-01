// 这个没实现，一个想法
// 之前每次修改状态都需要 countDispatch 来同步
// hooks 只能放在 function component 的最外层
// 多重继承？
import React, { useState, useEffect } from 'react'

const useCounter = () => {
  const [count, setCount] = useState(0)
  const incr = () => setCount(count + 1)
  const decr = () => setCount(count - 1)

  return { count, incr, decr }
}

// XXX 不行，**Hooks can only be called inside of the body of a function component**
const useCounterEmitter = Object.assign(useCounter, EventTarget.prototype)

const counter = useCounterEmitter()

const CounterDisplayer = () => {

  useEffect(() => {
    counter.addEventListener('increase', counter.incr)
    counter.addEventListener('decrease', counter.decr)

    return () => {
      counter.removeEventListener('increase', counter.incr)
      counter.removeEventListener('decrease', counter.decr)
    }
  }, [])

  return (
    <div>count: {counter.count}</div>
  )
}

const CounterController = () => (
  <>
    <button onClick={() => counter.dispatchEvent(new Event('increase'))}> + </button>
    <button onClick={() => counter.dispatchEvent(new Event('decrease'))}> - </button>
  </>
)

const EventCounter = () => (
  <div>
    <h2>Another Thought Event Counter</h2>
    <CounterDisplayer />
    <CounterController />
  </div>
)

export default EventCounter
