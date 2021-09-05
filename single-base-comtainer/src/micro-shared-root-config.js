import { registerApplication, start } from "single-spa";

/**
 * 注册微应用
 * 1、name 微前端应用名称，格式："@组织名称/应用名称"
 * 2、app 通过systemjs应用打包好的微前端应用模块代码（umd）
 * 3、activeWhen 激活路由规则
 */
// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });
// 解决每次/都被匹配到
registerApplication(
  '@single-spa/welcome',
  () => System.import('https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js'),
  location=>location.pathname === '/'
);

registerApplication({
  name: "@micro-shared/single-child-vue",
  app: () =>
    System.import(
      "@micro-shared/single-child-vue"
    ),
  activeWhen: ["/vue"],
});

registerApplication({
  name: "@tech-team/single-child-react",
  app: () =>
    System.import(
      "@tech-team/single-child-react"
    ),
  activeWhen: ["/react"],
});

// registerApplication({
//   name: "@micro-shared/navbar",
//   app: () => System.import("@micro-shared/navbar"),
//   activeWhen: ["/"]
// });

start({
  // 是否使用history.pushState/history.replaceState更改single-spa路由
  urlRerouteOnly: true,
});
