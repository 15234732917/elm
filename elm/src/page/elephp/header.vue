<template>
    <div class="header_container">
        <div class="div">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="'/main'">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="title"><a>{{title}}</a></el-breadcrumb-item>
            <el-breadcrumb-item v-if="name">{{name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row class="block-col-2">
            <el-col :span="12">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <img v-if='this.$store.state.imageUrl' :src="'https://elm.cangdu.org/img/'+this.$store.state.imageUrl" >
                        <img v-else :src="'https://elm.cangdu.org/img/'+this.imageUrl" >
                    </span>
                    <el-dropdown-menu  slot="dropdown">
                        <el-dropdown-item command="a">首页</el-dropdown-item>
                        <el-dropdown-item command="b">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    props:["headTitle","headTit"],
    data(){
        return{
           imageUrl:'',
        //    id:''
        }
    },
    computed:{
        name(){
            return this.$route.meta.name
        },
        title(){
            return this.$route.meta.title
        } 
    },
    mounted(){
        this.axios
        .get('https://elm.cangdu.org/admin/info')
        .then((res)=>{
            // console.log(res)
             this.imageUrl=res.data.data.avatar
        })
    },
    methods:{
         ...mapMutations([
            "saveAdminInfo"
        ]),
        handleCommand(command) {
            if(command=='a'){
                this.$router.push({name:'main'})
            }else if(command=='b'){
                this.axios.get('https://elm.cangdu.org/admin/singout').then((res)=>{
                    // console.log(res)
                    if(res.data.status==1){
                        this.$message({
                            type:'success',
                            message:'退出成功'
                        })
                        this.saveAdminInfo({login:false})
                        this.$router.push({name:'login'})
                    }else{
                        this.$message({
                            type:'error',
                            message:res.message
                        })
                    }
                })
            }
        }
    },
}
</script>

<style lang='scss' scoped>
.el-main{
    padding: 0;
}
.header_container{
    width: 100%;
    height: 60px;
    background-color: #eff2f7;
    color: #333;
    font-size: 14px;
    display:flex;
    justify-content:space-between;
    .div{
        cursor: pointer;
        
    }
    .block-col-2{
        padding-top:10px;
        padding-right: 20px;
        img{
            width:40px;
            height: 40px;
            border-radius:100%;
            outline: none;
            }
    }
}
.el-breadcrumb{
    line-height: 60px;
}
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    border-radius: 50%;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-breadcrumb__inner{
      color: #AEAFD2;
  }
</style>
