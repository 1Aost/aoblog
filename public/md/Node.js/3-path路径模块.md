# path路径模块

#### 2.1 什么是path路径模块

<font color='red'>path模块</font>是Node.js官方提供的、用来<font color='red'>处理路径</font>的模块，它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

例如：

- <font color='skyblue'>path.join()</font>方法，用来<font color='red'>将多个路径片段拼接成一个完整的路径字符串</font>
- <font color='skyblue'>path.basename()</font>方法，用来从路径字符串中，将文件名解析出来

如果要在js代码中，使用path模块来处理路径，则需要使用如下方式先导入它：

```js
const path=require('path');
```

#### 2.2路径拼接

##### 1.path.join()的语法格式

使用path.join()方法，可以把多个路径片段拼接成完整的路径字符串，语法格式如下：

> **<font color='purple'>path.join([...paths]);</font>**

参数解读：

- ...paths <string>路径片段的序列
- 返回值：<string>

##### 2.代码示例

```js
const path=require('path');
//注意：../会抵消掉前面的路径
const pathStr=path.join('/a','/b/c','../','./d','/e');
console.log(pathStr); //\a\b\d\e
```

注意：<font color='red'>今后凡是涉及到路径拼接的操作，到要使用path.join()方法进行处理</font>,不要直接使用+进行字符串拼接

#### 2.3获取路径中的文件名

##### 1.path.basename()的语法格式

使用path.basename()方法，可以获取路径中的**最后一部分**，经常通过这个方法获取路径中的文件名，语法格式如下：

> **<font color='purple'>path.basename(path[, ext]);</font>**

参数解读：

- path <string>必选参数,表示一个路径的字符串
- ext <string> 可选参数，表示文件扩展名
- 返回值：<string>表示路径中的最后一部分

##### 2.代码示例

```js
const path=require('path');
//定义文件的存放路径 
const fpath='/a/b/c/index.html'
const fullName=path.basename(fpath);
console.log(fullName); //index.html
//不想要扩展名的写法
const nameWithoutExt=path.basename(fpath,'.html');
console.log(nameWithoutExt); //index   
```

#### 2.4获取路径中的文件扩展名

##### 1.path.extname()的语法格式

使用path.extname()方法，可以获取路径中的扩展名部分，语法格式如下：

> **<font color='purple'>path.extname(path);</font>**

参数解读：

- path <string>必选参数,表示一个路径的字符串
- 返回：<string> 返回得到的扩展名字符串

##### 2.代码示例

```js
const path=require('path');
const fpath='./a/b/c/index.html';
const fext=path.extname(fpath);
console.log(fext); //输出：.html
```

#### 2.5综合案例-时钟案例

##### 1.案例实现的步骤：

1. 创建两个正则表达式，分别用来匹配<style>和<script>标签
2. 使用fs模块，读取需要被处理的HTML文件
3. 自定义resolveCSS方法，来写入index.css样式文件
4. 自定义resolveJS方法，来写入index.js脚本文件
5. 自定义resolveHTML方法，来写入index.html文件

##### 步骤1：导入需要的模块并创建正则表达式

```js
//1.1导入fs系统文件模块
const fs=require('fs');
//1.2导入path路径处理模块
const path=require('path');
//1.3匹配<style></style> 标签的正则
//          其中\s表示空白字符；\S表示非空白字符；*表示匹配任意次
const regStyle=/<style>[\s\S]*<\/style>/
//匹配<script></script> 标签的正则
const regScript=/<script>[\s\S]*<\/script>/
```

##### 步骤2：使用fs模块读取需要被处理的html文件

```js
//2.1调用fs.readFile()方法读取文件
fs.readFile(path.join(__dirname,'../素材/index.html'),'utf8',function(err,dataStr) {
    //2.2读取html文件失败
    if(err) return console.log('读取文件失败'+err.message);
    //2.3读取成功后，调用对应的三个方法，分别拆解出css，js，html文件
    
})
```

##### 步骤3：自定义resolveCSS方法

```js
//3.1处理css样式
function resolveCSS(htmlStr) {
    //3.2使用正则提取页面中的<style></style>标签
    const r1=regStyle.exec(htmlStr);
    //3.3将提取出来的样式字符串，进行字符串的replace操作
    const newCSS=r1[0].replace('<style>','').replace('</style>','');
    //3.4调用fs.writeFile()方法，将提取的样式，写入到clock目录中index.css文件里面
    fs.writeFile(path.join(__dirname,'./clock/index.css'),newCSS,function(err) {
        if(err) return console.log('写入样式文件失败'+err.message);
        console.log('写入样式文件成功');
    })
}
```

##### 步骤4：自定义resolveJS方法

```js
//4.1处理js脚本
function resolveJS(htmlStr) {
    //4.2通过正则提取对应的<script></script>标签内容
    const r2=regScript.exec(htmlStr);
    //4.3将提取出来的内容做进一步处理
    const newJS=r2[0].replace('<script>','').replace('</script>','');
    //4.4将处理的结果写到clock目录中的index.js文件中
    fs.writeFile(path.join(__dirname,'./clock/index.js'),newJS,function(err) {
        if(err) return console.log('写入js脚本失败'+err.message);
        console.log('写入js脚本成功');
    })
}
```

##### 步骤5：自定义resolveHTML方法

```js
//5.1处理html文件
function resolveHTML(htmlStr) {
    //5.2将字符串调用replace方法，把内嵌的style和script标签，替换为内联的link和script标签
    const newHTML=htmlStr.replace(regStyle,'<link rel="stylesheet" href="./index.css">/').replace(regScript,'<script src="./index.js"></script>');
    //5.3写入index.html这个文件
    fs.writeFile(path.join(__dirname,'./clock/index.html'),newHTML,function(err) {
        if(err) return console.log('写入html文件失败'+err.message);
        console.log('写入html页面成功');
    })

}
```

##### 2.案例里面的两个注意点：

- fs.writeFile()方法只能用来创建文件，不能用来创建路径
- 重复调用fs.writeFile()写入同一个文件，新写入的内容会**覆盖**之前的旧内容