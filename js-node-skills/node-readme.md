# nodejs-skills
nodejs知识点摘要

***
#### 
```
```

***
#### vue 打包 class 语法糖 UglifyJs出错
```
ERROR in activityadmin/js/app.2743900df6cb7b1f8ee5.js from UglifyJs
Unexpected token: name (ImageImport) [./modules/ImageImport
是因为把他放到src外面了，放进去就有编译es6了……

```

***
####  vue 异步加载路由
```
const MyFamily = resolve => require(['../components/my/family'], resolve)
  {
    path: '/my/family',
    component: MyFamily,
    meta: {
      wechatTitle: '我的家庭',
      showMenu: false
    }
  },
```

***
####  npm查看全局安装过的包
```
npm list -g --depth 0

15、npm init：会引导你创建一个package.json文件，包括名称、版本、作者这些信息等

```

***
####  关于淘宝cnpm 安装后cnpm不是内部或外部命令的解决办法
```
基本就是安装的cnpm 和 nodejs 里的npm目录不对
比如我nodejs 安装在 D:\nodejs
cnpm 按照命了 安装到了 C:\Users\Administrator\AppData\Roaming\npm下
则需要将 cnpm\cnpm.cmd和node_modules里的cnpm拷贝到D:\nodejs相关位置
http://blog.csdn.net/fighting_2017/article/details/76979844

这个办法并不是很好，因为其他包入vue-cli 之类的都是需要这样改动，太累了
一了百了的办法：Windows下 修改npm文件安装路径
在nodejs的安装目录中找到node_modules\npm\npmrc文件
修改如下即可：
prefix = D:\nodejs
可以通过 npm root -g：查看全局的包的安装路径

http://blog.csdn.net/zwx_lucky/article/details/51006372
```

***
#### vue-quill-editor 遇到的坑
```
1、前端展示的话需要
import './assets/css/quill.snow.css'
import './assets/css/quill.bubble.css'
import './assets/css/quill.core.css'
并且 文章的container需要添加class ql-editor

2、每次粘贴后会自动跳转到编辑页面顶部  
需要设置editor的高度

.ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 45em;
}

3、打包 class 语法糖 UglifyJs出错
module 需要放在src目录内

```

***
#### async await
```
async 表示 这是一个async函数 ， await只能用在这个函数里面 。
await 表示在这里 等待promise返回结果 了，再继续执行。
await 后面跟着的 应该是一个promise对象 （当然，其他返回值也没关系，只是会立即执行，不过那样就没有意义了..）

捕捉错误
既然 .then(..) 不用写了，那么 .catch(..) 也不用写，可以直接用标准的 try catch 语法捕捉错误。

function p(argument) {
  return new Promise(function(resolve,reject){
    if (true) {
      resolve('succ')
    }else{
      reject(Error('err'))
    }
  });
}

// p().then(function(argument) {
//  console.log(argument,'then');
// })


 const asyncTest=async (argument)=> {
  console.log('asyncTest start ');
  let re=await p()
  console.log('re',re);
  console.log('asyncTest end ');
}

asyncTest()//node --harmony-async-await es6.js

参考
http://www.tuicool.com/articles/QbABJzq

```


***
#### AOP设计一个 log参数和方法名的应用
```
http://www.alloyteam.com/2013/08/yong-aop-gai-shan-javascript-dai-ma/#prettyPhoto
     /**
     * 
     * @author bajian
     * @param params 占用在arguments第一位
     * @return 
     */
     Function.prototype.before = function(func,params) {
            var _this=this //函数本身
            return function(){
                
                if (func.apply(this, [params,arguments])===false) { //若调用了before后返回false则不再执行
                    return false
                }
                return _this.apply(this, arguments) //调用函数本身
            }
        };

        Function.prototype.after = function(func,params){
            var _this=this
            return function(){
                var re=_this.apply(this, arguments)
                if (re===false) {
                    return false;
                }
                func.apply(this, [params,arguments])
                return re;
            }
        }

        Function.prototype.getName = function(){
            return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
        }


var obj={
    'haha':go,
    'haha2':go2,
}

function go(argument) {
    console.log('in go ',arguments);
}


function go2(argument) {
    console.log('in go 2',arguments);
}

for(var i in obj ){
    if (obj.hasOwnProperty(i)) {
        obj[i]=obj[i].before(function(){
            console.log(arguments[0],arguments[1]);
        },obj[i].toString().match(/function\s*([^(]*)\(/)[1])
        obj[i]=obj[i].after(function(){
            console.log(arguments[0],arguments[1]);
        },'after params')
    }
}


```
***
#### 对象数组排序
```
     /**
     * 
     * @author bajian
     * @param  isDesc true/false
     * @param  key the obj key to sort
     * @return 
     */
var sortObjArrByKey=function(objArr,key,isDesc){
  if (isDesc) {
    objArr.sort(function(a,b){return a[key]<b[key]?1:-1});
  }else{
    objArr.sort(function(a,b){return a[key]>b[key]?1:-1});
  }
  return objArr
}
```

***
#### 对象遍历 不含原型属性的方法 或者传统for循环
```
for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }

或者 Object.keys 返回一个数组，数组里是该obj可被枚举的所有属性

Object.keys(animEndEventNames).every((val) => {
    if (el.style[val] !== undefined) {
      animEventName = animEndEventNames[val];
      return false;
    }

    return true;
  });
```

***
#### JavaScript:forEach与every的区别
```
every() 
调用every()并不能改变数组的值，只能检测数组中的每个值是否满足给定的条件。当遍历到某一个值不满足条件时，函数立即返回false，不再继续遍历。当数组中的每一个值都满足给定的条件时，函数返回true。

forEach() 
从头到尾的遍历数组，可以改变数组的值。 
为数组中的每个元素都执行一遍传递给forEach()的回调函数
```

***
#### android jsbridge 同步和异步回调
```
js调用android 
JS 端：
// android bridge：

//同步函数名
//AppExist 退出app
//clearWebviewHistory 清空浏览器history
     /**
     * common sync invoke android native func
     * @author bajian
     * @param  param 统一规定为json字符串通信
     * @return 
     */
bridge.invoke=(funcName,param='')=>{
    try{
       window.jsBridge[funcName](param)
     }catch(e){
       console.error(e)
     }
}

// 异步函数名
// getNativeContacts=(cb)

     /**
     * common async invoke android native func
     * 原理参考至jsonp
     * @author bajian
     * @param  
     * @return 
     */
bridge.asyncInvoke=(funcName,cb,param)=>{
    try{
      var callbackName='ai_'+Math.round(Math.random()*100000000)
       param && window.jsBridge[funcName](callbackName,param)
       param || window.jsBridge[funcName](callbackName)
       window[callbackName]=(json)=>{
        cb(json)
        delete window[callbackName]
       }
     }catch(e){
       console.error(e)
     }
}

调用法：
      bridge.toast('begin getContact')
      bridge.asyncInvoke('getContacts',(json)=>{
        alert(json);
      })
      alert('我没被阻塞哦')

android端：
@JavascriptInterface
            public void clearWebviewHistory(){
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        mWebView.clearHistory();
                    }
                });
            }
            @JavascriptInterface
            public void toast(final String str){
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(MainActivity.this,str,Toast.LENGTH_LONG).show();
                    }
                });
            }

            @JavascriptInterface
            public void getContacts(final String callbackName){
                new Thread(new Runnable() {//异步调用关键点
                    @Override
                    public void run() {
                        try {
                            Thread.sleep(10000);
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    mWebView.loadUrl("javascript: "+callbackName+"('hahaha')");

                                }
                            });
                        } catch (InterruptedException mE) {
                            mE.printStackTrace();
                        }
                    }
                }).start();
            }

android调用js
js：
window.callByJava=function(){
  alert('im am called by android')
}
android：
看上个例子，里面有了。。
```

***
#### 对象数组去重复
```
var arr = [{
    "name": "ZYTX",
    "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    "gender": "AAAAAA.doc"
}, {
    "name": "ZYTA",
    "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    "gender": "BBBBBB.doc"
}, {
    "name": "ZDTX",
    "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    "gender": "CCCCCC.doc"
}, {
    "name": "ZYTX",
    "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    "gender": "AAAAAA.doc"
}];
     /**
     * objArr欲去重对象数组
     * key 去重key
     * @author bajian
     * @param  
     * @return 
     */
     var unique=function(objArr,key){
     var hash={}
      return objArr.reduce(function(item, next) {//previous, current, index, array
      console.log(item, next)
        hash[next[key]] ? '' : hash[next[key]] = true && item.push(next);
        return item
      }, [])
    }
console.log(unique(arr,'name'));

```

***
#### ES6赋值
```
建议：可以多个赋值
var {r=1}={w:2,r:4}
r
4
等效
var q=obj.o||6



'use strict';


var res={data:'bajian',head:1111};

var go=(succ = () => { })=>{
    succ(res);
};

go(({data:list})=>{
    console.log(list);//bajian
});
```

***
#### 微信小程序专区
```
循环中bindtap事件要获得参数的话，用data-XX,js中获取用e.target.dataset.XX
<view class="list" wx:if="{{!showContainer}}">
  <view
    wx:for="{{list}}"
    class="item"
    bindtap="changeMusic"
    wx:key="{{index}}"
    data-musicIndex="{{index}}"
  >
    <image
      src="{{item.picUrl}}"
      alt=""
      data-musicIndex="{{index}}"
    ></image>
    <text
      class="name"
      data-musicIndex="{{index}}"
    >{{item.name}}</text>
    <text
      class="album"
      data-musicIndex="{{index}}"
    >{{item.singer}}-{{item.albumName}}</text>
  </view>

    // 列表音乐函数
  changeMusic: function (e) {
    // 获取歌曲列表详细内容
    var infos = this.data.list[e.target.dataset.musicindex];
    this.setData(infos);
    this.setData({
      showContainer: true,
      input: '',
    });
  },


  小程序跳转页面，传参数及获取方式
wx.navigateTo({
  url: 'test?id=1'
})
//test.js
Page({
  onLoad: function(option){
    console.log(option.query)
  }
})
```

***
##Vue.js专区

#### 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。

#### 不经过计算属性，我们可以通过定义一个method来替代它。对于最终的结果，两种方式确实是相同的。然而，不同的是计算缓存基于它的相关依赖。计算属性只有在它的相关依赖发生改变时才会重新评估。这就意味着如果 message 没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的结果，而不必运行函数。
这也同样意味着如下计算属性将不会更新，因为 Date.now() 并不会被依赖：
更好的想法是使用 computed 属性而不是命令式的 watch 回调

#### 一般来说， v-if 有更高的切换消耗（它会确保条件块在切换当中合适地销毁与重建条件块内的事件监听器和子组件。）而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换 v-show 较好，如果在运行时条件不大可能改变 v-if 较好。

###由于 JavaScript 的限制， Vue 不能检测以下变动的数组：

当你直接设置一个项的索引时, 例如： vm.items[indexOfItem] = newValue
当你修改数组的长度时, 例如： vm.items.length = newLength
为了避免第一种情况, 以下两种方式将达到像 vm.items[indexOfItem] = newValue 的效果， 同时也将触发状态更新:

### v-if vs v-show
v-if 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
相比之下， v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。

#### 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
主要用于保留组件状态或避免重新渲染。

// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
// Array.prototype.splice`
example1.items.splice(indexOfItem, 1, newValue)
避免第二种情况, 使用 splice:

example1.items.splice(newLength)



子组件内调用父组件的方法
if (typeof this.$parent['getSortParam'] == 'function') {
        return this.$parent['getSortParam'].call(this.$parent, this.sortOrder)
      }


初学者常犯的一个错误是使用字面量语法传递数值：
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>
因为它是一个字面量 prop，它的值是字符串 "1" 而不是一个数值。如果想传递一个真正的 JavaScript 数值，则需要使用 v-bind，从而让它的值被当作 JavaScript 表达式计算：
<!-- 传递真正的数值 -->
<comp v-bind:some-prop="1"></comp>


动态组件：
Vue.component('activity-list-custom-actions', ActivityListCustomActions)
<component :is="activity-list-custom-actions" :row-data="item" :row-index="index"></component>

### vue-cli 目录：
change-config.js 放于 build目录
pro脚本 build.js内添加：
shell.config.silent = false
require('./change-config')(1)

dev脚本 dev-server.js内添加：
require('./change-config')()

几个别名位于 webpack.base.conf.js
alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
***
#### vuex 专区
```js
调用 context.commit 提交一个 mutation
actions: {
    increment (context) {
      context.commit('increment')
    }
  }

分发 Action
Action 通过 store.dispatch 方法触发：
store.dispatch('increment')
乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}

在组件中分发 Action
你在组件中使用 this.$store.dispatch('xxx') 分发 action

dispatch 和 commit区别
dispatch 的actions，actions 支持异步操作，mutation不支持
commit 的 mutation

this.article=this.$store.getters.getCurrentArticle


任意组件渲染监听
:render
<tr @dblclick="onRowDoubleClicked(item, $event)" :render="onRowChanged(item)" :class="onRowClass(item, index)">


vue自定义事件不支持冒泡，想让父组件可以监听应该（一般动态组件会用上）：this.$parent.$emit('eventName', params)

getter 传参数
你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

getters: {
  // ...
  getTodoById: (state, getters) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
1、store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
2、
  import { mapGetters } from 'vuex'
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'getCurrentArticle',
      // 'anotherGetter',
      // ...
    ])
  },

  this.article=this.getCurrentArticle
注意！！！！！
getter 里获取的state属性，一定要在store里预先定于了，不然获取不到变化后的值，会一直是原值。。不好找bug：
state: {
    user: null,
    currentArticle: null,
    currentCoupon: null,
  },
``` 


***
#### 获取target
```js
methods: {
  updateMessage: function (e) {
    vuex.actions.updateMessage(e.target.value)
  }
``` 

***
####  发布组件到NPM
```js
http://code.replays.net/201705/87461.html
注意事项：
1、"main": "dist/vue-bajiantoast.min.js",
2、把.gitignore 里的dist/去掉
3、css引用
import Toast from 'vue-bajiantoast'
import 'vue-bajiantoast/dist/vue-bajiantoast.min.css'
Vue.use(Toast)


``` 

***
#### router2.0专区
```js
goTo(to,replace=false){
      if (replace) {
        this.$router.replace(to)
      }else{
        this.$router.push(to)
      }
    },

<router-link tag="a" to="/index/me" replace flex-box="4" class="tab-me">
    <div class="tab-icon"></div>
    <span>我的</span>
  </router-link>

路由参数
path:'/sub_item/:index',
获取：
  this.$route.params.index
``` 


***
#### 值得学习的优化方法
```js

var throttle = function(fn, delay) {
  var now, lastExec, timer, context, args; //eslint-disable-line

  var execute = function() {
    fn.apply(context, args);
    lastExec = now;
  };

  return function() {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (lastExec) {
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};

  var directive = this;
  var element = directive.el;

  directive.scrollEventTarget = getScrollEventTarget(element);
  directive.scrollListener = throttle(doCheck.bind(directive), 200);//优化1
  directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

  var disabledExpr = element.getAttribute('infinite-scroll-disabled');
  var disabled = false;

  if (disabledExpr) {
    this.vm.$watch(disabledExpr, function(value) {
      directive.disabled = value;
      if (!value && directive.immediateCheck) {
        doCheck.call(directive);
      }
    });
    disabled = Boolean(directive.vm.disabledExpr);
  }
  directive.disabled = disabled;//优化2

``` 


***
#### VUE 通过 Object.defineProperty实现MVVM原理
```
参考
https://segmentfault.com/a/1190000004346467

'use strict';
var a= {}
Object.defineProperty(a,"b",{
  set:function(newValue){
    console.log("你要赋值给我,我的新值是"+newValue)
    },
  get:function(){
    console.log("你取我的值")
    return 2 //注意这里，我硬编码返回2
   }
})
a.b =1 //打印 你要赋值给我,我的新值是1
console.log(a.b)    //打印 你取我的值
                    //打印 2    注意这里，和我的硬编码相同的
```

***
#### 一级路由，用于单页切换
```html
  <div id="main">
    <router-view></router-view>
  </div>

  <!-- replace:true不带历史记录，类似AL里的article -->
  <div>
  <div>
    <a href="#" v-link="{path:'/foo',replace:true}">foo</a>
    <a href="#" v-link="{path:'/bar',replace:true}">bar</a>
  </div>
  <router-view></router-view>
  </div>
``` 

***
#### 获取html元素
```js
<div class="swiper-wrap"
             v-el:swiper-wrap
             :style="{'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)'}"
             @transitionend="_onTransitionEnd">
this.slideEls = this.$els.swiperWrap.children;//2.0废弃

尽管有 props 和 events ，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 ref 为子组件指定一个索引 ID 。例如：

#### 尽管在 Vue 中渲染 HTML 很快，不过当组件中包含大量静态内容时, 可以考虑使用 v-once 将渲染结果缓存起来, 就像这样:


```

***
#### vue中使用全局变量
```js
window.slideEls=this.$els.swiperWrap.children;
```

***
#### 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
```
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```


#### 启动pm2管理应用
```javascript
pm2 start pm2.json
```
#### 常用命令
```javascript
$ npm install pm2 -g     # 命令行安装 pm2 
$ pm2 start app.js -i 4  # 后台运行pm2，启动4个app.js 
                         # 也可以把'max' 参数传递给 start
                         # 正确的进程数目依赖于Cpu的核心数目
$ pm2 start app.js --name my-api # 命名进程
$ pm2 list               # 显示所有进程状态
$ pm2 monit              # 监视所有进程
$ pm2 logs               # 显示所有进程日志
$ pm2 stop all           # 停止所有进程
$ pm2 restart all        # 重启所有进程
$ pm2 reload all         # 0 秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0             # 停止指定的进程
$ pm2 restart 0          # 重启指定的进程
$ pm2 startup            # 产生 init 脚本 保持进程活着
$ pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0           # 杀死指定的进程
$ pm2 delete all         # 杀死全部进程
```

```
#### npm安装模块慢解法
```
npm install -g cnpm --registry=https://registry.npm.taobao.org

```


```
Buffer属性和字符串接近
new Buffer([0x4C,0x5D]).toString('hex')
new Buffer([0x4C,0x5D]).equals(new Buffer([0x4C,0x5D]))//true
new Buffer([0x4C,0x5D]).compare(new Buffer([0x4C,0x5D]))//0
Compares buf with target and returns a number indicating whether buf comes before, after, or is the same as target in sort order. Comparison is based on the actual sequence of bytes in each Buffer.

0 is returned if target is the same as buf
1 is returned if target should come before buf when sorted.
-1 is returned if target should come after buf when sorted.

var new_buf=Buffer.concat([remote_data[dev_address].content,data]);
        //buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])

```


***
#### inherited是基与原型的继承，call是基于对象继承，可以获取对象方法
```
var events = require('events');
var util = require('util');

function Pulser(){
    events.EventEmitter.call(this);
}
util.inherits(Pulser, events.EventEmitter);

Pulser.prototype.start = function(){
    var self = this;
    this.id = setInterval(function(){
        util.log('>>>>pulse');
        self.emit('pulse');
        util.log('...pulse');
    }, 1000);
}

var pulser = new Pulser();
pulser.on('pulse', function(){
    util.log('pulse received');
});
pulser.start();

```



***
#### node.js的global variable，和module.exports
```
http://kyfxbl.iteye.com/blog/1961042

```


***
#### 统计一段代码的执行时间
```
console.time('small loop');  
for (var i = 0; i < 100000; i++) {  
    ;  
}  
console.timeEnd('small loop'); 

```

***
#### 闭包的解决方法let
```
    let lis=document.getElementsByTagName('li');
    for (let i = lis.length - 1; i >= 0; i--) {
        // (i=>{
        //  lis[i].addEventListener('click',e=>{
        //      alert(e);
        //  });
        // })(i);
            lis[i].addEventListener('click',e=>{
                alert(i);
            });
    }
```


### thinkJs相关
千万记得在别的模块调用别的model要这么写
      // let k=think.model("admin").getKeywordJoinEvent(1,50)
      let k=think.model("admin", think.config("db"), "admin").getKeywordJoinEvent(1,50)


***
#### 并行处理
```

使用 async/await 来处理异步时，是串行执行的。但很多场景下我们需要并行处理，这样可以大大提高执行效率，此时可以结合 Promise.all 来处理。

export default class extends think.controller.base {
  async indexAction(){
    let p1 = this.getServiceData1();
    let p2 = this.getAPIData2();
    let [p1Data, p2Data] = await Promise.all([p1, p2]);
  }
}
上面的代码 p1 和 p2 是并行处理的，然后用 Promise.all 来获取 2 个数据。这样一方面代码是同步书写的，同时又不失并行处理的性能。

```