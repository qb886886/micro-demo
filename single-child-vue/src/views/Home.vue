<template>
  <div class="home">
    <button @click="getCommonInfo">获取公共模块信息</button>
    公共模块信息：{{commonMsg}}
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      commonMsg: null
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    /**
     * vue使用公共模块微服务
     * 因为是异步的，所以这里需要使用async/await
     */
    async getCommonInfo () {
      const useCommonModule = await window.System.import('@utils-team/utils-team-common')
      const commonModuleInfo = useCommonModule.publicApiFunction('vue')

      this.commonMsg = commonModuleInfo
    }
  }
}
</script>
