<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive" key="keep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" key="nokeep"></router-view>
  </div>
</template>

<script>
import { sessionStorage } from '@/lib/until'
export default {
  name: 'App',
  watch: {
      // 监听路由变化，防止浏览器输入地址，没登录就直接进入页面
      $route: {
        handler: function(val, oldVal){
            if (val.name === 'register' || val.name === 'forgetPassword') {
                return
            }
            if (val.name === 'login') {
                sessionStorage.clear()
            } else {
                if (!sessionStorage.get('hospital_user')) {
                    this.$router.push('/')
                }
            }
        },
        // 深度观察监听
        deep: true
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
html,body {
    width: 100%;
    height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background: #f5f7f9;
}

</style>
