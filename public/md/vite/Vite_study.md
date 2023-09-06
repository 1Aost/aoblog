# 什么是构建工具

> 浏览器只认识html，css，js

企业级项目里都可能会具备哪些功能



1. typescript：如果遇到ts文件womenxuyaoshiyongtsc将typescript代码转换为js代码
2. React/Vue：安装react-complier / vue-complier，将我们写的jsx文件或者.vue文件转换为render函数
3. less/sass/postcss/component-style：我们有需要安装less-loader，sass-loader等一系列编译工具
4. 语法降级：babel --> 将es的新语法转换为旧版浏览器可以接受的语法
5. 体积优化：uglifyjs(不维护了，用terser压缩) --> 将我们的代码进行压缩变成体积更小性能更高的文件。
6. ...

稍微改一些东西，就会非常麻烦

将App.tsx  --->  tsc  --->   App.jsx --->  React complier  --->  App.js



> 打包:将我们写的浏览器不认识的代码 交给构建工具进行编译处理的过程就叫打包,打包完成后会给我们一个浏览器可以认识的文件

**构建工具**：

1. 模块化开发支持：支持直接从node_modules中引入代码 + 多种模块化支持
2. 处理代码兼容性：比如babel语法降级，less，ts，语法转换（**不是构建工具做的，构建工具将这些语法对应的处理工具集成进来自动化处理**）
3. 提高项目性能：压缩文件,**代码分割**
4. 优化开发体验 :
   	- 构建工具会帮你自动监听文件的变化,当文件变化以后自动帮你调用对应的集成工具进行重新打包,然后浏览器重新运行(整个过程叫做热更新)
   	- 开发服务器:跨域的问题,用 react-cli   create-react-element   vue-cli   解决跨域的问题