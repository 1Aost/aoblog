##### 如何写好JavaScript？

## 写好JS的一些原则

![image-20230117191137297](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117191137297.png)

### 各司其责

![image-20230117191715746](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117191715746.png)

![image-20230117191836069](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117191836069.png)

#### 版本1

![image-20230117191851413](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117191851413.png)

`缺点：`用JS实现本应该CSS实现的功能

#### 版本2（真正符合各司其责）

![image-20230117214819160](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117214819160.png)

#### 版本3

![image-20230117215601920](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117215601920.png)

#### 总结

![image-20230117215503303](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117215503303.png)

### 组件封装

![image-20230117215826617](C:\Users\YUYU\AppData\Roaming\Typora\typora-user-images\image-20230117215826617.png)

<font color='red'>轮播图-1</font>

##### 结构：HTML

```html
<div id="my-slider" class="slider-list">
  <ul>
    <li class="slider-list__item--selected">
      <img src="https://p5.ssl.qhimg.com/t0119c74624763dd070.png"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg"/>
    </li>
  </ul>
</div>
```

##### 表现：CSS

```css
#my-slider{
  position: relative;
  width: 790px;
}

.slider-list ul{
  list-style-type:none;
  position: relative;
  padding: 0;
  margin: 0;
}

.slider-list__item,
.slider-list__item--selected{
  position: absolute;
  transition: opacity 1s;
  opacity: 0;
  text-align: center;
}

.slider-list__item--selected{
  transition: opacity 1s;
  opacity: 1;
}
```

##### 行为：JS

```js
class Slider{
  constructor(id){
    this.container = document.getElementById(id);
    this.items = this.container
    .querySelectorAll('.slider-list__item, .slider-list__item--selected');
  }
  getSelectedItem(){
    const selected = this.container
      .querySelector('.slider-list__item--selected');
    return selected
  }
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx){
    const selected = this.getSelectedItem();
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    const item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }
  }
  slideNext(){
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious(){
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1)
      % this.items.length;
    this.slideTo(previousIdx);  
  }
}

const slider = new Slider('my-slider');
//2秒slide到下一个
setInterval(()=>{
  slider.slideNext();
},2000)
```

##### 行为：控制流

- 使用自定义事件来解耦

<font color='red'>轮播图-2</font>

- html

```html
<div id="my-slider" class="slider-list">
  <ul>
    <li class="slider-list__item--selected">
      <img src="https://p5.ssl.qhimg.com/t0119c74624763dd070.png"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg"/>
    </li>
  </ul>
  <a class="slide-list__next"></a>
  <a class="slide-list__previous"></a>
  <div class="slide-list__control">
    <span class="slide-list__control-buttons--selected"></span>
    <span class="slide-list__control-buttons"></span>
    <span class="slide-list__control-buttons"></span>
    <span class="slide-list__control-buttons"></span>
  </div>
</div>
```

- css

```css
#my-slider{
  position: relative;
  width: 790px;
  height: 340px;
}

.slider-list ul{
  list-style-type:none;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.slider-list__item,
.slider-list__item--selected{
  position: absolute;
  transition: opacity 1s;
  opacity: 0;
  text-align: center;
}

.slider-list__item--selected{
  transition: opacity 1s;
  opacity: 1;
}

.slide-list__control{
  position: relative;
  display: table;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
  border-radius: 12px;
  bottom: 30px;
  margin: auto;
}

.slide-list__next,
.slide-list__previous{
  display: inline-block;
  position: absolute;
  top: 50%;
  margin-top: -25px;
  width: 30px;
  height:50px;
  text-align: center;
  font-size: 24px;
  line-height: 50px;
  overflow: hidden;
  border: none;
  background: transparent;
  color: white;
  background: rgba(0,0,0,0.2);
  cursor: pointer;
  opacity: 0;
  transition: opacity .5s;
}

.slide-list__previous {
  left: 0;
}

.slide-list__next {
  right: 0;
}

#my-slider:hover .slide-list__previous {
  opacity: 1;
}


#my-slider:hover .slide-list__next {
  opacity: 1;
}

.slide-list__previous:after {
  content: '<';
}

.slide-list__next:after {
  content: '>';
}

.slide-list__control-buttons,
.slide-list__control-buttons--selected{
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: white;
  cursor: pointer;
}

.slide-list__control-buttons--selected {
  background-color: red;
}
```

- JS

```js
class Slider{
  constructor(id, cycle = 3000){
    this.container = document.getElementById(id);
    this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
    this.cycle = cycle;

    const controller = this.container.querySelector('.slide-list__control');
    if(controller){
      const buttons = controller.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
      controller.addEventListener('mouseover', evt=>{
        const idx = Array.from(buttons).indexOf(evt.target);
        if(idx >= 0){
          this.slideTo(idx);
          this.stop();
        }
      });
      
      controller.addEventListener('mouseout', evt=>{
        this.start();
      });
      
      this.container.addEventListener('slide', evt => {
        const idx = evt.detail.index
        const selected = controller.querySelector('.slide-list__control-buttons--selected');
        if(selected) selected.className = 'slide-list__control-buttons';
        buttons[idx].className = 'slide-list__control-buttons--selected';
      })
    }
    
    const previous = this.container.querySelector('.slide-list__previous');
    if(previous){
      previous.addEventListener('click', evt => {
        this.stop();
        this.slidePrevious();
        this.start();
        evt.preventDefault();
      });
    }
    
    const next = this.container.querySelector('.slide-list__next');
    if(next){
      next.addEventListener('click', evt => {
        this.stop();
        this.slideNext();
        this.start();
        evt.preventDefault();
      });
    }
  }
  getSelectedItem(){
    let selected = this.container.querySelector('.slider-list__item--selected');
    return selected
  }
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx){
    let selected = this.getSelectedItem();
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    let item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }
  
    const detail = {index: idx}
    //自定义事件
    const event = new CustomEvent('slide', {bubbles:true, detail})
    this.container.dispatchEvent(event)
  }
  slideNext(){
    let currentIdx = this.getSelectedItemIndex();
    let nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious(){
    let currentIdx = this.getSelectedItemIndex();
    let previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);  
  }
  start(){
    this.stop();
    this._timer = setInterval(()=>this.slideNext(), this.cycle);
  }
  stop(){
    clearInterval(this._timer);
  }
}

const slider = new Slider('my-slider');
slider.start();
```

