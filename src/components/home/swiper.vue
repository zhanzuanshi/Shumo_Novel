<template>
  <div class="swiper">
    <van-swipe :autoplay="3000" :show-indicators=false>
      <van-swipe-item v-for="(image, index) in images.banners" :key="index">
      <router-link :to="{name:'bookinfo',query:{id:image.id,title:image.title}}">
        <img v-lazy="image.cover" />
      </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {getswiperImg}  from '../../api/home/home'
export default {
data() {
    return {
      images: [
        
      ],
    };
  },
  methods:{
      async GetImg(){
          this.images= await getswiperImg()
          // console.log(this.images);
      }
  },
  mounted(){
      this.GetImg()
  }
};
</script>
<style lang="less" scoped>

.swiper{
  padding-top: .2rem /* 10px -> .2rem */;
.van-swipe img{
  width: 100%;
  padding: 0px .2rem /* 10px -> .2rem */;
  height: 3.5rem ;
  border-radius: 3%;
}
}



</style>