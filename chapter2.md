# 使用 FIS 压缩 CSS/JS

压缩 CSS/JS 代码可降低文件大小，提高页面打开速度。

利用 FIS 可以检测代码修改后自动压缩 CSS/JS，而且配置比 [Gulp](https://github.com/nimojs/gulp-book)/[Grunt](http://www.gruntjs.net/) 更简单。

## 编写代码
新建目录结构如下

/examples/2/src/

```
└─src/
    └── js/
    │   └── a.js
    └── css/
    │    └── a.css
    └── img/
    │    └── a.jpg
    └── fis-conf.js
    └── index.html
```

a.js
```js
var log = function (msg) {
    console.log(msg)
}
log('https://github.com/nimojs/fis-book')
```

a.css
```css
body {
    background: #ABCDEF;
    color: white;
}
a {
    font-weight: bold;
}
p {
    font-weight: bold;
    background: url(../img/a.jpg);
}
```
a.jpg
![a.jpg](https://github.com/nimojs/fis-book/blob/master/examples/2/src/img/a.jpg)

fis-conf.js
```js
// 暂时什么也不用写
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>fis-book chapter2 examples</title>
    <link rel="stylesheet" href="/css/a.css">
</head>
<body>
<img src="/img/a.jpg">
<p>FIS</p>
<a href="https://github.com/nimojs/fis-book">fis-book</a>
<script src="/js/a.js"></script>
</body>
</html>
```

## 启动 FIS

打开命令行使用 cd 命令跳转至 fis-conf.js 文件所在目录。

例如我的 fis-conf.js 文件保存在 `C:\fis-book\examples\2\src\fis-conf.js`

那么就需要在命令行输入

```
cd C:\fis-book\examples\2\src\
```

成功切换目录后输入

```
fis release -w --dest ../dist -o
```
或者
```
fis release --watch --dest ../dist --optimize
```
意思为：fis 发布压缩版本的代码到 ../dist 目录，并启动 watch 命令监听文件的修改，当文件修改后重新发布。

你将会看到命令行出现提示
```
 Ω .... 14ms
 // 发布完成，耗时 14ms
```
尝试修改 `src/css/a.css` 文件将会继续提示

```
 Ω . 3ms
```
这表示 fis 检测到了你的代码修改并重新发布项目


注意：使用 `--watch` 或 `-w`  后你的命令行会进入“运行”状态，此时你不可以在命令行进行其他操作。可通过 Ctrl + C 停止 FIS。(Mac 中使用 `control + C`)


## 依赖于 server

但你会发现 `dist/css/a.css` 中代码是

```
body{background:#ABCDEF;color:#fff}a{font-weight:700}p{font-weight:700;background:url(/dist/img/a.jpg)}
```
<code>background:url(<strong>/dist/img/a.jpg</strong>)</code>

> 为了完成资源引用的MD5化处理，FIS 编译过的代码中都是绝对路径。[大公司里怎样开发和部署前端代码?](https://github.com/fouber/blog/issues/6))。**（暂时不明白可无视，只需知道 FIS 编译过的代码都是绝对路径）**

因为是绝对路径，所以我们需要在本地启动 server 来预览代码。

你可以使用 [fis server](http://fis.baidu.com/docs/api/cli.html#fis server <command> [options])，或使用第三方 server。

### 第三方 server

首先使用 npm 安装 [nodeajax](https://github.com/nimojs/nodeajax)

```
npm install nodeajax -g
```
或
```
npm install nodeajax -g --registry=http://registry.npm.taobao.org/ --disturl=https://npm.taobao.org/dist
```

在 [fis-conf.js](https://github.com/nimojs/fis-book/blob/master/examples/2/src/fis-conf.js) 中增加启动 server 代码

```js
var $ = require('nodeajax');
$.run({
    // 静态资源目录
    static: '../dist/'
})
```

在命令行使用
```
fis release -w --dest ../dist -o
```
启动 fis 和 server

修改 `src/` 目录下的代码和访问 [http://127.0.0.1:18080/index.html](http://127.0.0.1:18080/index.html) 查看效果

