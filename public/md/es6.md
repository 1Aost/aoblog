# 标题

### let命令

1.

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[0](); // 10
a[1](); // 10
a[6](); // 10
```

```
变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。
每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。
所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。
```

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[0](); // 0
a[6](); // 6
a[10]();//报错
```

```js
变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。
你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？
这是因为JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。
```

2.

```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

```
for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
```

3.

```js
typeof x; // ReferenceError
let x;
```

```
“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
```

```js
typeof undeclared_variable // "undefined"
```

```
如果一个变量根本没有被声明，使用typeof反而不会报错。
```

4.let不允许重复声明

```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}
// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

因此，不能在函数内部重新声明参数。

```js
function func(arg) {
  let arg;
}
func() // 报错
function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
```

### 块级作用域

1.

```js
var tmp = new Date();
function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}
f(); // undefined
```

```
if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，
原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。
```

2.

ES6 规定，浏览器的实现可以不遵守上面的规定，有自己的[行为方式](http://stackoverflow.com/questions/31419897/what-are-the-precise-semantics-of-block-level-functions-in-es6)。

- 允许在块级作用域内声明函数。
- 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作`let`处理。

3.

```js
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}
// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

注意：ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

### const命令

1.

`const`实际上保证的，并不是变量的值不得改动，而是`变量指向的那个内存地址所保存的数据`不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```js
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

如果真的想将对象冻结，应该使用`Object.freeze`方法。

```js
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
//foo:{}
```

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

### 顶层对象的属性

1.

顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。ES5 之中，顶层对象的属性与全局变量是等价的。

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。

`也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。`

### 数组的解构赋值

1.

ES6 允许写成下面这样。

```js
let [a,b,c]=[1,2,3]
//a:1
//b:2
//c:3
```

特别的几个：

```js
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

如果等号的右边`不是数组`（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

```
上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。
```

2.

对于 Set 结构，也可以使用数组的解构赋值。

```js
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```

只要某种数据结构具有 `Iterator 接口`，都可以采用`数组形式的解构赋值。`

3.

解构赋值允许指定默认值。

```js
let [foo]=[]
foo//undefined
let [foo=true]=[]
foo//true
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。

**所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。**

4.

如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`undefined`。

```js
let [x = 1] = [undefined];
x // 1
let [x = 1] = [null];
x // null
```

5.

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```js
function f() {
  console.log('aaa');
}
let [x = f()] = [1];
```

因为`x`能取到值，所以函数`f`根本不会执行。上面的代码其实等价于下面的代码。

```js
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

```js
//只有当数组成员严格等于undefined时，默认值才会生效
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

### 对象的解构赋值

1.

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；

而对象的属性没有次序，`变量必须与属性同名`，才能取到正确的值。

```js
let {a,b}={a:1,b:2}
a//1
b//2
let {a,b}={c:12,a:23}
a//23
b//undefined
```

如果解构失败，变量的值为`undefined`

2.

对象的解构赋值，可以很方便地`将现有对象的方法，赋值到某个变量`。

```js
// 例一
let { log, sin, cos } = Math;
sin(Math.PI/2)//1
cos(0)//1
// 例二
const { log } = console;
log('hello') // hello
```

上面代码的例一将`Math`对象的对数、正弦、余弦三个方法，赋值到对应的变量上

例二将`console.log`赋值到`log`变量。

3.

如果变量名与属性名不一致，必须写成下面这样。

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

这实际上说明，对象的解构赋值是下面这种形式的简写：

```js
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
```

4.

对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。`真正被赋值的是后者，而不是前者。`

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
let { foo: baz } = { foo: 12 , baz: 23};
baz//12
foo//报错
```

5.

与数组一样，解构也可以用于嵌套结构的对象

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p //报错
```

注意：这里p是模式，不是变量,因此不会被赋值

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

```js
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};
let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
```

```
注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。
```

6.

嵌套赋值

```js
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]
```

如果解构模式是嵌套的对象，而且`子对象所在的父属性不存在`，那么将会报错。

```js
//报错
let {foo:{bar}}={baz:'baz'}
```

上面代码中，等号左边对象的`foo`属性，对应一个子对象。该子对象的`bar`属性，解构时会报错。原因很简单，因为`foo`这时等于`undefined`，再取子属性就会报错。

7.

注意，对象的解构赋值可以取到`继承的属性。`

```js
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);
const { foo } = obj1;
foo // "bar"
```

```
上面代码中，对象obj1的原型对象是obj2。foo属性不是obj1自身的属性，而是继承自obj2的属性，解构赋值可以取到这个属性。
```

8.

对象的解构也可以指定默认值。

```js
var {x = 3} = {};
x // 3
var {x, y = 5} = {x: 1};
x // 1
y // 5
var {x: y = 3} = {};
y // 3
var {x: y = 3} = {x: 5};
y // 5
var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

9.

默认值生效的条件是，对象的属性值严格等于`undefined`。

```js
var {x = 3} = {x: undefined};
x // 3
var {x = 3} = {x: null};
x // null
```

注意点：

（1）如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```

上面代码的写法会报错，因为 JavaScript 引擎会将`{x}`理解成一个`代码块`，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

```js
// 正确的写法
let x;
({x} = {x: 1});
```

上面代码将整个解构赋值语句，`放在一个圆括号里面`，就可以正确执行。

（2）解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

```js
({} = [true, false]);
({} = 'abc');
({} = []);
```

上面的表达式虽然毫无意义，但是语法是合法的，可以执行。

（3）由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```js
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

上面代码对数组进行对象解构。数组`arr`的`0`键对应的值是`1`，`[arr.length - 1]`就是`2`键，对应的值是`3`。方括号这种写法，属于“属性名表达式”（参见《对象的扩展》一章）。

### 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个`类似数组的对象`。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```js
let {length : len} = 'hello';
len // 5
```

### 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转化为对象

```js
let {toString:s}=123;
s===Number.prototype.toString;//true

let {toString:s}=true;
s===Boolean.prototype.toString;//true
```

上面代码中，数值和布尔值的包装对象都有`toString`属性，因此变量`s`都能取到值。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。

```
由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
```

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

### 函数参数的解构赋值(2,3???)

1.

函数的参数也可以使用解构赋值

```js
function add([x,y]) {
	return x+y;
}
add([1,2]);//3
```

函数`add`的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量`x`和`y`。对于函数内部的代码来说，它们能感受到的参数就是`x`和`y`。

```js
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```

2.

函数参数的结构也可以使用默认值

```js
//这里{x=0,y=0}={}后面的{}???
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

上面方式是给对象里面的参数赋默认值

3.

注意，下面的写法会得到不一样的结果。

```js
function move({x, y} = { x: 0, y: 0 }) {
	return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
//下面传了对象，但是对象里面没有x属性，x就为undefined
move({}); // [undefined, undefined]
move(); // [0, 0]
```

上面代码是为函数`move`的参数指定默认值，而不是为变量`x`和`y`指定默认值，所以会得到与前一种写法不同的结果。

**上面方式是给对象整体赋默认值，如果没有传进去对象，就会使用这个默认值，例如最后一个例子**

**`undefined`就会触发函数参数的默认值。**

```js
[1, undefined, 3].map((x = 'yes') => x);// [ 1, 'yes', 3 ]
```

### 圆括号问题

对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

##### 不能使用圆括号的情况：

（1）变量声明语句

```js
// 全部报错
let [(a)] = [1];
let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```

上面 6 个语句都会报错，因为它们都是`变量声明语句`，模式不能使用圆括号。

（2）函数参数

函数参数也属于变量声明，因此不能带有圆括号。

```js
// 报错
function f([(z)]) { 
	return z; 
}// 报错
function f([z,(x)]) { 
	return x; 
}
```

（3）赋值语句的模式

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```

上面代码将整个模式放在圆括号之中，导致报错。

```js
// 报错
[({ p: a }), { x: c }] = [{}, {}];
```

上面代码将一部分模式放在圆括号之中，导致报错。

##### 可以使用圆括号的情况：

可以使用圆括号的情况只有一种：`赋值语句的非模式部分`，可以使用圆括号。

```js
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是`p`，而不是`d`；第三行语句与第一行语句的性质一致。

### 字符的Unicode表示法

ES6 加强了对 Unicode 的支持，允许采用`\uxxxx`形式表示一个字符，其中`xxxx`表示字符的 `Unicode 码点`。

```js
"\u0061"// "a"
```

但是，这种表示法只限于码点在`\u0000`~`\uFFFF`之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。

```js
"\uD842\uDFB7"// "𠮷"
"\u20BB7"// " 7"
```

上面代码表示，如果直接在`\u`后面跟上超过`0xFFFF`的数值（比如`\u20BB7`），JavaScript 会理解成`\u20BB+7`。

由于`\u20BB`是一个不可打印字符，所以只会显示一个空格，后面跟着一个`7`。

ES6 对这一点做出了改进，只要将码点`放入大括号`，就能正确解读该字符。

```js
"\u{20BB7}"// "𠮷"
"\u{41}\u{42}\u{43}"// "ABC"
let hello = 123;
//下面这种方式???
hell\u{6F} // 123
'\u{1F680}' === '\uD83D\uDE80'// true
```

上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的。

有了这种表示法之后，**JavaScript 共有 6 种方法可以表示一个字符。**

```js
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

### 字符串的遍历器接口

ES6 为字符串添加了`遍历器接口`（详见《Iterator》一章），使得字符串可以被`for...of`循环遍历。

```js
for (let codePoint of 'foo') {  
	console.log(codePoint)
}
// "f"
// "o"
// "o"
```

除了遍历字符串，这个遍历器最大的优点是**可以识别大于`0xFFFF`的码点，**传统的`for`循环无法识别这样的码点。

```js
let text = String.fromCodePoint(0x20BB7);
for (let i = 0; i < text.length; i++) {
	console.log(text[i]);
}
// " "
// " "
for (let i of text) {
	console.log(i);
}
// "𠮷"
```

上面代码中，字符串`text`只有一个字符，但是`for`循环会认为它包含两个字符（都不可打印），而`for...of`循环会正确识别出这一个字符。

### JSON.stringify()的改造

JSON.stringify是`将Javascript对象转换为JSON格式字符串`

JSON 数据必须是 UTF-8 编码。但是，现在的`JSON.stringify()`方法有可能返回不符合 UTF-8 标准的字符串。

具体来说，UTF-8 标准规定，`0xD800`到`0xDFFF`之间的码点，**不能单独使用，必须配对使用**。比如，`\uD834\uDF06`是两个码点，但是必须放在一起配对使用，代表字符`𝌆`。这是为了表示码点大于`0xFFFF`的字符的一种变通方法。单独使用`\uD834`和`\uDFO6`这两个码点是不合法的，或者颠倒顺序也不行，因为`\uDF06\uD834`并没有对应的字符。

`JSON.stringify()`的问题在于，它可能返回`0xD800`到`0xDFFF`之间的单个码点。

```js
JSON.stringify('\u{D834}') // "\u{D834}"
```

为了确保返回的是合法的 UTF-8 字符，[ES2019](https://github.com/tc39/proposal-well-formed-stringify) 改变了`JSON.stringify()`的行为。如果遇到`0xD800`到`0xDFFF`之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

```js
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

### 实例：模板编译

一个通过模板字符串，生成正式模板的实例。

```js
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
```

上面代码在模板字符串之中，放置了一个常规模板。该模板使用`<%...%>`放置 JavaScript 代码，使用`<%= ... %>`输出 JavaScript 表达式。

### 字符串新增的方法

#### String.fromCodePoint()

ES6 提供了`String.fromCodePoint()`方法，可以识别大于`0xFFFF`的字符，弥补了`String.fromCharCode()`方法的不足。在作用上，正好与下面的`codePointAt()`方法相反。

```js
String.fromCodePoint(0x20BB7)// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'// true
```

上面代码中，如果`String.fromCodePoint`方法有多个参数，则它们会被合并成一个字符串返回。

注意，`fromCodePoint`方法定义在`String`对象上，而`codePointAt`方法定义在字符串的实例对象上。

#### String.fromCharCode()

ES5 提供`String.fromCharCode()`方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于`0xFFFF`的字符。

```js
String.fromCharCode(0x20BB7)// "ஷ"
String.fromCharCode(0x0BB7)// "ஷ"
```

上面代码中，`String.fromCharCode()`不能识别大于`0xFFFF`的码点，

所以`0x20BB7`就发生了溢出，最高位`2`被舍弃了，最后返回码点`U+0BB7`对应的字符，而不是码点`U+20BB7`对应的字符。

#### String.raw()

ES6 还为原生的 String 对象，提供了一个`raw()`方法。该方法返回一个`斜杠都被转义`（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。

```js
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"
String.raw`Hi\\n`
// 返回 "Hi\\\\n"
String.raw`Hi\\n` === "Hi\\\\n" // true
```

`String.raw()`方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

`String.raw()`本质上是一个正常的函数，只是专用于模板字符串的标签函数。如果写成正常函数的形式，它的第一个参数，应该是一个具有`raw`属性的对象，且`raw`属性的值应该是一个**数组**，对应模板字符串解析后的值。

```js
// `foo${1 + 2}bar`
// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"
```

上面代码中，`String.raw()`方法的第一个参数是`一个对象`，它的`raw`属性等同于原始的模板字符串解析后得到的数组。

后面的参数实际上是在raw属性数组元素的第一个和第二个之间进行插入

作为函数，String.raw()函数的代码基本如下：

```js
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
```

#### 实例方法：codePointAt()

JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为`2`个字节。对于那些需要`4`个字节储存的字符（Unicode 码点大于`0xFFFF`的字符），JavaScript 会认为它们是两个字符。

```js
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
```

上面代码中，汉字“𠮷”的码点是`0x20BB7`，UTF-16 编码为`0xD842 0xDFB7`（十进制为`55362 57271`），需要`4`个字节储存。对于这种`4`个字节的字符，JavaScript 不能正确处理，字符串长度会误判为`2`，而且`charAt()`方法无法读取整个字符，`charCodeAt()`方法只能分别返回前两个字节和后两个字节的值。

ES6 提供了`codePointAt()`方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

```js
let s = '𠮷a';
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
s.codePointAt(2) // 97
```

`codePointAt()`方法的参数，是字符在字符串中的位置（从 0 开始）。

上面代码中，JavaScript 将“𠮷a”视为三个字符，codePointAt 方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点 134071（即十六进制的`20BB7`）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，`codePointAt()`方法的结果与`charCodeAt()`方法相同。

总之，`codePointAt()`方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与`charCodeAt()`方法相同。

```js
//codePointAt()方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString()方法转换一下。
let s = '𠮷a';
s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"
```

上面代码中，字符`a`在字符串`s`的正确位置序号应该是 1，但是必须向`codePointAt()`方法传入 2。

解决办法:

```js
//1.使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。
let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61

//2.使用扩展运算符（...）进行展开运算。
let arr = [...'𠮷a']; // arr.length === 2
arr.forEach(
  ch => console.log(ch.codePointAt(0).toString(16))
);
// 20bb7
// 61
```

`codePointAt()`方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
is32Bit("𠮷") // true
is32Bit("a") // false
```

#### 实例方法：normalize()

ES6 提供字符串实例的`normalize()`方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

`normalize`方法可以接受一个参数来指定`normalize`的方式，参数的四个可选值如下。

- `NFC`，默认参数，表示“标准等价合成”，返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
- `NFD`，表示“标准等价分解”，即在标准等价的前提下，返回合成字符分解的多个简单字符。
- `NFKC`，表示“兼容等价合成”，返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，`normalize`方法不能识别中文。）
- `NFKD`，表示“兼容等价分解”，即在兼容等价的前提下，返回合成字符分解的多个简单字符。

```js
'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2
```

`normalize`方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过 Unicode 编号区间判断。

#### 实例方法：repeat()

repeat()参数如果是小数，会进行`取整`

如果`repeat`的参数是负数或者`Infinity`，会报错。

但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于`-0`，`repeat`视同为 0。

```js
'na'.repeat(-0.9) // ""
```

参数`NaN`等同于 0。

```js
'na'.repeat(NaN) // ""
```

如果`repeat`的参数是字符串，则会先转换成数字。

```js
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
```

### RegExp构造函数

如果`RegExp`构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

```js
new RegExp(/abc/ig, 'i').flags// "i"
```

上面代码中，原有正则对象的修饰符是`ig`，它会被第二个参数`i`覆盖。

### Unicode属性类

ES2018 [引入](https://github.com/tc39/proposal-regexp-unicode-property-escapes)了一种新的类的写法`\p{...}`和`\P{...}`，允许正则表达式匹配符合 Unicode 某种属性的所有字符。

```js
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('π') // true
```

上面代码中，`\p{Script=Greek}`指定匹配一个希腊文字母，所以匹配`π`成功。

Unicode 属性类要指定属性名和属性值。

```js
\p{UnicodePropertyName=UnicodePropertyValue}
```

对于某些属性，可以只写属性名，或者只写属性值。

```js
\p{UnicodePropertyName}
\p{UnicodePropertyValue}
```

`\P{…}`是`\p{…}`的反向匹配，即匹配不满足条件的字符。

```js
const regex=/\p{Script=Greek}/u
regex.test('π')//true
const regex2=/\P{Script=Greek}/u
regex2.test('π')//false
```

<font color='red'>这两种类只对 Unicode 有效，所以使用的时候一定要加上`u`修饰符。</font>

`\p{Number}`甚至能匹配罗马数字。

```js
// 匹配所有空格
\p{White_Space}
// 匹配各种文字的所有字母，等同于 Unicode 版的 \w
[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]
// 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]
// 匹配 Emoji
/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu
// 匹配所有的箭头字符
const regexArrows = /^\p{Block=Arrows}+$/u;
regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true
```

### 具名组匹配

正则表达式使用圆括号进行组匹配。

```js
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
```

上面代码中，正则表达式里面有三组圆括号。使用`exec`方法，就可以将这三组匹配结果提取出来。

```js
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

组匹配的一个问题是，每一组的匹配含义不容易看出来，而且只能用数字序号（比如`matchObj[1]`）引用，要是组的顺序变了，引用的时候就必须修改序号。

ES2018 引入了[具名组匹配](https://github.com/tc39/proposal-regexp-named-groups)（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。

```js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year;// 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```

上面代码中，“具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（`?<year>`），然后就可以在`exec`方法返回结果的`groups`属性上引用该组名。同时，数字序号（`matchObj[1]`）依然有效。

具名组匹配等于为每一组匹配加上了 ID，便于描述匹配的目的。如果组的顺序变了，也不用改变匹配后的处理代码。

如果具名组没有匹配，那么对应的`groups`对象属性会是`undefined`。

```js
const RE_OPT_A = /^(?<as>a+)?$/;
const matchObj = RE_OPT_A.exec('');
matchObj.groups.as // undefined
'as' in matchObj.groups // true
```

上面代码中，具名组`as`没有找到匹配，那么`matchObj.groups.as`属性值就是`undefined`，并且`as`这个键名在`groups`是始终存在的

2.解构赋值和替换

有了具名组匹配以后，可以使用解构赋值直接从匹配结果上为变量赋值。

```js
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar
```

字符串替换时，使用`$<组名>`引用具名组。

```js
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')// '02/01/2015'
```

上面代码中，`replace`方法的第二个参数是一个字符串，而不是正则表达式。

`replace`方法的第二个参数也可以是函数，该函数的参数序列如下。

```js
'2015-01-02'.replace(re, (   
	matched, // 整个匹配结果 2015-01-02   
	capture1, // 第一个组匹配 2015   
	capture2, // 第二个组匹配 01   
	capture3, // 第三个组匹配 02   
	position, // 匹配开始的位置 0   
	S, // 原字符串 2015-01-02   
	groups // 具名组构成的一个对象 {year, month, day} 
	) => { 
		let {day, month, year} = groups; 
		return `${day}/${month}/${year}`;
});
```

具名组匹配在原来的基础上，新增了最后一个函数参数：具名组构成的一个对象。函数内部可以直接对这个对象进行解构赋值。

3.引用

如果要在正则表达式内部引用某个“具名组匹配”，可以使用`\k<组名>`的写法。

```js
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```

数字引用（`\1`）依然有效。

```js
const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```

这两种引用语法还可以同时使用。

```js
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
RE_TWICE.test('abc!abc!abc') // true
RE_TWICE.test('abc!abc!ab') // false
```