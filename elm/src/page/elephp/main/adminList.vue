<template>
    <div>
        <div class="table">
            <el-table
                :data="adminList"
                :header-cell-style="getRowClass"
                highlight-current-row
                style="width: 1550px">
                <el-table-column
                property="user_name"
                label="姓名"
                width="200">
                </el-table-column>
                <el-table-column
                property="create_time"
                label="注册日期"
                width="250">
                </el-table-column>
                <el-table-column
                property="city"
                label="地址"
                width="250">
                </el-table-column>
                <el-table-column
                property="admin"
                label="权限">
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
    </div>
</template>

<script>
export default {
    
    data() {
        return {
            adminList:[],
            count:0,
            currentPage:1,
            val:1,
        }
    },
    mounted(){
       this.getdata(this.val)
    },
    methods: {
        getdata(val){
            this.axios.get('https://elm.cangdu.org/admin/all?offset='+(val-1)*20+'&limit=20').then((res)=>{
                this.adminList=res.data.data
            })
            
            this.axios.get('https://elm.cangdu.org/admin/count').then(res=>{
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
        handleCurrentChange(val) {
            this.val=val
            this.getdata(val)
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
    border: 1px solid #ddd;
}
.page{
    margin-top: 10px;
    margin-left: 10px; 
}
</style>
