<template>
    <div class="menu">
        <el-container>
            <el-aside width="320px"><Aside></Aside></el-aside>
            <el-container>
                <el-header><Header></Header></el-header>
                <el-main><keep-alive><router-view></router-view></keep-alive></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from './aside'
import Header from './header'
import { mapMutations } from 'vuex'
export default {
    components:{
        Aside,
        Header,
    },
    data() {
        return{
            
        }
    },
    mounted(){
    },
    methods:{
        ...mapMutations(['getAdminInfo']),
        // getCookie(cookieName) {
        //     var strCookie = document.cookie;
        //     var arrCookie = strCookie.split(";");
        //     for (var i = 0; i < arrCookie.length; i++) {
        //         var arr = arrCookie[i].split("=");
        //         if (cookieName == arr[0]) {
        //         return arr[1];
        //         }
        //     }
        //     return "";
        // },
    },
    beforeRouteEnter(to,from,next){
        //    let isLogin=getCookie('SID')
        //    if(isLogin==true){
        //        next(true)
        //    }else{
        //        next('/login')
        //    }
        next((vm)=>{  //next 函数的参数 vm就是vue实例
            // console.log(vm)
            var data=vm.$store.state.adminInfo
            if(data.login===true){
                next(true);
            }else{
                next('/login')
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.menu{
    width: 100%;
    height: 100%;
    box-sizing: border-box; 
    display: flex; 
    font-size: 14px;
}
  .el-header {
    background-color: #eff2f7;
    color: #333;
    line-height: 60px;
    font-size: 14px;
  }
  .el-main{
    padding: 0;
}
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    width: 16.7% !important;
    line-height: 200px;
  }
  
  .el-main {
    background-color: white;;
    color: #333;
  }
  
  

</style>
