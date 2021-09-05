import React from "react";

const IBaseModuleHome = React.lazy(()=>import('iBaseModule/home'))
export default function App() {
  return (
    <div>
      <h3>welcome use users application</h3>
      <React.Suspense fallback="loading login">
        {/* 加载组件 */}
        <IBaseModuleHome />
      </React.Suspense>
    </div>
  )
}
