function sum(value) {
  function plus(num) {
    value += num
    return { plus, value }
  }
  return { plus, value }
}

const one = sum(1)
const three = one.plus(2)
const six = three.plus(3)

console.log(one.value) // 1
console.log(three.value) // 3
console.log(six.value) // 6
