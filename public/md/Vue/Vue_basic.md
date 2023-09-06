## 初始Vue

1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象

2. root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法

3. root容器里的代码被称为【Vue模板】

## 分析Hello案例

1.

```js
<div id="root">
    <!-- 插值语法 {{}} -->
    <h1>hello {{ name }},{{address}}</h1>
</div>
<script>
    Vue.config.productionTip=false;//阻止 vue 在启动时生成生产提示
    //创建Vue实例
    new Vue({
        el:'#root',//el用于指定当前实例为哪个容器服务，值通常为css选择器字符串
        data:{//data中用于存储数据，数据供el所指定的容器使用，值暂时先写成一个对象
            name:'尚硅谷'
        },

    });
    new Vue({
        el:'#root',
        data:{
            address:"beijing"
        }
    })
</script>
//hello 尚硅谷
//报错
```

```js
 <!-- 准备好一个容器 -->
    <div class="root">
        <!-- 插值语法 {{}} -->
        <h1>hello {{ name }}</h1>
    </div>
    <div class="root">
        <!-- 插值语法 {{}} -->
        <h1>hello {{ name }}</h1>
    </div>
    <script>
        Vue.config.productionTip=false;//阻止 vue 在启动时生成生产提示
        //创建Vue实例
        new Vue({
            el:'.root',//el用于指定当前实例为哪个容器服务，值通常为css选择器字符串
            data:{//data中用于存储数据，数据供el所指定的容器使用，值暂时先写成一个对象
                name:'尚硅谷'
            },

        });
    </script>
//hello 尚硅谷
//hello {{ name }}
```

容器和Vue实例之间的关系：一对一

2.

{{xxx}}里面的xxx必须写成js表达式，且xxx可以自动识别data中的所有属性

3.

真实开发中只有一个Vue实例，并且会配合着组件一起使用

4.

一旦data中的数据发生改变，那么页面中用到的数据的地方也会自动更新

## 模板语法

Vue模板语法有两大类：

1.插值语法：

​	功能：用于解析`标签体内容`

​	写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性

2.指令语法

​	功能：用于解析标签（包括：`标签属性、标签体内容、绑定事件...`）

​	举例：`v-bind:href="..."`或 简写为 `:href="xxx"`   xxx同样要写js表达式，且可以直接读取到data中的所有属性

​	备注：Vue中有很多指令，且`形式都是 ： v-????`

## 数据绑定

1.v-model只能应用在表单类元素（输入类元素）

```js
<!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素） -->
<h2 v-model:x="name">你好啊</h2>
```

Vue中有两种绑定属性的方法：

​	1.单向绑定(v-bind):数据只能从data流向页面

​	2.双向绑定(v-model):数据`不仅能从data流向页面，还可以从页面流向data`

​		备注：1.双向绑定一般都应用在`表单类元素`上（如：input、select等）

​					2.v-model:value   可以`简写为v-model`,因为v-model默认收集的就是value值的

```js
单向数据绑定:
<input type="text" v-bind:value="name"><br>
双向数据绑定:
<input type="text" v-model:value="name"><br>
//双向绑定，在页面上修改值之后会改变浏览器里面的那个Vue的值
```

## el与data的两种写法

```js
//el的两种写法
 const v=new Vue({
     // el:"#root",//第一种写法
     data:{
       name:"尚硅谷"
     }
 })
 console.log(v);

 v.$mount("#root");//第二种写法

//等一秒钟才会出现尚硅谷
 /*setTimeout(()=>{
     v.$mount("#root");
 },1000);*/
//data的两种写法
new Vue({
    el:"#root",
    //data的第一种写法：对象式
    /* data:{
      name:"尚硅谷"
    } */

    //data的第二种写法：函数式
    data() {
        return {
            name:"尚硅谷"
        }
    }
})
```

data与el的两种写法：

1. el的两种写法：

​		(1)new Vue时候配置el属性

​		(2)先创建Vue实例，随后再通过**vm.$mount("#root")**指定el的值

2. data有两种写法：

   (1)对象式

   (2)`函数式`

   注意：学到组件的时候必须使用函数式

3. 一个重要的原则：由Vue管理的函数一定`不要写箭头函数`，一旦写了箭头函数，this就不再是Vue实例

## Object.defineProperty()方法

```js
//Object.defineProperty()的一些基本配置
Object.defineProperty(person,"age",{
    value:18,
    enumerable: true,//控制属性是否可以被枚举，默认值为false
    writable: true,//控制属性是否可以被修改，默认值为false
    configurable: true,//控制属性是否可以被删除，默认值为false
}) 
```

```js
//person保存age属性，这个属性是通过变量number获得的
Object.defineProperty(person,'age',{
    //当有人读取person的age属性的时候，get函数(getter)就会被调用，且返回值就是age的值
    get() {
        console.log('get age函数被调用了');
        return number;
    },
    // 当有人修改person的age属性的时候，set函数(setter)就会被调用，且会收到修改的具体值
    set(value) {
        console.log('有人修改了age属性,且值是',value);
        number=value;//这里将number赋为value，要不然改不了person.age属性值
    }
})
//person.age=30
//有人修改了age属性,且值是 30
//person
/*
{name: '张三', sex: '男'}
name: "张三"
sex: "男"
age: 30
get age: ƒ get()
set age: ƒ set(value)
[[Prototype]]: Object
*/
//number
//30
```

**注意：没有set方法的话，直接修改person.age是没有用的**

## 何为数据代理

```js
<!-- 数据代理：通过一个对象代理对另一个对象中属性的操作（读/写） -->
<!-- obj对象中有一个属性x，可以通过obj2访问obj里面的属性x，也可以修改obj里的x，这就是数据代理。 -->
let obj={x:100};
let obj2={y:200};
Object.defineProperty(obj2,'x',{
    get() {
        return obj.x;
    },
    set(value) {
        obj.x=value;
    }
})
```

<img src="C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221118223852649.png" alt="image-20221118223852649" style="zoom:67%;" />

## Vue中的数据代理

![img](file:///C:\Users\YUYU\Documents\Tencent Files\499443716\Image\C2C\6246B4CFEF831112605272B3047BCBA5.jpg)

**setter(): **当vm的name发生改变其实就是触发了vm身上name的setter方法，setter方法就会将data身上的name属性修改为新的值

```js
let data={
    name:"尚硅谷",
    address:"北京"
}
Vue.config.productionTip = false;
const vm=new Vue({
    el:"#root",
    data
})
//vm将data存放在了自身vm._data身上
//vm._data.name      '尚硅谷'
//vm.name            '尚硅谷'
//vm._data.address   '北京'
//vm._data===data
//true


/*
vm.name='ATGUIGU'
'ATGUIGU'
data.name
'ATGUIGU'
*/
```

![image-20221118230345078](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221118230345078.png)

![image-20221118231341601](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221118231341601.png)

**总结：**

​	1.Vue中的数据代理：通过vm对象来代理data对象中属性的操作（读/写）

​	2.Vue中数据代理的好处：更加方便的操作data中的数据

​	3.基本原理：通过Object.defineProperty()把data对象中的所有属性添加到vm上。为每一个 添加到vm上的属性，都指定一个getter/setter。在getter/setter内部去操作（读/写）data中的属性

## 事件的基本使用

1.使用`v-on:xxx` 或 `@xxx` 绑定事件，其中xxx是事件名

2.事件的回调需要配置`在methods对象中`，最终会在vm上

3.methods配置的函数，不要用箭头函数，否则里面的this就不是vm了

4.methods里面配置的函数，都是`被Vue管理`的函数，`this的指向是vm或者组件实例对象`

5.`@click="demo"`和`@click="demo($event)"`效果一致，后者可以打印出事件的相关信息  `@click="demo"和@click="demo()"`的区别就是后者可以传参

```js
<!-- 先准备一个容器 -->
<div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <!-- 当点击button的时候，就找名为showInfo1的函数调用(在Vue实例中找) -->
    <button v-on:click="showInfo1">点我提示信息1(不传参)</button>
    <!-- ()可以传参 $event占位符 -->
    <button @click="showInfo2(66,$event)">点我提示信息2(传参)</button>
</div>
<script>
    Vue.config.productionTip = false;
    new Vue({
        el:"#root",
        data:{
          name:"尚硅谷"
        },
        //methods里面可以配置很多事件的回调
        //showInfo1和showInfo2也在vm身上 但是他俩不做数据代理
        methods:{
            showInfo1(event) {//event事件对象
                console.log(event.target.innerText);//点我提示信息1(不传参)
                // console.log(this);//此处的this是vm
                alert("同学你好1!");
            },
            showInfo2(number,event) {
                console.log(number,event);//输出66 
                alert("同学你好!2")
            }
        }
    })
</script>
```

## 事件修饰符

```js
//点击a标签之后，阻止页面跳转，利用下面方法
<!-- 准备好一个容器 -->
<div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <a href="http://www.atguigu.com" @click="showInfo">点我提示信息</a>
</div>
<script>
    Vue.config.productionTip = false;
    new Vue({
        el:"#root",
        data:{
          name:"尚硅谷"
        },
        methods:{
            showInfo(e) {
                e.preventDefault();//阻止页面跳转
                alert("同学你好!");
            }
        }
    })
</script>
```

```js
//另一种方法：使用事件修饰符来阻止页面跳转  -->  .prevent事件修饰符
<!-- 准备好一个容器 -->
    <div id="root">
        <h2>欢迎来到{{name}}学习</h2>
        <a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>
    </div>
    <script>
        Vue.config.productionTip = false;
        
        new Vue({
            el:"#root",
            data:{
              name:"尚硅谷"
            },
            methods:{
                showInfo() {
                    alert("同学你好!");
                }
            }
        })
    </script>
```

Vue中的事件修饰符：

​	**1.pervent：阻止默认事件（常用）**

​	**2.stop：阻止事件冒泡（常用）**

​	**3.once：事件只触发一次（常用）**

​	4.capture：使用事件的捕获模式

​	5.self：只有event.target是当前操作的元素时才触发事件

​	6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕

```js
//阻止事件冒泡
<!-- 准备好一个容器 -->
<div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>
    <!-- 典型的事件冒泡：弹了两次弹窗 -->
    <!-- <div class="demo1" @click="showInfo">
        <button @click="showInfo">点我提示信息</button>
    </div> -->
    <div class="demo1" @click="showInfo">
        //阻止方式2：stop
        <button @click.stop="showInfo">点我提示信息</button>
    </div>
	<!-- 事件只触发一次 -->
    <button @click.once="showInfo">点我提示信息</button>
	<!-- 使用事件的捕获阶段 -->
    <!-- 事件是先捕获再冒泡 意味着在捕获阶段就处理了box1 -->
    <!-- 说明点击div2，会先执行div1，再执行div2 -->
    <div class="box1" @click.capture="showMsg(1)">
        div1
        <div class="box2" @click="showMsg(2)">div2</div>
    </div>
	<!-- 只有event.target是当前操作的元素时才触发事件 -->
    <div class="demo1" @click.self="showInfo">
        <button @click="showInfo">点我提示信息</button>
    </div>
</div>
<script>
    Vue.config.productionTip = false;

    new Vue({
        el:"#root",
        data:{
          name:"尚硅谷"
        },
        methods:{
            showInfo() {
                // e.stopPropagation();//使用事件e的方法阻止冒泡(方式1)
                alert("同学你好!");
            },
            showMsg(msg) {
                console.log(msg);
            }
        }
    })
</script>
```

```js
<div id="root">
<!-- 事件的默认行为立即执行，无需等待事件回调执行完毕 -->
<!-- scroll是滚动条往下往上滚动，任何能将滚动条移动的行为都执行demo,而且移动时，会同时进行demo函数和滚动的行为 -->
<ul @scroll="demo" class="list">
<!-- wheel.passive和scroll一样，同时进行 -->
<!-- <ul @wheel.passive="demo" class="list"> -->
    <!-- wheel是鼠标滚轮(只有)的滚动，就算滚轮滚动到进度条的最下面，滚动滚轮也会有所变化 -->
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
</div>
<script>
    Vue.config.productionTip = false;
    new Vue({
        el:"#root",
        data:{
          name:"尚硅谷"
        },
        methods:{
            demo() {
                // 滚轮滚动一下之后，就触发demo事件，先执行完demo函数之后，再去执行默认行为（将滚动条往下滑）(不用passive。并且使用的是@wheel)
                for (let i = 0; i < 100000; i++) {
                    console.log('#');
                }
                console.log('累坏了');
            }
        }
    })
</script>
```

## 键盘事件

1.Vue中常用的按键别名

​	回车==> `enter`

​	删除==> `delete（捕获”删除“和”退格“键）`

​	退出==> `esc`

​	空格==> `space`

​	换行==> `tab`(特殊，必须配合**keydown**使用)

​	上    ==> `up`

​	下    ==> `down`

​	左    ==> `left`

​	右    ==> `right`

2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转化为`**kebab-case**`(短横线命名)

3.`系统修饰符`（用法特殊）：ctrl、alt、shift、meta(win键)

​		（1）.配合keyup使用：<font color='skygreen'>按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发</font>

​		（2）.配合keydown使用：正常触发事件

4.也可以通过keyCode去指定具体的按键（`不推荐`）例如：@keydown.13(按下Enter键)

5.`Vue.config.keyCodes.自定义键名=键码`，可以去定制按键别名

```js
<!-- 先准备一个容器 -->
<div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <!-- 键盘事件：keyup和keydown -->
    <!-- 这里 .enter就是回车 -->
    <!-- <input type="text" placeholder="按下回车提示输入" @keyup.enter="showInfo"> -->
    <!-- delete删除：捕获删除键和delete键 -->
    <!-- <input type="text" placeholder="按下回车提示输入" @keyup.delete="showInfo"> -->
    <!-- esc：esc键 -->
    <!-- <input type="text" placeholder="按下回车提示输入" @keyup.esc="showInfo"> -->
    <!-- space：空格键 -->
    <!-- <input type="text" placeholder="按下回车提示输入" @keyup.space="showInfo"> -->
    <!-- tab：换行键 -->
    <!-- tab键本身就有切换焦点的功能，只要按下tab键，焦点就切换走了，所以tab对keyup事件没有用，对keydown有用 -->
    <!-- <input type="text" placeholder="按下回车提示输入" @keydown.tab="showInfo"> -->
    <!-- up键：上 ...... -->
    <!-- <input type="text" placeholder="按下回车提示输入" @keyup.up="showInfo"> -->
    <!-- 未提供别名的按键，要将e.key（也就是按键的名称写成如下格式才有效） -->
    <input type="text" placeholder="按下回车提示输入" @keyup.caps-lock="showInfo">
    <!-- 自定义键名 -->
    <!-- <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo"> -->
</div>
<script>
    Vue.config.productionTip = false;
	Vue.config.keyCodes.huiche=13;//自定义键名
    new Vue({
        el:"#root",
        data:{
          name:"尚硅谷"
        },
        methods:{
            showInfo(e) {
                console.log(e.target.value);
            }
        }
    })
</script>
```

```js
//先阻止冒泡再阻止跳转
<div class="demo1" @click="showInfo">
    <a href="http://www.atguigu.com" @click.stop.prevent="showInfo">点我提示信息</button>
</div>
//指定只有按下ctrl+y才会有作用
<input type="text" placeholder="按下回车提示输入" @keyup.ctrl.y="showInfo">
```

## 计算属性

```
计算属性：
    1.定义：要用的属性不存在，要通过已有属性计算得来。
    2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
    3.get函数什么时候执行？
                (1).初次读取时会执行一次。
                (2).当依赖的数据发生改变时会被再次调用。
    4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
    5.备注：
            1.计算属性最终会出现在vm上，直接读取使用即可。
            2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
```

```js
//简写形式
fullName() {
    console.log('123');
    return this.firstName+"-"+this.lastName;
}
```

## 监视属性

```js
<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeweather">切换天气</button>
</div>
<script>
    Vue.config.productionTip = false;

    const vm=new Vue({
        el:"#root",
        data:{
            isHot:true,
        },
        computed:{
            info() {
                return this.isHot?'炎热':'凉爽';
            }
        },
        methods: {
            changeweather() {
                this.isHot=!this.isHot;
            }
        },
        //监视属性的第一种写法：
        /* watch:{
            isHot:{
                //immediate默认为false
                // immediate:true,//初始化时让handler调用一下
                //handler什么时候调用：当isHot发生改变的时候就调用，
                handler(newValue,oldValue) {
                    console.log("isHot被修改了",newValue,oldValue);
                }
            },
            //计算属性也可以被监视
            info:{
                //immediate默认为false
                handler(newValue,oldValue) {
                    console.log("info被修改了",newValue,oldValue);
                }
            }
        } */

    })
    //监视属性的第二种写法：可以写多个$watch
    vm.$watch("isHot",{
		//immediate默认为false
        handler(newValue,oldValue) {
            console.log("info被修改了",newValue,oldValue);
        }
    });
</script>
```

```
监视属性watch：
    1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
    2.监视的属性必须存在，才能进行监视！！
    3.监视的两种写法：
            (1).new Vue时传入watch配置
            (2).通过vm.$watch监视
```

## 深度监视

```
深度监视：
    (1) Vue中的watch默认不监测对象内部值的改变（一层）。
    (2) 配置deep:true可以监测对象内部值改变（多层）。即不配置deep:true的话，内部值的改变不代表整体的改变
备注：
    (1) Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
    (2) 使用watch时根据数据的具体结构，决定是否采用深度监视。
```

```js
<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeweather">切换天气</button>
    <hr>
    <h3>a的值是{{numbers.a}}</h3>
    <button @click="numbers.a++">点我让a+1</button>
    <h3>b的值是{{numbers.b}}</h3>
    <button @click="numbers.b++">点我让b+1</button>
</div>
<script>
    Vue.config.productionTip = false;
    const vm=new Vue({
        el:"#root",
        data:{
            isHot:true,
            numbers:{
                a:1,
                b:1
            }
        },
        computed:{
            info() {
                return this.isHot?'炎热':'凉爽';
            }
        },
        methods: {
            changeweather() {
                this.isHot=!this.isHot;
            }
        },
        watch:{
            isHot:{
                //immediate默认为false
                // immediate:true,//初始化时让handler调用一下
                //handler什么时候调用：当isHot发生改变的时候就调用，
                handler(newValue,oldValue) {
                    console.log("isHot被修改了",newValue,oldValue);
                }
            },
            //vm中并不存在a属性
            /* a:{
                handler() {
                    console.log('a被改变了');
                }
            } */
            //监视多级结构中某个属性的变化 注意：引号
            /* "numbers.a":{
                handler() {
                    console.log('a被改变了');
                }
            }, */
            //监视多级结构中所有属性的变化
            numbers:{
                deep:true,
                handler() {
                    console.log('numbers被改变了');
                }
            }
        }

    })
</script>
```

## 监视属性-简写

```js
<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeweather">切换天气</button>
</div>
<script>
    Vue.config.productionTip = false;

    const vm=new Vue({
        el:"#root",
        data:{
            isHot:true,
        },
        computed:{
            info() {
                return this.isHot?'炎热':'凉爽';
            }
        },
        methods: {
            changeweather() {
                this.isHot=!this.isHot;
            }
        },
        watch:{
            //当配置项中只有handler时，就可以使用简写形式
            //正常写法:
           /*  isHot:{
                //immediate默认为false
                deep: true,
                // immediate:true,//初始化时让handler调用一下
                //handler什么时候调用：当isHot发生改变的时候就调用，
                handler(newValue,oldValue) {
                    console.log("isHot被修改了",newValue,oldValue);
                }
            }, */
            //简写:
            /* isHot(newValue,oldValue) {
                console.log("isHot被修改了",newValue,oldValue);
            } */
        }
    })
    //正常写法：
    /* vm.$watch('isHot',{
        //immediate默认为false
        deep: true,
        // immediate:true,//初始化时让handler调用一下
        //handler什么时候调用：当isHot发生改变的时候就调用，
        handler(newValue,oldValue) {
            console.log("isHot被修改了",newValue,oldValue);
        }
    }) */
    //简写：
    vm.$watch('isHot',function(newValue,oldValue) {
        console.log("isHot被修改了",newValue,oldValue);
    })
</script>
```

## Computed和Watch的区别

```js
computed和watch之间的区别：
    1.computed能完成的功能，watch都可以完成。
    2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。
两个重要的小原则：
    1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
    2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，
        这样this的指向才是vm 或 组件实例对象。
```

## 绑定class样式

```js
绑定样式：
1. class样式
    写法:  :class="xxx" xxx可以是字符串、对象、数组。
        字符串写法适用于：类名不确定，要动态获取。
        对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
        数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
2. style样式
    :style="{fontSize: xxx}"其中xxx是动态值。
    :style="[a,b]"其中a、b是样式对象。
```

```js
 <div id="root">
    <!-- 绑定class样式--字符串写法，适用于样式的类名不确定，需要动态确定 -->
    <div class="basic" :class="mood" @click="changeMood">{{name}}</div><br>
    <!-- 绑定class样式--数组写法，适用于：要绑定样式个数不确定，名字也不确定 -->
    <div class="basic" :class="arr"  @click="deleteClass">{{name}}</div><br>
    <!-- 绑定class样式--对象写法，适用于：要绑定的样式确定，样式名也确定，但要动态决定用不用 -->
    <div class="basic" :class="classObj">{{name}}</div><br>

    <!-- 绑定style样式--对象写法 -->
    <div class="basic" :style="styleObj">{{name}}</div><br>
    <!-- 绑定style样式--数组写法(多个样式) -->
    <div class="basic" :style="[styleObj,styleObj2]">{{name}}</div>
</div>
<script>
    Vue.config.productionTip=false;
    const vm=new Vue({
        el:"#root",
        data:{
            name:"尚硅谷",
            mood:"normal",
            arr:['atguigu1','atguigu2','atguigu3'],//数组写法
            //对象写法
            classObj:{
                //对象里面的false代表不用该class
                atguigu1: false,
                atguigu2: false,
            },
            styleObj:{
                //对象里面的key不可以胡写
                fontSize: '40px',
                color:'red',
            },
            styleObj2:{
                backgroundColor:"orange",
            },
        },
        methods:{
            //字符串写法
            changeMood() {
                const arr=['happy','sad','normal'];
                const index=Math.floor(Math.random()*3);//0-3
                this.mood=arr[index];
            },
            deleteClass() {
                this.arr.pop();
            }
        }
    })
</script>
```

## 条件渲染

```js
//v-show相当于样式上添加了display:none,但结构还是在的
<div id="root">
    <!-- v-show里面只要是能转换为布尔值就行，不必写为true或false,若为false，就display:none -->
    <!-- <h2 v-show="a">欢迎来到{{name}}</h2> -->
    <!-- <h2 v-show="1===1">欢迎来到{{name}}</h2> -->
</div>
<script>
    Vue.config.productionTip = false;
    const vm=new Vue({
        el:"#root",
        data:{
            name:"尚硅谷",
            a:false,
        }
    })
</script>
```

```js
//使用v-if做条件渲染:将结构干掉
<div id="root">
    <!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->
</div>
<script>
    Vue.config.productionTip = false;
    const vm=new Vue({
        el:"#root",
        data:{
            name:"尚硅谷",
        }
    })
</script>
```

```js
<div id="root">
    <!-- 新需求：不同的n值出现不同的div -->
    <h2>当前的n值为：{{n}}</h2>
    <button @click="n++">点我n++</button>
	//v-show方法
    <!-- <div v-show="n===1">Angular</div>
    <div v-show="n===2">React</div>
    <div v-show="n===3">Vue</div> -->

  	// v-if  v-else-if  v-else 
    <!-- <div v-if="n===1">Angular</div>
    <div v-else-if="n===2">React</div>
    <div v-else-if="n===3">Vue</div>
    <div v-else>hh</div> -->
</div>
<script>
    Vue.config.productionTip = false;
    const vm=new Vue({
        el:"#root",
        data:{
            name:"尚硅谷",
            n:0,
        }
    })
</script>
```

```js
<div id="root">
    //新需求：当n为1时，同时出现多个h2
    <!-- template只能与v-if配合使用 -->
    <template v-if="n===1">
        <h2>1</h2>
        <h2>2</h2>
        <h2>3</h2>
    </template>
</div>
<script>
    Vue.config.productionTip = false;
    const vm=new Vue({
        el:"#root",
        data:{
            name:"尚硅谷",
            n:0,
        }
    })
</script>
```

## 列表渲染

#### 基本列表

```js
v-for指令:
    1.用于展示列表数据
    2.语法：v-for="(item, index) in xxx" :key="yyy"
    3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
```

```js
<div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表</h2>
    <ul>
        <!-- v-for指令，persons的长度为几，就生成几个li -->

        <!-- key的第一种方法 -->
        <!-- 这里可以用in也可以用of -->
        <!-- <li v-for="p in persons" :key="p.id">{{p.name}}-{{p.age}}</li> -->

        <!-- key的第二种方法 -->
        <li v-for="(p,index) in persons" :key="index">
            {{p.name}}--{{p.age}}
        </li>
        <!-- <li v-for="(a,b,c) in persons">{{a}}--{{b}}--{{c}}</li> -->
    </ul>

    <!-- 遍历对象 -->
    <h2>汽车列表</h2>
    <ul>
        <li v-for="(value,k) in cars" :key="k">
            {{k}}--{{value}}//k为键，value为值
        </li>
    </ul>

    <!-- 遍历字符串 -->
    <h2>测试遍历字符串</h2>
    <ul>
        <li v-for="(char,index) of str" :key="index">
            {{char}}--{{index}}//char为值，index为下标
        </li>
    </ul>

    <!-- 遍历指定次数 -->
    <h2>测试遍历指定次数</h2>
    <ul>
        <li v-for="(number,index) of 5">
            {{number}}--{{index}}//number为值，index为键
        </li>
    </ul>
</div>
<script>
    Vue.config.productionTip = false;

    new Vue({
        el:"#root",
        data:{
            persons:[
                {id:'001',name:"张三",age:18,},
                {id:'002',name:"李四",age:19,},
                {id:'003',name:"王五",age:20,}
            ],
            cars:{
                name:'1',
                price:'2',
                color:'3'
            },
            str:'hello'
        }
    })
</script>
```

#### key作用与原理

**index作为key：**

![image-20221123172621053](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221123172621053.png)

![image-20221123172631104](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221123172631104.png)

![image-20221123172637132](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221123172637132.png)

id作为key：

![image-20221123173147578](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221123173147578.png)

![image-20221123173153153](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221123173153153.png)

```js
面试题：react、vue中的key有什么作用？（key的内部原理）
						
1. 虚拟DOM中key的作用：
    key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
    随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
2.对比规则：
    (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
        ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
        ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
    (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
        创建新的真实DOM，随后渲染到到页面。
3. 用index作为key可能会引发的问题：
    1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
        会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
    2. 如果结构中还包含输入类的DOM：
        会产生错误DOM更新 ==> 界面有问题。
4. 开发中如何选择key?:
    1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
    2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。
```

#### 列表过滤

```js
<div id="root">
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord">
    <ul>
        <li v-for="(p,index) in filPersons" :key="index">
            {{p.name}}--{{p.age}}--{{p.sex}}
        </li>
    </ul>
</div>
<script>
    Vue.config.productionTip = false;
    //用watch实现
    /* new Vue({
        el:"#root",
        data:{
            keyWord:"",
            persons:[
                {id:'001',name:'马冬梅',age:19,sex:"女"},
                {id:'002',name:'周冬雨',age:20,sex:"女"},
                {id:'003',name:'周杰伦',age:21,sex:"男"},
                {id:'004',name:'温兆伦',age:22,sex:"男"},
            ],
            filPersons:[]
        },
        watch:{
            keyWord:{
                immediate: true,
                handler(val) {
                    //filter不改变原数组
                    this.filPersons=this.persons.filter((p)=>{
                        return p.name.indexOf(val)!==-1;
                    })
                }
            }
        }
    }) */
    //用computed实现
    new Vue({
        el:"#root",
        data:{
            keyWord:'',
            persons:[
                {id:'001',name:'马冬梅',age:19,sex:"女"},
                {id:'002',name:'周冬雨',age:20,sex:"女"},
                {id:'003',name:'周杰伦',age:21,sex:"男"},
                {id:'004',name:'温兆伦',age:22,sex:"男"},
            ]
        },
        computed:{
            filPersons() {
                return this.persons.filter((p)=>{
                    return p.name.indexOf(this.keyWord)!==-1;
                })
            }
        }
    })
</script>
```

#### 列表更新时的问题

```js
<div id="root">
    <h2>人员列表</h2>
    <button @click="updateMei">更新马冬梅信息</button>
    <ul>
        <li v-for="(p,index) of persons" :key="p.id">
            {{p.name}}-{{p.age}}-{{p.sex}}
        </li>
    </ul>
</div>
<script>
    Vue.config.productionTip = false;
    const vm=new Vue({
        el:"#root",
        data:{
            persons:[
                {id:'001',name:'马冬梅',age:30,sex:"女"},
                {id:'002',name:'周冬雨',age:31,sex:"女"},
                {id:'003',name:'周杰伦',age:18,sex:"男"},
                {id:'004',name:'温兆伦',age:19,sex:"男"},
            ]
        },
        methods:{
            updateMei() {
                // this.persons[0].name='马老师';//奏效
                // this.persons[0].age=50;//奏效
                // this.persons[0].sex='男';//奏效
                //Vue不认同
                // this.persons[0]={id:'001',name:'马老师',age:50,sex:'男'};//不奏效
            }
        }
    })
</script>
```

#### Vue检测数据变化的原理_对象

![image-20221124004100835](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221124004100835.png)

```js
<div id="root">
    <h2>学校名称:{{name}}</h2>
    <h2>学校地址:{{address}}</h2>
</div>
<script>
    Vue.config.productionTip = false;

    const vm=new Vue({
        el:"#root",
        data:{
            name:"尚硅谷",
            address:"北京",
            student:{
                name:'tom',
                age:{
                    rAge:40,
                    sAge:29
                }
            },
            friends:[
                {name:'Jerry',age:35}
            ]
        }
    })
</script>
```

#### Vue.set的使用

```js
<div id="root">
    <h1>学校信息</h1>
    <h2>学校名称:{{school.name}}</h2>
    <h2>学校地址:{{school.address}}</h2>
    <h2>校长是：{{school.leader}}</h2>
    <hr>
    <h1>学生信息</h1>
    <button @click="addSex">添加一个性别属性，默认值是男</button>
    <h2>学生姓名：{{student.name}}</h2>
    <h2 v-if="student.sex">学生性别：{{student.sex}}</h2>
    <h2>学生年龄：真实{{student.age.rAge}}，对外{{student.age.sAge}}</h2>
    <h2>朋友：</h2>
    <ul>
        <li v-for="(f,index) in student.friends" :key="index">
            {{f.name}}--{{f.age}}
        </li>
    </ul>

</div>
<script>
    //缺点：Vue.set只能给data里面的某个对象添加属性，而不能给data追加属性,即Vue.set()第一个参数不能是vm或者vm._data
    Vue.config.productionTip = false;
    const vm=new Vue({
        el:"#root",
        data:{
            school:{
                name:"尚硅谷",
                address:"北京",
            },
            student:{
                name:'tom',
                age:{
                    rAge:40,
                    sAge:29
                },
                friends:[
                    {name:'Jerry',age:35},
                    {name:'Tom',age:36},
                ]
            },
        },
        methods:{
            addSex() {
                //第一种方法
                // Vue.set(this.student,'sex','男');
                //第二种方法
                this.$set(this.student,'sex','男');
            }
        }
    })
</script>
```

#### Vue检测数据变化的原理_数组

```js
//通过数组索引值来修改数组值是不行的
Vue.set(vm.student.hobby,1,'学习')//将hobby数组第二个变为'学习'

vm.student.hobby.push('学习')

```

```js
<!--
    Vue监视数据的原理：
        1. vue会监视data中所有层次的数据。

        2. 如何监测对象中的数据？
            通过setter实现监视，且要在new Vue时就传入要监测的数据。
                (1).对象中后追加的属性，Vue默认不做响应式处理
                (2).如需给后添加的属性做响应式，请使用如下API：
                    Vue.set(target，propertyName/index，value) 或 
                    vm.$set(target，propertyName/index，value)

        3. 如何监测数组中的数据？
            通过包裹数组更新元素的方法实现，本质就是做了两件事：
                (1).调用原生对应的方法对数组进行更新。
                (2).重新解析模板，进而更新页面。

        4.在Vue修改数组中的某个元素一定要用如下方法：
            1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
            2.Vue.set() 或 vm.$set()

        特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
-->
<div id="root">
    <h1>学生信息</h1>
    <button @click="student.age++">年龄+1岁</button> <br/>
    <button @click="addSex">添加性别属性，默认值：男</button> <br/>
    <button @click="student.sex = '未知' ">修改性别</button> <br/>
    <button @click="addFriend">在列表首位添加一个朋友</button> <br/>
    <button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br/>
    <button @click="addHobby">添加一个爱好</button> <br/>
    <button @click="updateHobby">修改第一个爱好为：开车</button> <br/>
    <button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br/>
    <h3>姓名：{{student.name}}</h3>
    <h3>年龄：{{student.age}}</h3>
    <h3 v-if="student.sex">性别：{{student.sex}}</h3>
    <h3>爱好：</h3>
    <ul>
        <li v-for="(h,index) in student.hobby" :key="index">
            {{h}}
        </li>
    </ul>
    <h3>朋友们：</h3>
    <ul>
        <li v-for="(f,index) in student.friends" :key="index">
            {{f.name}}--{{f.age}}
        </li>
    </ul>
</div>
<script>
    const vm=new Vue({
        el:"#root",
        data:{
            student:{
                name:"tom",
                age:18,
                hobby:['抽烟','喝酒','烫头'],
                friends:[
                    {name:'Jerry',age:35},
                    {name:'Tom',age:36},
                ]
            }
        },
        methods:{
            addSex() {
                Vue.set(this.student,'sex','男')
            },
            addFriend() {
                // Vue.set(this.student.friends,0,{name:'Jack',age:70})
                this.student.friends.unshift({name:'Jack',age:70});
            },
            updateFirstFriendName() {
                //直接修改this.student.friends[0]不奏效
                this.student.friends[0].name='张三'//奏效
            },
            addHobby() {
                this.student.hobby.push('学习')
            },
            updateHobby() {
                Vue.set(this.student.hobby,0,'开车')
                // this.$set(this.student.hobby,0,'开车')
                //下面这种也可以
                // this.student.hobby.splice(0,1,'开车')
            },
            removeSmoke() {
                //filter方法不会改变原数组
                this.student.hobby=this.student.hobby.filter((h)=>{
                    return h!='抽烟'
                })
            }
        }
    })
</script>          
```

#### 收集表单数据

```js
<!-- 
    收集表单数据：
        若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
        若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
        若：<input type="checkbox"/>
            1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）,导致选了一个，其余的都选上了
            2.配置input的value属性:
                (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
                (2)v-model的初始值是数组，那么收集的的就是value组成的数组
        备注：v-model的三个修饰符：
            lazy：失去焦点再收集数据
            number：输入字符串转为有效的数字
            trim：输入首尾空格过滤
-->
<div id="root">
    <form @submit.prevent="demo">
        <!-- v-model修饰符 .trim除去两边空格 -->
        <label for="demo1">账号：</label>
        <input type="text" id="demo1" v-model.trim="userInfo.account"><br><br>
        <label for="demo2">密码：</label>
        <input type="password" id="demo2" v-model="userInfo.password"><br><br>
        <label for="demo3">年龄：</label>
        <!-- v-model修饰符 .number将其输入转换为数字 -->
        <input type="number" id="demo3" v-model.number="userInfo.age"><br><br>

        性别：男<input type="radio" name="sex" v-model="userInfo.sex" value="male">   
            女<input type="radio" name="sex" v-model="userInfo.sex" value="female"><br><br>
            <!-- 不写value默认读取的是checked的值 -->
        爱好：学习<input type="checkbox" v-model="userInfo.hobby" value="study"> 
            打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
            吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat"><br><br>
        所属校区：
        <select v-model="userInfo.city">
            <option value="">请选择校区</option>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="shenzhen">深圳</option>
        </select><br><br>
        <!-- v-model修饰符 .lazy失去焦点的一瞬间收集 -->
        其他信息：
        <textarea v-model.lazy="userInfo.other"></textarea><br><br>
        <input type="checkbox" v-model="userInfo.agree">阅读并接受 <a href="###">《用户协议》</a><br><br>
        <button>提交</button>
    </form>
</div>
<script>
    new Vue({
        el:"#root",
        data:{
            userInfo:{
                account:'',
                password:'',
                sex:'female',
                //hobby的初始值会影响v-model收集回来的数据
                // hobby:'',
                hobby:[],//复选框要用空数组当默认值
                city:'beijing',
                other:'',
                agree:'',
                age:'',
            }
        },
        methods:{
            demo() {
                //不要在这里直接使用_data
                console.log(JSON.stringify(this.userInfo));
            }
        }
    })
</script>
```

## 过滤器

```js
<!-- 
    过滤器：
        定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
        语法：
                1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}//全局过滤器
                2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
        备注：
                1.过滤器也可以接收额外参数、多个过滤器也可以串联({{xxx | 过滤器名1 || 过滤器名2 ...}})
                2.并没有改变原本的数据, 是产生新的对应的数据
-->
<div id="root">
    <h2>显示格式化后的时间</h2>
    <!-- 计算属性实现 -->
    <h3>现在是{{fmTime}}</h3>
    <!-- methods实现 -->
    <h3>现在是{{getFmTime()}}</h3>
    <!-- 过滤器实现   (想展示谁直接写) | 过滤器名称 -->
    <!-- time会作为参数传给过滤器函数 -->
    <h3>现在是{{time | timeFormat}}</h3>
    <!-- 过滤器函数第一个参数是不变的 -->
    <h3>现在是{{time | timeFormat('YYYY_MM_DD') | mySlice}}</h3>
    <!-- v-bind -->
    <h3 :x="msg | mySlice">尚硅谷</h3>

    <!-- <input type="text" v-model="msg | mySlice"> 报错 -->
</div>
<div id="root2">
    <h2>{{msg | mySlice}}</h2>
</div>
<script>
    //配置全局过滤器(必须在new Vue之前写好过滤器)
    Vue.filter('mySlice',function(value) {
        return value.slice(0,4);
    })
    new Vue({
        el:"#root",
        data:{
            time:1669811038749,//时间戳
            msg:'hello atguigu!'
        },
        computed:{
            fmTime() {
                //不传参数的话，将运行代码的当前时间的时间戳拿到做格式化
                return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        methods:{
            getFmTime() {
                return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        //过滤器配置项 所有filters里面的过滤器为局部过滤器，只能为当前实例使用
        filters:{
            //形参默认值
            timeFormat(value,format='YYYY-MM-DD HH:mm:ss') {
                return dayjs(value).format(format);

            },
            mySlice(value) {
                return value.slice(0,4);
            }
        }
    })

    new Vue({
        el:"#root2",
        data:{
            msg:'hello atguigu!'
        }
    })
</script>
```

## 内置指令

#### v-text指令

```js
<!-- 
    我们学过的指令：
        v-bind	: 单向绑定解析表达式, 可简写为 :xxx
        v-model	: 双向数据绑定
        v-for  	: 遍历数组/对象/字符串
        v-on   	: 绑定事件监听, 可简写为@
        v-if 	: 条件渲染（动态控制节点是否存存在）
        v-else 	: 条件渲染（动态控制节点是否存存在）
        v-show 	: 条件渲染 (动态控制节点是否展示)
    v-text指令：
        1.作用：向其所在的节点中渲染文本内容。
        2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。
-->
<div id="root">
    <div>{{name}}</div>
    <!-- v-text会拿到name值(将所有的字符串都当成正常的文本去替换，不会当成标签的)，替换掉div里面所有的值 -->
    <div v-text="name">start</div>
</div>
<script>
    new Vue({
        el:"#root",
        data:{
            name:"尚硅谷",
            str:'<h3>你好啊!</h3>'
        }
    })
</script>
```

#### v-html指令

```html
<!-- 
    v-html指令：
        1.作用：向指定节点中渲染包含html结构的内容。
        2.与插值语法的区别：
            (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
            (2).v-html可以识别html结构。
        3.严重注意：v-html有安全性问题！！！！
            (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
            (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
-->
<!-- v-html支持对结构解析 -->
<div id="root">
    <div>你好啊，{{name}}</div>
    <!-- <div v-text="str"></div> -->
    <!-- 上面一行结果为：<h3>你好啊!</h3> -->
    <div v-html="str"></div>
</div>
<script>

    new Vue({
        el:"#root",
        data:{
            name:"尚硅谷",
            str:'<h3>你好啊!</h3>'
        }
    })
</script>
```

![image-20221213220516365](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221213220516365.png)

![image-20221213220528718](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221213220528718.png)

#### v-cloak指令

```html

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-cloak指令</title>
		<style>
			[v-cloak]{
				display:none;
			}
		</style>
		<!-- 引入Vue -->
        <script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>
	</head>
	<body>
		<!-- 
			v-cloak指令（没有值）：
                1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
                2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2 v-cloak>{{name}}</h2>
		</div>
	</body>
	
	<script type="text/javascript">
		console.log(1)
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
		
		new Vue({
			el:'#root',
			data:{
				name:'尚硅谷'
			}
		})
	</script>
</html>
```

#### v-once指令

```html
<!-- 
    v-once指令：
        1.v-once所在节点在初次动态渲染后，就视为静态内容了。
        2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
-->
<div id="root">
    <h2 v-once>初始化的n值是1</h2>
    <h2>当前的n值是{{n}}</h2>
    <button @click="n++">点我n++</button>
</div>
<script>
    new Vue({
        el:"#root",
        data:{
            n:1
        },

    })
</script>
```

#### v-pre指令

```html
<!-- 
    v-pre指令：
        1.跳过其所在节点的编译过程。
        2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
-->
<div id="root">
    <h2 v-pre>Vue其实很简单</h2>
    <h2 v-pre>当前的n值为{{n}}</h2>
    <button v-pre a="1" @click="n++">点我n+1</button>
</div>
<script>

    new Vue({
        el:"#root",
        data:{
          n:1
        }
    })
</script>
```

#### 自定义指令

```js
<!-- 
    需求1：定义一个v-big指令，和v-text指令功能类似，但会把绑定的数值放大10倍
    需求2：定义一个v-fbind指令，和v-bind指令功能类似，但可以让其所绑定的input匀速默认获取焦点
 -->
<div id="root">
    <h2>当前的n值是：<span v-text="n"></span></h2>
    <h2>放大10倍后的n值是：<span v-big="n"></span></h2>
    <button @click="n++">点我n+1</button>
</div>
<script>
    new Vue({
        el:"#root",
        data:{
          n:1
        },
        directives:{
            //自定义指令_函数式
            //element是真实的DOM元素,binding是对象（其中包含的最重要的是value，value是v-big里面的n）
            //big函数何时会被调用：1.指令与元素成功绑定时（一上来）2.指令所在的模板被重新解析时
            big(element,binding) {
                element.innerText=binding.value*10;
                // console.log(element,binding);
            }
            
        }
    })
</script>
```

###### 总结

```js
<!-- 
    需求1：定义一个v-big指令，和v-text指令功能类似，但会把绑定的数值放大10倍
    需求2：定义一个v-fbind指令，和v-bind指令功能类似，但可以让其所绑定的input匀速默认获取焦点
	自定义指令总结：
        一、定义语法：
            (1).局部指令：
                new Vue({							     new Vue({
                    directives:{指令名:配置对象}   或   		directives{指令名:回调函数}
				}) 										 })
			(2).全局指令：
				Vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)
		二、配置对象中常用的3个回调：
            (1).bind：指令与元素成功绑定时调用。
            (2).inserted：指令所在元素被插入页面时调用。
            (3).update：指令所在模板结构被重新解析时调用。
        三、备注：
            1.指令定义时不加v-，但使用时要加v-；
            2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。
 -->
<div id="root">
    <h2>当前的n值是：<span v-text="n"></span></h2>
    <h2>放大10倍后的n值是：<span v-big="n"></span></h2>
    <!-- <h2>放大10倍后的n值是：<span v-big-number="n"></span></h2> -->
    <button @click="n++">点我n+1</button>
    <hr>
    <input type="text" v-fbind:value="n">
</div>
<div id="root2">
    <input type="text" v-fbind:value="x">
</div>
<script>
    //fbind为全局指令
    Vue.directive('fbind',{
        //当指令与元素成功绑定时
        bind(element,binding) {
            console.log('bind');
            element.value=binding.value;
        },
        //指令所在元素被插入页面时
        inserted(element,binding) {
            console.log('inserted');
            element.focus();
        },
        //指令所在的模板被重新解析时
        update(element,binding) {
            console.log('update');
            element.value=binding.value;
        }
    })
    new Vue({
        el:"#root",
        data:{
          n:1
        },
        //所有指令相关回调里面的this不是vm，是window
        directives:{
            //自定义指令_函数式 相当于对象式只写了bind和update
            //element是真实的DOM元素,binding是对象（其中包含的最重要的是value，value是v-big里面的n）
            //big函数何时会被调用：1.指令与元素成功绑定时（一上来）2.指令所在的模板被重新解析时
            big(element,binding) {
                element.innerText=binding.value*10;
                // console.log(element,binding);
            },
            /* 'big-number':function(element,binding) {
                element.innerText=binding.value*10;
                // console.log(element,binding);
            }, */

            //无法自动获取焦点
            /* fbind(element,binding) {
                element.value=binding.value;
                element.focus();//不奏效 因为元素还没放入页面
            } */

            //自定义指令_对象式
            /* fbind:{
                //当指令与元素成功绑定时
                bind(element,binding) {
                    console.log('bind');
                    element.value=binding.value;
                },
                //指令所在元素被插入页面时
                inserted(element,binding) {
                    console.log('inserted');
                    element.focus();
                },
                //指令所在的模板被重新解析时
                update(element,binding) {
                    console.log('update');
                    element.value=binding.value;
                }
            } */
        }
    })
    new Vue({
        el:"#root2",
        data:{
            x:1
        }
    })
</script>
```

## 生命周期

#### 引入生命周期

实现效果：![image-20221214171138355](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221214171138355.png)

该图片的效果是透明度从1减到0，再从1开始减到0，一次循环进行

```js
<!-- 
    生命周期：
        1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
        2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
        3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
        4.生命周期函数中的this指向是vm 或 组件实例对象。
 -->
<div id="root">
    <h2 v-if="a">你好啊</h2>
    <h2 :style="{opacity}">欢迎学习Vue</h2>
    <!-- {{change()}} -->
</div>
<script>
    const vm=new Vue({
        el:"#root",
        data:{
            a:false,
            opacity:1
        },
        /* methods:{
            change() {
                setInterval(()=>{
                    this.opacity-=0.01;
                    if(this.opacity<=0) this.opacity=1;
                },16)
            }
        } */
        //mounted为生命周期函数
        // Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted 只调一次，即是在页面刚开始加载出来时
        mounted() {
            console.log('mounted');
            setInterval(()=>{
                this.opacity-=0.01;
                if(this.opacity<=0) this.opacity=1;
            },16)
        }

    })

    /* 通过外部的定时器实现（不推荐） */
    /* const vm=new Vue({
        el:"#root",
        data:{
          opacity:1
        },

    })
    setInterval(()=>{
        vm.opacity-=0.01;
        if(vm.opacity<=0) vm.opacity=1;
    },16) */
</script>
```

#### 分析生命周期

生命周期图示：

![](C:\Users\YUYU\Desktop\资料（含课件）\生命周期.png)

**<font color='skblue'>beforeCreate:</font>**

`无法通过vm访问到data中的数据，methods里的方法`

```js
beforeCreate() {
    console.log('beforeCreate');
    console.log(this);//这时的vm身上没有_data
    debugger; //debugger的作用是卡断点
},  
```

![image-20221214212215401](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221214212215401.png)

**<font color='skblue'>Has "template" option?</font>**

1.值为false：el的outerHTML作为template模板

2.值为true：

```js
<div id="root">

</div>
<script>

    new Vue({
        //报错
        // template:`<h2>当前的n值是{{n}}</h2>
        //         <button @click="add">点我n+1</button>`,
        //得有根元素 所以用div来包裹
        //div#root就会消失，root被div替换了
        template:`<div>
                <h2>当前的n值是{{n}}</h2>
                <button @click="add">点我n+1</button>
            </div>`,
        el:"#root",
        data:{
            n:1,
        },
        methods:{
            add() {
                this.n++;
            }
        },
        //初始化生命周期、事件，但是数据代理还未开始
        beforeCreate() {
            console.log('beforeCreate');
            // console.log(this);//这时的vm身上没有_data
            // debugger; //debugger的作用是卡断点
        },  
        //初始化：数据监测、数据代理
        created() {
            console.log('created');
            // console.log(this);
            // debugger;
        },
        beforeMount() {
            console.log('beforeMount');
            // document.querySelector('h2').innerText='哈哈'; //这里对DOM的操作无效
            // console.log(this);
            // debugger;
        },
        mounted() {
            console.log('mounted');
            console.log(this);
            debugger;
        },
    })
</script>
```

**<font color='skblue'>beforeMount：</font>**

`页面显示出来的是未经Vue编译的DOM结构，任何对DOM的操作都无效`

```js
beforeMount() {
    console.log('beforeMount');
    document.querySelector('h2').innerText='哈哈'; //这里对DOM的操作无效
    console.log(this);
    debugger;
},
```

![image-20221214212025255](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221214212025255.png)

**<font color='skblue'>beforeUpdate:</font>**

`beforeUpdate调用了之后，例点击按钮，this.n=2,但是页面上仍显示的是1`

```js
beforeUpdate() {
    console.log('beforeUpdate');
    console.log(this.n);
    debugger;
},
```

![image-20221214230601828](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221214230601828.png)

**<font color='skblue'>vm.$destroy:</font>**

`点击按钮之后，vm已经被销毁，但是vm临死前的成果还在`

```js
<div id="root">
    <h2>当前的n值是{{n}}</h2>
    <button @click="add">点我n+1</button>
    <button @click="bye">点我销毁vm</button>
</div>
<script>

    new Vue({
        el:"#root",
        data:{
            n:1,
        },
        methods:{
            add() {
                this.n++;
            },
            bye() {
                console.log('bye');
                this.$destroy();
            }
        },
        //初始化生命周期、事件，但是数据代理还未开始
        beforeCreate() {
            console.log('beforeCreate');
        },  
        //初始化：数据监测、数据代理
        created() {
            console.log('created');
        },
        beforeMount() {
            console.log('beforeMount');
        },
        mounted() {
            console.log('mounted');
        },
        beforeUpdate() {
            console.log('beforeUpdate');
        },
        updated() {
            console.log('updated');
        },
    })
</script>
```

![image-20221214231654928](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221214231654928.png)

#### 总结生命周期

![image-20221214234956883](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221214234956883.png)

```html
<!-- 
    常用的生命周期钩子：
        1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
        2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
    关于销毁Vue实例
        1.销毁后借助Vue开发者工具看不到任何信息。
        2.销毁后自定义事件会失效，但原生DOM事件依然有效。
        3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。
-->
<div id="root">
    <h2 :style="{opacity}">欢迎学习Vue</h2>
    <button @click="opacity=1">透明度设置为1</button>
    <button @click="stop">停止变换</button>
</div>
<script>
    const vm=new Vue({
        el:"#root",
        data:{
            a:false,
            opacity:1
        },
        methods:{
            stop() {
                // clearInterval(this.timer);
                this.$destroy();
            }
        },
        //mounted为生命周期函数
        // Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted 只调一次，即是在页面刚开始加载出来时
        mounted() {
            console.log('mounted');
            this.timer=setInterval(()=>{
                console.log('setInterval');
                this.opacity-=0.01;
                if(this.opacity<=0) this.opacity=1;
            },16)
        },
        beforeDestroy() {
            console.log('vm即将驾鹤西游');
            clearInterval(this.timer);
        },
    })
</script>
```