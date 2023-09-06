#### 1. 定义整体结构

```js
//定义构造函数
function Promise(executor) {
    
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    
}
//实现catch方法
Promise.prototype.catch=function(onRejected) {

}
//实现resolve方法
Promise.resolve=function(value) {

}
//实现reject方法
Promise.reject=function(reason) {

}
//实现all方法
Promise.all=function(promises) {

}
//实现race方法
Promise.race=function(promises) {

}
```

#### 2. resolve和reject结构搭建

```js
//定义构造函数
function Promise(executor) {
    //resolve函数
    function resolve(data) {
        
    }
    //reject函数
    function reject(reason) {
        
    }
    //执行器函数同时调用
    executor(resolve,reject);
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    
}
```

#### 3. resolve和reject代码实现

```js
//声明构造函数
function Promise(executor) {
	//添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
    }
    function reject(data) {
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
    }
    //执行器函数同时调用
    executor(resolve,reject);
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    
}
```

#### 4. throw抛出异常改变状态

```js
//定义构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
    }
    function reject(data) {
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
    }
    //执行器函数同时调用
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
    
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    
}
```

#### 5. Promise对象状态只能修改一次

```js
//定义构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        //判断Promise对象的状态是否已经改变过?
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
    }
    function reject(data) {
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
    }
    //执行器函数同时调用
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
    
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    
}
```

#### 6. then方法执行回调

```js
//定义构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        //判断Promise对象的状态是否已经改变过?
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
    }
    function reject(data) {
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
    }
    //执行器函数同时调用
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
    
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    //调用回调函数
    if(this.PromiseState==='fulfilled') {
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState==='rejected') {
        onRejected(this.PromiseResult);
    }
}
```

#### 7. 异步任务回调的执行

```js
//定义构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存回调函数
	this.callback={};
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        //判断Promise对象的状态是否已经改变过?
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
        //执行成功的回调
        if(_this.callback.onResolved) {
            _this.callback.onResolved(data);
        }
    }
    function reject(data) {
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
        //执行回调
        if(_this.callback.onRejected) {
            _this.callback.onRejected(data);
        }
    }
    //执行器函数同时调用
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    //调用回调函数
    if(this.PromiseState==='fulfilled') {
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState==='rejected') {
        onRejected(this.PromiseResult);
    }
    //当执行的是异步任务时
    if(this.PromiseState==='pending') {
        this.callback={
            onResolved,
            onRejected
        }
    }
}
```

#### 8. 指定多个回调的实现

```js
//定义构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存回调函数
	//this.callback={};
    this.callbacks=[];
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        //判断Promise对象的状态是否已经改变过?
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
        //执行成功的回调
        /*if(_this.callback.onResolved) {
            _this.callback.onResolved(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onResolved(data);
        })
    }
    function reject(data) {
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
        //执行回调
        /*if(_this.callback.onRejected) {
            _this.callback.onRejected(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onRejected(data);
        })
    }
    //执行器函数同时调用
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    //调用回调函数
    if(this.PromiseState==='fulfilled') {
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState==='rejected') {
        onRejected(this.PromiseResult);
    }
    //当执行的是异步任务时
    if(this.PromiseState==='pending') {
        /*this.callback={
            onResolved,
            onRejected
        }*/
        this.callbacks.push({
            onResolved,onRejected
        })
    }
}
```

#### 9. 同步修改then方法结果返回

```js
//定义构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存回调函数
	//this.callback={};
    this.callbacks=[];
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        //判断Promise对象的状态是否已经改变过?
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
        //执行成功的回调
        /*if(_this.callback.onResolved) {
            _this.callback.onResolved(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onResolved(data);
        })
    }
    function reject(data) {
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
        //执行回调
        /*if(_this.callback.onRejected) {
            _this.callback.onRejected(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onRejected(data);
        })
    }
    //执行器函数同时调用
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    return new Promise((resolve,reject)=>{
		//调用回调函数
        if(this.PromiseState==='fulfilled') {
            try {
                //获取回调函数执行结果
                let result=onResolved(this.PromiseResult);
                //判断
                if(result instanceof Promise) {
                    result.then(v=>{
                        resolve(v);
                    },r=>{
                        reject(r);
                    })
                }else {
                    //对象的状态为成功
                    resolve(result);
                }
            }catch(e) {
                reject(e);
            }
        }
        if(this.PromiseState==='rejected') {
            onRejected(this.PromiseResult);
        }
        //当执行的是异步任务时
        if(this.PromiseState==='pending') {
            /*this.callback={
                onResolved,
                onRejected
            }*/
            this.callbacks.push({
                onResolved,onRejected
            })
        }
    })
}
```

#### 10. 异步修改then方法结果返回

```js
//定义构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存回调函数
	//this.callback={};
    this.callbacks=[];
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        //判断Promise对象的状态是否已经改变过?
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
        //执行成功的回调
        /*if(_this.callback.onResolved) {
            _this.callback.onResolved(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onResolved(data);
        })
    }
    function reject(data) {
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
        //执行回调
        /*if(_this.callback.onRejected) {
            _this.callback.onRejected(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onRejected(data);
        })
    }
    //执行器函数同时调用
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    const _this=this;
    return new Promise((resolve,reject)=>{
		//调用回调函数
        if(this.PromiseState==='fulfilled') {
            try {
                //获取回调函数执行结果
                let result=onResolved(this.PromiseResult);
                //判断
                if(result instanceof Promise) {
                    result.then(v=>{
                        resolve(v);
                    },r=>{
                        reject(r);
                    })
                }else {
                    //对象的状态为成功
                    resolve(result);
                }
            }catch(e) {
                reject(e);
            }
        }
        if(this.PromiseState==='rejected') {
            onRejected(this.PromiseResult);
        }
        //当执行的是异步任务时
        if(this.PromiseState==='pending') {
            /*this.callback={
                onResolved,
                onRejected
            }*/
            this.callbacks.push({
                onResolved:function() {
                    try {
                        //执行成功的回调函数
                        let result=onResolved(_this.PromiseResult);
                        if(result instanceof Promise) {
                            result.then(v=>{
                                resolve(v);
                            },r=>{
                                reject(r);
                            })
                        }else {
                            resolve(result);
                        }
                    }catch(e) {
                        reject(e);
                    }
                },
                onRejected:function() {
                    try {
                        let result=onRejected(_this.PromiseResult);
                        if(result instanceof Promise) {
                            result.then(v=>{
                                resolve(v);
                            },r=>{
                                reject(r);
                            })
                        }else {
                            resolve(result);
                        }
                    }catch(e) {
                        reject(e);
                    }
                }
            })
        }
    })
}
```

#### 11. then方法完善与优化

```js
//定义构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存回调函数
	//this.callback={};
    this.callbacks=[];
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        //判断Promise对象的状态是否已经改变过?
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
        //执行成功的回调
        /*if(_this.callback.onResolved) {
            _this.callback.onResolved(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onResolved(data);
        })
    }
    function reject(data) {
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
        //执行回调
        /*if(_this.callback.onRejected) {
            _this.callback.onRejected(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onRejected(data);
        })
    }
    //执行器函数同时调用
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    const _this=this;
    return new Promise((resolve,reject)=>{
        function callback(type) {
            try {
                //获取回调函数执行结果
                let result=type(_this.PromiseResult);
                //判断
                if(result instanceof Promise) {
                    result.then(v=>{
                        resolve(v);
                    },r=>{
                        reject(r);
                    })
                }else {
                    //对象的状态为成功
                    resolve(result);
                }
            }catch(e) {
                reject(e);
            }
        }
		//调用回调函数
        if(this.PromiseState==='fulfilled') {
            callback(onResolved);
        }
        if(this.PromiseState==='rejected') {
            callback(onRejected);
        }
        //当执行的是异步任务时
        if(this.PromiseState==='pending') {
            /*this.callback={
                onResolved,
                onRejected
            }*/
            this.callbacks.push({
                onResolved:function() {
                    callback(onResolved);
                },
                onRejected:function() {
                    callback(onRejected);
                }
            })
        }
    })
}
```

#### 12. catch方法与异常穿透、值传递

```js
//定义构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState='pending';
    this.PromiseResult=null;
    //保存回调函数
	//this.callback={};
    this.callbacks=[];
    //保存实例对象的this
    const _this=this;
    function resolve(data) {
    	//改变状态和结果值
        //判断Promise对象的状态是否已经改变过?
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='fulfilled';
        //执行成功的回调
        /*if(_this.callback.onResolved) {
            _this.callback.onResolved(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onResolved(data);
        })
    }
    function reject(data) {
        if(_this.PromiseState!=='pending') return;
        _this.PromiseResult=data;
        _this.PromiseState='rejected';
        //执行回调
        /*if(_this.callback.onRejected) {
            _this.callback.onRejected(data);
        }*/
        
        _this.callbacks.forEach(item=>{
            item.onRejected(data);
        })
    }
    //执行器函数同时调用
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
}
//实现then方法
Promise.prototype.then=function(onResolved,onRejected) {
    const _this=this;
    //判断回调函数参数
    if(typeof onResolved !=='function') {
        onResolved=value=>{
            return value;
        }
    }
    if(typeof onRejected !=='function') {
        onRejected=reason=>{
            throw reason;
        }
    }
    return new Promise((resolve,reject)=>{
        function callback(type) {
            try {
                //获取回调函数执行结果
                let result=type(_this.PromiseResult);
                //判断
                if(result instanceof Promise) {
                    result.then(v=>{
                        resolve(v);
                    },r=>{
                        reject(r);
                    })
                }else {
                    //对象的状态为成功
                    resolve(result);
                }
            }catch(e) {
                reject(e);
            }
        }
		//调用回调函数
        if(this.PromiseState==='fulfilled') {
            callback(onResolved);
        }
        if(this.PromiseState==='rejected') {
            callback(onRejected);
        }
        //当执行的是异步任务时
        if(this.PromiseState==='pending') {
            /*this.callback={
                onResolved,
                onRejected
            }*/
            this.callbacks.push({
                onResolved:function() {
                    callback(onResolved);
                },
                onRejected:function() {
                    callback(onRejected);
                }
            })
        }
    })
}
Promise.prototype.catch=function(onRejected) {
    return this.then(undefined,onRejected);
}
```

#### 13. resolve方法封装

```js
Promise.resolve=function(value) {
    //返回promise对象
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise) {
            value.then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }else {
            resolve(value);
        }
    })
}
```

#### 14. reject方法封装

```js
Promise.reject=function(reason) {
    return new Promise((resolve,reject)=>{
        reject(reason);
    })
}
```

#### 15. all方法封装

```js
Promise.all=function(promises) {
    //返回的结果为Promise对象
    return new Promsie((resolve,reject)=>{
        let count=0;
        let arr=[];
        for(let i=0;i<promises.length;++i) {
            promises[i].then(v=>{
                count++;
                //将当前Promise对象成功的结果存入到数组中去
                arr[i]=v;
                if(count==promises.length) {
                    //修改状态
                    resolve(arr);
                }
            },r=>{
                reject(r);
            })
        }
    })
}
```

#### 16 race方法封装

```js
Promise.race=function(promises) {
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;++i) {
            promises[i].then(v=>{
                //修改返回对象的状态为成功
                resolve(v);
            },r=>{
                //修改返回对象的状态为失败
                reject(r);
            })
        }
    })
}
```

#### 17. 回调函数异步执行

```js

```

