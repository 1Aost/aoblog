# fs文件系统模块

#### 1.1什么是fs文件系统模块

<font color='red'>fs模块</font>是Node.js官方提供的，用来<font color='red'>操作文件</font>的模块。它提供了一系列的方法和属性，用于满足用户对文件的操作需求。

例如：

- <font color='skyblue'>fs.readFile()</font>方法，用来<font color='red'>读取</font>指定文件中的内容
- <font color='skyblue'>fs.writeFile()</font>方法，用来向指定的文件中<font color='red'>写入</font>内容

如果要在js代码中，使用fs模块来操作文件，则需要使用如下的方式导入它：

```js
const fs=require('fs');
```

#### 1.2读取指定文件中的内容

##### 1. fs.readFile()语法格式

使用fs.readFile()方法，可以读取指定文件中的内容，语法格式如下:

> **<font color='purple'>fs.readFile(path[, options], callback);</font>**

参数解读:

- 参数1：<font color="red">必选</font>参数，字符串，表示文件的路径
- 参数2：可选参数，表示以什么<font color="red">编码格式</font>来读取文件
- 参数3：<font color="red">必选</font>参数，文件读取完毕后，通过回调函数拿到读取的结果

##### 2. 示例代码

```js
//导入fs模块来操作文件
const fs=require('fs');
//1.参数1：读取文件的存放路径
//2.参数2：读取文件时采用的编码格式，一般默认指定utf8
//3.参数3：回调函数，拿到读取失败和成功的结果，err dataStr
fs.readFile('./files/1.txt','utf8',function (err,dataStr) {
	//2.1打印失败的结果
    //如果读取成功，则err的值为null
    //如果读取失败，则err的值为失败对象 ，dataStr的值为undefined
 	console.log(err); 

  	console.log('-------');
	//2.2打印成功的结果
  	console.log(dataStr);

});
```

##### 3. 判断文件是否读取成功

可以判断err对象是否为null，从而知晓文件读取的结果：

```js
//判断文件是否成功读取
const fs=require('fs');
fs.readFile('./files/1.txt','utf8',function(err,dataStr) {
    if(err) {
        return console.log('读取文件失败'+err.message);
    }
    console.log('读取文件成功' + dataStr);
})
```

#### 1.3向指定的文件中写入内容

##### 1. fs.writeFile()的语法格式

使用fs.writeFile()方法，可以向指定的文件中写入内容，语法格式如下：

> **<font color="purple">fs.writeFile(file, data[, options], callback);</font>**

参数解读:

- 参数1：<font color="red">必选</font>参数，需要指定一个<font color="red">文件路径的字符串</font>，表示文件的存放路径
- 参数2：<font color="red">必选</font>参数，表示要写入的内容
- 参数3：可选参数，表示以什么格式写入文件内容，默认值是utf8
- 参数4：<font color="red">必选</font>参数，文件写入完成后的回调函数

##### 2. fs.writeFile()的示例代码

向指定的文件路径中，写入文件内容：

```js
//1.导入fs文件系统模块
const fs=require('fs');
//2.调用fs.writeFile()方法，写入文件的内容
//参数1：表示文件的存放路径
//参数2：表示要写入的内容
//参数3：回调函数
fs.writeFile('./files/2.txt','abc',function(err) {
    //2.1如果文件写入成功，则err的值等于null
    //2.2如果文件写入失败，则err的值为错误对象
    console.log(err);
})
```

##### 3. 判断文件是否写入成功

可以判断err是否为null，从而知晓文件写入的结果：

```js
//1.导入fs文件系统模块
const fs=require('fs');
//2.调用fs.writeFile()方法，写入文件的内容
fs.writeFile('./files/3.txt','ok',function(err) {
    //如果文件写入成功，则err的值等于null
    //如果文件写入失败，则err的值为错误对象
    if(err) {
        return console.log('文件写入失败'+err.message);
    }
    console.log('文件写入成功');
})
```

#### 1.4成绩整理案例

```js
const fs=require('fs');
fs.readFile('./files/成绩.txt','utf8',function (err,dataStr) {
    if(err) {
        //读取失败
        return console.log('读取失败'+err.message);
    }
    //读取成功
    // console.log('读取成功'+dataStr); //读取成功小红=99 小白=100 小黄=70 小黑=66 小绿=88
    //4.1先把成绩的数据按照空格进行分割
    const arrOld=dataStr.split(' ');
    console.log(arrOld); //[ '小红=99', '小白=100', '小黄=70', '小黑=66', '小绿=88' ]
    //4.2循环分割后的数组，对每一项数据，进行字符串的替换操作
    const arrNew=[];
    arrOld.forEach(item=>{
        arrNew.push(item.replace('=',':'));
    })
    console.log(arrNew); //[ '小红:99', '小白:100', '小黄:70', '小黑:66', '小绿:88' ]
    //4.3把新数组的每一项，进行合并，得到一个新的字符串
    const newStr=arrNew.join('\r\n'); //\r\n代表回车换行
    console.log(newStr);
    //5.写入新文件
    fs.writeFile('./files/成绩-ok.txt',newStr,function (err) {
        if(err) {
            console.log('刺入文件失败'+err.message);
        }
        console.log('成绩写入成功');
    })
})
```

#### 1.5路径动态拼接的问题

在使用fs模块操作文件时，如果提供的操作路径是以 **<font color='lightblue'>./</font>** 或者 <font color='lightblue'>**../ **</font>开头的<font color='red'>相对路径</font>时，很容易出现动态路径拼接错误的问题

原因：代码在运行时，**<font color='red'>会执行node命令所处的目录</font>**，动态拼接出被操作文件的完整路径。

解决方案1：出现路径拼接错误问题解决方法，提供一个完整的文件存放路径（注意为双斜线）

```js
const fs=require('fs');
fs.readFile('E:\\bbh\\Node.js\\files\\1.txt','utf8',function (err,dataStr) {
    if(err) {
        return console.log('读取失败'+err.message);
    }
    console.log('读取文件成功'+dataStr);
})
```

`这种解决方案系执行比较差，且不利于维护`

解决方案2：__dirname表示当前文件所处的目录

```js
const fs=require('fs');
fs.readFile(__dirname+'/files/1.txt','utf8',function (err,dataStr) {
    if(err) {
        return console.log('读取失败'+err.message);
    }
    console.log('读取文件成功'+dataStr);
})
```

