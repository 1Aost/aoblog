# 使用Vue脚手架

## 初始化脚手架

#### 1. 说明

1. Vue脚手架是Vue官方提供的表转化开发工具（开发平台）
2. 最新的版本是4.x

#### 2. 具体步骤

`第一步（仅第一次执行）：`全局安装@vue/cli。

​						<font color='red'>npm install -g @vue/cli</font>

`第二步：`**切换到你要创建项目的目录**，然后使用命令创建项目

​						<font color='red'>vue create xxxx</font>

`第三步：`启动项目

​						<font color='red'>npm run serve</font>

备注：

1. 如出现下载缓慢请配置 npm 淘宝镜像：npm config set registry https://registry.npm.taobao.org

2. Vue 脚手架隐藏了所有 webpack 相关的配置，若想查看具体的 webpakc 配置，

​                         `请执行：vue inspect > output.js`

#### 3.模板项目的结构

![image-20221215222828487](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221215222828487.png)

## render函数

```js
/* 
    该文件是整个项目的入口文件
*/
//引入Vue
import Vue from 'vue'//引入的是残缺版的Vue(没有模板解析器)
// import Vue from 'vue/dist/vue' //完整版
//引入App组件，它是所有组件的父组件
import App from './App.vue'
//关闭Vue的生产提示
Vue.config.productionTip = false
//创建Vue实例对象--vm
new Vue({
  	el:'#app',
  	//将App组件放入容器（箭头函数的简写形式）
    render: h => h(App),
    // render:h=>h('h1','你好啊'),
    /*  template:`<App></App>`,
    components:{App}, */
})


```

## props