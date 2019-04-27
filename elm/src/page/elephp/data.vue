<template>
    <div class="menu">
        <div>
            <el-col :span="12">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="rgb(50, 64, 87)"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>

                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>数据管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">用户列表</el-menu-item>
                        <el-menu-item index="1-2">商家列表</el-menu-item>
                        <el-menu-item index="1-3">食品列表</el-menu-item>
                        <el-menu-item index="1-4">订单列表</el-menu-item>
                        <el-menu-item index="1-5">管理员列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-plus"></i>
                        <span>添加数据</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">添加商铺</el-menu-item>
                        <el-menu-item index="1-2">添加商品</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-star-on"></i>
                        <span>图表</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">用户分布</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title">
                        <i class="el-icon-edit"></i>
                        <span>编辑</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">文本编辑</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title">
                        <i class="el-icon-s-tools"></i>
                        <span>设置</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">管理员设置</el-menu-item>
                            
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="6">
                        <template slot="title">
                        <i class="el-icon-warning"></i>
                        <span>说明</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">说明</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-col>
        </div> 
        <div>
            111111
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            
        }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style lang="scss" scoped>
.menu{
    width: 100%;
    height: 100%;
    box-sizing: border-box; 
    display: flex;
    div:nth-of-type(1){
        width: 18%;
        height: 980px; 
        background-color:rgb(50, 64, 87);
        &>ul{
            width: 344px;
            list-style: none;
        }
    }   
    div:nth-of-type(2){
        width: 82%;
        height: 100%;
    } 
    
}

</style>
