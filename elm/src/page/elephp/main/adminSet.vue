<template>
    <div >
        <div class="adminset">
            <header>管理员信息</header>
            <div class="adminlist">
               <el-form :model="admin" :ref="admin">
                    <el-form-item label="姓名：">
                             <span>{{ admin.user_name }}</span>
                    </el-form-item>
                    <el-form-item label="注册时间：">
                             <span>{{ admin.create_time }}</span>
                    </el-form-item>
                    <el-form-item label="管理员权限：">
                             <span>{{ admin.admin }}</span>
                    </el-form-item>
                    <el-form-item label="管理员ID：">
                             <span>{{ admin.id }}</span>
                    </el-form-item>
                    <el-form-item label="更换头像：">
                        <el-upload
                            class="avatar-uploader"
                            :action="'https://elm.cangdu.org/admin/update/avatar/'+admin.id"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            >
                                <img v-if='imageUrl' :src="'https://elm.cangdu.org/img/'+imageUrl" class="avatar" />
                                <img v-else :src="'https://elm.cangdu.org/img/'+this.admin.avatar" class="avatar-uploader-icon" />
                        </el-upload>    
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  
    data(){
        return{
            admin:{},
            imageUrl:'',
        }
    },
    mounted(){
        this.axios.get('https://elm.cangdu.org/admin/info').then((res)=>{
            this.admin=res.data.data
        })
    },
    methods:{
        handleAvatarSuccess(res, file) {
            if(res.status==1){
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.imageUrl=res.image_path
                // window.location.reload()
                this.$store.commit('handleImage',res)
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

<style lang='scss' scoped>
.adminset{
    width: 100%;
    height: 100%;
    font-size: 16px;
    margin: 20px auto;
    header{
        font-size: 20px;
        text-align: center;
    }
    .adminlist{
        width: 60%;
        background-color: #f9fafc;
        min-height: 500px;
        margin: 20px auto 0;
        border-radius: 10px;
        .el-form{
           margin: 20px;
           padding: 10px;
        }
        
    }
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
