<template>
    <div class="box">
         <head-top :goback="true" :signinUp="false">
            <p slot="search" class="head_logo">账户信息</p>
            <p slot="sear"></p>
        </head-top>
        <div class="setusername_content">
            <div class="setusername_con">
                <input type="text" placeholder='输入用户名' v-model="username" @keyup="changekeyup"/>
                <p v-if="isshow">用户名只能修改一次(5-24字符之间)</p>
                <p v-else class="p">{{this.keyusername}}</p>
                <button @click='update'>确认修改</button>      
            </div>
        </div>
    </div>
</template>

<script>
import HeadTop from "../../../components/header/head";
export default {
    components: {
        HeadTop,
    },
    data(){
        return{
            username:'',
            isshow:true,
            keyusername:''
        }
    },
    methods:{
        changekeyup(){
            let inp=/^[\u4e00-\u9fa5A-Z0-9]{5,24}$/.test(this.username)
            if(!inp){
                this.isshow=false
                this.keyusername='用户名长度在5-24位之间'
            }else{
                this.isshow=true
                this.keyusername=''
            }
        },
        update(){
            if(this.username.length>4){
                this.$store.commit('update',this.username)
                this.$router.push({name:'profile/info'})
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    header {
        p {
            font-size: 1rem;
            color: white;
            font-weight: bold;
            padding-right: 0.8rem;
        }
    }
    .setusername_content{
        flex: 1;
        overflow: auto;
        background: #f7f7f7;
        .setusername_con{
            width: 100%;
            input{
                margin-top: 0.6rem;
                width: 94%;
                height: 2rem;
                margin-left: 3%;
                padding-left: 0.2rem;
                border: none;
                background: #f7f7f7;
                border: 1px solid #cccccc;
            }
            p{
                margin: 0;
                font-size: 0.1rem;
                padding: 0.3rem 0.5rem;
            }
            .p{
                margin: 0;
                font-size: 0.1rem;
                padding: 0.3rem 0.5rem;
                color: red;
            }
            button{
                margin-top: 0.8rem; 
                width: 94%;
                margin-left: 3%;
                height: 2rem;
                border: none;
                outline: none;
                background: #3792E5;
                color: #f3f3f3;
                font-size: 0.3rem;
            }
        }
    }
}    
</style>
