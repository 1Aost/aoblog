# Express

### 1. 初识Express

#### 1.1 Express简介

##### 1. 什么是Express

Express是<font color='red'>基于Node.js平台</font>，快速、开放、极简的<font color='red'>web开发框架</font>。

通俗的理解：Express的作用和Node.js内置的Http模块类似，<font color='red'>是专门用来创建web服务器的</font>。

**<font color='red'>Express的本质</font>**：就是一个npm上的第三方包，提供了快速创建web服务器的便捷方法。

##### 2. 进一步理解express

<font color='red'>思考</font>：不使用 Express 能否创建 Web 服务器？

<font color='skyblue'>答案</font>：能，使用 Node.js 提供的原生 http 模块即可。



<font color='red'>思考</font>：既生瑜何生亮（有了 http 内置模块，为什么还有用 Express）？

<font color='skyblue'>答案</font>：http 内置模块用起来很复杂，开发效率低；Express 是基于内置的 http 模块进一步封装出来的，能够极大的提高开发效率。



<font color='red'>思考</font>：http 内置模块与 Express 是什么关系？

<font color='skyblue'>答案</font>：类似于浏览器中 Web API 和 jQuery 的关系。后者是基于前者进一步封装出来的。

##### 3. Express能做什么

对于前端程序员来说，最常见的<font color='skyblue'>两种</font>服务器，分别是：

- Web 网站服务器：专门对外提供 Web 网页资源的服务器。

- API 接口服务器：专门对外提供 API 接口的服务器。

使用 Express，我们可以方便、快速的创建 <font color='skyblue'>Web 网站</font>的服务器或 <font color='skyblue'>API 接口</font>的服务器。

#### 1.2 Express的基本使用

##### 1. 安装

在项目所处的目录中，运行如下的终端命令，即可将express安装到项目中使用：

`npm i express`

##### 2. 创建基本的Web服务器

![image-20220812215322516](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20220812215322516.png)

##### 3. 监听GET请求

通过**<font color='red'>app.get()</font>**方法，可以监听客户端的GET请求，具体的语法格式如下：

![image-20220812220119520](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20220812220119520.png)

##### 4. 监听post请求

通过**<font color='red'>app.post()</font>**方法，可以监听客户端的POST请求，具体的语法格式如下：

![image-20220812220245475](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20220812220245475.png)

##### 5. 把内容响应给客户端

通过**<font color='red'>res.send()</font>**方法，可以把处理好的内容，发送给客户端：

![image-20220812220441879](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20220812220441879.png)

##### 6. 获取URL中携带的查询参数

通过**<font color='red'>req.query</font>**对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

![image-20220812221256314](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20220812221256314.png)

##### 7. 获取URL中的<font color='red'>动态参数</font>

通过<font color='red'>req.params</font>对象，可以访问到URL中，通过<font color='red'> ：</font> 匹配到的<font color='red'>动态参数</font>：

![image-20220812221918110](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20220812221918110.png)

这里的 :id 是一个动态的参数

多个动态参数时：`'/user/:id/:name'`

#### 1.3 托管静态资源

##### 1. express.static()

express 提供了一个非常好用的函数，叫做 <font color='red'>express.static()</font>，通过它，我们可以非常方便地创建一个<font color='red'>静态资源服务器</font>，例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```js
app.use(express.static('public'))
```

现在，就可以访问public目录下的所有文件了：

http://localhost:3000/images/bg.jpg

http://localhost:3000/css/style.css

http://localhost:3000/js/login.js

**<font color='red'>注意:</font>**Express 在<font color='red'>指定的</font>静态目录中查找文件，并对外提供资源的访问路径。

因此，<font color='red'>存放静态文件的目录名不会出现在 URL 中。</font>

##### 2. 托管多个静态资源目录

如果要托管多个静态资源目录，请多次调用express.static()函数：

![image-20221002150823703](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002150823703.png)

访问静态资源时，express.static()函数会根据目录的添加顺序查找所需的文件

##### 3. 挂载路径前缀

如果希望在托管的<font color='red'>静态资源访问路径</font>之前，<font color='red'>挂载路径前缀</font>，则可以使用如下方法：

![image-20221002153913539](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002153913539.png)

现在，你就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：

http://localhost:3000/public/images/kitten.jpg

http://localhost:3000/public/css/style.css

http://localhost:3000/public/js/app.js

#### 1.4 nodemon

##### 1. 为什么使用nodemon

在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。

现在，我们可以使用 nodemon（https://www.npmjs.com/package/nodemon） 这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。

##### 2. 安装nodemon

在终端中，运行如下命令，即可将 nodemon 安装为全局可用的工具：

![image-20221002154546069](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002154546069.png)

##### 3.  使用nodemon

当基于 Node.js 编写了一个网站应用的时候，传统的方式，是运行 <font color='red'>node app.js</font> 命令，来启动项目。这样做的坏处是：代码被修改之后，需要手动重启项目。

现在，我们可以将 node 命令替换为 nodemon 命令，使用 <font color='red'>nodemon app.js</font> 来启动项目。这样做的好处是：代码被修改之后，会被 nodemon 监听到，从而实现自动重启项目的效果。

![image-20221002154700696](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002154700696.png)

### 2. Express路由

#### 2.1 路由的概念

##### 1. 什么是路由

广义上来讲，路由就是<font color='red'>映射关系</font>

##### 2. Express中的路由

在Express中，路由指的是<font color='red'>客户端的请求</font>与<font color='red'>服务器处理函数</font>之间的<font color='skyblue'>映射关系</font>

Express中的路由分3部分组成，分别是<font color='red'>请求的类型</font>、<font color='red'>请求的url地址</font>、<font color='red'>处理函数</font>，格式如下：

![image-20221002160906244](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002160906244.png)

##### 3. Express中的路由的例子

![image-20221002160914642](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002160914642.png)

##### 4. 路由的匹配过程

每当一个请求到达服务器之后，需要先经过<font color='red'>路由的匹配</font>，只有匹配成功之后，才会调用对应的处理函数。

在匹配时，会按照路由的顺序进行匹配，如果<font color='red'>请求类型</font>和<font color='red'>请求的 URL</font> 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。

![image-20221002161400327](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002161400327.png)

**<font color='green'>路由匹配的注意点 :</font>**

①按照定义的<font color='red'>先后顺序</font>进行匹配

②<font color='red'>请求类型</font>和<font color='red'>请求的URL</font>同时匹配成功，才会调用对应的处理函数

#### 2.2 路由的使用

##### 1. 最简单的使用

在Express中使用路由最简单的方式，就是把路由挂载到app上，示例代码如下：

![image-20221002161736065](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002161736065.png)

##### 2. 模块化路由

为了<font color='skyblue'>方便对路由进行模块化的管理</font>，Express<font color='red'>不建议</font>将路由直接挂载到app上，而是<font color='red'>推荐将路由抽离为单独的模块</font>

将路由抽离为单独的模块的步骤如下：

1. 创建路由模块对应的.js文件
2. 调用<font color='red'>express.Router()</font>函数创建路由对象
3. 向路由对象上挂载具体的路由
4. 使用 <font color='red'>module.exports</font> 向外共享路由对象
5. 使用 <font color='red'>app.use()</font> 函数注册路由模块

##### 3. 创建路由模块

![image-20221002162909817](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002162909817.png)

##### 4. 注册路由模块

![image-20221002163106100](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002163106100.png)

##### 5. 为路由模块添加前缀

类似于托管静态资源时，为静态资源统一挂载访问前缀一样，路由模块添加前缀的方式也非常简单：

![image-20221002164216904](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002164216904.png)

### 3. Express中间件

#### 3.1 中间件的概念

##### 1. 什么是中间件

中间件，特指<font color='skyblue'>业务流程</font>的<font color='red'>中间处理环节</font>

##### 2. Express中间件的调用流程

当一个请求到达Express的服务器之后，可以连续调用多个中间件，从而对这次请求进行<font color='red'>预处理。</font>

![image-20221002165254936](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002165254936.png)

##### 4. Express中间件的格式

Express的中间件，<font color='red'>本质</font>上就是一个**<font color='red'>function处理函数</font>**，Express中间件的格式如下：

#### ![image-20221002165537217](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002165537217.png)

注意：中间件函数的形参列表中，<font color='red'>必须包含next参数</font>，而路由处理函数中只包含req和res

##### 5. next函数的作用

**<font color='red'>next函数</font>**是实现<font color='red'>多个中间件连续调用</font>的关键，它表示把流转关系<font color='red'>转交</font>给下一个<font color='skyblue'>中间件</font>或<font color='skyblue'>路由</font>

![image-20221002170101725](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002170101725.png)

#### 3.2 Express中间件的初体验

##### 1. 定义中间件函数

可以通过如下方式，定义一个最简单的中间件函数：

![image-20221002170311973](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002170311973.png)

##### 2. 全局生效的中间件

客户端发起的<font color='red'>任何请求</font>，到达服务器之后，<font color='red'>都会触发的中间件</font>，叫做全局生效的中间件。

通过调用<font color='red'>app.use(</font><font color='skyblue'>中间件函数</font><font color='red'>)</font>，即可定义一个<font color='red'>全局生效</font>的中间件，示例代码如下：

![image-20221002171447729](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002171447729.png)

##### 3. 定义全局中间件的简化形式

![image-20221002172727602](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002172727602.png)

##### 4. 中间件的作用

多个中间件之间，**<font color='red'>共享同一份</font>** **<font color='skyblue'>req</font>** 和**<font color='skyblue'> res</font>**。基于这样的特性，我们可以在<font color='red'> 上游</font>的中间件中，**统一**为 req 或 res 对象添加自定义的<font color='skyblue'> 属性</font>或<font color='skyblue'> 方法</font>，供<font color='red'> 下游</font>的中间件或路由进行使用。

![image-20221002212657787](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002212657787.png)

##### 5. 定义多个全局中间件

可以使用app.use() <font color='red'>连续定义多个</font>全局中间件，客户端请求到达服务器之后，会按照中间件<font color='red'>定义的先后顺序</font>依次进行调用，示例代码如下：

![image-20221002215829991](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002215829991.png)

##### 6. 局部生效的中间件

<font color='red'>不使用</font><font color='skyblue'>app.use()</font>定义的中间件，叫做<font color='red'>局部生效的中间件</font>，示例代码如下：

![image-20221002220510754](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002220510754.png)

##### 7. 定义多个局部中间件

可以在路由中，通过如下两种<font color='red'>等价</font>的方式，<font color='red'>使用多个局部中间件</font>：

![image-20221002221130788](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002221130788.png)

##### 8. 了解中间件的5个注意事项

1. 一定要在<font color='red'>路由之前</font>注册中间件
2. 客户端发送过来的请求，<font color='red'>可以连续调用多个</font>中间件进行处理
3. 执行完中间件的业务代码之后，<font color='red'>不要忘记调用next()函数</font>
4. 为了<font color='red'>防止代码逻辑混乱</font>，调用next()函数后不要再写额外的代码
5. 连续调用多个中间件时，多个中间件之间，<font color='red'>共享</font>req和res对象

#### 3.3 中间件的分类

常见的中间件用法，分为5大类，分别是：

① <font color='red'>应用级别</font>的中间件

② <font color='red'>路由级别</font>的中间件

③ <font color='red'>错误级别</font>的中间件

④ <font color='red'>Express 内置</font>的中间件

⑤ <font color='red'>第三方</font>的中间件

##### 1. 应用级别中间件

通过<font color='green'>app.use()</font>或<font color='green'>app.get()</font>或<font color='green'>app.post()</font>,<font color='red'>绑定到app实例上的中间件</font>，叫做应用级别的中间件，代码实例如下：

![image-20221002222942939](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002222942939.png)

##### 2. 路由级别的中间件

绑定到<font color='red'>express.Router()</font> 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，<font color='skyblue'>应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上</font>，代码示例如下：

![image-20221002223030441](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002223030441.png)

##### 3. 错误级别的中间件

错误级别中间件的**<font color='red'>作用</font>**：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

**<font color='red'>格式</font>**：错误级别中间件的 function 处理函数中，<font color='red'>必须有 4 个形参</font>，形参顺序从前到后，分别是 (<font color='red'>err</font>, req, res, next)

![image-20221002223519522](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002223519522.png)

**注意**：错误级别中间件，<font color='red'>必须注册在所有路由之后</font>

##### 4. Express内置的中间件

自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

① <font color='red'>express.static</font> 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）

② <font color='red'>express.json</font> 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

③ <font color='red'>express.urlencoded</font> 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

![image-20221002225614058](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002225614058.png)

##### 5. 第三方的中间件

非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以<font color='red'>按需下载</font>并<font color='red'>配置</font>第三方中间件，从而提高项目的开发效率。

例如：在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步骤如下：

①运行 <font color='skyblue'>npm install</font> <font color='red'>body-parser</font> 安装中间件

②使用 <font color='red'>require</font> 导入中间件

③调用 <font color='red'>app.use()</font> 注册并使用中间件

**注意：**Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。

#### 3.4 自定义中间件

##### 1. 需求描述与实现步骤

自己<font color='red'>手动模拟</font>一个类似于express.urlencoded这样的中间件，来<font color='skyblue'>解析POST提交到服务器的表单数据。</font>

实现步骤：

​	①定义中间件

​	②监听 req 的 data 事件

​	③监听 req 的 end 事件

​	④使用 querystring 模块解析请求体数据

​	⑤将解析出来的数据对象挂载为 req.body

​	⑥将自定义中间件封装为模块

##### 2. 定义中间件

使用app.use()类定义全局生效的中间件，代码如下：

![image-20221002235746091](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221002235746091.png)

##### 3. 监听req的data事件

在中间件中，需要监听req对象的data事件，来获取客户端发送到服务器的数据。

如果数据量比较大，无法一次性发送完毕，则客户端会<font color='red'>数据切割后，分批发送到服务器</font>。所以 data 事件可能会触发多次，每一次触发 data 事件时，<font color='skyblue'>获取到数据只是完整数据的一部分</font>，需要手动对接收到的数据进行拼接。

![image-20221003000953388](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003000953388.png)

##### 4. 监听req的end事件

当请求体数据<font color='red'>接收完毕</font>之后，会自动触发 req 的 end 事件。

因此，我们可以在 req 的 end 事件中，<font color='red'>拿到并处理完整的请求体数据</font>。示例代码如下：

![image-20221003001256545](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003001256545.png)

##### 5. 使用querystring模块解析请求体数据

Node.js 内置了一个<font color='red'> querystring</font> 模块，<font color='red'>专门用来处理查询字符串</font>。通过这个模块提供的<font color='red'> parse()</font> 函数，可以轻松把查询字符串，解析成对象的格式。示例代码如下：

![image-20221003001756370](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003001756370.png)

##### 6. 将解析出来的数据对象挂载为req.body

<font color='red'>上游</font>的<font color='skyblue'>中间件</font>和<font color='red'>下游</font>的<font color='skyblue'>中间件及路由</font>之间，**共享同一份** **req** **和** **res**。因此，我们可以将解析出来的数据，挂载为 req 的自定义属性，命名为 <font color='red'>req.body</font>，供下游使用。示例代码如下：

![image-20221003002816298](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003002816298.png)

##### 7. 将自定义中间件封装为模块

为了优化代码的结构，我们可以把自定义的中间件函数，<font color='red'>封装为独立的模块</font>，示例代码如下：

![image-20221003003125992](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003003125992.png)

#### 4. 使用Express写接口

##### 4.1 创建基本的服务器

![image-20221003004027587](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003004027587.png)

##### 4.2 创建API路由模块

![image-20221003004138533](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003004138533.png)

##### 4.3 编写get接口

![image-20221003004712498](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003004712498.png)

##### 4.4 编写post接口

![image-20221003103703169](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003103703169.png)

注意：如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({ extended: false }))

##### 4.5 CORS跨域资源共享

##### 1. 接口的跨域问题

刚才编写的GET和POST接口，存在一个很严重的问题：<font color='red'>不支持跨域请求</font>

解决接口跨域问题的方案主要有两种：

① <font color='red'>CORS</font>（主流的解决方案，<font color='skyblue'>推荐使用</font>）

② <font color='red'>JSONP</font>（有缺陷的解决方案：只支持 GET 请求）

##### 2. 使用cors中间件解决跨域问题

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。

使用步骤分为如下 3 步：

①运行 <font color='skyblue'>npm install cors</font> <font color='red'>安装中间件</font>

②使用 <font color='skyblue'>const cors = require('cors')</font> <font color='red'>导入中间件</font>

③在路由之前<font color='skyblue'>调用 app.use(cors())</font> <font color='red'>配置中间件</font>

##### 3. 什么是CORS

CORS ( 跨域资源共享 ) 由一系列<font color='red'>HTTP响应头</font>组成，**<font color='red'>这些HTTP响应头决定浏览器是否阻止前端JS代码跨域获取资源。</font>**

浏览器的<font color='skyblue'>同源安全策略</font>默认会阻止网页“跨域”获取资源，但如果接口服务器<font color='red'>配置了CORS相关的HTTP响应头</font>，就可以<font color='red'>解除浏览器端的跨域访问限制</font>。

![image-20221003150110012](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003150110012.png)

##### 4. CORS的注意事项

1. CORS主要在<font color='red'>服务器端</font>进行配置，客户端浏览器**<font color='red'>无须做任何额外的配置</font>**，即可请求开启了CORS的接口
2. CORS 在浏览器中<font color='red'>有兼容性</font>。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。

##### 5. CORS响应头部- Access-Control-Allow-Origin

响应头部中可以携带一个Access-Control-Allow-Origin字段，其语法如下：

![image-20221003150539248](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003150539248.png)

其中，origin参数的值指定了<font color='red'>允许访问该资源的外域URL</font>

例如：下面的字段值将**<font color='red'>只允许</font>**来自http://itcaast.cn的请求：

![image-20221003150746568](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003150746568.png)

如果指定了Access-Control-Allow-Origin字段的值为通配符*，表示允许来自任何域的请求，示例代码如下：

![image-20221003150915324](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003150915324.png)

##### 6. CORS响应头部-Access-Control-Allow-Headers

默认情况下，CORS**仅**支持<font color='skyblue'>客户端向服务器</font>发送如下的9个<font color='red'>请求头</font>：

Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

如果客户端向服务器<font color='red'>发送了额外的请求头信息</font>，则需要在<font color='red'>服务器端</font>，通过 Access-Control-Allow-Headers <font color='red'>对额外的请求头进行声明</font>，否则这次请求会失败！

![image-20221003151332968](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003151332968.png)

##### 7. CORS响应头部-Access-Control-Allow-Methods

默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求。

如果客户端希望通过<font color='red'>PUT、DELETE</font>等方式请求服务器的资源，则需要在服务器端，通过Access-Control-Allow-Methods来<font color='red'>指明实际请求所允许使用的HTTP方法</font>。

示例代码如下：

![image-20221003151713371](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003151713371.png)

##### 8. CORS请求的分类

客户端在请求CORS接口时，根据<font color='red'>请求方式</font>和<font color='red'>请求头</font>的不同，可以将CORS的请求分为<font color='red'>两大类</font>，分别是：

1. 简单请求
2. 预检请求

##### 9. 简单请求

同时满足以下两大条件的请求，就属于简单请求：

1. <font color='red'>请求方式</font>：GET、POST、HEAD三者之一
2. <font color='red'>HTTP 头部信息</font>不超过以下几种字段：<font color='skyblue'>无自定义头部字段</font>、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain）

##### 10. 预检请求

只要符合以下任何一个条件的请求，都需要进行预检请求：

① 请求方式为 <font color='skyblue'>GET、POST、HEAD 之外的请求 Method 类型</font>

② 请求头中<font color='skyblue'>包含自定义头部字段</font>

③ 向服务器发送了 <font color='skyblue'>application/json 格式的数据</font>



在浏览器与服务器正式通信之前，浏览器会<font color='red'>先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求</font>，所以这一次的 OPTION 请求称为“预检请求”。<font color='red'>服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。</font>

##### 11.简单请求和预检请求的区别

**简单请求的特点**：客户端与服务器之间<font color='skyblue'>只会发生一次请求</font>。

**预检请求的特点**：客户端与服务器之间会发生两次请求，<font color='skyblue'>OPTION 预检请求成功之后，才会发起真正的请求。</font>

#### 4.6 JSONP接口

##### 1.回顾JSONP的概念与特点

**概念**：浏览器端通过 <script> 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP。

**特点**：

① JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象。

② JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求。

##### 2. 创建JSONP接口的注意事项

如果项目中已经配置了 CORS 跨域资源共享，为了**防止冲突**，必须在配置 CORS 中间件之前声明 JSONP 的接口。否则 JSONP 接口会被处理成开启了 CORS 的接口。示例代码如下：

![image-20221003153712770](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003153712770.png)

##### 3.实现JSONP接口的步骤

①<font color='red'>获取</font>客户端发送过来的<font color='red'>回调函数的名字</font>

②<font color='red'>得到要</font>通过 JSONP 形式<font color='red'>发送给客户端的数据</font>

③根据前两步得到的数据，<font color='red'>拼接出一个函数调用的字符串</font>

④把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析执行

##### 4.实现JSONP接口的具体代码

![image-20221003154248884](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003154248884.png)

##### 5.在网页中使用jQuery发起JSONP请求

调用 $.ajax() 函数，<font color='red'>提供 JSONP 的配置选项</font>，从而发起 JSONP 请求，示例代码如下：

![image-20221003154311231](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20221003154311231.png)

