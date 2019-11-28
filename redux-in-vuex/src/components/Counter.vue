<template>
  <div id="app">
    Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  computed: {
    evenOrOdd() {
      return this.$store.getters.evenOrOdd
    }
  },
  methods: {
    increment() {
      this.$store.dispatch({ type: 'increment' })
      console.log(this.$store)
    },
    decrement() {
      this.$store.dispatch({ type: 'decrement' })
    },
    incrementIfOdd() {
      this.$store.dispatch({ type: 'incrementIfOdd' })
    },
    incrementAsync() {
      this.$store.dispatch({ type: 'incrementAsync' }).then(() => {
        console.log('ok')
      })
    },
  }
}
</script>
