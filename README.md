![](logo.png)

#  轻量级浏览器端 ajax 模块设计

**实现原因**:

  &emsp;很多情况下需要一个轻量、有针对性、易用的 ajax 模块

**优点**:

  &emsp;1、易用，基于 Promise

  &emsp;2、轻量（仅不到60行代码）

  &emsp;3、易改造、容易查找问题

  &emsp;4、效率高，省了一些判断逻辑

**缺点**:

  &emsp;1、不会自动解析json等字符串

  &emsp;2、不兼容不支持Promise的浏览器，比如 IE，如果需要兼容，请先引用 [`此 Promise 模块`](https://github.com/oscxc/Promise)

## 获取和引用 osajax

**简单粗暴方式（必须首先提供的方式）**

  [`下载最新版本`](https://github.com/oscxc/osajax/releases) && 使用标签引用

```
<script src="osajax.js"></script>
```

**npm + CommonJS 方式**

```
npm install osajax
```

```
var osajax = require('osajax');
```

## Usage examples

```
osajax.get('/Controller/Action?a=1&b=2').then(function (xhr) {
    console.log(xhr.response);
})
```

```
osajax.get({
    url:'/Controller/Action?a=1&b=2',
    headers:{},
}).then(function (xhr) {
    console.log(xhr.response);
})
```

```
osajax.post({
    url:'/Controller/Action?a=1&b=2',
    headers:{
        Content-Type:'text/plain'
    },
    body:'hello world!'
}).then(function (xhr) {
    console.log(xhr.response);
})
```
## 支持15种请求类型（参考postman）
1、不需要 body 的请求

```
osajax.head
osajax.get
osajax.copy
osajax.purge
osajax.unlock
```


1、可能需要 body 的请求
```
osajax.post
osajax.put
osajax.patch
osajax.delete
osajax.options
osajax.link
osajax.unlink
osajax.lock
osajax.propfind
osajax.view
```


## 联系我们

如有问题，欢迎加入下面QQ群

![](https://oscxc.github.io/Images/doc/contact.jpg)
