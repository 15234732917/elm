<template>
  <div class="box">
    <!-- <header>
            <p><</p>
            <router-link tag="p" to="/msite?geohash=:geohash"><</router-link>
            <p>搜索</p>
            <p></p>
       </header> -->
    <head-top :goback="true" :signinUp="false">
      <p slot="search" class="head_logo">搜索</p>
      <p slot="sear"></p>
    </head-top>
    <div class="content">
      <div class="con">
        <p>
          <input
            type="text"
            placeholder="请输入商家或美食名称"
            v-model="search"
          /><button @click="submit">提交</button>
           <span class="cc" v-if="del" @click="shanchu">&times;</span>
        </p>
      </div>
      <div class="center" v-show="show">
        <p>商家</p>
        <ul>
          <li v-for="item in data">
            <div>
              <img :src="'http://elm.cangdu.org/img/' + item.image_path" />
            </div>
            <div>
              <p>{{ item.name }}</p>
              <p>月售{{ item.recent_order_num }}单</p>
              <p>
                {{ item.float_minimum_order_amount }}元起送/距离{{
                  item.distance
                }}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="show" v-show="isshow">
        <div class="coe">
          <p>搜索效果</p>
        </div>
        <div class="cot">
          <ul>
            <li v-for="(item,index) in searchHistory">
              <span @click="fuhistory">{{ item }}</span
              ><span @click="dlt(index)">x</span>
            </li>
          </ul>
          <div @click="dellall">清空搜索历史</div>
        </div>
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
      del:false,
      search: "", //框
      data: [], //商家数据
      show: false,//商家
      isshow: false,//历史
      searchHistory:[], 
    };
  },
  mounted() {
    let user_id = localStorage.getItem("vuex");
    this.axios
      .get("http://elm.cangdu.org/v1/user?user_id=" + user_id)
      .then(res => {
        // this.data=res.data
      });
      this.historysearch( )
    if(this.searchHistory!=''){
        this.isshow=true;
    }else{
        this.isshow=false;
        }  
  },
  methods: {

      //提交
    submit() {
      this.axios
        .get(
          "http://elm.cangdu.org/v4/restaurants?extras[]=restaurant_activity&geohash=22.20274,113.54965&keyword=" +
            this.search +
            "&type=search"
        )
        .then(res => {
          if(res.data){
              this.data = res.data;
                this.show=true;
                this.isshow=false;
          }
        });
        this.scHistory()
    },
    //本地是否有值
    historysearch(){
        if(localStorage.getItem('searchHistory')){
            this.searchHistory=JSON.parse(localStorage.getItem('searchHistory'))
        }else{
            this.searchHistory=[]
        }
    },
    //存本地
    scHistory(){
        let history=localStorage.getItem('searchHistory')
        if(history){
            let checkrepeat=false;
            this.searchHistory=JSON.parse(history)
            this.searchHistory.forEach(i=>{
                if(i==this.search){
                    checkrepeat=true;
                }
            })
            if(checkrepeat==false){
                this.searchHistory.push(this.search)
                console.log(this.searchHistory)
                localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
            }
        }else{
            this.searchHistory.push(this.search);
            localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
        }
    },
    //历史进入
    fuhistory(index){
        
        let word=this.searchHistory[index]
        this.search=word
        this.axios.get('http://elm.cangdu.org/v4/restaurants?extras[]=restaurant_activity&geohash=39.902802,116.427048&keyword='+word+'&type=search').then((res)=>{
           if(res.data){
                this.data = res.data;
                this.show=true;
                this.isshow=false;
           }
        })
    },
    //input框删除
    shanchu(){
        this.search='';
        this.show=false;
        this.isshow=true
    },
    //历史单删
    dlt(index){
       this.searchHistory.splice(index,1)
       localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
    },
    //清空历史
    dellall(){
       localStorage.removeItem('searchHistory')
       this.searchHistory=[];
       this.isshow=false;
    }
  },
  updated(){
       if(this.search!=''){
          this.del=true
      }else{
          this.del=false
      }
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
      font-size: 0.8rem;
      color: white;
      font-weight: bold;
      padding-right: 1rem;
    }
  }
  .content {
    width: 100%;
    background: #f5f5f5;
    flex: 1;
    overflow: auto;
    .con {
      padding: 0.4rem;
      background: white;
       position: relative;
      p {
        width: 100%;
        input {
          width: 70%;
          height: 2rem;
          border-radius: 0.3rem;
          border: 1px solid #eeeeee;
          padding-left: 0.5rem;
          outline: none;
          background: #f2f2f2;
          font-size: 0.5rem;
        }
        button {
          width: 25%;
          height: 2rem;
          background: #3792e5;
          color: white;
          border-radius: 0.3rem;
          border: none;
          outline: none;
          font-size: 0.8rem;
          font-weight: bold;
          margin-left: 0.5rem;
        }
        .cc{
                font-size: 0.8rem;
                font-weight: bold;
                color:#476598;
                position: absolute;
                top:1rem;
                right:6.5rem;
            }
      }
    }
    .show {
      .coe {
        width: 100%;
        background: #f5f5f5;
        height: 1.5rem;
        p {
          line-height: 1.5rem;
          font-size: 0.6rem;
          padding-left: 0.5rem;
          font-weight: bold;
          color: #666666;
        }
      }
      .cot {
        width: 100%;
        background: white;
        ul {
          width: 100%;
          list-style: none;
          li {
            width: 100%;
            padding: 0.4rem 0.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #cccccc;
            span:nth-of-type(1) {
               display: inline-block;
               width: 70%;
              font-size: 0.6rem;
              color: #424242;
            }
            span:nth-of-type(2) {
                display: inline-block;
               width: 30%;
               text-align: right;
              font-size: 0.8rem;
              font-weight: bold;
              color: #999999;
            }
          }
        }
        & > div {
          width: 100%;
          padding: 0.5rem 0.2rem;
          font-size: 0.8rem;
          font-weight: bold;
          color: #3792e5;
          text-align: center;
        }
      }
    }
    .center {
      width: 100%;
      & > p {
        widows: 100%;
        padding: 0.5rem 0.5rem;
        font-size: 0.7rem;
        color: #666;
        background: #f5f5f5;
        font-weight: bold;
      }
      ul {
        width: 100%;
        background: #fff;
        li {
          width: 100%;
          display: flex;
          padding: 0.2rem 0.2rem 1rem 0.2rem;
          border-bottom: 1px solid #e4e4e4;
          div:nth-of-type(1) {
            width: 15%;
            padding: 0.3rem 0 0.3rem 0.3rem;
            img {
              width: 2rem;
              height: 2rem;
            }
          }
          div:nth-of-type(2) {
            padding-bottom: 0.3rem;
            border-bottom: 1px solid #e4e4e4;
            flex: 1;
            p {
              font-size: 0.7rem;
              padding-top: 0.1rem;
            }
            p:nth-of-type(1) {
              padding-top: 0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
