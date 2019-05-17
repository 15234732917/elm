import Vue from 'vue'
import vuex from 'vuex'
// import VuePersist from 'vuex-persist'
// const vuexLocal=new VuePersist({
//     storage:window.localStorage
// })
Vue.use(vuex);
const state = {
    adminInfo:{
        login:false,
    },
    imageUrl:'',
    user_id:'',
    address:{},
    username:'',
    shopCar:[],
    Allnum:0,
    Allprice:0,
}
const mutations = {
    saveAdminInfo(state,adminInfo){
        state.adminInfo = adminInfo;
        // console.log(admininfo)
        localStorage.setItem('vuex',JSON.stringify(adminInfo))
    },
    getAdminInfo(state){
        return state.adminInfo;
    },
    handleImage(state,res){
        state.imageUrl=res.image_path
    },
    login(state,res){
        state.user_id=res.data.user_id
        localStorage.setItem('vuex',res.data.user_id)
    },
    keyword(state,i){
        state.address=i
        console.log(state.address)
    },
    //更改用户名
    update(state,a){
        state.username=a
        console.log(state.username)
    },
    increase(state,item){
        if(state.shopCar.length==0){
            item.num++
            state.shopCar.push(item)
        }else{
            var bool=true;
            state.shopCar.map(i=>{
                if(i.item_id===item.item_id){
                    i.num++;
                    bool=false
                }
            })
        }
        if(bool===true){
            item.num++
            state.shopCar.push(item)
        }
        localStorage.setItem('shopCar',JSON.stringify(state.shopCar))
        getCarInfo(state)
    },
    reduce(state,item){
        state.shopCar.map((i,index)=>{
            if(i.item_id===item.item_id){
                if(i.num>0){
                    i.num--
                }else{
                    state.shopCar.splice(index,1)
                }
            }
        })
        localStorage.setItem('shopCar',JSON.stringify(state.shopCar))
        getCarInfo(state)
    },
    clear(state){
        delLocal(state)
    }
}
const actions = {
    async getAdminData({commit}){
        try{
            const res = await getAdminInfo()
            if(res.status === 1){
                commit('saveAdminInfo',res.data)
            }else{
                throw new Error(res.type)
            }
        }catch(err){
            console.log(err.message)
        }
    }
}

function getCarInfo(state){
    state.Allnum = 0;
    state.Allprice = 0;
    state.shopCar.map(item=>{
        state.Allnum += item.num
        state.Allprice += item.specfoods[0].price * item.num
        let obj = {}
        obj.Allnum = state.Allnum
        obj.Allprice = state.Allprice
        localStorage.setItem('All', JSON.stringify(obj))
    })
}
function delLocal(state){
    for(var i=0;i<state.shopCar.length;i++){
        state.shopCar[i].num=0
    }
    state.shopCar.splice(0)
    state.Allprice=0
    state.Allnumber=0
    let obj={}
    obj.Allprice= state.Allprice
    obj.Allnumber=state.Allnumber
}
export default new vuex.Store({
    state,
    mutations,
    actions,
    getters:{},
    modules:{},
    // plugins:[vuexLocal.plugin]
})