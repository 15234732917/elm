<template>
    <div class="box">
        <head-top :goback="true" :signinUp="false">
            <p slot="search" class="head_logo">账户信息</p>
            <p slot="sear"></p>
        </head-top>
        <div class="info_content">
            <div class="info_one">
                <p>
                    <span>头像</span>
                    <span>
                        <img :src="this.file" v-if="file.length>0">
                        <img :src="'http://elm.cangdu.org/img/'+this.data.avatar" v-else>
                        <!-- <i class="fa fa-angle-right" /> -->
                    </span>
                    <input type="file" accept="image/jpeg, image/jpg, image/png" @change="handFile" />  
                </p>
                <p>
                    <span @click="setusername">用户名</span>
                    <span v-if="this.$store.state.username">{{this.$store.state.username}}<i class="fa fa-angle-right" /></span>
                    <span v-else>{{this.data.username}}<i class="fa fa-angle-right" /></span>
                </p>
                 <p>
                    <span @click="address">收货地址</span>
                    <span><i class="fa fa-angle-right" /></span>
                </p>
            </div>
            <div class="info_two">
                账号绑定
            </div>
            <div class="info_three">
                <p>
                    <span @click="phone">手机</span>
                    <span><i class="fa fa-angle-right" /></span>
                </p>
            </div>
            <div class="info_two">
                安全设置
            </div>
            <div class="info_four">
                <p>
                    <span @click="forget">登录密码</span>
                    <span>修改<i class="fa fa-angle-right" /></span>
                </p>
            </div>
            <div class="info_five">
                <button @click="esc">退出登录</button>
            </div>
            <div class="info_alert" v-show='show'>
                <section class="tip_text_container">
                    <div class="tip">
                        <div class="tip_icon">
                            <span></span>
                            <span></span>
                        </div>
                        <p>是否退出登录</p>
                    </div>
                    <p>
                        <button @click="wait">再等等</button>
                        <button @click="back">退出登录</button>
                    </p>
                </section>
            </div>
            <div class="info_show" v-show="warn">
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
            data:[],
            show:false,
            file:'',
            isshow:true,
            warn:'',
        }
    },
    mounted(){
        let user_id=localStorage.getItem('vuex')
        this.axios.get('http://elm.cangdu.org/v1/user?user_id='+user_id).then((res)=>{
            this.data=res.data
        }) 
    },
    methods:{
        esc(){
            this.show=true
        },
        wait(){
            this.show=false
        },
        back(){
           this.axios.get('http://elm.cangdu.org/v2/signout').then((res)=>{
               if(res.data.status==1){
                   console.log('退出成功')
               }
           })
           localStorage.removeItem('vuex')
           this.$router.push({name:'profile'})
        },
        handFile(e){
            e.preventDefault()//阻止浏览器进行 默认行为
            let $target = e.target || e.srcElement;
            let file = $target.files[0];
            // console.log(file.name)
            var reader = new FileReader();
            reader.onload = data => {
                let res = data.target || data.srcElement;
                this.file = res.result;
            }
            let formData = new FormData(); 
            formData.append('file', file);  
            const instance=this.axios.create({
                withCredentials: true
                // 需要设置 withCredentials：true , 表示跨域请求时是否需要使用凭证. 默认为false
            }) 
            let user_id=localStorage.getItem('vuex')
            instance.post('http://elm.cangdu.org/eus/v1/users/'+user_id+'/avatar',formData)
            .then(res => {
                // console.log(res)
            })
            reader.readAsDataURL(file);
        },
        setusername(){
            this.$router.push({name:'profile/info/setusername'})
        },
        address(){
            this.$router.push({name:'profile/info/address'})
        },
        forget(){
            this.$router.push({name:'forget'})
        },
        phone(){
            this.warn='请在手机APP中设置'
        },
        queren(){
            this.warn=''
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
    .info_content{ 
        flex:1;
        overflow: auto;
        background: #f7f7f7;
        .info_one{
            margin-top: 0.6rem;
            background: white;
            p{
                padding: 0.5rem 0.6rem;
                border-bottom: 1px solid #cccccc;
                display: flex;
                justify-content: space-between;
            }
            p:nth-of-type(1){
                border-top: 1px solid #cccccc;
                position: relative;
                span:nth-of-type(1){
                    font-size: 0.7rem;
                     line-height: 2.5rem;
                }
                span:nth-of-type(2){
                    font-size: 0.6rem;
                    img{
                        width: 2.5rem;
                        height: 2.5rem;
                        border-radius: 50%;
                    }  
                }
                input{
                    position: absolute;
                    top:1rem;
                    right:0.8rem;
                    width:  3rem;
                    height: 2rem;
                    display: block;
                    opacity: 0;
                    border-radius: 50%; 
                }
            }
            p:nth-of-type(2){
                span:nth-of-type(1){
                    font-size: 0.7rem
                }
                span:nth-of-type(2){
                    font-size: 0.7rem;
                    i{
                        font-size: 1rem;
                        color: gray;
                        padding-left: 0.3rem;
                    }
                }
            }
            p:nth-of-type(3){
                span:nth-of-type(1){
                    font-size: 0.7rem
                }
                span:nth-of-type(2){
                    font-size: 0.7rem;
                     i{
                        font-size: 1rem;
                        color: gray;
                        padding-left: 0.3rem;
                    }
                }
            }
        }
        .info_two{
            width: 100%;
            padding: 0.5rem 0.6rem;
            border-bottom: 1px solid #cccccc;
            font-size: 0.5rem;
        }
        .info_three{
            background: white;
            p{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #cccccc;
                padding: 0.5rem 0.6rem;
                span:nth-of-type(1){
                    font-size: 0.7rem;
                }
                span:nth-of-type(2){
                    font-size: 0.7rem;
                    i{
                        font-size: 1rem;
                        color: gray;
                        padding-left: 0.3rem;
                    }
                }
            }
        }
        .info_four{
            background: white;
            p{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #cccccc;
                padding: 0.5rem 0.6rem;
                span:nth-of-type(1){
                    font-size: 0.7rem;
                }
                span:nth-of-type(2){
                    font-size: 0.7rem;
                    color: gray;
                    i{
                        font-size: 1rem;
                        color: gray;
                        padding-left: 0.3rem;
                    }
                }
            }
        }
        .info_five{
            width: 100%;
            margin-top: 1rem;
            text-align: center;
            button{
                width: 90%;
                height: 1.8rem;
                outline: none;
                border: none;
                background: red;
                border-radius: 0.25rem;
                color: white;
                font-size: 0.7rem;
            }
        }
        .info_alert{
            width:100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            z-index: 100;
            background-color: rgba(0,0,0,0.2);
            .tip_text_container{
                position: absolute;
                width:96%;
                height:13.5rem;
                top:20%;
                left:2%;
                border-radius: 0.4rem;
                background-color: #fff;
                .tip{
                    width:100%;
                    height:7rem;
                    background-color: #fff;
                    border-radius: 0.3rem 0.3rem 0 0;
                    padding-top: 1rem;
                    text-align: center;
                    .tip_icon{
                        width: 4.5rem;
                        height: 4.5rem;
                        border: 0.2rem solid #F8BB86;
                        border-radius: 50%;
                        margin: 0.3rem auto;
                        padding-top: 0.1rem;
                        span:nth-of-type(1){
                            border-radius: 0.2rem;
                            display: block;
                            margin: 0.2rem auto;
                            width: 0.2rem;
                            height: 3.2rem;
                            background-color: #F8BB86;
                        }
                        span:nth-of-type(2){
                            display: block;
                            margin: 0.1rem auto;
                            width: 0.2rem;
                            height: 0.2rem;
                            background-color: #F8BB86;
                            border-radius: 50%;
                        }
                    }
                    p{  
                        margin-top: 1.5rem;
                        font-size: 1.5rem;
                        border-bottom: none;
                    }
                }
                &>P{
                    width: 100%;
                    display: flex;
                    margin-top: 4rem;
                    margin-left: 20%;
                    button:nth-of-type(1){
                        width:5rem;
                        height:2rem;
                        border:none;
                        background-color: #C1C1C1;
                        font-size: 0.7rem;
                        border-radius: 0.2rem;
                        color:#fff;
                    }
                    button:nth-of-type(2){
                        width:5rem;
                        height:2rem;
                        border:none;
                        background-color: #DD6B55;
                        font-size: 0.7rem;
                        border-radius: 0.2rem;
                        color:#fff;
                        margin-left: 0.7rem;
                    }
                }
            }
        }
        .info_show{
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
}  
</style>
