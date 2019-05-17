import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
// import HelloWorld from '@/components/HelloWorld'
// import Demoone from '@/page/project/Demoone'
// import Demotwo from '@/page/project/Demotwo'
// import Demothree from '@/page/project/Demothree'
// import Demofour from '@/page/project/Demofour'
// import Demofive from '@/page/project/Demofive'
// import Demosix from '@/page/project/Demosix'
// import home from '@/page/home/home'
// import city from '@/page/city/city'

const home = resolve => require(['../page/home/home.vue'], resolve)
const city = resolve => require(['../page/city/city.vue'], resolve)
const msite = resolve => require(['../page/project/msite.vue'], resolve)
const search = resolve => require(['../page/project/search.vue'], resolve)
const Demothree = resolve => require(['../page/project/Demothree.vue'], resolve)
const shop = resolve => require(['../page/project/shop.vue'], resolve)
const food = resolve => require(['../page/project/food.vue'], resolve)
const confirmOrder= resolve => require(['../page/project/confirmOrder.vue'], resolve)
const order = resolve => require(['../page/project/order.vue'], resolve)
const profile = resolve => require(['../page/project/profile.vue'], resolve)
const aaa = resolve => require(['../page/project/aaa.vue'], resolve)
const userlogin = resolve => require(['../page/project/my/Login.vue'], resolve)
const setusername= resolve => require(['../page/project/my/setusername.vue'], resolve)
const address = resolve => require(['../page/project/my/address.vue'], resolve)
const add = resolve => require(['../page/project/my/add.vue'], resolve)
const addDetail = resolve => require(['../page/project/my/addDetail.vue'], resolve)
const forget = resolve => require(['../page/project/my/forget.vue'], resolve)
const info = resolve => require(['../page/project/my/info.vue'], resolve)
const login = resolve => require(['../page/elephp/login.vue'], resolve)
const manage = resolve => require(['../page/elephp/manage.vue'], resolve)
const main = resolve => require(['../page/elephp/main.vue'], resolve)
const userlist = resolve => require(['../page/elephp/main/userList.vue'], resolve)
const shoplist = resolve => require(['../page/elephp/main/shopList.vue'], resolve)
const foodlist = resolve => require(['../page/elephp/main/foodList.vue'], resolve)
const orderlist = resolve => require(['../page/elephp/main/orderList.vue'], resolve)
const adminlist = resolve => require(['../page/elephp/main/adminList.vue'], resolve)
const addshop = resolve => require(['../page/elephp/main/addShop.vue'], resolve)
const addgood = resolve => require(['../page/elephp/main/addGoods.vue'], resolve)
const visitor = resolve => require(['../page/elephp/main/visitor.vue'], resolve)
const vueedit = resolve => require(['../page/elephp/main/vueEdit.vue'], resolve)
const adminset = resolve => require(['../page/elephp/main/adminSet.vue'], resolve)
const explain = resolve => require(['../page/elephp/main/explain.vue'], resolve)
const fei = resolve => require(['../page/project/fei.vue'], resolve)


Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      name: 'app',
      component: App,
      redirect: '/home',
      children: [{
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/fei',
          name: 'fei',
          component: fei
        },
        {
          path: '/city/:cityid',
          name: 'city',
          component: city
        },
        {
          path: '/msite/:geohash',
          name: 'msite',
          component: msite
        },
        {
          path: '/search/:geohash',
          name: 'search',
          component: search
        },
        {
          path: '/demothree',
          name: 'demothree',
          component: Demothree
        },
        {
          path: '/shop/:geohash/:id',
          name: 'shop',
          component: shop
        },
        {
          path: '/food/:title',
          name: 'food',
          component: food,
        },
        {
          path: '/confirmOrder',
          name: 'confirmOrder',
          component: confirmOrder,
        },
        {
          path: '/order',
          name: 'order',
          component: order,
        },
        {
          path: '/profile',
          name: 'profile',
          component: profile,
        },
        {
          path: '/aaa',
          name: 'aaa',
          component: aaa,
        },
        {
          path: '/userlogin',
          name: 'userlogin',
          component: userlogin,
        }, 
        {
          path: '/profile/info',
          name: 'profile/info',
          component: info,
        }, 
        {
          path: '/profile/info/setusername',
          name: 'profile/info/setusername',
          component: setusername,
        }, 
        {
          path: '/profile/info/address',
          name: 'profile/info/address',
          component: address,
        }, 
        {
          path: '/profile/info/address/add',
          name: 'profile/info/address/add',
          component: add,
        }, 
        {
          path: '/profile/info/address/add/addDetail',
          name: 'profile/info/address/add/addDetail',
          component: addDetail,
        }, 
        {
          path: '/forget',
          name: 'forget',
          component: forget,
        }, 
        {
          path: '/login',
          name: 'login',
          component: login,
        },
        {
          path: '/manage',
          name: 'manage',
          component: manage,
          redirect:'/main',
          children:[
            {
              path: '/main',
              name: 'main',
              component: main,
            },
            {
              path: '/userlist',
              name: 'userlist',
              component: userlist,
              meta:{
                title:"数据管理",
                name:"用户列表"
              },
            },
            {
              path: '/shoplist',
              name: 'shoplist',
              component: shoplist,
              meta:{
                title:"数据管理",
                name:"商家列表"
              },
            },
            {
              path: '/foodlist',
              name: 'foodlist',
              component: foodlist,
              meta:{
                title:"数据管理",
                name:"食品列表"
              },
            },
            {
              path: '/orderlist',
              name: 'orderlist',
              component: orderlist,
              meta:{
                title:"数据管理",
                name:"订单列表"
              },
            },
            {
              path: '/adminlist',
              name: 'adminlist',
              component: adminlist,
              meta:{
                title:"数据管理",
                name:"管理员列表"
              },
            },
            {
              path: '/addshop',
              name: 'addshop',
              component: addshop,
              meta:{
                title:"添加数据",
                name:"添加商铺"
              },
            },
            {
              path: '/addgood',
              name: 'addgood',
              component: addgood,
              meta:{
                title:"添加数据",
                name:"添加商品"
              },
            },
            {
              path: '/addgood?restaurant_id=/:id',
              name: 'addgood',
              component: addgood,
              meta:{
                title:"添加数据",
                name:"添加商品"
              },
            },
            {
              path: '/visitor',
              name: 'visitor',
              component: visitor,
              meta:{
                title:"图表",
                name:"用户分布"
              },
            },
            {
              path: '/vueedit',
              name: 'vueedit',
              component: vueedit,
              meta:{
                title:"编辑",
                name:"文本编辑"
              },
            },
            {
              path: '/adminset',
              name: 'adminset',
              component: adminset,
              meta:{
                title:"设置",
                name:"管理员设置"
              },
            },
            {
              path: '/explain',
              name: 'explain',
              component: explain,
              meta:{
                title:"说明",
                name:"说明"
              },
            },
          ]
        },
      ]
    },


  ]
})

router.beforeEach((to, from, next) => { //路由进入前
  // console.log(to); // to 当前要去的路由  from 从哪里来
  if (to.path != from.path) {
    next(); //不调用next的时候  我就不跳转
  }
})

export default router;
