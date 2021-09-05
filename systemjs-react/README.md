# react使用systemjs

## 安装相关依赖

```js
yarn add webpack@5.17.0
         webpack-cli@4.4.0 // 报错，要使用webpack-cli@4.5.0版本
         webpack-dev-server@3.11.2
         html-webpack-plugin@4.5.1
         @babel/core@7.12.10
         @babel/cli@7.12.10
         @babel/preset-env@7.12.11
         @babel/preset-react@7.12.10
         babel-loader@8.2.2
```

## 2、页面入口src/index.html 引入相关依赖

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- system模块引入react相关依赖 -->
  <script type="systemjs-importmap">
    {
      "imports":{
        "react": "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js",
        "react-dom": "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
        "react-router-dom": "https://cdn.jsdelivr.net/npm/react-router-dom@5.2.0/umd/react-router-dom.min.js"
      }
    }
  </script>
  <!-- system.js -->
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.0/dist/system.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script>
    System.import("./index.js")
  </script>
</body>
</html>
```

## 3、js入口src/index.js配置

```js
import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";

ReactDom.render(<App/>, document.getElementById('app'))
```

## 4、执行入口src/App.js配置

```js
import React from "react";

export default function App() {
  return (
    <div>welcome use micro loading by react-systemjs</div>
  )
}
```
