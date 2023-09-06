# day1

### 1：vue-cli脚手架初始化项目

**node+webpack+淘宝镜像**

**node_modules文件夹：**

​	项目依赖文件夹

**public文件夹：**

​	一般放置一些静态资源（图片），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会`原封不动`的打包到dist文件夹中。

**src文件夹（程序员源代码文件夹）：**

​	`assets文件夹：`一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放置在assets文件夹里面静态资源，在webpack打包的时候，webpack会把静态资源当作一个模块打包到js文件里面

​	`components文件夹：`一般放置的是<font color='red'>非路由组件（或全局组件）</font>

​	`App.vue：`唯一的根组件

​	`main.js：`程序的入口文件

​	`babel.config.js`配置文件（babel相关）

​	`package.json文件：`认为项目的 ‘身份证’ ，记录项目叫做什么、项目中有哪些依赖、项目怎么运行

​	`package-lock.json：`缓存性文件

​	`README.md：`项目说明文件

### 2：项目的其他配置

#### 2.1 项目运行起来的时候，浏览器自动打开

---   `package.json`

```js
"scripts": {

  "serve": "vue-cli-service serve --open",

  "build": "vue-cli-service build",

  "lint": "vue-cli-service lint"

 },
```

#### 2.2 eslint校验功能关闭

---   在根目录下，创建vue.config.js

​	比如：声明变量但是没有使用eslint校验工具报错

```js
module.exports={
    //关闭eslint
    lintOnSave:false
}
```

#### 2.3 src文件夹目录的简写方式，配置别名 @

jsconfig.json配置别名@提示【@代表的是src文件夹，这样将来文件过多，找的时候方便很多】

### 3：项目路由分析

前端所谓路由：KV键值对

**<font color='red'>vue-router</font>**

`key：`URL（地址栏中的路径）

`value：`相应的路由组件

**注意：**项目是上中下结构

`路由组件：`

Home首页路由组件、Search路由组件、login登录路由、register注册路由

`非路由组件：`

Header【首页、搜索页】、

Footer【在首页、搜索页】，但是在登录页面、注册页面没有

### 4：完成非路由组件Header与Footer业务

在咱们项目中不再以html和css为主了，主要搞业务、逻辑

`在开发项目的时候：`

> 1.书写静态页面（HTML+CSS）
>
> 2.拆分组件
>
> 3.获取服务器的数据动态显示
>
> 4.完成相应的动态业务逻辑

**注意1：**创建组件的时候，<font color='red'>组件结构+组件的样式+图片资源</font>

**注意2：**咱们项目采用的less样式，浏览器不识别less样式，需要通过less、less-loader进行处理less样式，把less样式变为css样式，浏览器才可以识别.

```js
安装依赖：npm install less-loader@7
```

**注意3：**如果想让组件识别less样式，需要在style标签的身上加上lang="less"

#### 4.1 使用组件的步骤（非路由组件）

- 创建或者定义
- 引入
- 注册
- 使用

### 5：路由组件的搭建

vue-router:

```js
安装依赖：npm install vue-router@3
```

在上面分析的时候，路由组件应该有四个：Home、Search、Login、Register

-- components文件夹：经常放置的是非路由组件（共用全局组件）

-- pages|views文件夹：经常放置<font color='red'>路由组件</font>

#### 5.1 配置路由

项目当中配置的路由一般放置在router文件夹中

#### 5.2 总结

`路由组件与非路由组件的区别：`

1.路由组件一般放置在pages|views文件夹，非路由组件一般放置在components文件夹中

2.路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候，一般是以标签的形式使用

3.注册完路由，不管是路由组件、还是非路由组件身上`都有$route、$router属性`

> $route：一般获取路由信息【路径、query、params等】
>
> $router：一般进行编程式导航进行路由跳转【push|replace】

#### 5.3 路由的跳转

路由的跳转有两种形式：

声明式导航router-link,可以进行路由的跳转

编程式导航push|replace，可以进行路由的跳转

编程式导航：声明式导航能做的，编程式导航都能做，

但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑

### 6：Footer组件显示与隐藏

显示或隐藏组件：v-if | v-show

Footer组件：在Home、Search中显示Footer组件

Footer组件：在登录、注册组件隐藏的

#### 6.1 

我们可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏

#### 6.2

配置路由的时候，可以给路由添加<font color='red'>路由元信息【meta】</font>，路由需要配置对象，它的key不能乱写

### 8：路由传参

#### 8.1 路由的跳转有几种方式？

比如：A->B

声明式导航：router-link（务必要有to属性），可以实现路由的跳转

编程式导航：利用的是组件实例的$router.push | replace方法，可以实现路由的跳转。（可以书写自己的一些业务）

#### 8.2 路由传参，参数有几种写法

<font color='red'>params参数：</font>属于路径当中的一部分，需要注意，在配置路由的时候，需要占位

<font color='red'>query参数：</font>不属于路径当中的一部分，类似于ajax中的queryString     /home?k=v&kv=,不需要占位

```js
//路由传递参数：
//第一种：字符串形式
// this.$router.push('/search/'+this.keyword+"?k="+this.keyword.toUpperCase())
//第二种：模板字符串
// this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)

//第三种：对象
this.$router.push({
    //如果传的是params参数，需要给路由命名
    name:'search',
    params:{
        keyword:this.keyword
    },
    query:{
        k:this.keyword.toUpperCase()
    }
})
```

### 9：路由传参相关面试题

1.路由传递参数（对象写法）path是否可以结合params参数一起使用？

```
答：路由跳转传参的时候，对象的写法可以是name、path形式，但需要注意的是，path这种写法不能与params参数一起使用
```

2.如何指定params参数可传可不传？

```
比如：配置路由的时候，占位了(params参数)，但是路由跳转的时候就不传递。
路径会出现问题

现在是：http://localhost:8080/#/?k=HA
本应至少是：http://localhost:8080/#/search?k=QWE
```

```js
答：在配置路由的时候，在占位的后面加上?
{
    name:'search',
    path:"/search/:keyword?",
    component:Search,
    meta:{show:true}

},
```

3.params参数可以传递也可以不传递，但是如果传递是空串，如何解决？

```js
答：使用undefined解决
this.$router.push({
    //如果传的是params参数，需要给路由命名
    name:'search',
    params:{
        keyword:''||undefined
    },
    query:{
        k:this.keyword.toUpperCase()
    }
})
```

4.路由组件能不能传递props数据？

```js
答：可以，有三种写法
//法一：布尔值写法，只能传递params参数
//在配置路由的时候，
{
    name:'search',
    path:"/search/:keyword?",
    component:Search,
    meta:{show:true},
    //第一种写法：布尔值
    props: true,
},
//在Search组件里面
//接收路由组件传的props参数
props:['keyword']
$route.params.keyword === keyword
//法二：对象写法:额外的给路由组件传递一些props参数
props:{a:1,b:2}
//法三：函数写法，可以把params参数和query参数，通过props传递给路由组件
props(route) {
    return {
        keyword:route.params.keyword,
        k:route.query.k
    }
}
```

# day2

### 1：编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？

![image-20221229142557012](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221229142557012.png)

-- 路由跳转有两种形式：声明式导航和编程式导航

-- `声明式导航没有这样的问题`

#### 1.1 为什么编程式导航进行路由跳转的时候，就会有这种警告？

"vue-router" : "^3.5.3" : 最新的vue-router引入promise

```js
//push方法返回的是Promise对象
function push() {
	return new Promise((resolve,reject)=>{
		
    })
}
```

#### 1.2 通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决。

```js
this.$router.push(
{
    //如果传的是params参数，需要给路由命名
    name:'search',
    params:{
        keyword:this.keyword
    },
    query:{
        k:this.keyword.toUpperCase()
    }
},
//指定两个回调
//成功回调
()=>{

},
//失败回调
()=>{

})
```

这种写法，`治标不治本`，将来在别的组件中push|replace，编程式导航还是有类似错误

#### 1.3 重写push方法

this：当前组件实例（search）

this.$router属性：这个属性是VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router|$route属性

push方法：VueRouter原型对象prototype上的一个方法

```js
function VueRouter() {
    
}
let $router=new VueRouter();
//原型对象的方法
VueRouter.prototype.push=function() {
    
}

$router.push(xxx);
```

在配置路由的时候

```js
//先把VueRouter原型对象的 push | replace 先保存一份
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;

//重写push方法
//第一个参数，告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push=function(location,resolve,reject) {
    // console.log(this);//这里是VueRouter实例
    if(resolve && reject) {
        //因为originPush是一个函数，因为声明的时候是在外部声明的，所以如果直接调的话，默认指向的是window
        // originPush();
        //call|apply区别：相同点：都可以调用函数一次，都可以篡改this一次------不同点：call()传递参数用逗号隔开，apply()传递参数用数组
        originPush.call(this,location,resolve,reject);
    }else {
        originPush.call(this,location,()=>{},()=>{});
    }
}

//重写replace方法
VueRouter.prototype.replace=function(location,resolve,reject) {
    if(resolve && reject) {
        originReplace.call(this,location,resolve,reject);
    }else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}
```

### 2：Home模块组件拆分

-- 先把静态页面完成

-- 拆分出静态组件

-- 获取服务器的数据进行展示

-- 动态业务完成

### 3：三级联动组件完成

--- 由于三级联动在Home当中以及Search和Detail中都出现了，所以注册成全局组件

**全局组件的好处：**只需要注册一次，不需要引入

### 4：完成其余静态组件

HTML+CSS+图片资源-----信息【结构、样式、图片资源】

### 5：POSTMAN测试接口

### 6：axios二次封装

XMLHttpRequest、fetch、JQ、axios

#### 6.1 为什么需要进行二次封装axios？

<font color='red'>请求拦截器、响应拦截器：</font>请求拦截器，可以在发请求之前处理一些业务；响应拦截器，当服务器数据返回以后，可以处理一些事情

#### 6.2 在项目中经常API文件夹【axios】

接口当中：路径都带有/api

```js
//对于axios进行二次封装
//引入axios
import axios from 'axios'
//1:利用axios对象的方法create创建axios实例
//2:requests就是axios
const requests=axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现/api
    baseURL:'/api',
    //代表请求超时的时间:5s
    timeout:5000,
})
//请求拦截器，再发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性（header请求头）很重要
    return config;
})
//响应拦截器：
requests.interceptors.response.use(
    //成功的回调
    (res)=>{
        return res.data;
    },
    //失败的回调
    (error)=>{
        return Promise.reject(new Error('failure'))
    }
)
//对外暴露
export default requests;
```

### 7：接口统一管理

项目很小：完全可以在组建的生命周期函数中发请求

项目很大：axios.get('xxx')

#### 7.1 跨域问题

什么是跨域：协议、域名、端口号不同的请求，称之为跨域

解决跨域问题：配置代理：有两种方式：`1.nginx 2.vue-cli`

**2.vue-cli**

在vue.config.js中，配置项devServer.proxy

```js
//开启代理服务器
devServer: {
    proxy: {
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''}
      },
    }
}
```

### 8: nprogress进度条的使用

首先安装nprogress：

```js
npm i nprogress
```

其次可以在request.js文件中使用，因为这里有请求拦截器和响应拦截器

```js
//引入进度条
import nProgress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
```

这个nProgress身上有`done方法（进度条结束）和start方法（进度条开始）`

```js
nProgress.start();//当请求拦截器捕获到请求的时候，进度条开始动
nProgress.done();//当服务器返回数据成功时，进度条结束
```

如果想要修改进度条的颜色，可以去nprogress.css文件中去修改.bar里面的background.

### 9: vuex状态管理库

#### 9.1 vuex是什么

vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据

```js
npm i vuex@3//安装vuex
```

#### 9.2 vuex的基本使用

在`src/store/index.js`中配置仓库：

```js
import Vue from "vue";
import Vuex from 'vuex';
//需要使用插件一次
Vue.use(Vuex);
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步，没有以上情况可以直接在mutations中进行操作
const actions={
    //这里可以书写业务逻辑，但是不能修改state
    add(context) {
        context.commit('ADD');
    }
    //简写：
    // add({commit}) {
    //     commit('ADD')
    // }
};
//mutations:修改state的唯一手段
const mutations={
    ADD(state) {
        state.count++;
    }
};
//state:仓库，存储数据的地方
const state={
    count:1,
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters={

};
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

需要在入口文件(main.js)中注册仓库

```js
//引入仓库
import store from './store'
new Vue({
  render: h => h(App),
  //注册仓库:组件实例的身上会多一个属性：$store属性
  store

}).$mount('#app')
```

#### 9.3 vuex实现模块式开发

`src/store/search/index.js:`

```js
//search模块的小仓库
const actions={

};
const mutations={

};
const state ={
    b:2
};
const getters={

};
export default {
    state,
    actions,
    mutations,
    getters
}
```

`src/store/home/index.js:`

```js
//home模块的小仓库
const actions={

};
const mutations={

};
const state ={
    a:1
};
const getters={

};
export default {
    state,
    actions,
    mutations,
    getters
}
```

`src/store/index.js:`

```js
import Vue from "vue";
import Vuex from 'vuex';
//需要使用插件一次
Vue.use(Vuex);
//引入小仓库
import home from "./home";
import search from "./search";
export default new Vuex.Store({
    //实现vuex仓库模块是开发存储数据
    modules:{
        home,
        search
    }
})
```

### 10: 完成TypeNav三级联动展示数据业务

```js
computed:{
    ...mapState({
        //右侧需要的是一个函数，当使用这个计算属性的时候，右侧的这个函数会立即执行一次
        //注意一个参数state，其实即为大仓库中的数据
        categoryList:(state)=>{
            return state.home.categoryList;
        }
    })
}
```

# day3

1）完成一级分类动态添加背景颜色<font color='red'>（说实话，直接使用css解决，后面也不会出现卡顿现象，也不用去节流，编程式导航时也不会出现卡顿）</font>

第一种解决方案：利用样式完成

```css
.item:hover {
    background-color: skyblue;
}
```

第二种解决方案：通过js完成

```js
利用index

//鼠标进入修改currentIndex属性
changeIndex(index) {
    // console.log(index);
    this.currentIndex=index;
},
//一级分类鼠标移除的时间回调
leaveIndex() {
    this.currentIndex=-1;
}
```

2）通过JS控制二三级商品分类的显示与隐藏

最开始是通过CSS的样式：display：block|none显示与隐藏二三级商品

通过JS控制：

```html
<div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
```

3）演示卡顿现象

`正常：`事件触发非常频繁，而且每一次触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现**浏览器卡顿**）

**当从上往下一个一个慢慢进入时：**

![image-20230117131907005](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117131907005.png)

**当从上往下快速进入时：**

![image-20230117131955880](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117131955880.png)

4）函数的防抖与节流

`节流：`在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，**把频繁触发变为少量触发**

```js
let span=document.querySelector('span');
let button=document.querySelector('button');
let count=0;
//计数器在1秒以内数字只能加1
button.onclick=_.throttle(function() {
    count++;
    span.innerHTML=count;
},1000)
```

`防抖：`前面的所有的触发都被取消，最后一次在规定的时间之后才会触发，**也就是说如果连续快速的触发 只会执行一次**

```js
//lodash插件：里面封装了函数的防抖与节流的业务[闭包+延迟器]
//1.lodash函数库对外暴露_函数
console.log(_.debounce);
let result=_.debounce(function() {
    console.log('我在1秒之后执行一次');
},1000)
result();
```

```js
let input=document.querySelector('input');
//绑定事件：文本发生变化立即执行
/* input.oninput=function() {
    console.log('ajax发请求');
} */

//当用户输入完毕，在输出'ajax发请求'
input.oninput=_.debounce(function() {
    console.log('ajax发请求');
},1000)
```

🚀**区分**

节流相当于放大招，规定时间内只能放一次大招；而防抖相当于回城，只能在最后一次回城

5）完成三级联动节流的操作

6）三级联动组件的路由跳转与传递参数

三级联动用户可以是点击的：一级分类、二级分类、三级分类。当点击的时候，会从Home模块跳转到Search模块，每一级会把用户选中的产品（产品的名字、产品的ID）在路由跳转的时候，会进行传递

如果使用声明式导航router-link，可以实现路由的跳转和传递参数。

但是需要注意，**会出现卡顿现象**

7）完成三级联动组件的路由跳转与传递参数

```js
//最好解决方案：利用编程式导航加上事件委派
//利用事件委派存在的问题：1.点击的一定是a标签，如何确定？ 2.路由跳转需要传递参数，如何获得？3.如何确定1、2、3级？
//进行路由跳转的方法
goSearch(e) {
    //获取到当前触发这个事件的结点
    // console.log(e.target);
    //dataset属性：可以获取节点的自定义属性（名字全是小写）
    let {categoryname,category1id,category2id,category3id}=e.target.dataset;
    if(categoryname) {
        //整理路由跳转的参数
        let location={name:'search'};
        //传递参数
        let query={categoryName:categoryname};
        //1、2、3级
        if(category1id) {
            query.category1Id=category1id;
        }else if(category2id) {
            query.category2Id=category2id;
        }else {
            query.category3Id=category3id;
        }
        //合并
        location.query=query;
        this.$router.push(location);
    }
}
```

# day4

1）开发Search模块中的TypeNav商品分类菜单（过渡动画效果）

过渡动画的前提：组件或者元素要有v-show|v-if指令才可以过渡动画

2）优化TypeNav组件？

原因：会发很多次请求

```js
mounted() {
    //通知vuex发请求，获取数据，存储到仓库当中
    //派发一个action，获取商品分类的三级列表的数据
    //App组件的mounted只会执行一次，故而将原本放在TypeNav中mounted里的操作放在App中，解决了多次发送请求的问题
    this.$store.dispatch('categoryList');
},
```

3）合并params与query参数

**有bug？？？？？？？？**

4）开发Home首页当中的ListContainer组件与Floor组件

**mock技术**：模拟，如果你想mock数据，需要用到插件`mockjs`

使用步骤：

1.在形目src文件夹中创建文件夹mock

2.准备json数据（mock文件夹中创建相应的JSON文件）---一定要格式化

3.把mock数据需要的图片放到public文件夹中

4.开始mock虚拟数据，通过mockjs模块实现，创建mockServe.js文件

5.mockServe.js文件在入口文件中引入