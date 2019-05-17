<template>
  <div class="box">
    <Load v-if="num !== 1"></Load>
    <div class="box1" v-if="shop.length" type='1'>
      <header>
      <span class="user_lift" @click="back">
        <i class="fa fa-fw fa-chevron-left"></i>
      </span>
      <dl>
        <dt>
          <img :src="'http://elm.cangdu.org/img/' + this.userlist.image_path" />
        </dt>
        <dd>
          <p>{{ this.userlist.name }}</p>
          <p>
            <span>商家配送/</span>
            <span>分钟送达/</span>
            <span>配送费￥1</span>
          </p>
          <p>公告：{{ this.userlist.promotion_info }}</p>
        </dd>
      </dl>
      <p class="bbb" v-if="activity">
        <span>{{ this.activitylist.icon_name }}</span>
        <span>{{ this.activitylist.description }}(APP专享)</span>
      </p>
    </header>
    <div class="coe">
      <ul>
        <li>商品</li>
        <li>评价</li>
      </ul>
    </div>
    <section>
      <div class="con" v-cloak>
        <div class="left" ref="left">
          <ul>
            <li
              v-for="(item, index) in shop"
              :key="index"
              class="menu-item"
              :class="{ ' current': currentIndex === index }"
              @click="selectMenu(index, $event)"
              v-cloak
            >
              <!-- <a :href="'#'+item.id">{{item.name}}</a> -->
              <span class="text">
                <span
                  v-show="item.type > 0"
                  class="icon"
                  :class="classMap[item.type]"
                  v-cloak
                ></span>
                {{ item.name }}
              </span>
            </li>
          </ul>
        </div>
        <div class="right" ref="right">
          <ul>
            <li
              v-for="(good, index1) in shop"
              :key="index1"
              class=" food-list-hook"
              v-cloak
            >
              <h1
                class="goodTitle"
                :class="{ current: currentIndex === index1 }"
              >
                {{ good.name }}
                <!-- <a :name="good.id">{{good.name}}</a> -->
                <span>{{ good.description }}</span>
              </h1>
              <ul
                class="good"
                v-for="(item, index2) in good.foods"
                :key="index2"
              >
                <li>
                  <dl>
                    <dt>
                      <img
                        :src="'https://elm.cangdu.org/img/' + item.image_path"
                      />
                    </dt>
                    <dd>
                      <h2>{{ item.name }}</h2>
                      <p>{{ item.description }}</p>
                      <p>
                        <span class="count">月售{{ item.month_sales }}份</span>
                        <span>好评率{{ item.satisfy_rate }}%</span>
                      </p>
                      <p>
                        <span>{{ item.price }}</span>
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <div class="pre">
                    <span>￥</span>
                    <span
                      v-if="index3 == 0"
                      v-for="(i, index3) in item.specfoods"
                      >{{ i.price }}</span
                    >起
                  </div>
                  <div>
                    <div :class="{ pop: true, mov: item.num > 0 }">
                      <i
                        class="fa fa-fw fa-minus-circle"
                        @click="reduce(item)"
                      ></i>
                      {{ item.num }}
                    </div>
                    <i
                      class="fa fa-fw fa-plus-circle"
                      @click="increase(item, $event)"
                    ></i>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <!-- <div class="aa" v-for="(item,index1) in shop" :key="index1">
            <h1 class="goodTitle">
              {{item.name}}
              <span>{{item.description}}</span>
            </h1>
            <dl v-for="(it,index2) in item.foods" :key="index2">
              <dt>
                <img :src="'//elm.cangdu.org/img/'+it.image_path">
              </dt>
              <dd>
                <h2>{{it.name}}</h2>
                <p>{{it.description}}</p>
                <p>{{it.tips}}</p>
                <p>
                  <span v-for="i in it.specfoods">￥{{i.price}}</span>
                </p>
              </dd>
            </dl>
          </div>-->
        </div>
      </div>
    </section>

    <!-- 运动的小球 -->
    <div id="points">
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
    </div>

    <div class="footer">
      <div>
        <span :class="this.allnumber > 0 ? 'span2' : 'span1'">
          <i class="fa fa-fw fa-shopping-cart" @click="shopcar"></i>
        </span>
        <!--记录订单总数  -->
        <div class="total" v-show="allnumber > 0">{{ allnumber }}</div>
        <div class="pri">
           <p><span>￥</span><span>{{allprice}}</span></p>
           <p><span>配送费￥5</span></p>
        </div>
      </div>
      <div :class="{ pay: true, notPay: allnumber == 0 }" @click="pay">去结算</div>
    </div>
    <div class="shopcar" v-show="isshow">
      <div class="gwc">
        <div class="gwc_shop">
          <div class="header_top">
            <h3>我的购物车</h3>
            <p @click="clear">清空</p>
          </div>
          <div class="footer_down">
            <ul>
              <li v-for="item in shopCar">
                <p>{{ item.name }}</p>
                <p>￥{{ item.specfoods[0].price }}</p>
                <p>
                  <span
                    ><i
                      class="fa fa-fw fa-minus-circle"
                      @click="reduce(item)"
                    ></i
                  ></span>
                  <span>{{ item.num }}</span>
                  <span
                    ><i
                      class="fa fa-fw fa-plus-circle"
                      @click="increase(item, $event)"
                    ></i
                  ></span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
    <ul v-else class="animation_opactiy">
        <li class="list_back_li" v-for="item in 1" :key="item">
            <img src="../../images/src/shop_back_svg.svg" class="list_back_svg">
        </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Load from "./animeta";
export default {
  components: {
    Load
  },
  data() {
    return {
      msg: "con",
      shop: [],
      listHeight: [],
      scrollY: 0,
      userlist: "",
      activitylist: "",
      activity: true,
      // total: 0,
      num: 1,
      isshow: false,
      n: 1,
      shopCar: [],
      allnumber:0,
      allprice:0,
    };
  },
  methods: {
    cunshopcar(){
       let shop=JSON.parse(localStorage.getItem('shopCar'))
       let all=JSON.parse(localStorage.getItem('All'))
       if(shop.length){
         this.shopCar=shop
         this.allnumber=all.Allnum
         this.allprice=all.Allprice
       }else{
         this.allnumber=0
         this.allprice=0
       }
    },
    shopcar() {
      this.n++;
      if (this.n % 2 == 1) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    },
    pay() {
      if (this.$store.state.Allnum > 0) {
        this.$router.push({ name: "confirmOrder" });
      }
    },
    back() {
      this.$router.go(-1);
    },
    //+
    increase(item, event) {
      // this.total++;
      // item.num++;
     
      this.$store.commit("increase", item);
      this.cunshopcar()
      // console.log(item);
      //  let arr={
      //     name:item.name,
      //     number:item.num,

      //  }

      // 小球动画
      var top = event.clientY, // 小球降落起点
        left = event.clientX,
        endTop = window.innerHeight - 40, // 小球降落终点
        endLeft = 60;

      // // 小球到达起点
      var outer = $("#points .pointPre")
        .first()
        .removeClass("pointPre")
        .css({
          left: left + "px",
          top: top + "px"
        });
      var inner = outer.find(".point-inner");

      setTimeout(function() {
        // 将jquery对象转换为DOM对象
        outer[0].style.webkitTransform =
          "translate3d(0," + (endTop - top) + "px,0)";
        inner[0].style.webkitTransform =
          "translate3d(" + (endLeft - left) + "px,0,0)";

        // 小球运动完毕恢复到原点
        setTimeout(function() {
          outer.removeAttr("style").addClass("pointPre");
          inner.removeAttr("style");
        }, 1000); //这里的延迟值和小球的运动时间相关
      }, 1);

       
    },
    //-
    reduce(item) {
      
      // this.total--;
      // item.num--;
      this.$store.commit("reduce", item);
    
      this.cunshopcar()
    },
    //清空
    clear() {
        
        this.$store.commit('clear')
        localStorage.removeItem('shopCar')
        localStorage.removeItem('All')
        this.shopCar=[]
        this.allnumber=0
        this.allprice=0
       this.cunshopcar()
    },
    //左边菜单
    selectMenu(index, event) {
      // console.log(index)
      //      自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
      if (!event._constructed) {
        return;
      }
      //运用BScroll接口，滚动到相应位置
      let foodList = this.$refs.right.getElementsByClassName("food-list-hook");
      //获取对应元素的列表
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
    },
    //右边列表
    _initScroll() {
      // 获得 滚动的菜单 的真是dom 元素
      this.meunScroll = new BScroll(this.$refs.left, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.right, {
        click: true,
        //探针作用，实时监测滚动位置
        probeType: 3
      });
      //设置监听滚动位置
      this.foodScroll.on("scroll", pos => {
        //scrollY接收变量
        // console.log(pos);
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.right.getElementsByClassName("food-list-hook");
      let height = 0;
      //把第一个高度送入数组
      this.listHeight.push(height);
      //通过循环foodList下的dom结构，将每一个li的高度依次送入数组
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  mounted() {
    this.num = this.num - 1;
    //头部
    this.axios
      .get(
        "http://elm.cangdu.org/shopping/restaurant/" +
          this.$route.params.id +
          "?latitude=26.70908&longitude=113.25874&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics"
      )
      .then(res => {
        if (res.data && res.data.activities.length > 0) {
          this.userlist = res.data;
          // console.log(this.userlist);
          this.activitylist = res.data.activities[0];

          // console.log(res.data)
          // console.log(this.userlist.activities.length)
        } else {
          this.userlist = res.data;
          this.activity = false;
        }
      });
    //商品内容
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
    this.axios
      .get(
        "http://elm.cangdu.org/shopping/v2/menu?restaurant_id=" +
          this.$route.params.id
      )
      .then(res => {
        if (res.status == 200) {
          this.num = this.num + 1;
          res.data.map(item => {
            item.foods.map(i => {
              i.num = 0;
            });
          });
          this.shop = res.data;
          // 初始化 _initScroll 滚动事件
          this._initScroll();
          //计算高度
          this._calculateHeight();
          // console.log(this.shop);
        }
        // console.log(this.shop)
      });
      this.cunshopcar()
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        //[0,200,400...]
        //判断当currentIndex在height1和height2之间的时候显示
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        //          console.log('height1:'+height1+','+'height2:'+height2)
        //最后一个区间没有height2
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
[v-cloak] {
  display: none;
}
a {
  text-decoration: none;
  color: #555;
}
.box,.box1 {
  width: 100%;
  height: 100%;
}
header {
  width: 100%;
  height: 5rem;
  background-color: rgba(150, 150, 150, 0.3);
  position: relative;
  .user_lift {
    position: absolute;
    top: 0.1rem;
    left: 0.1rem;
    color: white;
  }
  dl {
    display: flex;
    color: white;
    width: 100%;
    dt {
      width: 20%;
      padding: 0.5rem 0 0 0.5rem;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
    dd {
      width: 80%;
      padding: 0.2rem 0 0 0.3rem;
      p {
        margin-top: 0.3rem;
      }
      p:nth-of-type(1) {
        font-weight: bold;
        font-size: 0.8rem;
      }
      p:nth-of-type(2) {
        font-size: 0.6rem;
      }
      p:nth-of-type(3) {
        font-size: 0.6rem;
      }
    }
  }
  .bbb {
    width: 100%;
    padding: 0.2rem 0.5rem;
    height: 1rem;
    display: flex;
    span:nth-of-type(1) {
      color: red;
      font-size: 0.5rem;
    }
    span:nth-of-type(2) {
      padding-left: 0.3rem;
      font-size: 0.6rem;
    }
    span:nth-of-type(3) {
      font-size: 0.6rem;
    }
  }
}
.coe {
  width: 100%;
  ul {
    width: 100%;
    display: flex;
    list-style: none;
    padding: 0.5rem 0.3rem;
    li {
      flex: 1;
      text-align: center;
      font-size: 1rem;
      &:hover {
        color: #3792e5;
      }
    }
  }
}
section {
  width: 100%;
  flex: 1;
  overflow: auto;
  .con {
    width: 100%;
    display: flex;
    .left {
      width: 25%;
      max-height: 40rem;
      overflow: hidden;
      overflow: auto;
      background: #f3f5f7;
      overflow: scroll;
      & > ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        list-style: none;
        li {
          padding: 0.8rem 0;
          text-align: center;
          border-bottom: 1px solid #ccc;
          font-size: 0.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .current {
          background: #fff;
          border-left: 2px solid #3792e5;
        }
      }
    }
    .right {
      width: 75%;
      max-height: 40rem;
      overflow: hidden;
      overflow: auto;
      flex: 1;
      overflow: scroll;
      ul {
        list-style: none;
        width: 100%;
        li {
          width: 100%;
          h1 {
            background: #eeeeee;
            font-size: 0.8rem;
            padding: 0.6rem 0.2rem;
            span {
              font-size: 0.7rem;
              color: #cccccc;
            }
          }
          dl {
            display: flex;
            padding: 0.5rem;
            background-color: #fff;
            dt {
              width: 30%;
              img {
                width: 3.5rem;
              }
            }
            dd {
              width: 70%;
              h2 {
                font-size: 0.8rem;
                padding-top: 0.3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              p:nth-of-type(1) {
                font-size: 0.6rem;
                color: #cccccc;
                padding-top: 0.3rem;
              }
              p:nth-of-type(2) {
                font-size: 0.6rem;
                padding-top: 0.2rem;
              }
              p:nth-of-type(3) {
                font-size: 0.6rem;
                padding-top: 0.2rem;
              }
            }
          }
        }
        li:nth-of-type(2) {
          .pre {
            padding-left: 4.3rem;
            color: gainsboro;
            font-size: 0.7rem;
            span {
              color: orange;
              font-size: 0.7rem;
              font-weight: bold;
              margin-right: 0.3rem;
            }
            span:nth-of-type(1) {
              font-size: 0.5rem;
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
  }
}

.right li h1 {
  padding-left: 5%;
  background-color: #f3f5f7;
  position: sticky;
  top: 0;
  z-index: 10;
}
.good li:nth-of-type(2) {
  font-size: 18px;
  text-align: right;
  display: flex;
  justify-content: space-between;
}
.good li i {
  font-size: 18px;
  color: #00a0dc;
  padding: 0 4px;
}
.pop {
  display: inline-block;
  position: relative;
  left: 48px;
  opacity: 0;
  transition: all ease 0.5s;
}
.pop i {
  transform: rotate(0deg);
  transition: all ease 0.5s;
}
.mov {
  left: 0;
  opacity: 1;
}
.pop.mov i {
  transform: rotate(-360deg);
}
.good li > div > i {
  position: relative;
  background-color: #fff;
  // z-index: 5;
}

.footer {
  background-color: #555;
  width: 100%;
  height: 50px;
  line-height: 50px;
  bottom: 0;
  position: fixed;
  font-size: 30px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .span1 {
    position: absolute;
    bottom: 0.5rem;
    left: 0.8rem;
    z-index: 120;
    display: inline-block;
    width: 2.8rem;
    height: 2.8rem;
    background:#555;
    border-radius: 50%;
    font-size: 0.45rem;
    line-height: 2.8rem;
    border: 0.15rem solid #444444;
    text-align: center;
    i {
      color: white;
      font-size: 1.5rem;
    }
  }
  .span2 {
    position: absolute;
    bottom: 0.5rem;
    left: 0.8rem;
    z-index: 120;
    display: inline-block;
    width: 2.8rem;
    height: 2.8rem;
    background: #00a0dc;
    border-radius: 50%;
    font-size: 0.45rem;
    line-height: 2.8rem;
    border: 0.15rem solid #444444;
    text-align: center;
    i {
      color: white;
      font-size: 1.5rem;
    }
  }

}
// .footer i {
//   color: #fff;
//   font-size: 35px;
// }
.footer .total {
  position: absolute;
  width: 15px;
  height: 15px;
  top: -10px;
  left: 58px;
  color: #fff;
  line-height: 15px;
  text-align: center;
  border-radius: 10px;
  background-color: red;
  font-size: 8px;
  z-index: 150;
}
.pri{
  margin-top: -10px;
  margin-left: 80px;
  p:nth-of-type(1){
    font-size: 1.2rem;
    font-weight: bold;
    height: 20px;
    color: white;
  }
  p:nth-of-type(2){
    font-size: 0.7rem;
    height: 20px;
    color: white;
  }

}
.pay {
  /* background-color: rgb(78, 207, 45); */
  background-color: #00a0dc;
  color: #fff;
  font-size: 18px;
  padding: 0 20px;
}
.notPay {
  background-color: #bbb;
}

/* 运动小球 */
.pointPre {
  /* 动画的小球 */
  display: none;
}
.pointOuter {
  position: absolute;
  // z-index: 114;
  /* 当小球抛出时遵循贝塞尔曲线过渡 */
  -webkit-transition: all 1s cubic-bezier(0.39, -0.4, 0.83, 0.23) 0s;
  transition: all 1s cubic-bezier(0.39, -0.4, 0.83, 0.23) 0s;
}

.point-inner {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #00a0dc;
  /* 过渡属性名称 过渡时间 过渡曲线 延迟时间 */
  transition: all 1s ease 0s;
  -webkit-transition: all 1s ease 0s;
}

.shopcar {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 50px;
  left: 0;
  z-index: 99;
  background: rgba(150, 150, 150, 0.5);
  .gwc {
    width: 100%;
    height: 100%;
    position: relative;
    .gwc_shop {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 99;
      width: 100%;
      background: #f1f1f1;
      .header_top {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem;
        h3 {
          font-size: 0.7rem;
        }
        p {
          font-size: 0.7rem;
        }
      }
      .footer_down {
        width: 100%;
        background: white;
        ul {
          list-style: none;
          width: 100%;
          li {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0.2rem 0.4rem;
            p:nth-of-type(1) {
              font-size: 0.7rem;
            }
            p:nth-of-type(2) {
              font-size: 0.7rem;
              color: red;
            }
            p:nth-of-type(3) {
              font-size: 0.7rem;
              span:nth-of-type(1) {
                margin-left: 0.2rem;
                font-size: 0.8rem;
                color: #3792e5;
              }
              span:nth-of-type(2) {
                margin-left: 0.2rem;
                font-size: 0.8rem;
              }
              span:nth-of-type(3) {
                margin-left: 0.2rem;
                font-size: 0.8rem;
                color: #3792e5;
              }
            }
          }
        }
      }
    }
  }
}
</style>
