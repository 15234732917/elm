<template>
    <div class="box">
        <head-top :goback="true" :signinUp="false">
            <p slot="search" class="head_logo">搜索地址</p>
            <p slot="sear"></p>
        </head-top>
        <div class="addDetail_content">
            <div class="addDetail_a">
                <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="keyword">
                <button @click="enter">确认</button>
            </div>
            <div class="addDetail_b">
                <p>为了满足商家的送餐要求,建议您从列表中选择地址</p>
            </div>
            <div class="addDetail_c">
                <ul>
                    <li v-for="item in data" @click="click(item)">
                        <p>{{item.name}}</p>
                        <p>{{item.address}}</p>
                    </li>
                </ul>
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
            keyword:''
        }
    },
    mounted(){ 
        if(this.$store.state.address.name){
            let inp=this.$store.state.address.name
            this.keyword=inp
        }
    },
    methods:{
        enter(){
            if(this.keyword){
                this.axios.get('http://elm.cangdu.org/v1/pois?type=nearby&keyword='+this.keyword).then((res)=>{
                    this.data=res.data
                })
            }
        },
        click(item){
            this.$store.commit('keyword',item)
            console.log(item)
            this.$router.push({name:'profile/info/address/add'})
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
    .addDetail_content{
        flex: 1;
        overflow: auto;
        background: #f7f7f7;
       .addDetail_a{
           background: white;
           width: 100%;
           padding: 0.4rem;
           display: flex;
           input{
               width: 75%;
               height: 2rem;
               border: 1px solid #cccccc;
               outline: none;
               background: #f7f7f7;
               padding-left: 0.3rem;
               border-radius: 0.2rem;
               font-size: 0.7rem;
           }
           button{
               width: 22%;
               height: 2rem;
               margin-left: 2%;
               background: #00a0dc;
               color: white;
               font-size: 0.7rem;
               outline: none;
               border: none;
               border-radius: 0.2rem;
           }
       }
       .addDetail_b{
           width: 100%;
           background: pink;
           padding: 0.2rem 0;
           p{
               padding-left: 0.7rem;
               color: orange;
               font-size: 0.7rem; 
           }
       }
       .addDetail_c{
           width: 100%;
           ul{
               list-style: none;
               li{
                   border-bottom: 1px solid #cccccc;
                   padding: 0.4rem;
                   p{
                       color: gray;
                       padding-bottom: 0.2rem;
                   }
               }
           }
       }
    }
}  
</style>