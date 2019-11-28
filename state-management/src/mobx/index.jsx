import React from 'react'
import { decorate, observable, action } from 'mobx'
import { observer } from 'mobx-react'

class CounterStore {
  count = 0

  incr = () => this.count += 1

  decr = () => this.count -= 1
}

decorate(CounterStore, {
  count: observable,
  incr: action,
  decr: action,
})

const counterStore = new CounterStore()

const CounterDisplayer = observer(({ store }) => (
  <div>count: {store.count}</div>
))

const CounterController = observer(({ store }) => (
  <>
    <button onClick={store.incr}> + </button>
    <button onClick={store.decr}> - </button>
  </>
))

const MobxCounter = () => (
  <div>
    <h2>Mobx Counter</h2>
    <CounterDisplayer store={counterStore} />
    <CounterController store={counterStore} />
  </div>
)

export default MobxCounter
