import React, { useState, useEffect, useMemo, useCallback } from 'react'

class Counter extends EventTarget {
  state = { count: 0 }

  incr = () => this.state.count += 1

  decr = () => this.state.count -= 1
}

const counter = new Counter()

const CounterDisplayer = () => {
  const [count, setCount] = useState(0)

  const countDispatch = () => setCount(counter.state.count)

  const incr = useCallback(() => {
    counter.incr()
    countDispatch()
  }, [])

  const decr = useCallback(() => {
    counter.decr()
    countDispatch()
  }, [])

  useEffect(() => {
    counter.addEventListener('increase', incr)
    counter.addEventListener('decrease', decr)

    return () => {
      counter.removeEventListener('increase', incr)
      counter.removeEventListener('decrease', decr)
    }
  }, [incr, decr])

  return useMemo(() => (
    <div>count: {count}</div>
  ), [count])
}

const CounterController = () => {
  const incr = useCallback(() => counter.dispatchEvent(new Event('increase')), [])
  const decr = useCallback(() => counter.dispatchEvent(new Event('decrease')), [])

  return useMemo(() => (
    <>
      <button onClick={incr}> + </button>
      <button onClick={decr}> - </button>
    </>
  ), [incr, decr])
}

const EventCounter = () => (
  <div>
    <h2>Event Bus Counter</h2>
    <CounterDisplayer />
    <CounterController />
  </div>
)

export default EventCounter
