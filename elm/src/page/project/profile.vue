<template>
  <div class="box">
    <head-top :goback="true" :signinUp="false">
      <p slot="search" class="head_logo">我的</p>
      <p slot="sear"></p>
    </head-top>
    <div class="content">
      <section>
        <div>
          <span v-if="this.data.avatar"><img :src="'http://elm.cangdu.org/img/'+this.data.avatar"></span>
          <span v-else><img src="http://elm.cangdu.org/img/default.jpg"/></span>
        </div>
        <div>
          <p v-if="this.data.username" @click="click"><span>{{this.data.username}}</span></p>
          <p @click="login" v-else><span>登录</span>/<span>注册</span></p>
          <p><span></span><span>暂无绑定手机号</span></p>
        </div>
        <div>
          <span><i class="fa fa-angle-right"></i></span>
        </div>
      </section>
      <div class="con">
        <div>
          <p><span>0.00</span>元</p>
          <p>我的余额</p>
        </div>
        <div>
          <p v-if="this.data.gift_amount"><span>{{this.data.gift_amount}}</span>个</p>
          <p v-else><span>0</span>个</p>
          <p>我的优惠</p>
        </div>
        <div>
          <p><span>0</span>分</p>
          <p>我的积分</p>
        </div>
      </div>
      <div class="coe">
        <ul>
          <li>
            <span></span>
            <p><span>我的订单</span><span><i class="fa fa-angle-right"></i></span></p>
          </li>
           <li>
            <span></span>
            <p><span>积分商城</span><span><i class="fa fa-angle-right"></i></span></p>
          </li>
           <li>
            <span></span>
            <p><span>饿了么会员卡</span><span><i class="fa fa-angle-right"></i></span></p>
          </li>
        </ul>
      </div>
      <div class="coa">
         <ul>
           <li>
              <span></span>
              <p><span>服务中心</span><span><i class="fa fa-angle-right"></i></span></p>
            </li>
             <li>
              <span></span>
              <p><span>下载饿了么APP</span><span><i class="fa fa-angle-right"></i></span></p>
            </li>
         </ul>
      </div>
    </div>
    <foo-ter></foo-ter>
  </div>
</template>

<script>
import FooTer from "../../components/footer/footer";
import HeadTop from "../../components/header/head";
export default {
  components: {
    HeadTop,
    FooTer
  },
  data() {
    return {
      data:[]
    };
  },
  mounted(){
    console.log(this.$store.state.username)
     let user_id=localStorage.getItem('vuex')
    //  console.log(user_id)
     this.axios.get('http://elm.cangdu.org/v1/user?user_id='+user_id).then((res)=>{
        this.data=res.data
     })
  },
  methods: {
    login(){
      this.$router.push({name:'userlogin'})
    },
    click(){
      this.$router.push({name:'profile/info'})
    },
  }
};
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
  .content {
    width: 100%;
    background: #f5f5f5;
    flex: 1;
    overflow: auto;
    section {
      background: #3792e5;
      // margin-top: 0.1rem;
      padding: 1rem 0 0.5rem 0;
      width: 100%;
      display: flex;
      div:nth-of-type(1) {
        width: 20%;
        padding-left: 0.5rem;
        span {
          width: 100%;
          img {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
          }
        }
      }
      div:nth-of-type(2) {
        width: 70%;
        margin-top: 0.3rem;
        margin-left: 0.3rem;
        p:nth-of-type(1) {
          color: white;
          font-size: 0.9rem;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          font-size: 0.2rem;
          color: white;
        }
      }
      div:nth-of-type(3) {
        width: 5%;
        padding-top: 0.8rem;
        padding-left: 0.5rem;
        span {
          i {
            font-size: 1rem;
            color: white;
          }
        }
      }
    }
    .con {
      width: 100%;
      display: flex;
      background: white;
      div {
        padding: 0.8rem;
        flex: 1;
        border-right: 1px solid #eeeeee;
        text-align: center;
      }
      div:nth-of-type(1) {
        p:nth-of-type(1) {
          span {
            font-size: 1rem;
            font-weight: bold;
            color: orange;
          }
        }
      }
       div:nth-of-type(2) {
        p:nth-of-type(1) {
          span {
            font-size: 1rem;
            font-weight: bold;
            color: red;
          }
        }
      }
       div:nth-of-type(3) {
        p:nth-of-type(1) {
          span {
            font-size: 1rem;
            font-weight: bold;
            color: green;
          }
        }
      }
    }
    .coe{
      margin-top: 0.5rem;
      width: 100%;
      background: white; 
      ul{
        width: 100%;
        list-style: none;
        li{
          display: flex;
          height: 2rem;
          &>span{
            display: inline-block;
            width: 10%;
            height: 100%;
          }
          p{
            flex: 1;
            height: 100%;
            display: flex;
            line-height: 2rem;
            border-bottom: 1px solid #eeeeee;
            justify-content: space-between;
            span{
              display: inline-block;
              font-size: 0.8rem;
            }
            span:nth-of-type(2){
              padding-right: 0.5rem;
              i{
                color: gray;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
    .coa{
      margin-top: 0.5rem;
      width: 100%;
      background: white; 
      ul{
        width: 100%;
        list-style: none;
        li{
          display: flex;
          height: 2rem;
          &>span{
            display: inline-block;
            width: 10%;
            height: 100%;
          }
          p{
            flex: 1;
            height: 100%;
            display: flex;
            line-height: 2rem;
            border-bottom: 1px solid #eeeeee;
            justify-content: space-between;
            span{
              display: inline-block;
              font-size: 0.8rem;
            }
            span:nth-of-type(2){
              padding-right: 0.5rem;
              i{
                color: gray;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
