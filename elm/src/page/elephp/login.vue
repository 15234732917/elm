<template>
    <div class="box">
        <transition name='fade' mode='in-out'>
            <section class="from_contianer" v-show="showLogin">
                <h1>elm后台管理系统</h1>
                <div class="login">
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" >
                        <el-form-item  prop="user_name">
                            <el-input type="text" v-model="loginForm.user_name"  placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item  prop="password">
                            <el-input type="password" v-model="loginForm.password"  placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('loginForm')" class="submit">登陆</el-button>
                        </el-form-item>
                    </el-form>
                    <p>温馨提示:</p>
                    <p>未登录过的新用户，自动注册</p>
                    <p>注册过的用户可凭账号密码登录</p>
                </div>
            </section>
        </transition>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data(){
        return{
            loginForm: {
                user_name: '',
                password: '',
            },
            rules: {
                user_name: [
                    { required:true,message: "请输入用户名", trigger: 'blur' }
                ],
                password: [
                    { required:true,message: "请输入密码", trigger: 'blur' }
                ],
                   
            },
            showLogin:false,
        }
    },
    mounted(){
        this.showLogin=true;
    },
    methods:{
        ...mapMutations([
            "saveAdminInfo"
        ]),
        // setCookie(name,value,day){
        //     var exp=new Date();
        //     exp.setDate(exp.getDate()+day);
        //     document.cookie=name+'='+unescape(value)+';expires='+exp.toGMTString();
        // },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let data={user_name:this.loginForm.user_name,password:this.loginForm.password}
                    this.axios
                    .post('https://elm.cangdu.org/admin/login',data)
                    .then(res=>{
                         
                        if(res.data.status==1){
                            this.$message({
                                type:'success',
                                message:'登录成功'
                            })
                            // this.setCookie('value',JSON.stringify(res.data),7)
                            this.saveAdminInfo({login:true})
                            this.$router.push('/manage')
                        }else{
                            this.$message({
                                type:'error',
                                message:res.data.message
                            })
                        }
                    })
                } else {
                    this.$notify.error({
                        title:'错误',
                        message:'请输入正确的用户名或密码',
                        offset:100
                    })
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss" secoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.box{
    width: 100%;
    height: 100%;
    text-align: center;
    background: #324057;
    .from_contianer{
        .login{
            background: white;
            width: 380px;
            height: 270px;
            margin: 50px auto;
            border-radius: 10px;
        }
         h1{
            margin-top: 250px;
            font-size: 30px;
            color: white;
            text-align: center;
        }
        p{
            font-size: 12px;
            color: red;
        }
        .submit{
            width: 100%;
        }
        .el-form{
            padding: 20px 20px 0 20px;
            
        }
       
    }
}
 .fade-enter-active, .fade-leave-active {
    transition: all 1s ;
}
.fade-enter, .fade-leave-active{
    transform: translate3d(0,-50px,0);
    opacity: 0;
}  
.el-notification{
    i{
        font-size: 45px;
    }
    .el-notification__group{
        margin-left: 30px;
    }
}
.el-message{
    i{
        font-size: 15px;
    }
    .el-notification__group{
        margin-left: 30px;
    }
}
</style>
