<template>
    <div class="box">
        <head-top :goback="true" :signinUp="false">
            <p slot="search" class="head_logo">新增地址</p>
            <p slot="sear"></p>
        </head-top>
        <div class="add_content">
            <div class="add_input">
                <p>
                    <input type="text" placeholder="请填写你的姓名" v-model="username">
                    <span>{{this.warnName}}</span>
                </p>
                <p>
                    <input type="text" placeholder="小区/写字楼/学校等" @click="addDetail" v-model="keyword" >
                </p>
                <p>
                    <input type="text" placeholder="请填写详细送餐地址"  v-model="address">
                    <span>{{this.warnAddress}}</span>
                </p>
                <p>
                    <input type="text" placeholder="请填写能够联系到您的手机号"  v-model="phone">
                    <span>{{this.warnTel}}</span>
                </p>
                <p>
                    <input type="text" placeholder="备用联系电话(选填)">
                </p>
            </div>
            <div class="add_button">
                <button @click="add">新增地址</button>
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
            warnName:'',
            warnAddress:'',
            warnTel:'',
            data:[],
            username:'',
            address:'',
            phone:'',
            keyword:''
        }
    },
    mounted(){ 
        if(this.$store.state.address.name){
            let inp=this.$store.state.address.name
            this.keyword=inp
            console.log(this.keyword)
        }
    },
    watch:{
       username(){
            let inp=/^[\u4e00-\u9fa5]{2,6}$/.test(this.username)
            if(!inp){
                this.warnName='请输入您的姓名'
            }else{
                this.warnName=''
            }
        },
        address(){
            if(this.address.length<3){
                this.warnAddress='送餐地址太短了,不能辨识'
            }else{
                this.warnAddress=''
            }
        },
        phone(){
            let telBool=/^1[3456789]\d{9}$/.test(this.phone);
            if(this.phone===''){
                this.warnTel='手机号不能为空'
            }else if(!telBool){
                this.warnTel='请输入正确的手机号'
            }else{
                this.warnTel=''
            }
        },
    },
    methods:{
        addDetail(){
            this.$router.push({name:'profile/info/address/add/addDetail'})
        },
        // Uname(){
        //     let inp=/^[\u4e00-\u9fa5]{2,8}$/.test(this.warnName)
        //     if(!inp){
        //         this.warnName='请输入您的姓名'
        //     }else{
        //         this.warnName=''
        //     }
        // },
        // Address(e){
        //     if(e.target.value.length<3){
        //         this.warnAddress='送餐地址太短了,不能辨识'
        //     }else{
        //         this.warnAddress=''
        //     }
        // },
        // Tel(e){
        //     let telBool=/^1[3456789]\d{9}$/.test(e.target.value);
        //     if(e.target.value===''){
        //         this.warnTel='手机号不能为空'
        //     }else if(!telBool){
        //         this.warnTel='请输入正确的手机号'
        //     }else{
        //         this.warnTel=''
        //     }
        // },
        add(){
            let val=this.$store.state.address.name
            let user_id=localStorage.getItem('vuex')
            let data={address:this.address,geohash:"31.22299,121.36025",name:this.username,phone:this.phone,poi_type: 0,sex: 1,tag: "公司",tag_type: 4,phone_bk: "",address_detail:val,_t:1557981685}
            this.axios.post('http://elm.cangdu.org/v1/users/'+user_id+'/addresses',data).then((res)=>{
                if(res.data.status!=0){
                    this.$router.push({name:'profile/info/address'})
                    this.username=''
                    this.address=''
                    this.phone=''
                }else{
                    console.log('出错了')
                }
            })
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
    .add_content{
        flex: 1;
        overflow: auto;
        background: #f7f7f7;
        .add_input{
            padding: 0.4rem 0 0.2rem 0;
            margin-top: 0.5rem;
            background: white;
            p{
                margin-bottom: 0.4rem;
                input{
                    width: 94%;
                    margin-left: 3%;
                    height: 2rem;
                    border: none;
                    outline: none;
                    background: #f7f7f7;
                    padding-left: 0.3rem;
                    font-size: 0.7rem;
                    border-radius: 0.2rem;
                    border: 1px solid #cccccc;
                }
                span{
                    display: block;
                    margin-top: 0.1rem;
                    font-size: 0.6rem;
                    margin-left: 0.6rem;
                    color: red;
                }
            }
        }
        .add_button{
            width: 100%;
            margin-top: 0.5rem;
            text-align: center;
            button{
                width: 94%;
                border: none;
                border-radius: 0.3rem;
                height: 2rem;
                outline: none;
                background: #4CD964;
                color: white;
                font-size: 0.8rem;
            }
        }
    }
}  
</style>