<template>
    <div class="aa">
        <ant v-if="aa!==1"></ant>
        <div class="box" v-if="list.length" type="1" >
        <header>
            <ul>
                <li>
                    <div>
                        <a @click='$router.go(-1)'>
                             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <polyline points="12,18 4,9 12,0" style="fill: none; stroke: rgb(255, 255, 255); stroke-width: 2;"></polyline>
                            </svg>
                        </a>
                        <img :src="'https://elm.cangdu.org/img/'+headList.image_path" alt="">
                    </div>
                    <div>
                        <p>{{headList.name}}</p>
                        <p>商家配送/分钟送到/配送费￥{{headList.float_delivery_fee}}
                            <span class="f">
                                <svg data-v-c8684834="" width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
                                    <path data-v-c8684834="" d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none"></path>
                                </svg>
                            </span>
                        </p>
                        <p>公告：{{headList.promotion_info}}</p>
                    </div>
                </li>
            </ul>
            <!-- <p class="pp" v-if="headList.activities!=''"><span class="ss">{{headList.activities[0].icon_name}}</span>{{headList.activities[0].description}}(APP专享)</p> -->
        </header>
        <div class="cc">
            <div class="nav">
                <ul>
                    <!-- <li v-for="(item,index) in data" :key="item.id" @click="hand(index)"><span :class="{active:index==indexItem}" >{{item}}</span></li> -->
                    <li  v-on:click="shopNav=true"  ><span :class="{active:shopNav}">商品</span></li>
                    <li  v-on:click="shopNav=false"  ><span :class="{active:!shopNav}">评价</span></li>
                </ul>
            </div>
            <div class="box1">
                <div class="center" v-if="shopNav">
                    <div class="left menu-wrapper" ref="menuWrapper">
                        <ul>
                            <!-- <li v-for="(item,index) in list" :key="item.id" class="food-list food-list-hook" :class="{act:i===index}" @click="selectMenu(index, $event)">{{item.name}}</li> -->
                            <li v-for="(item,index) in list" :key="item.id" :class="{act:i===index}" @click="change(item.id,index)">{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="right foods-wrapper" ref="foodWrapper" id="Right">
                        <div>
                            <dl v-for="i in list" :key="i.id">
                                <dt class="div" :id="i.id"><span>{{i.name}}</span>{{i.description}}</dt>
                                <dd v-for="k in i.foods" :key="k.id">
                                    <div><img :src="'https://elm.cangdu.org/img/'+k.image_path" alt=""></div>
                                    <div>
                                        <p>{{k.name}}</p>
                                        <p>{{k.description}}</p>
                                        <p>月销{{k.month_sales}}份 好评率{{k.satisfy_rate}}%</p>
                                        <p v-if="k.activity" class="p1"><span>{{k.activity.image_text}}</span></p>
                                        <p class="p2">￥{{k.specfoods[0].price}}起
                                            <span class="gui" v-if="k.specifications!=''">选规格</span>
                                            <span v-else class="car">
                                                <span class="jian" @click="less(k)">
                                                    <i class='el-icon-remove-outline'></i>
                                                    <span>{{k.number}}</span>
                                                </span>
                                                <span class="jia" @click="add(k,$event)"><i class='el-icon-circle-plus'></i></span>
                                            </span>
                                        </p>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            <div class="center" v-if="!shopNav">评价</div>
            </div>
        </div>
        <div :class="this.cartlist?'ceng':'ceng2'">
                <div class="div1">
                <p><span>购物车</span><span @click="remove">清空</span></p>
                <ul>
                    <li v-for="item in shoplist">
                        <span class="s1" >{{item.name}}</span>
                        <span class="s2" >￥{{item.specfoods[0].price}}元</span>
                        <span class="s5" @click="less(item)"><i class='el-icon-remove-outline'></i></span>
                        <span class="s6">{{item.number}}</span>
                        <span class="s4" @click="add(item)"><i class='el-icon-circle-plus'></i></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer"  v-if="isShow">
            <div class="left">
                <div class="cart">
                    <i class="fa fa-fw fa-shopping-cart"></i>
                </div>
                <div class="total">
                    <p>￥0.00</p>
                    <p>配送费￥5</p>
                </div>
            </div>
            <div class="right"><a>还差¥20起送</a></div>
        </div>
        <div class="footer1" v-if="show">
            <div class="left" @click="ceng()">
                <div class="cart">
                    <i class="fa fa-fw fa-shopping-cart"></i>
                </div>
                <span class="num">{{num}}</span>
                <div class="total">
                    <p>￥{{price}}</p>
                    <p>配送费￥5</p>
                </div>
            </div>
            <div class="right"><router-link tag='a' to=''>去结算</router-link></div>
        </div>
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
    </div>
    <ul v-else class="animation_opactiy">
        <li class="list_back_li" v-for="item in 1" :key="item">
            <img src="../../image/img/shop_back_svg.svg" class="list_back_svg">
        </li>
    </ul>
    </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import $ from 'jquery';
import ant from '../../components/animeta'
export default {
    components:{
        ant
    },
    data(){
        return{
            headList:[],  //头部列表
            list:[],      //左边导航
            active:"",    //左边导航切换样式
            shopNav:true,   //评价
            i:0,          //左边导航切换样式
            listHeight:[],  
            scrolly:0,
            isShow:true,   //底部1
            show:false,    //底部2
            cartlist:false,
            n:1,
            shoplist:[],
            num:0,
            price:0,
            // data:["商品","评价"]
            aa:1
        }
    },
    mounted(){
        this.aa=this.aa-1;
        //头部渲染
        axios.get('http://elm.cangdu.org/shopping/restaurant/'+this.$route.params.id+'?latitude=45.80031&longitude=126.50329&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics')
        .then(res=>{
            this.headList=res.data;
        })

        //左\右边导航
        axios.get('http://elm.cangdu.org/shopping/v2/menu?restaurant_id='+this.$route.params.id)
        .then(res=>{
            this.aa=this.aa+1;
            for(var i=0;i<res.data.length;i++){
                for(var j=0;j<res.data[i].foods.length;j++){
                    res.data[i].foods[j].number=0;
                }
            }
            this.list=res.data;
        })
        this.get()
    },
    methods:{
        get(){
            let shop = JSON.parse(localStorage.getItem('shopCar'))
            let all = JSON.parse(localStorage.getItem('All'))
            if(shop.length){
                this.shoplist = shop
                this.num = all.Allnum
                this.price = all.Allprice
                this.isShow=false;
                this.show=true;
            }else{
                this.isShow=true;
                this.show=false;
                this.cartlist=false;
            }
        },
        more(){ 
            let scrollTop=document.getElementById('Right').scrollTop;   //滚动条高度
            let Arrdl=document.getElementsByClassName("div");                  //获取所有的dl
            for(let i=0;i<Arrdl.length;i++){
                if(scrollTop>=Arrdl[i].offsetTop-150 && scrollTop<=Arrdl[i+1].offsetTop-150){
                    this.i=i
                }
            }
        },
        change(id,index){  //左右联动
            $("#Right").unbind("scroll");
            this.i=index;
            let div=document.getElementById(id);
            let top=div.offsetTop;
            $("#Right").animate({"scrollTop":top-150},()=>{
                $("#Right").scroll(this.more.bind(this))
            })
        },
        //加
        add(k,event){
            this.$store.commit('add',k)
            this.get()
            var top = event.clientY, // 小球降落起点
            left = event.clientX,
            endTop = window.innerHeight - 30,  // 小球降落终点
            endLeft = 60;
            // // 小球到达起点
            var outer = $('#points .pointPre').first().removeClass("pointPre").css({
                left: left + 'px',
                top: top + 'px'
            });
            var inner = outer.find(".point-inner");
            setTimeout(function () {
                // 将jquery对象转换为DOM对象
                outer[0].style.webkitTransform = 'translate3d(0,' + (endTop - top) + 'px,0)';
                inner[0].style.webkitTransform = 'translate3d(' + (endLeft - left) + 'px,0,0)';
                // 小球运动完毕恢复到原点
                setTimeout(function () {
                    outer.removeAttr("style").addClass("pointPre");
                    inner.removeAttr("style");
                }, 1000);  //这里的延迟值和小球的运动时间相关
            }, 1);
        },
        //减
        less(k){
            this.$store.commit('less',k)
            this.get()
        },
        //购物车列表
        ceng(){
            this.n++
            if(this.n%2==1){
                this.cartlist=true
            }else{
                this.cartlist=false;  
            }
        },
        //清空
        remove(){
            this.$store.state.shopCar=[];
            localStorage.removeItem('shopCar')
            localStorage.removeItem('All')
            this.get()
        }
       
    }
    // created () {
    //     // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
    //     this.$nextTick(()=> {
    //         this._initScroll()
    //         this._calculateHeight()
    //     })

    //     this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    // },
    // methods: {
    //   //初始化scroll区域
    //     _initScroll () {
    //         this.menuScroll = new BScroll(this.$refs.menuWrapper, {
    //             click: true //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
    //         })
    //         this.foodScroll = new BScroll(this.$refs.foodWrapper, {
    //             probeType: 3, //结合BScroll的接口使用,3实时派发scroll事件，探针的作用
    //             click: true
    //         })
    //         //结合BScroll的接口使用,监听scroll事件(实时派发的),并获取鼠标坐标，当滚动时能实时暴露出scroll
    //         this.foodScroll.on('scroll', (pos) => {
    //         this.scrolly = Math.abs(Math.round(pos.y))  //滚动坐标会出现负的,并且是小数,所以需要处理一下，实时取得scrollY
    //         })
    //     },
    //     _calculateHeight() {
    //         let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')  //获取每一个food的dom对象
    //         let height = 0;
    //         this.listHeight.push(height)  //初始化第一个高度为0
    //         for (let i = 0; i < foodList.length; i++) {
    //             let item = foodList[i] //每一个item都是刚才获取的food的每一个dom
    //             height += item.clientHeight //主要是为了获取每一个foods内部块的高度
    //             this.listHeight.push(height)
    //         }
    //     },
    //     selectMenu (index, event) {
    //         if (!event._constructed) { //去掉自带的click事件点击，即pc端直接返回
    //             return;
    //         }
    //         this.i=index;
    //         // debugger;
    //         let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
    //         let el = foodList[index];
    //         //类似jump to的功能,通过这个方法,跳转到指定的dom
    //         this.foodScroll.scrollToElement(el, 300);
    //     },
    // }
}
</script>

<style lang="scss" scoped>
    .aa,.box{
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        header{
            width: 100%;
            height: 2rem;
            background-color:#AB99C9;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    display: flex;
                    div:nth-of-type(1){
                        width: 25%;
                        position: relative;
                        a{
                            font-size: 0.5rem;
                            color: #fff;
                            position: absolute;
                            top: 0.1rem;
                        }
                        img{
                            width: 1.3rem;
                            margin-left: 0.2rem;
                            margin-top: 0.2rem;
                        }
                    }
                    div:nth-of-type(2){
                        flex: 1;
                        p{
                            color:#fff;
                            font-size: 0.2rem;
                        }
                        p:nth-of-type(1){
                            font-size: 0.34rem;
                            font-weight: bold;
                            padding-top: 0.2rem;
                        }
                        p:nth-of-type(2){
                            position: relative;
                            padding-top: 0.1rem;
                            .f{
                                font-size: 0.3rem;
                                color: #fff;
                                position: absolute;
                                top: -0.05rem;
                                right: 0.3rem;
                            }
                        }
                        p:nth-of-type(3){
                            padding-top: 0.1rem;
                        }
                    }
                }
            }
            .pp{
                font-size: 0.2rem;
                color:#fff;
                padding-left: 0.1rem;
                margin-top: -0.1rem;
                .ss{
                    display: inline-block;
                    color: #fff;
                    background: #F07373;
                    padding: 0.03rem 0.05rem;
                    transform:scale(0.9); 
                    margin-right: 0.1rem;
                }
            }
        }
        .cc{
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            .nav{
                width:100%;
                height: 0.8rem;
                display: flex;
                border-bottom: 0.01rem solid #EBEBEB;
                ul{
                    width: 100%;
                    display: flex;
                    list-style: none;
                    li{
                        flex: 1;
                        text-align: center;
                        line-height: 0.8rem;
                        font-size: 0.25rem;
                        color:#828282;
                    }
                    .active{
                        color:#3792E5;
                        border-bottom: 0.05rem solid #3792E5;
                    }
                }
            }
            .box1{
                width: 100%;
                height: 100%;
                display: flex;
                .center{
                    width: 100%;
                    flex:1;
                    display: flex;
                    overflow: auto;
                    .left{
                        width: 25%;
                        overflow: auto;
                        background: #F5F5F5;
                        ul{
                            width: 100%;
                            height: 100%;
                            list-style: none;
                            overflow: auto;
                            .act{
                                background:#fff;
                                border-left: 0.05rem solid #3792E5;
                            }
                            li{
                                width: 100%;
                                height:1rem;
                                color: #666;
                                font-size: 0.25rem;
                                font-weight: bold;
                                line-height: 1rem;
                                padding-left: 0.2rem;
                                border-bottom: 1px solid #eee;
                                white-space: nowrap;
                                overflow:hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    .right{
                        flex: 1;
                        height: 100%;
                        overflow: auto;
                        dl{
                            width:100%;
                            dt{
                                width: 100%;
                                height:0.8rem;
                                background-color: #eee;
                                font-size: 0.2rem;
                                line-height: 0.8rem;
                                padding-left: 0.2rem;
                                span{
                                    font-size: 0.3rem;
                                    font-weight: bold;
                                    padding-right: 0.15rem;
                                }
                            }
                            dd{
                                width:100%;
                                display: flex;
                                background: #fff;
                                padding-bottom: 0.2rem;
                                border-top:0.01rem solid #eee;
                                div:nth-of-type(1){
                                    width: 20%;
                                    position: relative;
                                    img{
                                        width: 1rem;
                                        position: absolute;
                                        top:0.01rem;
                                    }
                                }
                                div:nth-of-type(2){
                                    flex: 1;
                                    padding-left: 0.1rem;
                                    p{
                                        font-size: 0.2rem;
                                        padding: 0.05rem 0;
                                    }
                                    p:nth-of-type(1){
                                        width: 3rem;
                                        font-weight: bold;
                                        font-size: 0.25rem;
                                        white-space: nowrap;
                                        overflow:hidden;
                                        text-overflow: ellipsis;
                                    }
                                    p:nth-of-type(2){
                                        color: #999;
                                    }
                                    .p1{
                                        span{
                                            display: inline-block;
                                            color: red;
                                            border: 0.01rem solid red;
                                            padding:0.02rem 0.03rem;
                                            border-radius: 0.5rem;;
                                            transform:scale(0.8); 
                                        }
                                    }
                                    .p2{
                                        color:orangered;
                                        .gui{
                                            color: #fff;
                                            background: #3792E5;
                                            padding:0.02rem 0.05rem;
                                            border-radius: 0.05rem;
                                            float: right;
                                            margin-right: 0.1rem;
                                        }
                                        .car{
                                            width: 1.5rem;
                                            display: inline-block;
                                            float: right;
                                            margin-right: 0.2rem;
                                        }
                                        .jian{
                                            color: #3792E5;
                                            font-size: 0.35rem;
                                            opacity: 1;
                                            transition: all ease 0.5s;
                                            &>span{
                                                color:#3D3D3F;
                                                font-size: 0.25rem;
                                                padding-left: 0.15rem;
                                            }
                                        }
                                        .jia{
                                            color: #3792E5;
                                            font-size: 0.35rem;
                                            margin-left: 0.2rem;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
             }
        }
        .footer{
            width:100%;
            height:1rem;
            font-size: 0.3rem;
            display: flex;
            .left{
                width:4rem;
                background-color: #3D3D3F;
                height:100%;
                position: relative;
                .cart{
                    position:absolute;
                    width:1.2rem;
                    height:1.2rem;
                    line-height: 1rem;
                    font-size: 0.6rem;
                    color:#fff;
                    text-align: center;
                    background-color: #3D3D3F;
                    border:0.07rem solid #444444;
                    border-radius: 50%;
                    top:-0.4rem;
                    left:0.3rem;
                }
                .total{
                    padding-left: 1.6rem;
                    color:#fff;
                    p:nth-of-type(1){
                        font-size: 0.3rem;
                        font-weight: bold;
                        padding: 0.06rem 0;
                    }
                    p:nth-of-type(2){
                        font-size: 0.1rem;
                    }
                }
            }
            .right{
                flex:1;
                height:100%;
                background-color: #535356;
                text-align: center;
                line-height: 1rem;
                a{
                    color:#fff;
                    font-weight: bold;
                }
            }
        }
        .footer1{
            width:100%;
            height:1rem;
            font-size: 0.3rem;
            display: flex;
            .left{
                width:4.6rem;
                background-color: #3D3D3F;
                height:100%;
                position: relative;
                .cart{
                    position:absolute;
                    width:1.2rem;
                    height:1.2rem;
                    line-height: 1rem;
                    font-size: 0.6rem;
                    color:#fff;
                    text-align: center;
                    background-color: #3190E8;
                    border:0.07rem solid #444444;
                    border-radius: 50%;
                    top:-0.4rem;
                    left:0.3rem;
                }
                .num{
                    display: inline-block;
                    background:red;
                    font-size: 0.15rem;
                    color: #fff;
                    border-radius: 50%;
                    padding: 0.02rem 0.09rem;
                    position:absolute;
                    top: -0.25rem;
                    left: 1.2rem;
                }
                .total{
                    padding-left: 1.6rem;
                    color:#fff;
                    p:nth-of-type(1){
                        font-size: 0.3rem;
                        font-weight: bold;
                        padding: 0.06rem 0;
                    }
                    p:nth-of-type(2){
                        font-size: 0.1rem;
                    }
                }
            }
            .right{
                flex:1;
                height:100%;
                background-color: #4cd964;
                text-align: center;
                line-height: 1rem;
                a{
                    color:#fff;
                    font-weight: bold;
                }
            }
        }
    }
    .ceng{
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1rem;
        left: 0;
        background: rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        .div2{
            width: 100%;
            height: 3rem;
        }
        .div1{
            width: 100%;
            flex: 1;
            position: absolute;
            bottom: 0;
            display: flex;
            flex-direction: column;
            p{
                width:100%;
                height: 0.8rem;
                background: #eee;
                color: #666;
                font-size: 0.28rem;
                line-height: 0.8rem;
                span:nth-of-type(1){
                    float: left;
                    padding-left: 0.2rem;
                }
                span:nth-of-type(2){
                    float: right;
                    padding-right: 0.2rem;
                }
            }
            ul{
                width: 100%;
                flex: 1;
                overflow: auto;
                li{
                    width: 100%;
                    height: 0.8rem;
                    background: #fff;
                    font-size: 0.28rem;
                    line-height: 0.8rem;
                    position: relative;
                    .s1{
                        padding-left: 0.2rem;
                    }
                    .s2{
                        position: absolute;
                        right: 3rem;
                        font-size: 0.26rem;
                        color: red;
                        font-weight: bold;
                    }
                    .s4{
                        i{
                            font-size: 0.35rem;
                            color: #3190E8;
                            position: absolute;
                            top: 0.25rem;
                            right: 0.2rem;

                        }
                    }
                    .s5{
                        i{
                            color: #3190E8;
                            border-radius: 50%;
                            position: absolute;
                            top: 0.25rem;
                            right:0.95rem;
                            font-size: 0.35rem;
                        }
                    }
                    .s6{
                        position: absolute;
                        top: 0rem;
                        right:0.68rem;
                    }
                }
            }
        }
    }
    .ceng2{
        width: 100%;
        height: 100%;
        display: none;
    }
    .pointPre {
        /* 动画的小球 */
        display: none;      
    }
    .pointOuter {
        position: absolute;  
        z-index: 1;  
        /* 当小球抛出时遵循贝塞尔曲线过渡 */
        -webkit-transition: all 1s cubic-bezier(0.39,-0.4,0.83,0.23) 0s;
        transition: all 1s cubic-bezier(0.39,-0.4,0.83,0.23) 0s; 
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
</style>
