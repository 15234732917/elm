<template>
  <div class="waterfall-wrapper">
    <ul class="left-waterfall" ref="left">
      <li class="item" v-for="(item, index) in leftItems" v-bind:style=" {height:item.height+'px'}"><img :src="'../../images/src/'+item.img" ></li>
    </ul>
    <ul class="right-waterfall" ref="right">
      <li class="item" v-for="(item, index) in rightItems" v-bind:style=" {height:item.height+'px'}"><img :src="item.img" ></li>
    </ul>
  </div>
</template>


<script>
export default {
  data () {
    return {
      data: [
        {
          img:'14.png',
          height: 100
        },
        {
            img:'13.png',
          height: 110
        },
        {
             img:'13.png',
          height: 150
        },
        {
             img:'13.png',
          height: 200
        },
        {
             img:'13.png',
          height: 300
        },
        {
             img:'13.png',
          height: 100
        },{
             img:'13.png',
          height: 222
        },{
             img:'13.png',
          height: 111
        },{
             img:'13.png',
          height: 123
        },{
             img:'13.png',
          height: 451
        },
      ],
      leftItems: [],
      rightItems: []
    }
  },
  mounted () {
    // TODO GET DISPLAY_DATA
    this.updateWaterfall()
  },
  methods: {
    updateWaterfall () {
      const leftHeight = this.$refs.left.clientHeight
      const rightHeight = this.$refs.right.clientHeight
      console.log(leftHeight)
      console.log(rightHeight) 
      let item = this.data.shift()
      
      if (item == null) {
        return
      }
      if (leftHeight <= rightHeight) {
        this.leftItems.push(item)
      }
      else {
        this.rightItems.push(item)
      }
      this.$nextTick(function () {
        console.log('进来了')
        this.updateWaterfall()
      })
    }
  }
}
</script>


<style scoped>
*{
  margin: 0;
  padding: 0;
}
    .waterfall-wrapper{
        overflow: auto;
        height: 100%;
        width: 100%;
    }
  ul {
    width: 40%;
  }


  ul.left-waterfall {
    float: left;
    list-style: none;
  }


  ul.right-waterfall {
    float: right;
    list-style: none;
  }


  li.item {
    width: 100%;
    background-color: aqua;
    /* margin: 10px; */
    margin-top: 10px;
  }

  li.item img{
    width: 100%;
    height: 100%;
  }


</style>