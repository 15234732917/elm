<template>
    <div class="addgoods">
    
        <div class="zhonglei">
            <p>选择食品种类</p>
        </div>
        <div class="foodtable">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="食品种类">
                        <el-select v-model="form.active" placeholder="请选择">
                            <el-option  v-for="item in getcategory" :label="item.name" :value="item.name">
                        </el-option>
                        </el-select>
                    </el-form-item>
                   <el-row class="form_a" :class="show? 'form_coe': ''">
                        <div class="form_con">
                            <el-form-item label="食品种类" >
                                <el-input v-model="form.category"></el-input>
                            </el-form-item>
                            <el-form-item label="种类描述" >
                                <el-input v-model="form.description"></el-input>
                            </el-form-item>
                            <el-button class="btn1" type="primary" @click="submit">提交</el-button>
                        </div>
                    </el-row>
                </el-form>
                <div class="block" @click="addchange">
                    <i class="el-icon-caret-top edit_icon" v-if="show"></i>
					<i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
					<span>添加食品种类</span>
                </div>
        </div>
        <div class="addgood">
            <p>添加食品</p>
        </div>
        <div class="table">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="食品名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="食品活动" prop="activity">
                  <el-input v-model="ruleForm.activity"></el-input>
                </el-form-item>
                <el-form-item label="食品详情" prop="description">
                  <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="上传食品图片">
                    <el-upload
                        class="avatar-uploader"
                        action="https://elm.cangdu.org/v1/addimg/food"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="'https://elm.cangdu.org/img/'+imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="食品特点">
                    <el-select
                        v-model="value"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择">
                        <el-option
                        v-for="item in data"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="食品规格" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio :label="1" @change="one">单规格</el-radio>
                        <el-radio :label="2" @change='two'>多规格</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-show='isshow'>
                    <el-form-item label="包装费" prop="packing_fee">
                        <el-input-number v-model="ruleForm.packing_fee" controls-position="top"  :min="0"></el-input-number>        
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input-number v-model="ruleForm.price" controls-position="top" :min="0" ></el-input-number>        
                    </el-form-item>
                </div>
                <div v-show='isshow2'>
                    <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
                        <el-form :model="guige">
                            <el-form-item label="规格" :label-width="formLabelWidth">
                            <el-input v-model="guige.specs" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="包装费" :label-width="formLabelWidth">
                            <el-input-number
                                v-model="guige.packing_fee"
                                :min="0"
                                label="描述文字"
                            ></el-input-number>
                            </el-form-item>
                            <el-form-item label="价格" :label-width="formLabelWidth">
                            <el-input-number
                                v-model="guige.price"
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
                    <div class="button">
                        <el-button type="primary" @click="dialogFormVisible = true">添加规格</el-button>
                    </div>
                    <el-table :data="specfoods" style="width: 100%" :row-style="rowClass" :header-cell-style="getRowClass">
                        <el-table-column prop="specs" label="规格"> </el-table-column>
                        <el-table-column prop="packing_fee" label="包装费"> </el-table-column>
                        <el-table-column prop="price" label="价格"> </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                @click="del(scope.$index,scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form>
            <el-button class="btn" type="primary" @click="submitForm('ruleForm')">确认添加食品</el-button>
        </div>
    </div>
</template>

<script>
export default {
   
    data() {
        return {
            //食品种类
            id:'',
            getcategory:[],
            show:false,
            form:{
                active:'',
                category:'',
                description:'',
            },
            //食品特点
            value:[],
            data:[{
                value:'新品',
                label:'新品'
            },{
                value:'招牌',
                label:'招牌'
            }],
            //添加食品总数据
            ruleForm: {
                name: '',
                activity:'',
                description:'',
                resource:1,
                packing_fee:0,
                price:20,

            },
            //单规格
            isshow:true,
            //双规格
            isshow2:false,
            guige: {
                specs: '',
                packing_fee: 0,
                price: 20
            },
            //添加规格弹框
            dialogFormVisible:false,
            formLabelWidth: '100px',
            //添加规格表格
            specfoods:[
                {
                    specs: '默认',
                    packing_fee: 0,
                    price: 20
                }
            ],
            //图片
            imageUrl: "",
            //
            rules: {
                name: [
                    { required: true, message: '请输入食品名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    // beforeRouteEnter(to, from, next) {
    //     next(vm => {
    //         if (to.fullPath === "/addgood") {
    //             vm.$confirm("添加食品需要选择一个商铺，先去就去选择商铺吗？", "提示", {
    //             confirmButtonText: "确定",
    //             cancelButtonText: "取消",
    //             })
    //             .then(() => {
    //                 vm.$router.push({ path: "/shoplist" });
    //             })
    //             .catch(() => {
    //                 vm.$message({
    //                 type: "info",
    //                 message: "取消"
    //                 });
    //             });
    //         }
    //     });
    // },
    mounted(){
          if(this.$route.query.restaurant_id){
              this.id=this.$route.query.restaurant_id
          }else if(!this.$route.query.restaurant_id){
              this.id=1
              this.info()
          }
          this.fooddata()
    },
     methods: {
         //添加食品种类
         //食品种类接口
         fooddata(){
          this.axios.get('https://elm.cangdu.org/shopping/getcategory/'+this.id).then((res)=>{ 
                this.getcategory=res.data.category_list     
                // console.log(this.getcategory)
            })
         },
         //展开关闭
         addchange(){
             this.show=!this.show
         },
         //页面提示框
         info(){
             this.$confirm("添加食品需要选择一个商铺，先去就去选择商铺吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                })
                .then(() => {
                    this.$router.push({ path: "/shoplist" });
                })
                .catch(() => {
                    this.$message({
                    type: "info",
                    message: "取消"
                    });
                });
         },
         //提交
         submit(){
           let data={
                description:this.form.description,
                name:this.form.category,
                restaurant_id:this.id,
           }
           this.axios.post('https://elm.cangdu.org/shopping/addcategory',data).then((res)=>{
               if(res.data.status==1){
                    this.$message({
                        type:'success',
                        message:res.data.success
                    })
                    this.form={}    
                }else{
                    this.$message({
                        type:'error',
                        message:res.data.message
                    })
                }
                this.fooddata()    
           })
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

        //规格
        one(){
            this.isshow2=false;
            this.isshow=true;
        },
        two(){
            this.isshow2=true;
            this.isshow=false;
        },
        //添加规格
        tru(){
            let obj={
                specs: this.guige.specs,
                packing_fee: this.guige.packing_fee,
                price: this.guige.price
            }
            this.specfoods.push(obj)
            this.guige.specs=''
            this.dialogFormVisible=false;
        },
        del(index){
            this.specfoods.splice(index,1)
        },

        //确认添加
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data={
                        activity:this.ruleForm.activity,   //食品活动
                        attributes:this.value,                    //食品特点
                        category_id:2426,                 //种类id
                        description:this.ruleForm.description,    //食品详情
                        image_path:this.imageUrl,         //食品图片
                        name:this.ruleForm.name,          //食品名称
                        restaurant_id:this.id,          //餐馆ID
                        specs:this.specfoods      // 规格
                    }
                    // console.log(this.ruleForm)
                    this.axios.post('https://elm.cangdu.org/shopping/addfood',data).then((res)=>{
                        console.log(res)
                        if(res.data.status==1){
                            this.$message({
                                type:'success',
                                message:res.data.success
                            })    
                            this.ruleForm={packing_fee:0,price:20,}
                            this.imageUrl=''
                            this.value=''
                            this.specfoods=[ {specs: '默认',packing_fee: 0,price: 20}]
                        }else{
                            this.$message({
                                type:'error',
                                message:res.data.message
                            })
                        }    
                    })
                } else {
                    this.$notify.error({
                        title:'错误',
                        message:'请检查输入是否正确',
                        offset:100
                    })
                    return false;
                }             
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
        //设置表格每行背景色
        rowClass:((row,index)=>{
        // console.log(row.rowIndex)
            if(row.rowIndex===1){
                return {'background-color':'#c9e5f5'}
            }else if(row.rowIndex===3){
                return {'background-color':'#e2f0e4'}
            }else{
                return ''
            }
        }),  
        

    }
}
</script>

<style lang='scss' scoped>
    .addgoods{
        width:100%;
        height:100%;
        padding-bottom: 50px;
    }
    .zhonglei{
        width:60%;
         margin: 20px auto;
         text-align: center;
         p{
             font-size: 18px;
         }
    }
    .foodtable{
        width:60%;
        margin: 20px auto;
        border-radius: 5px;
        border: 1px solid #DFE6EC;
        &:hover{
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
        }
        .el-form-item{
            padding: 10px 20px 20px 20px;
            border-bottom: 1px solid gainsboro;
            margin-bottom: 0px;
        }
        .el-select{
            width: 100%;
        }
        .btn1{
            margin-left: 100px;
        }
        .form_a{
            height: 0;
            overflow: hidden;
            transition: all 400ms;
            background: #f9fafc;
        }
        .form_con{
            background: #f9fafc;
            padding: 0 0 20px 0;
            .el-form-item{
                border-bottom: none;
                margin-bottom: 0px;
            }
        }
        .form_coe{
            height: 205px;
        }
        
        .block {
            height: 40px;
            line-height: 40px;
            color: gainsboro;
            text-align: center;
            transition: all 400ms;
            &:hover{
			    background: #f9fafc;
                 color: #20a0ff;
            }
            i {
                font-size: 16px;
                color: gainsboro;
            }
            i:hover {
                color: #20a0ff;
            }
        }
    }
    .addgood{
         width:60%;
         margin: 20px auto;
         text-align: center;
         p{
             font-size: 18px;
         }
    }
    .table{
        width:60%;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #DFE6EC;
         &:hover{
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }
        .el-table{
            border: 1px solid #DFE6EC;
        }
    }
    .span{
      font-size: 10px;
      margin-bottom: -10px;
    }
    .div1{
        display: flex;
        el-form-item{
            flex: 1;
        }
    }
    .btn{
        margin-left: 20%;
        margin-top: 20px;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 34px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    border-radius: 10px;
    text-align: center;
  }
  .avatar-uploader-icon:hover{
    border-color: #409EFF;
    border-radius: 10px;
  }
  .avatar {
    width: 140px;
    height: 140px;
    display: block; 
    border-radius: 6px;
  }
  .button{
        margin: 20px 0;
        text-align: center;
  }

 .fade-enter-active, .fade-leave-active {
    transition: all 1s ;
}
.fade-enter, .fade-leave-active{
    transform: translate3d(0,-50px,0);
    opacity: 0;
} 
</style>
