<template>
    <div class="orderlist">
        <div class="table">
            <el-table :data="orderList" style="width: 100%" @expand-change="change" :row-key="row=>row.index" :row-class-name="tableRowClassName" :header-cell-style="getRowClass">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户名">
                            <span>{{ props.row.username }}</span>
                        </el-form-item>
                        <el-form-item label="店铺名称">
                            <span>{{ props.row.restaurant_name }}</span>
                        </el-form-item>
                        <el-form-item label="收货地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ props.row.restaurant_id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.restaurant_address }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="订单 ID" prop="id"></el-table-column>
            <el-table-column label="总价格" prop="total_amount"></el-table-column>                     
            <el-table-column label="订单状态" prop="status_bar.title"></el-table-column>                     
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
            orderList: [],
            currentPage: 1,
            count:0,
            val:1,
        }
    },
    mounted(){
        this.getdata(this.val)
        
    },
    methods: {
        getdata(val){
            this.axios.get('https://elm.cangdu.org/bos/orders?offset='+(val-1)*20+'&limit=20&restaurant_id=undefined').then(res=>{
                this.orderList=res.data
            })

            this.axios.get("https://elm.cangdu.org/bos/orders/count?restaurant_id=undefined").then((res)=>{
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
        //分页
        handleCurrentChange(val) {
           this.val=val
           this.getdata(val)
        },

         tableRowClassName({row,rowIndex}){
            row.index=rowIndex;
        },
         change(row){
             //用户
             this.axios.get('https://elm.cangdu.org/v1/user/'+row.user_id).then(res=>{
                // console.log(row.index)
                
                this.orderList[row.index].username=res.data.username;
                var temObj=this.orderList[row.index];
                this.orderList.splice(row.index,1,temObj)
                // console.log(this.orderList[row.index])
            
            })
            //地址
            this.axios.get("https://elm.cangdu.org/v1/addresse/"+row.address_id).then((res)=>{
            
                   this.orderList[row.index].address=res.data.address;
                //    this.orderList[row.index].restaurant_address=res.data.address;
                    var temObj=this.orderList[row.index];
                     this.orderList.splice(row.index,1,temObj)
                       
            })  
            //店铺
            this.axios.get('https://elm.cangdu.org/shopping/restaurant/'+row.restaurant_id).then((res)=>{
                  this.orderList[row.index].restaurant_address=res.data.address;
                  var temObj=this.orderList[row.index];
                     this.orderList.splice(row.index,1,temObj)
            })
         }    
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
</style>

