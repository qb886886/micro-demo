# 微前端


首次出现时间：2016年

```
微前端介绍（前讲前预览）https://developer.51cto.com/art/202104/658342.htm
框架cdn仓库：https://www.jsdelivr.com/?query=systemjs
```

## 1、微前端是什么

```
https://micro-frontends.org
```

![image-20210904221003874](/Users/wqb/Library/Application Support/typora-user-images/image-20210904221003874.png)

> 与多个可以独立发布的团队，一起构建现代化web应用程序的**技术、策略和方法。**
>
> 把一个大的web应用拆分成多个小的独立块（应用），这些块可以独立的开发、测试、部署；同时可以把这些独立的块组装成一个大的web应用。简单讲：就是多个可独立交付的小应用聚合成一个大web应用的一种**架构风格**（不是技术是风格）我们就称之为微前端脚骨。栗子：搭积木。

栗子：

![image-20210904230523106](/Users/wqb/Library/Application Support/typora-user-images/image-20210904230523106.png)



## 2、微前端解决了什么问题（优点）

1. 小应用独立开发、维护、部署（分治）

   1. 发布速度快、便于维护

2. 以技术无关

   1. 防止技术淘汰后新需求不能使用新技术问题，老技术有不敢动动的尴尬
   2. 大团队技术代码风格不统一
   3. 便于跟上时代（老技术淘汰，新技术引入）
   4. 团队维护成本低，擅长啥就用啥

3. 项目大，代码臃肿，难维护问题

   1. 代码过渡耦合
   2. 解决现代单页面首屏资源加载过大，页面相应慢
   3. 项目大难维护，老项目不敢动等问题

4. 同步更新问题

   > 对比了 npm 包方式抽离，让我们意识到更新流程和效率的重要性。微前端由于是多个子应用的聚合，如果多个业务应用依赖同一个服务应用的功能模块，只需要更新服务应用，其他业务应用就可以立马更新，从而缩短了更新流程和节约了更新成本



## 3、什么场景合适使用微前端（去拿几个项目截图）

1. 拆分巨型应用，使应用变得更加可维护（阿里云/腾讯云/京东/大型后台管理系统）
2. 兼容老应用，实现增量开发（老功能保留，又想新增新内容）

## 4、微前端特点（优点）

1. 独立部署

   > 在目前的单页应用架构中，使用组件构建用户界面，应用中的每个组件或功能开发完成或者 bug 修复完成后，每次都需要对整个产品重新进行构建和发布，任务耗时操作上也比较繁琐。
   >
   > 在使用了微前端架构后，可以将不能的功能模块拆分成独立的应用，此时功能模块就可以单独构建单独发布了，构建时间也会变得非常快，应用发布后不需要更改其他内容应用就会自动更新，这意味着你可以进行频繁地构建发布操作了

2. 增量发布

   > 迁移是一项非常耗时且艰难的任务。比如有一个管理系统使用 AngularJS 开发维护已经有三年时间，但是随时间的推移和团队成员的变更，无论从开发成本还是用人需求上，AngularJS 已经不能满足要求，于是团队想要更新技术栈，想在其他框架中实现新的需求，但是现有项目怎么办?直接迁移是不可能的，在新的框架中完全重写也不太现实。
   >
   > 使用微前端架构就可以解决问题，在保留原有项目的同时，可以完全使用新的框架开发新的需求，然后再使用微前端架构将旧的项目和新的项目进行整合。这样既可以使产品得到更好的用户体验，也可以使团队成员在技术上得到进步，产品开发成本也降到的最低。

3. 团队自治、松耦合代码

   > 因为微前端构架与框架无关，当一个应用由多个团队进行开发时，每个团队都可以使用自己擅长的技术栈进行开发，也就是它允许适当的让团队决策使用哪种技术，从而使团队协作变得不再僵硬。

## 5、微前端架构方案

1. 自由组织模式（很少用，问题多，使用复杂）

   > 通过约定进行互调，但会遇到处理第三方依赖等问题

   ```
   模块化解决方案systemjs  // https://github.com/systemjs/systemjs
   ```

2. 基座模式（使用最多）

   > 通过搭建基座、配置中心来管理子应用

   ```
   阿里的 qiankunjs // https://qiankun.umijs.org/zh/  === Single-Spa
   京东的 micro-app //https://zeroing.jd.com/micro-app/
   百度的 EMP // https://github.com/efoxTeam/emp
   ```



3. 去中心模式（未来模式）

   > 脱离基座模式，每个应用之间都可以彼此分享资源。如基于 Webpack 5 Module Federation 实现的 EMP 微前端方案，可以实现多个应用彼此共享资源分享

   其中，目前值得关注是去中心模式中的 EMP 微前端方案，既可以实现跨技术栈调用，又可以在相同技术栈的应用间深度定制共享资源

## 6、Systemjs 模块化解决方案

```
https://github.com/systemjs/systemjs
```

> 在微前端架构中，微应用被打包为模块，但浏览器不支持模块化，需要使用 systemjs 实现浏览器中的模块化。
>
> systemjs 是一个用于实现模块化的 JavaScript 库，有属于自己的模块化规范。
>
> 在开发阶段我们可以使用 ES 模块规范，然后使用 webpack 将其转换为 systemjs 支持的模块。
>
> 案例：通过 webpack 将 react 应用打包为 systemjs 模块，在通过 systemjs 在浏览器中加载模块。

注意：

1. 版本要求严格
2. 变化大
3. 兼容性差

![image-20210905015128924](/Users/wqb/Library/Application Support/typora-user-images/image-20210905015128924.png)



![image-20210905014652388](/Users/wqb/Library/Application Support/typora-user-images/image-20210905014652388.png)

## 7、微前端框架 single-spa

```
https://zh-hans.single-spa.js.org/
```

![image-20210905015743753](/Users/wqb/Library/Application Support/typora-user-images/image-20210905015743753.png)

![image-20210905020649706](/Users/wqb/Library/Application Support/typora-user-images/image-20210905020649706.png)

> Single-spa是一种实现微前端架构框架

### 7-1、微应用类型

1. Single-spa-application/parcel：微应用
2. Single-spa root config：微应用基座（微应用容器）
3. Utility modules：公共模块应用，非渲染组件，主要用于跨应用共享js逻辑的微应用

### 7-2、使用single-spa

#### 7-2-1、全局安装

```
yarn global add create-single-spa
```

#### 7-2-2、创建应用

```
1、create-single-spa 应用名称
2、select type to generate 选择对应的应用类型
3、选择对应应用配置
```

***创建基座容器***

![image-20210905021738172](/Users/wqb/Library/Application Support/typora-user-images/image-20210905021738172.png)

***创建微服务应用***

![image-20210905025701230](/Users/wqb/Library/Application Support/typora-user-images/image-20210905025701230.png)

***创建公共工具微服务***

![image-20210905123449572](/Users/wqb/Library/Application Support/typora-user-images/image-20210905123449572.png)

***项目信息配置及说明***

![image-20210905022227157](/Users/wqb/Library/Application Support/typora-user-images/image-20210905022227157.png)

主要配置说明：

> Select type to generate single-spa root config // 选择基座模式
>
> Which package manager do you want to use? yarn // 包管理工具
>
> Will this project use Typescript? No // 是否使用Typescript
>
> Would you like to use single-spa Layout Engine No // 是否使用single-spa布局引擎
>
> Organization name (can use letters, numbers, dash or underscore) micro-shared // 团队名字

##### 7-2-2-1、创建基座容器应用 single-base-comtainer

```
create-single-spa single-base-comtainer // 选single-spa root config
```

##### 7-2-2-2、创建基于vue的微应用 single-child-vue

```
create-single-spa single-child-vue // 选single-spa application/parcel
```

##### 7-2-2-3、创建基于react的微应用 single-child-react

```
create-single-spa single-child-react // 选single-spa application/parcel
```

##### 7-2-2-4、创建基于react的公共微应用 single-utils

```
create-single-spa single-utils // 选single-spa in-browser utility module (styleguide, api cache, etc)
```

***启动微应用***

注意微应用的访问地址，需要在主应用中引入

![image-20210905030446785](/Users/wqb/Library/Application Support/typora-user-images/image-20210905030446785.png)

#### 7-2-3、主应用中使用微应用步骤

> 以react微应用为例说明

1、第一步：主应用src/micro-shared-root-config.js中注册微应用

```
...,
registerApplication({
  name: "@tech-team/single-child-react",
  app: () =>
    System.import(
      "@tech-team/single-child-react"
    ),
  activeWhen: ["/react"],
});
...
```

2、第二步：主应用src/index.ejs 配置构建时跳过对应公共依赖打包

```
<script type="systemjs-importmap">
    {
      "imports": {
        ...,
        "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
        "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"
      }
    }
  </script>
```

3、第三步：主应用src/index.ejs新增微应用访问地址

```
<script type="systemjs-importmap">
    {
      "imports": {
        ...,
        "@tech-team/single-child-react": "http://localhost:9966/tech-team-single-child-react.js"
      }
    }
  </script>
```

#### 7-2-4、使用公共微应用

> 这里需要注意的是：公共微应用是不需要注册的，只需要在主应用中引入即可

1、第一步：主应用src/index.ejs中引入公共微应用

```
<script type="systemjs-importmap">
    {
      "imports": {
        ...,
        "@utils-team/utils-team-common": "//localhost:9955/utils-team-utils-team-common.js"
      }
    }
  </script>
```

2、第二步使用公共微应用，主应用和微应用都可以使用

```
import React, { useState, useEffect } from "react";

// 1、自定义公共函数钩子
function useCommonModule(params) {
  const [commonModuleState, setCommonModuleState] = useState()

  useEffect(() => {
    // promise
    System.import('@utils-team/utils-team-common').then(setCommonModuleState)
  }, [])
  return commonModuleState
}
export default function Root(props) {
  let getCommonData = null
  // 2、调用公共方法
  const commonModuleFun = useCommonModule()
  if (commonModuleFun) {
    // 这里一定要先加上判断在使用，否则报错
    getCommonData = commonModuleFun.publicApiFunction('react')
  }
  return <section>{props.name} is mounted!---{getCommonData}</section>;
}
```



#### 7-2-5、修改微应用在主应用中的挂载节点

1、在基座容器src/index.ejs中加入需要插入的节点dom

```
<!DOCTYPE html>
<html lang="en">
<head>
...
</head>
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <main></main>
  <!-- 插入微服务节点 -->
  <div id="react-module"></div>
  ...
</body>
</html>

```

2、在微服务src/tech-team-single-child-react.js中指定插入容器节点

```
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  // 指定插入容器节点，名称需要对应上
  domElementGetter: () => document.getElementById('react-module')
});

export const { bootstrap, mount, unmount } = lifecycles;

```

加演示环节～上个GIF图

## 8、基于【模块联邦 Module Feduration】的微服务架构



![image-20210905180540692](/Users/wqb/Library/Application Support/typora-user-images/image-20210905180540692.png)



### 8-1、创建应用

> 用户应用微服务 users
>
> 基础应用微服务 ibase

1. 初始化

```
yarn init -y
```

2. 安装依赖

```
yarn add @babel/cli@7.12.10 @babel/core@7.12.10 @babel/preset-env@7.12.11 @babel/preset-react@7.12.10 babel-loader@8.2.2 html-webpack-plugin@4.5.1 webpack@5.17.0 webpack-cli@4.5.0 webpack-dev-server@3.11.2 -D

yarn add react react-dom -S
```

3. 创建文件

   1. src/index.js // 打包入口

      ```
      import React from "react";
      import ReactDom from "react-dom";
      import App from "./App.js";

      ReactDom.render(<App/>, document.getElementById('root'))
      ```

   2. src/App.js

      ```
      import React from "react";

      export default function App() {
        return <div>welcome use iBase application</div>
      }
      ```

   3. public/index.html

      ```
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>

      ```

   4. 配置package.json

      ```
      ...
      "scripts": {
          "serve": "webpack serve"
        }
       ...
      ```



4. 配置打包文件 webpack.config.js

```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // development/production/none
  entry: "./src/index.js", // 打包入口
  output: { // 打包出口
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: { // 加载模块
    rules: [
      {
        test: /\.js$/, // 加载js规则
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              preset: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      }
    ]
  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: { // 服务器配置
    contentBase: path.join(__dirname, 'dist'),
    port: 9998,
    open: true
  }
}
```

### 8-2、ibase 中使用users

#### 8-2-1、users应用

导出模块webpack.config.js

```
 ...
const MFP = require('webpack').container.ModuleFederationPlugin

module.exports = {
  ...,
  plugins: [ // 插件
    ...,
    new MFP({
      filename: 'user-login-module.js', // 对外提供导入的文件
      name: 'microTeam', // 微应用名称，类似single-spa中的name组织名称）
      exposes: { // 导出具体文件信息
        './login': './src/login.js' // 格式 名字: 具体组件路径
      }
    })
  ]
}
```

#### 8-2-2、ibase应用

1. 导入模块webpack.config.js

```
...
const MFP = require('webpack').container.ModuleFederationPlugin

module.exports = {
  ...,
  plugins: [ // 插件
    ...,
    new MFP({
      name: 'iBases',
      remotes: {
        userModule: 'microTeam@http://localhost:9998/user-login-module.js'
      }
    })
  ]
}
```

2. 使用导入模块

   ```
   import React from "react";

   // 2、异步组件导入
   const UsersLogin = React.lazy(()=>import('userModule/login'))

   export default function App() {
     return (
       <div>
         <h3>welcome use iBase application</h3>
         {/* 异步组件加载 */}
         <React.Suspense fallback="loading login">
           {/* 加载组件 */}
           <UsersLogin />
         </React.Suspense>
       </div>
     )
   }
   ```

3. 示例

   ibase使用users

   ![image-20210905213457838](/Users/wqb/Library/Application Support/typora-user-images/image-20210905213457838.png)

users使用abase

![image-20210905215028485](/Users/wqb/Library/Application Support/typora-user-images/image-20210905215028485.png)

### 支持的技术栈

![image-20210905025316131](/Users/wqb/Library/Application Support/typora-user-images/image-20210905025316131.png)

报错解决：

1、注册react应用报错

![image-20210905113225330](/Users/wqb/Library/Application Support/typora-user-images/image-20210905113225330.png)

解决：这个报错事因为没有在入口中引入相关react包导致。

```
<script type="systemjs-importmap">
    {
      "imports": {
        ...
        "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
        "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"
      }
    }
  </script>
```
