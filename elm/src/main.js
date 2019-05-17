// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './config/rem'
import FastClick from 'fastclick'
import router from './router/index.js'
import store from './store/index.js'

import animated from 'animate.css'
Vue.use(animated)

import echarts from 'echarts'
Vue.prototype.$echarts=echarts

if('addEventListener' in document){
  document.addEventListener('DOMContentLoaded',function(){
    FastClick.attach(document.body);
  },false)
}

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import axios from "axios";
axios.defaults.withCredentials=true;

//axios 请求防治 缓存方案
// axios.create({
//   timeout:5000,
//   withCredentials:true,
//   headers:{
//     'Content-Type':'application/json',
//     'Cache-Control':'no-cache'
//   }
// })
axios.interceptors.request.use(
  config=>{
    if(config.method=='post'){
      config.data={
        ...config.data,
        _t:Date.parse(new Date())/1000
      }
    }else if(config.method=='get'){
      config.params={
        _t:Date.parse(new Date())/1000,
        ...config.params
      }
    }
    return config
  },function(error){
    return Promise.reject(error)
  }
)

Vue.prototype.axios=axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
}).$mount('#app')

// router.beforeEach((to, from, next)=>{
//   var data=store.state.adminInfo
//   if(data.login==true){
//     next()
//   }else{
//     Vue.prototype.$message({
//       type: "warning",
//       message: "你好,你还没有登录"
//     });
//     if(to.path=='/login'){
//       next()
//     }else{
//       next('/login')
//     }
//   }
// })