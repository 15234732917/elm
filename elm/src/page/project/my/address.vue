<template>
    <div class="box">
        <head-top :goback="true" :signinUp="false">
            <p slot="search" class="head_logo">编辑地址</p>
            <p slot="sear" v-if="isshow" @click="change">编辑</p>
            <p slot="sear" v-else @click="finash">完成</p>
        </head-top>
        <div class="address_content">
            <div class="address_a">
                <ul>
                    <li v-for='item in data'>
                        <p>{{item.address}}</p>
                        <p v-if="isshow">{{item.phone}}</p>
                        <p v-else><span>{{item.phone}}</span><span class="x" @click="del(item)">x</span></p>
                    </li>
                </ul>
            </div>
            <div class="address_b">
                <p>
                    <span @click='add'>新增地址</span>
                    <span><i class="fa fa-angle-right" /></span>
                </p>
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
            isshow:true,
        }
    },
    mounted(){
        this.addresses()
    },
    methods:{
        add(){
            this.$router.push({name:'profile/info/address/add'})
        },
        addresses(){
            let user_id=localStorage.getItem('vuex')
            this.axios.get('http://elm.cangdu.org/v1/users/'+user_id+'/addresses').then((res)=>{
                this.data=res.data.reverse()
            })
        },
        change(){
            this.isshow=false
        },
        finash(){
            this.isshow=true
        },
        del(item){
            let user_id=localStorage.getItem('vuex')
            this.axios.delete('http://elm.cangdu.org/v1/users/'+user_id+'/addresses/'+item.id).then((res)=>{
                this.addresses()
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
        p:nth-of-type(1){
            font-size: 1rem;
            color: white;
            font-weight: bold;
            padding-right: 0.8rem;
        }
        p:nth-of-type(2){
            font-size: 0.8rem;
            color: white;
        }
    }
    .address_content{
        flex: 1;
        overflow: auto;
        background: #f7f7f7;
        .address_a{
            margin-top: 0.5rem;
            border-bottom: 1px solid #ccc;
            border-top: 1px solid #ccc; 
            background: white;
            ul{
                width: 100%;
                list-style: none;
                li{
                    padding: 0.5rem 0.4rem;
                    p{
                        font-size: 0.7rem;
                    }
                    p:nth-of-type(2){
                        display: flex;
                        justify-content: space-between;
                        span{
                            font-size: 0.7rem
                        }
                        .x{
                           font-size: 0.8rem;
                           margin-top: -0.5rem;
                           margin-right: 0.2rem;
                        }
                    }
                }
                li:nth-of-type(1){
                    background: #FFF8C3;
                }
            }
        }
        .address_b{
            margin-top: 0.5rem;
            background: white;
            border-bottom: 1px solid #ccc;
            border-top: 1px solid #ccc; 
            p{
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0.4rem;
                span:nth-of-type(1){
                    font-size: 0.8rem;
                }
                span:nth-of-type(2){
                    font-size: 1rem;
                    color: #eeeeee;
                }
            }
        }
    }
}  
</style>
