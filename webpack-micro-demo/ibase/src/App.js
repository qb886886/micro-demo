import React from "react";

// 2、异步组件导入
const UsersLogin = React.lazy(()=>import('userModule/login'))
const UsersRegister = React.lazy(()=>import('userModule/register'))

export default function App() {
  return (
    <div>
      <h3>welcome use iBase application</h3>
      {/* 异步组件加载 */}
      <React.Suspense fallback="loading login">
        {/* 加载组件 */}
        <UsersLogin />
        <UsersRegister />
      </React.Suspense>
    </div>
  )
}
