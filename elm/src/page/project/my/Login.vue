<template>
    <div class="box">
        <head-top :goback="true" :signinUp="false">
            <p slot="search" class="head_logo">密码登录</p>
            <p slot="sear"></p>
        </head-top>
        <div class="content">
            <section>
                <p><input type="text" placeholder="账号" v-model="username"></p>
                <p><input type="password" placeholder="密码" v-model='password'></p>
                <p>
                    <input type="number" placeholder="验证码" v-model="code">
                    <img :src="this.list.code">
                    <span class="span">
                        <span>看不清</span>
                        <span @click="changeCode">换一张</span>
                    </span>
                </p>
                <p>
                    <span>温馨提示：未注册过的账号登录时将自动注册</span>
                    <span>注册过的用户可凭账号密码登录</span>
                </p>
                <p><button @click="login">登录</button></p>
                <p>重置密码？</p>
            </section>
        </div>
        <div class="show" v-show="warn">
            <section class="tip_text_container">
                <div class="tip">
                    <div class="tip_icon">
                        <span></span>
                        <span></span>
                    </div>
                    <p>{{this.warn}}</p>
                </div>
                <button @click="queren">确认</button>
            </section>
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
            list:[],
            warn:'',
            username:'',
            password:'',
            code:'',
        }
    },
    mounted(){
        this.yan()
    },
    methods:{
        yan(){
            this.axios.post('http://elm.cangdu.org/v1/captchas').then((res)=>{
                this.list=res.data
                // console.log(this.list)
            }) 
        },
        //验证码
        changeCode(){
            this.yan()
        },
        //存cookie
        setCookie(name,value,day){
            var exp=new Date();
            exp.setDate(exp.getDate()+day);
            document.cookie=name+'='+escape(value)+';expires='+exp.toGMTString();
        },

        //登录
        login(){
            let username=this.username
            let password=this.password
            let code=this.code
            this.setCookie('cap',code,7)
            let userBool=/^1[3456789]\d{9}$/.test(username);
            let psdBool=/^[0-9]{6,16}$/.test(password)
            let codeBool=/^[0-9]{4}$/.test(code);
            if(!userBool){
                this.warn='手机号格式不正确'
            }else if(!psdBool){
                this.warn='密码格式不正确'
            }else if(!codeBool){
                this.warn='验证码不能为空'
            }else if(!userBool&&!psdBool&&!codeBool){
                this.warn='请输入手机号/邮箱/用户名'
            }
            if(userBool&&psdBool&&codeBool){
                this.warn=''
                let data={username:username,password:password,captcha_code:code}
                this.axios.post('http://elm.cangdu.org/v2/login',data).then((res)=>{
                    if(res.data.status!=0){  
                        this.$store.commit('login',res)
                        this.$router.push({name:'profile'})
                    }else{
                        this.warn=res.data.message
                    }
                    this.yan()
                })
            }
        },
        //错误确认
        queren(){
            this.warn=''
        }
    }
}
</script>

<style lang="scss" scoped>
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
  .content{
        width: 100%;
        flex: 1;
        overflow: auto;
        background: #f3f5f7;
        section{
            margin-top: 0.8rem;
            width: 100%;
            p:nth-of-type(1){
                border-bottom: 1px solid #eeeeee;
                width: 100%;
                input{
                    width: 100%;
                    height: 2.3rem;
                    border: none;
                    outline: none;
                    font-size: 0.8rem;
                    padding-left: 0.8rem;
                }
            }
            p:nth-of-type(2){
                border-bottom: 1px solid #eeeeee;
                width: 100%;
                input{
                    width: 100%;
                    height: 2.3rem;
                    border: none;
                    outline: none;
                    font-size: 0.8rem;
                    padding-left: 0.8rem;
                }
            }
            p:nth-of-type(3){
                border-bottom: 1px solid #eeeeee;
                width: 100%;
                position: relative;
                input{
                    width: 100%;
                    height: 2.3rem;
                    border: none;
                    outline: none;
                    font-size: 0.8rem;
                    padding-left: 0.8rem;
                }
                img{
                    position: absolute;
                    right: 3.2rem;
                    top: 0.4rem;
                }
                .span{
                    position: absolute;
                    right:1rem;
                    top: 0.3rem;
                    span{
                        display: block;
                        font-size: 0.6rem;
                    }
                    span:nth-of-type(2){
                        color: #3792E5;
                    }
                }
            }
            p:nth-of-type(4){
                width: 100%;
                padding: 0.3rem 0.5rem;
                span{
                    display: inline-block;
                    font-size: 0.6rem;
                    color: red;
                }
            }
            p:nth-of-type(5){
                width: 100%;
                text-align: center;
                button{
                    width: 94%;
                    height: 2.3rem;
                    border-radius: 0.2rem;
                    border: none;
                    outline: none;
                    background: #4CD964;
                    color: white;
                    font-size: 0.8rem;
                    line-height: 2rem;
                }
            }
            p:nth-of-type(6){
                width: 100%;
                margin-top: 1rem;
                text-align: right;
                color: #3792E5;
            }
        }

    }
    .show{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .tip_text_container{
            position: absolute;
            width:80%;
            height:50%;
            top:25%;
            left:10%;
            .tip{
                width:100%;
                height:7rem;
                background-color: #fff;
                border-radius: 0.1rem 0.1rem 0 0;
                padding-top: 0.35rem;
                text-align: center;
                p{
                    line-height: 3rem;
                    font-size: 0.8rem;
                    border-bottom: none;
                }
                 .tip_icon{
                    width: 3.5rem;
                    height: 3.5rem;
                    border: 0.2rem solid #f8cb86;
                    border-radius: 50%;
                    margin: 0rem auto;
                    padding-top: 0.1rem;
                    span:nth-of-type(1){
                        display: block;
                        margin: 0.2rem auto;
                        width: 0.2rem;
                        height: 2.1rem;
                        background-color: #f8cb86;
                    }
                    span:nth-of-type(2){
                        display: block;
                        margin: 0.1rem auto;
                        width: 0.2rem;
                        height: 0.2rem;
                        background-color: #f8cb86;
                    }
                }
            }
            button{
                width:100%;
                height:2rem;
                border:none;
                border-radius: 0 0 0.2rem 0.2rem;
                background-color: #4CD964;
                font-size: 0.8rem;
                color:#fff;
                font-weight: bold;
            }
        }
    }
}  
</style>
