# vue_Template
---
### webpack 命令

```
    webpack   //对项目进行打包
    webpack  --watch  //自动监控文件的改变
    webpack  --display-error-details  //显示详细错误信息
```
1.搭建webpack 初始化项目
```
    webpack init 
    npm 安装 webpack webpack-cli  webpack-dev-server
    npm i html-webpack-plugin -S-D

    npm install mini-css-extract-plugin --save-dev
    npm install css-minimizer-webpack-plugin --save-dev
    npm install --save-dev css-loader
    npm install less less-loader --save-dev
    npm i node-sass sass-loader -D-S
    npm install --save-dev style-loader
    
    npm install --save-dev postcss-loader postcss
    npm i postcss-preset-env -D-S

```
vue模板 持续更新


### 安装babel

npm install -D babel-loader @babel/core @babel/preset-env 

// 代码库
npm i -S core-js

#### 配置




- cross-env是一个跨平台设置环境变量的第三方包，它可以让你只配置一行命令，就能轻松地在多个平台设置环境变量


``` npm install --save-dev cross-env  
```

``` 
    npm install --save @babel/runtime 
    这个转译器的另外一个目的就是为你的代码创建一个沙盒环境。如果你使用了 babel-polyfill，它提供了诸如 Promise，Set 以及 Map 之类的内置插件，这些将污染全局作用域。虽然这对于应用程序或命令行工具来说可能是好事，但如果你的代码打算发布为供其他人使用的库，或你无法完全控制代码运行的环境，则会成为问题
    依赖关系
    npm install --save-dev @babel/cli @babel/core  @babel/preset-env @babel/runtime-corejs3

```


### preload-webpack-plugin 预加载  解决样式等 一闪过
https://blog.csdn.net/vivo_tech/article/details/109485871



