<template>
    <div>
        <div class="table">
            <el-table
                :data="list"
                :header-cell-style="getRowClass"
                highlight-current-row
                style="width: 1550px">
                <el-table-column
                type="index"
                width="120">
                </el-table-column>
                <el-table-column
                property="registe_time"
                label="注册日期"
                width="250">
                </el-table-column>
                <el-table-column
                property="username"
                label="用户姓名"
                width="250">
                </el-table-column>
                <el-table-column
                property="city"
                label="注册地址">
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
            list:[],
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
            this.axios.get('https://elm.cangdu.org/v1/users/list?offset='+(val-1)*20+'&limit=20').then(res=>{
                this.list=res.data
            }) 

            this.axios.get('https://elm.cangdu.org/v1/users/count').then(res=>{
                this.count=res.data.count
            })
        },
        handleCurrentChange(val) {
            this.val=val
            this.getdata(val)
        },
         //设置表格第一行的颜色
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:#eef1f6'
            } else {
                return ''
            }
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
    margin-left: 30px; 
}
</style>
