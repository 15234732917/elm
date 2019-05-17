<template>
    <div>
       <div class="body">
          <p>数据统计</p >
          <div class="body-1">
              <div class="body1-1">
                  当日数据：
              </div>
              <div class="body1-1 body1-2">
                  <span>{{sevenDate[0][0]}}</span><span>新增用户</span>
              </div>
              <div class="body1-1 body1-2">
                  <span>{{sevenDate[1][0]}}</span><span>新增订单</span>
              </div>
              <div class="body1-1 body1-2">
                  <span>{{sevenDate[2][0]}}</span><span>新增管理员</span>
              </div>
          </div>

          <div class="body-2">
              <div class="body2-1">
                  总数据：
              </div>
              <div class="body2-1 body2-2">
                  <span>{{register}}</span><span>注册用户</span>
              </div>
              <div class="body2-1 body2-2">
                  <span>{{order}}</span><span>订单</span>
              </div>
              <div class="body2-1 body2-2">
                  <span>{{Administrator}}</span><span>管理员</span>
              </div>
          </div>
        </div>
        <div id="myChart" :style="{width: '1000px', height: '450px'}"></div>
    </div>
</template>

<script>
import dtime from 'time-formater'
export default {
    data(){
        return{
            register:'',
            order:'',
            Administrator:'',
            sevenDate:[[],[],[]],
            dateArr:[]
        }
    },
    mounted(){
         this.getSevenData()
         this.axios.get('https://elm.cangdu.org/v1/users/count')
         .then((res)=>{
           this.register=res.data.count
         })
         this.axios.get('https://elm.cangdu.org/bos/orders/count')
         .then((res)=>{
           this.order=res.data.count
         })
         this.axios.get('https://elm.cangdu.org/admin/count')
         .then((res)=>{
           this.Administrator=res.data.count
         })
    },
    
    methods:{
       
        getSevenData(){
            const apiArr=[[],[],[]];
            let dateArr=[]
            for(var i=0;i<7;i++){
              let date=new Date()
              date.setDate(date.getDate()-i)
              const today=dtime(date).format("YYYY-MM-DD")
              dateArr.push(today)
              // console.log(dateArr)
            }
            dateArr.map((item)=>{
              apiArr[0].push(this.getData('user',item))
              apiArr[1].push(this.getData('order',item))
              apiArr[2].push(this.getData('admin',item))
              // console.log(item)
              this.dateArr.push(item)
              // console.log(dateArr)
            })
            let arr=[...apiArr[0],...apiArr[1],...apiArr[2]]
            // console.log(apiArr)
            let resArr=[[],[],[]]
            Promise.all(arr).then((res)=>{
              res.forEach((item,index)=>{
                if(item.data.status==1){
                  resArr[Math.floor(index/7)].push(item.data.count)
                }
              })
              this.sevenDate=resArr;
              this.drawLine()
            })
        },
        getData(url,today){
            return new Promise((s,e)=>{
              this.axios.get('https://elm.cangdu.org/statis/'+url+'/'+today+'/count').then(res=>{
                s(res)
              }).then((res)=>{
                e(res)
              })
            })
        },



      
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
    let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({


          title: {
            text: '走势图'
          },


          tooltip: {
            trigger: 'axis'
          },



          legend: {
            data:['新注册用户','新增订单',"新增管理员"]
          },


          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: [this.dateArr[6],this.dateArr[5],this.dateArr[4],this.dateArr[3],this.dateArr[2],this.dateArr[1],this.dateArr[0]]
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name:'新注册用户',
              type:'line',
              data:[this.sevenDate[0][6],this.sevenDate[0][5],this.sevenDate[0][4],this.sevenDate[0][3],this.sevenDate[0][2],this.sevenDate[0][1],this.sevenDate[0][0]],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
            },
            {
              name:'新增订单',
              type:'line',
              data:[this.sevenDate[1][6],this.sevenDate[1][5],this.sevenDate[1][4],this.sevenDate[1][3],this.sevenDate[1][2],this.sevenDate[1][1],this.sevenDate[1][0]],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
            },{
          name:'新增管理员',
            type:'line',
            data:[this.sevenDate[2][6],this.sevenDate[2][5],this.sevenDate[2][4],this.sevenDate[2][3],this.sevenDate[2][2],this.sevenDate[2][1],this.sevenDate[2][0]],
            markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
        }


          ]
        });
      }
    }

 }

</script>

<style lang='scss' scoped>
.body{
      width: 100%;
      
      p:nth-of-type(1){
        text-align: center;
        margin-top: 20px;
        font-size: 30px;
      }
      .body-1{
        width: 100%;
        font-size: 30px;
        padding-top: 20px;
        line-height: 30px;
        .body1-1{
          margin-left: 10px;
          display: inline-block;
          width: 250px;
          height: 35px;
          line-height: 35px;
          background-color: #ff9800;
          color: white;
          text-align: center;
          border-radius: 5px;
          font-size: 19px;
          span:nth-of-type(2){
            font-size: 16px;
          }
        }
        .body1-2{
          background-color: #e5e9f2;
          color: black;
        }
      }
      .body-2{
        width: 100%;
        font-size: 30px;
        padding-top: 20px;
        line-height: 30px;
        .body2-1{
         margin-left: 10px;
          display: inline-block;
          width: 250px;
          height: 35px;
          line-height: 35px;
          background-color: #20a0ff;
          color: white;
          text-align: center;
          border-radius: 5px;
          font-size: 19px;
          span:nth-of-type(2){
            font-size: 16px;
          }
        }
        .body2-2{
          background-color: #e5e9f2;
          color: black;
        }
      }
    }
    #myChart{
      margin-top: 70px;
      padding-left: 50px;
    }
    
</style>
