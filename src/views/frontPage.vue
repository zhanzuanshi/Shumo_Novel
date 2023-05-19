<template>
  <div class="channel">
   <Swiper></Swiper>
   <Hometype></Hometype>
   <Freebook></Freebook>
   <Hotclass></Hotclass>
  </div>
</template>

<script>
import Swiper from '../components/home/swiper.vue'
import Hometype from '../components/home/homeType.vue'
import Freebook from '../components/home/Freebook.vue'
import Hotclass from '../components/home/Hotclass.vue'
export default {
  components:{
      Swiper,
      Hometype,
      Freebook,
      Hotclass
  },
    data(){
      return{
         
      }
    },
   
}
</script>

<style lang="less" scoped>
 
</style>