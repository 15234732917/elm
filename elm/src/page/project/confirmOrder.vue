<template>
    <div class="box">
        <head-top :signinUp="true"  :goback="true">
            <p slot="search" class="head_logo">确认订单</p>
        </head-top>
    </div>
</template>

<script>
import HeadTop from "../../components/header/head";
export default {
    components: {
        HeadTop,
    },
    data(){
        return{
             
        }
    },
}
</script>

<style lang='scss' scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    header {
        p {
            font-size: 1rem;
            color: white;
            font-weight: bold;
        }
    }
}    
</style>
