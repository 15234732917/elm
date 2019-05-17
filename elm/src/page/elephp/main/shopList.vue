<template>
    <div class="shoplist">
        <div class="table">
            <el-table :data="shopList" style="width: 100%" :header-cell-style="getRowClass">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="店铺介绍">
                                <span>{{ props.row.description }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="评分">
                                <span>{{ props.row.rating }}</span>
                            </el-form-item>
                            <el-form-item label="销售量">
                                <span>{{ props.row.recent_order_num }}</span>
                            </el-form-item>
                            <el-form-item label="分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="店铺名称" prop="name"></el-table-column>
                <el-table-column label="店铺地址" prop="address"></el-table-column>                     
                <el-table-column label="店铺介绍" prop="description"></el-table-column>                     
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>  
                        <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">添加食品</el-button>            
                        <el-button size="mini" type="danger" :plain="true" @click="handleDelete(scope.row.id)">删除</el-button>           
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="20"
                background
                layout="total, prev, pager, next"
                :total=count>
                </el-pagination>
            </div>
        </div>
        <transition name='fade' mode='in-out'>
            <div class="bg" v-show="isshow">
                <div class="bg_box">
                    <div class="bg_title">
                        <p>修改店铺信息</p>
                        <p @click="handleshow">&times;</p>
                    </div>
                    <div class="bg_content">
                        <el-form :ref="shop" :model="shop" label-width="80px">
                            <el-form-item label="店铺名称">
                                <el-input v-model="shop.name"></el-input>
                            </el-form-item>
                           <el-form-item label="详细地址" >
                                <el-autocomplete
                                    popper-class="my-autocomplete"
                                    v-model="shop.address"
                                    :fetch-suggestions="querySearchAsync"
                                    placeholder="请输入详细地址"
                                    @select="handleSelect">
                                        <template slot-scope="{ item }">
                                            <span class="addr">{{ item.address }}</span>
                                        </template>
                                </el-autocomplete>
                                <span class="span">当前位置：{{city}}</span>
                            </el-form-item>
                            <el-form-item label="店铺介绍">
                                <el-input v-model="shop.description"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" >
                                <el-input v-model="shop.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="店铺分类">
                                <el-cascader
                                    v-model="shop.fenlei"
                                    :options="options"
                                    :props="{
                                        value:'name',
                                        label:'name',
                                        children:'sub_categories'
                                    }"
                                ></el-cascader>
                            </el-form-item>
                            <el-form-item label="商铺图片">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://elm.cangdu.org/v1/addimg/shop"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                >
                                    <img :src="'https://elm.cangdu.org/img/'+shop.imageUrl" class="avatar" /> 
                                </el-upload>
                            </el-form-item>
                            <div class="submit">
                                <el-button @click="quxiao">取消</el-button>
                                <el-button type="primary" @click="queding">确定</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shopList: [],
            currentPage: 1,
            count:0,

            //遮罩层
            isshow:false,
            shop:{
                id:'',
                name:'',
                address:'',
                description:'',
                phone:'',
                imageUrl:'',
                category:'',
                fenlei:[],
                rating:'',
                recent_order_num:"",
            },
            
            val:1,
            address:[],
            city:'',
            options:[],
           

        }
    },
    mounted(){
       this.getdata(this.val)
    },
    methods: {
        //获得最先数据
        getdata(val){
            //总数据
            this.axios.get('https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset='+(val-1)*20+'&limit=20')
            .then((res)=>{
                // console.log(res.data)
                this.shopList=res.data
            })
            this.axios
            .get('https://elm.cangdu.org/shopping/restaurants/count')
            .then(res=>{
                this.count=res.data.count
            })
            //当前城市
            this.axios.get('https://elm.cangdu.org/v1/cities?type=guess').then((res)=>{
                this.city=res.data.name
            })
        },
         //店铺分类
        
         //设置表格第一行的颜色
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:#eef1f6'
            } else {
                return ''
            }
        },
        //详细地址
        querySearchAsync(queryString, cb) {
             if(queryString){
                this.axios.get("https://elm.cangdu.org/v1/pois?type=search&city_id=3&keyword=" +queryString)
                .then((res)=>{
                    console.log(res.data)
                    this.address=res.data
                })
                clearTimeout(this.timeout)
                this.timeout=setTimeout(()=>{
                  cb(this.address)
                },2000*Math.random())
             }
        },
        handleSelect(item){
           this.shop.address=item.address
        },
        //修改店铺
        handleshow(){
            this.isshow=false
        },
        quxiao(){
            this.isshow=false;
        },
        //确定修改
        queding(){
            this.isshow=false;
            if(this.shop.fenlei){
                this.shop.category=this.shop.fenlei.join('/')
            }
             let data={
                address:this.shop.address,
                category:this.shop.category,
                descriptio:this.shop.descriptio,
                id:this.shop.id,
                image_path:this.imageUrl,
                name:this.shop.name,
                phone:this.shop.phone,
                rating:this.shop.rating,
                recent_order_num:this.shop.recent_order_num,
            }
            // console.log(this.shop)
            this.axios.post('https://elm.cangdu.org/shopping/updateshop',data).then(res=>{
                if(res.data.status==1){
                    this.$message({
                        type:'success',
                        message:res.data.success
                    })    
                    this.handleCurrentChange(this.val)
                }else{
                    this.$message({
                        type:'error',
                        message:res.data.message
                    })
                } 
            })
        },  
        //编辑
        handleEdit(index, row) {
            // console.log(index, row);
            this.isshow=true
            this.axios.get('https://elm.cangdu.org/shopping/v2/restaurant/category').then(res=>{
                this.options=res.data
            })
            this.shop={
                name:row.name,
                address:row.address,
                description:row.description,
                phone:row.phone,
                fenlei:row.category.split('/'),
                id:row.id,
                rating:row.rating,
                recent_order_num:row.recent_order_num,
                imageUrl:row.image_path,
            }
          
        },
        //添加商品
        handleAdd(index, row) {
            // console.log(row.id)
            this.$router.push({path:'/addgood?restaurant_id='+row.id})
        },
        //删除
         handleDelete(id) {
            // console.log(index, row);
            this.axios.delete('https://elm.cangdu.org/shopping/restaurant/'+id).then(res=>{
                this.$message.error(res.data.message)
            })
            
        },
        //分页
        handleCurrentChange(val) {
            this.val=val
            this.getdata(val)
        },
        //图片
         handleAvatarSuccess(res, file) {
            if(res.status==1){
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.imageUrl=res.image_path
                // console.log(this.imageUrl)
            }else{
                this.$message.error('上传图片失败')
            }
            
        },
        //上传图片
        beforeAvatarUpload(file) {
            const isJPG = (file.type === "image/jpeg")||(file.type === "image/png");
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 或 PNG格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
    }    
}
</script>


<style lang="scss" scoped>
.table{
    width: 96%;
    margin: 20px auto;
}
.el-table{
    width:100%;
    border:1px solid #DFE6EC;
    text-align: center;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.page{
    margin-top: 10px;
    margin-left: 10px; 
}
.bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
    .bg_box{
        width: 55%;
        background: white;
        margin: 150px auto;
        border-radius: 5px;
        padding-bottom: 30px;
        .bg_title{
            display: flex;
            justify-content: space-between;
            padding: 20px;
            p:nth-of-type(1){
                font-size: 18px;
                font-weight: bold;
            }
            p:nth-of-type(2){
                font-size: 30px;
                font-weight: bold;
                color: #cccccc; 
                cursor: pointer;
                &:hover{
                    color: #20A0FF;
                }
            }
        }.bg_content{
            padding: 0 20px;
            .button{
                margin-top: 20px;
                text-align: center;
            }
            .submit{
                margin-left: 70%;
            }
        }
    }
}
.fade-enter-active, .fade-leave-active {
    transition: all 0.2s ;
}
.fade-enter, .fade-leave-active{
    transform: translate3d(0,-100px,0);
    opacity: 0;
}  
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 34px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 10px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
  border-radius: 10px;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 6px;
}
.el-icon-plus:before {
        content: "\E6D9";
        font-weight: bold;
    }
    .el-autocomplete{
        width:100%;
    }
</style>
