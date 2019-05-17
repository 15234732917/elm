<template>
    <div class="foodlist">
        <div class="table">
            <el-table :data="foodList" style="width: 100%"  @expand-change="change"  :row-key="row=>row.index" :row-class-name="tableRowClassName" :header-cell-style="getRowClass">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="食品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="餐馆名称">
                                <span>{{ props.row.restaurant_name }}</span>
                            </el-form-item>
                            <el-form-item label="食品 ID">
                                <span>{{ props.row.item_id }}</span>
                            </el-form-item>
                            <el-form-item label="餐馆 ID">
                                <span>{{ props.row.restaurant_id }}</span>
                            </el-form-item>
                            <el-form-item label="食品介绍">
                                <span>{{ props.row.description }}</span>
                            </el-form-item>
                            <el-form-item label="餐馆地址">
                                <span>{{ props.row.restaurant_address }}</span>
                            </el-form-item>
                            <el-form-item label="食品评分">
                                <span>{{ props.row.rating }}</span>
                            </el-form-item>
                            <el-form-item label="食品分类">
                                <span>{{ props.row.category_name }}</span>
                            </el-form-item>
                            <el-form-item label="月销量">
                                <span>{{ props.row.month_sales }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="食品名称" prop="name"></el-table-column>
                <el-table-column label="食品介绍" prop="description"></el-table-column>                     
                <el-table-column label="评分" prop="rating"></el-table-column>                     
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>  
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.item_id)">删除</el-button>           
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
                        <p>修改食品信息</p>
                        <p @click="handleshow">&times;</p>
                    </div>
                    <div class="bg_content">
                        <el-form :ref="food" :model="food" label-width="80px">
                            <el-form-item label="食品名称">
                                <el-input v-model="food.name"></el-input>
                            </el-form-item>
                            <el-form-item label="食品介绍">
                                <el-input v-model="food.description"></el-input>
                            </el-form-item>
                             <el-form-item label="食品分类">
                               <el-select v-model="value" >
                                    <el-option v-for="item in data"  :label="item"  :value="item">    
                                    </el-option>
                                </el-select>
                            </el-form-item>
                             <el-form-item label="食品图片">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://elm.cangdu.org/v1/addimg/food"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                >
                                    <img :src="'https://elm.cangdu.org/img/'+this.imageUrl" class="avatar" />
                                </el-upload>
                            </el-form-item>
                            <el-table :data="specfoods" style="width: 100%">
                                <el-table-column prop="specs" label="规格"> </el-table-column>
                                <el-table-column prop="packing_fee" label="包装费"> </el-table-column>
                                <el-table-column prop="price" label="价格"> </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="del(scope.$index,scope.row)"
                                        >删除</el-button
                                    >
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="button">
                                <el-button type="primary" @click="open">添加规格</el-button>
                            </div>
                            <div class="submit">
                                <el-button @click="quxiao">取消</el-button>
                                <el-button type="primary" @click="queding">确定</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </transition>
        <transition name='fade' mode='in-out'>
                 <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
                     <el-form :model="ruleForm">
                        <el-form-item label="规格" :label-width="formLabelWidth">
                        <el-input v-model="ruleForm.specs" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="包装费" :label-width="formLabelWidth">
                        <el-input-number
                            v-model="ruleForm.packing_fee"
                            :min="0"
                            label="描述文字"
                        ></el-input-number>
                        </el-form-item>
                        <el-form-item label="价格" :label-width="formLabelWidth">
                        <el-input-number
                            v-model="ruleForm.price"
                            :min="0"
                            label="描述文字"
                        ></el-input-number>
                        </el-form-item>
                    </el-form>
                     <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="tru">确 定</el-button>
                    </div>
                 </el-dialog>
        </transition>
    </div>
</template>

<script>

export default {
    data() {
        return {
            //修改规格默认值
            ruleForm: {
                specs: '',
                packing_fee: 0,
                price: 20
            },
            //修改食品
            food:{},
            //食品分类
            value:'',
            data:[],
            //食品规格
            specfoods:[
                {
                    specs: '默认',
                    packing_fee: 0,
                    price: 20
                }
            ],
            specs:[],
            //食品图片
            imageUrl: "",
            //食品列表
            foodList: [],
            currentPage: 1,
            count:0,
            obj:{},
            //遮罩层
            isshow:false,
            dialogFormVisible:false,
            formLabelWidth: '100px',
            val:1,
        }
    },
    mounted(){
        this.getdata(this.val)
        
    },
    methods: {
        getdata(val){
            this.axios.get('https://elm.cangdu.org/shopping/v2/foods?offset='+(val-1)*20+'&limit=20&restaurant_id=undefined')
            .then((res)=>{
                this.foodList=res.data
            })
            //总页数
            this.axios
            .get("https://elm.cangdu.org/shopping/v2/foods/count?restaurant_id=undefined")
            .then((res)=>{
                this.count=res.data.count
            })
        },
         //设置表格第一行的颜色
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:#eef1f6'
            } else {
                return ''
            }
        },
        //表格
        tableRowClassName({row,rowIndex}){
            row.index=rowIndex;
        },
         change(row){
             //食品分类
             this.axios.get('https://elm.cangdu.org/shopping/v2/menu/'+row.category_id).then(res=>{
                // console.log(row.index)
                // this.foodList[row.index]={...row,...{category_name:res.data.name}}
                this.foodList[row.index].category_name=res.data.name;
                var temObj=this.foodList[row.index];
                this.foodList.splice(row.index,1,temObj)
                // console.log(this.foodList[row.index])
                // console.log(this.foodList[row.index])
            })
            //餐馆
            this.axios.get("https://elm.cangdu.org/shopping/restaurant/"+row.restaurant_id).then((res)=>{
                    //this.foodList 是数组   row.index 是当前展开的数据的下标
                    //当前展开的数据对象，重新添加属性
                    // this.foodList[row.index]={...row,...{restaurant_name:res.data.name,restaurant_address:res.data.address}}
                this.foodList[row.index].restaurant_name=res.data.name;
                this.foodList[row.index].restaurant_address=res.data.address;
                //this.foodList   数据肯定改变了  但是不能更新到视图   vue监听不到
                var temObj=this.foodList[row.index];
                this.foodList.splice(row.index,1,temObj); //替换 //修改  数组中的对象
            })  
           
        },
        //获取cookie
        // getCookie(cookieName) {
        //     var strCookie = document.cookie;
        //     var arrCookie = strCookie.split(";");
        //     for (var i = 0; i < arrCookie.length; i++) {
        //         var arr = arrCookie[i].split("=");
        //         if (cookieName == arr[0]) {
        //         return arr[1];
        //         }
        //     }
        //     return "";
        // },
        //添加规格
        tru(){
            let obj={
                specs: this.ruleForm.specs,
                packing_fee: this.ruleForm.packing_fee,
                price: this.ruleForm.price
            }
            this.specfoods.push(obj)
            this.specs.push(obj)
            this.ruleForm.specs=''
            this.dialogFormVisible=false;
        },
        open(){
            this.dialogFormVisible=true
        },
        del(index){
            this.specfoods.splice(index,1)
        },
        
        //修改食品
        quxiao(){
            this.isshow=false;
        },
        queding(){
            this.isshow=false;
            let data={
                category_id: this.food.category_id,
                category_name: this.data[0],
                description: this.food.description,
                image_path: this.imageUrl,
                index: '',
                item_id: this.food.item_id,
                month_sales: this.food.month_sales,
                name: this.food.name,
                new_category_id: this.food.category_id,
                rating: this.food.rating,
                restaurant_address: this.food.restaurant_address,  //展开后的
                restaurant_id: this.food.restaurant_id,
                restaurant_name: this.food.restaurant_name,     //展开后的
                specfoods:this.food.specfoods,
                specs: [
                    {
                        specs: this.specfoods.specs,
                        packing_fee: this.specfoods.packing_fee,
                        price: this.specfoods.price
                    }   
                ]
                // specs:this.food.specs
            }
            // console.log(this.foodList)
            
            this.axios.post('https://elm.cangdu.org/shopping/v2/updatefood',data).then((res)=>{
                // console.log(res)
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
        handleshow(){
            this.isshow=false
        },
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
   
        //编辑
        handleEdit(index, row) {
            this.isshow=true
            this.imageUrl=row.image_path
            // console.log(row.image_path)
            this.food=this.foodList[index]
            // console.log(this.food)
            this.axios.get("https://elm.cangdu.org/shopping/v2/menu?restaurant_id="+row.restaurant_id+"&allMenu=true").then(res=>{
                // console.log(res.data)
                for(let i in res.data){
                    this.data.push(res.data[i].name)
                    // console.log(this.data)
                }
            })
            this.axios.get('https://elm.cangdu.org/shopping/v2/menu/'+row.category_id).then((res)=>{
               this.value=res.data.name
            //    console.log(res)
            })
            this.axios.get("https://elm.cangdu.org/shopping/restaurant/"+row.restaurant_id).then((res)=>{
                // console.log(res)
            })
        },
        
        //删除数据
        handleDelete(id) {
            // console.log(index, row);
            this.axios.delete('https://elm.cangdu.org/shopping/v2/food/'+id).then(res=>{
                this.$message.error(res.data.message)
            })
            
        },
        //分页
        handleCurrentChange(val) {
           this.val=val
           this.getdata(val)
        },
    }
}
</script>

<style lang='scss' scoped>
.table{
    width: 96%;
    margin: 20px auto;
}
.el-table{
    width:95%;
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
        width: 50%;
        // height: 70%;
        background: white;
        margin: 130px auto;
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
                margin-left: 75%;
            }
            .el-table__body-wrapper{
                .el-table__empty-block{
                    height: 40px;
                    .el-table__empty-text{
                        line-height: 40px;
                        font-size: 14px;
                    }
                }
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
}
</style>
