<template>
  <div class="addshop">
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop='address'>
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="ruleForm.address"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入详细地址"
            @select="handleSelect">
                <template slot-scope="{ item }">
                    <span class="addr">{{ item.address }}</span>
                </template>
          </el-autocomplete>
          <span class="span">当前位置：{{city}}</span>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺标语">
          <el-input v-model="ruleForm.promotion_info"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类">
          <el-cascader
            v-model='ruleForm.fenlei'
            :options="options"
            :props="{
               value:'name',
               label:'name',
               children:'sub_categories'
            }"
           
          ></el-cascader>
        </el-form-item>
        <el-form-item label="店铺特点">
          <div class="div1">
            <el-form-item label="品牌保证" prop="pinpai">
              <el-switch v-model="ruleForm.pinpai"></el-switch>
            </el-form-item>
            <el-form-item label="蜂鸟专送" prop="fengniao">
              <el-switch v-model="ruleForm.fengniao"></el-switch>
            </el-form-item>
            <el-form-item label="新开店铺" prop="xindian">
              <el-switch v-model="ruleForm.xindian"></el-switch>
            </el-form-item>
          </div>
          <div class="div1">
            <el-form-item label="外卖保" prop="waimai">
              <el-switch v-model="ruleForm.waimai"></el-switch>
            </el-form-item>
            <el-form-item label="准时达" prop="zhunshi">
              <el-switch v-model="ruleForm.zhunshi"></el-switch>
            </el-form-item>
            <el-form-item label="开发票" prop="fapiao">
              <el-switch v-model="ruleForm.fapiao"></el-switch>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input-number v-model="ruleForm.float_delivery_fee" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="起送价">
          <el-input-number v-model="ruleForm.float_minimum_order_amount" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-select
            v-model="ruleForm.startTime"
            :picker-options="{
              start: '05:30',
              step: '00:15',
              end: '23:30'
            }"
            placeholder="起始时间"
          >
          </el-time-select>
          <el-time-select
            v-model="ruleForm.endTime"
            :picker-options="{
              start: '05:30',
              step: '00:15',
              end: '23:30'
            }"
            placeholder="结束时间"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="上传店铺头像">
          <el-upload
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/shop"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrla" :src="'https://elm.cangdu.org/img/'+imageUrla" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传营业执照">
          <el-upload
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/shop"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrlb" :src="'https://elm.cangdu.org/img/'+imageUrlb" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传餐饮服务许可证">
          <el-upload
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/shop"
            :show-file-list="false"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrlc" :src="'https://elm.cangdu.org/img/'+imageUrcl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="优惠活动">
          <el-select v-model="value" placeholder="满减优惠">
            <el-option
              v-for="item in data"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <el-button type="text" @click="open(item.label)">{{ item.label }}</el-button>
            </el-option>
          </el-select>
        </el-form-item>
        <el-table :data="tableData" style="width: 100%" :row-style="rowClass" :header-cell-style="getRowClass">
          <el-table-column prop="icon_name" label="活动标题"> </el-table-column>
          <el-table-column prop="name" label="活动名称"> </el-table-column>
          <el-table-column prop="description" label="活动详情"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      tableData: [
        {
           icon_name: "减",
           name: "满减优惠", 
           description: "满30减5，满60减8"
        }
      ],
      data: [
        {
          value: "选项1",
          label: "满减优惠"
        },
        {
          value: "选项2",
          label: "优惠大酬宾"
        },
        {
          value: "选项3",
          label: "新用户立减"
        },
        {
          value: "选项4",
          label: "进店领券"
        }
      ],
      value: "",
      ruleForm: {
        name: "",
        address:'',
        phone:'',
        description:'',
        promotion_info:'',
        pinpai: true,
        fengniao: true,
        xindian: true,
        waimai: true,
        zhunshi: true,
        fapiao: true,
        float_delivery_fee: 5,
        float_minimum_order_amount: 20,
        startTime: "",
        endTime: "",
        category:'',
        fenlei:['快餐便当','简餐'],
      },
      city:'',
      timeout:null,
      address:[],
      imageUrla: "",
      imageUrlb: "",
      imageUrlc: "",
      options: [],
     
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
      }
    };
  },
  mounted(){
      //食品分类
      this.axios.get("https://elm.cangdu.org/shopping/v2/restaurant/category").then(res=>{
          this.options=res.data
      })
      //当前城市
      this.axios.get('https://elm.cangdu.org/v1/cities?type=guess').then((res)=>{
        this.city=res.data.name
      })
  },
  methods: {
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
           this.ruleForm.address=item.address
        },
        //创建新店铺
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           if(this.ruleForm.fenlei){
                this.ruleForm.category=this.ruleForm.fenlei.join('/')
            }
          let data={
            address:this.ruleForm.address, //详细地址
            bao:this.ruleForm.waimai,    //外卖保
            business_license_image:this.imageUrlb,  //上传营业执照
            category: this.ruleForm.category,    //店铺分类
            catering_service_license_image:this.imageUrlc,   //上传餐饮服务许可证
            delivery_mode:this.ruleForm.fengniao,   //蜂鸟专送
            description:this.ruleForm.description,   //店铺简介
            endTime:this.ruleForm.endTime,   //结束时间
            float_delivery_fee:this.ruleForm.float_delivery_fee,  //配送费
            float_minimum_order_amount:this.ruleForm.float_minimum_order_amount,  //起送价
            image_path:this.imageUrla,   //店铺图片 
            is_premium:this.ruleForm.pinpai,   //品牌保证
            latitude:40.176441,    
            longitude:116.163191,
            name:this.ruleForm.name,      //店铺名称
            new:this.ruleForm.xindian,    //新开店铺
            phone:this.ruleForm.phone,     //联系电话
            piao:this.ruleForm.fapiao,      //开发票
            promotion_info:this.ruleForm.promotion_info, //店铺标语
            startTime:this.ruleForm.startTime,  //开始时间
            zhun:this.ruleForm.zhunshi,   //准时达
            activities:this.tableData     //优惠活动
          }
          // console.log(this.imageUrla)
          this.axios.post('https://elm.cangdu.org/shopping/addShop',data).then((res)=>{
            console.log(res)
              if(res.data.status==1){
                  this.$message({
                      type:'success',
                      message:res.data.sussess
                  })
                  this.ruleForm={
                    name: "",
                    address:'',
                    phone:'',
                    description:'',
                    promotion_info:'',
                    pinpai: true,
                    fengniao: true,
                    xindian: true,
                    waimai: true,
                    zhunshi: true,
                    fapiao: true,
                    float_delivery_fee: 5,
                    float_minimum_order_amount: 20,
                    startTime: "",
                    endTime: "",
                    category:'',
                  }
                  this.imageUrla=''
                  this.imageUrlb=''
                  this.imageUrlc=''
                  this.options=[]
                  this.tableData=[ {icon_name: "减",name: "满减优惠", description: "满30减5，满60减8"}]
              }else{
                  this.$message({
                      type:'error',
                      message:res.data.message
                  })
              }    
          })
        }else {
            this.$notify.error({
              title:'错误',
              message:'请检查输入是否正确',
              offset:100
            })
            return false;
        }                 
      })
      
    },
    //上传图片
    handleAvatarSuccess1(res, file) {
     if(res.status==1){
                // this.imageUrl = URL.createObjectURL(file.raw);
          this.imageUrla=res.image_path
                // console.log(this.imageUrl)
      }else{
          this.$message.error('上传图片失败')
      }
     
    },
    handleAvatarSuccess2(res, file) {
      
      if(res.status==1){
                // this.imageUrl = URL.createObjectURL(file.raw);
          this.imageUrlb=res.image_path
                // console.log(this.imageUrl)
      }else{
          this.$message.error('上传图片失败')
      }

    },
    handleAvatarSuccess3(res, file) {
     
      if(res.status==1){
                // this.imageUrl = URL.createObjectURL(file.raw);
          this.imageUrlc=res.image_path
                // console.log(this.imageUrl)
      }else{
          this.$message.error('上传图片失败')
      }
    },
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
    
    //删除
    handleDelete(index, row) {
      // console.log(index, row);
      this.tableData.splice(index,1)
    },
    
    //优惠活动
    open(e) {
      this.$prompt("请输入活动详情", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
         
            let obj={}
            if(e==='满减优惠'){
               obj.icon_name='减'
            }else if(e==='优惠大酬宾'){
                obj.icon_name='特'
            }else if(e==='新用户立减'){
                 obj.icon_name='新'
            }else{
                obj.icon_name='领'
            } 
            obj.name=e
            obj.description=value
            this.tableData.push(obj)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.addshop {
  margin: 0;
  padding: 0;
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
  width: 140px;
  height: 140px;
  line-height: 140px;
  border-radius: 10px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
  border-radius: 10px;
}
.avatar {
  width: 140px;
  height: 140px;
  display: block;
  border-radius: 6px;
}
.form {
  width: 55%;
  margin-left: 230px;
  padding: 20px;
  .el-table {
    border: 1px solid #dfe6ec;
  }
}
.span {
  font-size: 10px;
  margin-bottom: -10px;
}
.el-form-item {
  .el-form-item__content {
    text-align: center;
    .el-button {
      margin: 20px 0 0 30%;
    }
  }
}
.div1 {
  display: flex;
  el-form-item {
    flex: 1;
  }
}
.el-message {
  & > i {
    font-size: 15px;
  }
}
.el-icon-plus:before {
        content: "\E6D9";
        font-weight: bold;
    }
    .el-autocomplete{
        width:100%;
    }

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
