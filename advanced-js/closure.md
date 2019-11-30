# closure

闭包是真的爽

## （词法）作用域

作用域分为动态作用域和静态作用域（也叫词法作用域），JS 是静态作用域

词法作用域（静态作用域）是在**书写代码**或者说定义时确定的，而动态作用域是在**运行时**确定的

词法作用域关注函数在**何处声明**，而动态作用域关注函数从**何处调用**，其作用域链是基于运行时的调用栈的

静态作用域：

```js
let a = 1

function foo() {
  a = 2
}

foo()

console.log(a) // 1
```

动态作用域：

```js
let a = 1

function foo() {
  a = 2
}

foo()

console.log(a) // 2
```

## 作用域链

你可能在一些其他的地方听到过上下文、执行上下文栈、作用域链

其实：

* 上下文 === 作用域

* 上下文栈 === 作用域链

一种东西的两种表达

```js
const a = 1

function foo() {
  const a = 2

  console.log(a)
}

foo()
```

以栈的形式讲一遍

以链的形式讲一遍（与原型链对比）

es6 新增 const、let 增加了块级作用域，现在我们有三种作用域：

1. 全局作用域

2. 块级作用域（for、if……）

3. 函数作用域

## 闭包

> 闭包是指有权访问另外一个**函数作用域**中的变量的**函数** —— 《JavaScript 高级程序设计》

```js
function foo() {
  const a = 1

  function bar() {
    const b = 2

    console.log(a, b)
  }

  bar()
}

foo()
```

画那张作用域包作用域的图

可以利用这个干很多神奇的事：

```js
// 一个简单的例子，不神奇
function base(num) { // higher-order-function
  function add(step) {
    num += step
    return num
  }

  return add
}

const addOnTwo = base(2)
console.log(addOnTwo)
const sum = addOnTwo(3)
console.log(sum)
```

另一种更爽的方式写

```js
const base = num => step => num += step

const addOnTwo = base(2)
console.log(addOnTwo)
const sum = addOnTwo(3)
console.log(sum)
```

很多 es6 提供的简写（语法糖（比如解构赋值、箭头函数、class……））如果看不懂，可以先用 es5 的形式写，其实不简写在刚开始会更好理解，它们本质上是一样的（除了箭头函数有点不一样）

JS 对象 es10（es2019 现在大部分浏览器还不支持）之前是没有私有属性的，导致没有封装性

利用闭包实现私有属性：

```js
const createPerson = ({ name, age } = {}) => {
  const sayHi = () => console.log(`Hi! I'm ${name}, ${age} years old...`)
  const growUp = () => age += 1

  return { sayHi, growUp }
}
```
