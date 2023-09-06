# HTTP模块

#### 4.1什么是http模块

<font color='red'>http模块</font>是Node.js官方提供的、用来<font color='red'>创建web服务器</font>的模块，通过http模块提供的<font color='skyblue'>http.creatServer()</font>方法，就能方便地把一台普通的电脑，变成一台Web服务器，从而对外提供web资源服务。

如果要希望使用http模块创建web服务器，则需要先导入它：

> **<font color='purple'>const http=require('http');</font>**

#### 4.2进一步了解http模块的作用

服务器和普通电脑的<font color='red'>区别</font>在于，服务器上安装了<font color='red'>web服务器软件</font>，例如：IIS、Apache等。通过安装这些服务器软件，就能把一台普通的电脑变成一台web服务器.

在Node.js中，我们不需要使用IIS、Apache等这些第三方web服务器软件。因为我们可以基于Node.js提供的http模块，<font color='red'>通过几行简单的代码，就能轻松的手写一个服务器软件</font>，从而对外提供web服务

#### 4.3服务器相关的概念

##### 1.IP地址

<font color='red'>IP地址</font>就是互联网上<font color='red'>每台计算机的唯一地址</font>，因此IP地址具有唯一性。如果把个人电脑比作一台电话，那么IP地址就相当于电话号码，只有在知道对方IP地址的前提下，才能与对应的电脑之间进行数据通信。

IP地址的格式：通常用"<font color='skyblue'>点分十进制</font>"表示成（<font color='red'>a.b.c.d</font>）的形式，其中，a,b,c,d都是0~255之间的十进制整数。例如：用点分十进制表示的IP地址(192.168.1.1)

注意：

- 互联网的每台web服务器，都有自己的IP地址，例如：大家可以在Windows的终端中运行 ping www.baidu.com命令，即可查到百度服务器的IP地址
- 在开发期间，自己的电脑既是一台服务器，也是一个客户端，为了方便测试，可以在自己的浏览器中输入127.0.0.1这个IP地址，就能把自己的电脑当作一台服务器进行访问了

##### 2.域名和域名服务器

尽管IP地址能够唯一的标记网络上的计算机，但IP地址是一长串数字，<font color='skyblue'>不直观</font>，而且<font color='skyblue'>不便于记忆</font>，于是人们又发明了另一套<font color='red'>字符型</font>的<font color='red'>地址方案</font>，即所谓的**<font color='red'>域名地址</font>**.

<font color='skyblue'>IP地址</font>和<font color='skyblue'>域名</font>是<font color='red'>一一对应的关系</font>，这份对应关系存放在一种叫做**<font color='red'>域名服务器</font>**(DNS)的电脑中。使用者只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器实现，因此，**<font color='red'>域名服务器就是提供IP地址和域名之间的转换服务的服务器.</font>**

注意：在开发测试期间，127.0.0.1对应的域名是localhost，他们都代表我们自己的这台电脑，在使用效果上是没有任何区别的

##### 3.端口号

在一台电脑中乐意运行成百上千个web服务，每个web服务都对应一个唯一的端口号，客户端发送雇来的网络请求，通过端口号，可以被准确的交给<font color='red'>对应的web服务</font>进行处理

注意：

- 每个端口号不能同时被多个web服务占用
- 在实际应用中，URL中的<font color='red'>80端口可以被省略</font>

#### 4.4创建最基本的web服务器

##### 1.创建最基本的web服务器的基本步骤

1. 导入http模块
2. 创建web服务器实例
3. 为服务器实例绑定<font color='red'>**request**</font>事件，<font color='skyblue'>**监听客户端的请求**</font>
4. 启动服务器

##### 2.步骤：

- 步骤1-导入http模块

```js
const http=require('http');
```

- 步骤2-创建web服务器实例

调用http.creatServer()方法，即可快速的创建一个web服务器实例

```js
const server=http.creatServer();
```

- 步骤3-为服务器绑定request事件

为服务器绑定request事件，即可监听客户端发送过来的网络请求：

```js
//使用服务器实例的.on()方法，为服务器绑定一个request事件
server.on('request',(req,res)=> {
    //只要有客户端来请求我们自己的服务器，就会触发request事件，从而调用这个事件处理函数
    console.log('Someone visit our web server.');
})
```

- 步骤4-启动服务器

调用服务器实例的.listen()方法，即可启动当前的web服务器实例：

```js
//调用server.listen(端口号，cb回调)方法，即可启动web服务器
server.listen(80,()=> {
    console.log('http server running at http://127.0.0.1');
})
```

##### 3.req请求对象

只要服务器接收到了客户端的请求，就会调用通过<font color='red'>server.on()</font>方法为服务器绑定的<font color='skyblue'>request事件处理函数</font>

如果想在事件处理函数中，<font color='skblue'>访问与客户端相关的数据和属性</font>，可以使用如下的方法：

```js
server.on('request',(req)=>{
    //req是请求对象，它包含了与客户端相关的数据和属性，如：
    //req.url是客户端请求的URL地址
    //req.method是客户端的method请求类型
    const str=`Your request url is ${req.url},and request method is ${req.method}`;
    console.log(str);
})
```

##### 4.res响应对象

在服务器的request事件处理函数中，如果想要<font color='skblue'>访问与服务器相关的属性或数据</font>，可以使用如下的方法：

```js
server.on('request',(req,res)=> {
    //res是响应对象，它包含了与服务器相关的数据和属性，例如：
    //要发送到客户端的字符串
    const str=`You request url is ${url}, and request method is ${method}`;
    //res.end()方法的作用：
    //向客户端发送指定的内容，并结束这次请求的处理过程。
    res.end(str);
});
```

##### 5.解决中文乱码问题

当调用res.end()方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式。

```js
server.on('request',(req,res)=> {
    //发送的内容包含中文
    const str=`您请求的url地址是${req.url},请求的method方式是${req.method}`;
    //为了防止中文乱码的问题，需要设置响应头Content-Type的值为text/html;charset=utf-8
    res.setHeader('Content-Type','text/html;charset=utf-8');
    //把包含中文的内容，响应给客户端
    res.end(str);
});
```

#### 4.5根据不同的url地址响应不同的html内容

##### 1.核心实现步骤

1. 获取<font color='red'>请求的url地址</font>
2. 设置<font color='red'>默认的响应内容</font>为404 Not found
3. 判断用户请求的是否为 <font color='red'>/</font> 或者 <font color='red'>/index.html</font> 首页
4. 判断用户请求的是否为 <font color='red'>/about.html</font> 关于页面
5. 设置<font color='red'>Content-Type响应头</font>，防止中文乱码
6. 使用<font color='red'>rea.end()</font>方法，把内容响应给客户端

##### 2.动态响应内容

```js
server.on('request',(req,res)=>{
    // 1. 获取请求的url地址
    const url=req.url;
    // 2. 设置默认的响应内容为404 Not found
    let content='<h1>404 Not found</h1>';
    // 3. 判断用户请求的是否为 / 或者 /index.html 首页
    if(url==='/' || url==='/index.html') {
        content='<h1>首页</h1>'
    }
    // 4. 判断用户请求的是否为 /about.html 关于页面
    else if(url=='/about.html') {
        content='<h1>这是关于页面</h1>'
    }
    // 5. 设置Content-Type响应头，防止中文乱码
    res.setHeader('Content-Type','text/html;charset=utf-8');
    // 6. 使用rea.end()方法，把内容响应给客户端
    res.end(content); 
})
```

#### 4.6案例-实现clock时钟的web服务器

##### 1.核心思路

把文件的<font color='skblue'>实际存放路径</font>，作为每个资源的请求url地址。

![image-20220810171913983](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20220810171913983.png)

##### 2.实现步骤

1. 导入需要的模块
2. 创建基本的web服务器
3. 将资源的请求url地址映射为文件的存放路径
4. 读取文件内容并响应给客户端
5. 优化资源的请求路径

##### 3.步骤1-导入需要的模块

![image-20220810190331013](E:\Web学习知识总\学习知识\个人项目\aoblog\public\images\node\image-20220810190331013.png)

##### 3.步骤2-创建基本的web服务器

![image-20220810190402498](E:\Web学习知识总\学习知识\个人项目\aoblog\public\images\node\image-20220810190402498.png)

##### 3.步骤3-将资源的请求url地址映射为文件的存放路径

![image-20220810190828725](E:\Web学习知识总\学习知识\个人项目\aoblog\public\images\node\image-20220810190828725.png)

##### 3.步骤4-读取文件的内容并响应给客户端

![image-20220810191042843](E:\Web学习知识总\学习知识\个人项目\aoblog\public\images\node\image-20220810191042843.png)

##### 3.步骤5-优化资源的请求路径

![image-20220810191833918](E:\Web学习知识总\学习知识\个人项目\aoblog\public\images\node\image-20220810191833918.png)