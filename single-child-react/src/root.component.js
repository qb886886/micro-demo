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
