<template>
    <div>
        <div id="myChart" :style="{width: '1000px', height: '500px'}"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[],
        }
    },
    mounted(){
        this.axios.get('https://elm.cangdu.org/v1/user/city/count').then((res)=>{
            this.data=res.data.user_city
            console.log(this.data)
            this.drawLine()
        })
    },
    methods:{
        drawLine(){
        // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                 title : {
                    text: '用户分布',
                    x:'center'
                },
                // tooltip : {
                //     trigger: 'item',
                //     formatter: "{a} <br/>{b} : {c} ({d}%)"
                // },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['北京','上海','深圳','杭州','其他']
                },
                series : [
                    {
                        name: '来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:this.data.beijing, name:'北京'},
                            {value:this.data.shanghai, name:'上海'},
                            {value:this.data.shenzhen, name:'深圳'},
                            {value:this.data.hangzhou, name:'杭州'},
                            {value:this.data.qita, name:'其他'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        }
    }

    
}
</script>

<style lang='scss' scoped>
#myChart{
      margin-top: 30px;
      padding-left: 50px;
    }
</style>
