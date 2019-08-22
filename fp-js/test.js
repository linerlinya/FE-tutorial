const data = {
  result: "SUCCESS",
  version: "1.0.3",
  items: [
    {
      name: '@.@',
      price: 20,
    },
    {
      name: '*.*',
      price: 50,
    },
    {
      name: '0.0',
      price: 40,
    },
    {
      name: '&.&',
      price: 100,
    },
    {
      name: '#.#',
      price: 70,
    },
  ],
}

const handleData = compose(
  ascending,
  map(compose(discount, prop('price'))),
  filter(i => i.price < 60),
  prop('items')
)
const r = handleData(data)