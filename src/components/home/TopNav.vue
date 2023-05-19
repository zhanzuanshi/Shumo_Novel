<template>
  <div class="home">
    <van-nav-bar
    >
    <template #left>
      <img :src="icons" alt="">
    <span>书墨中文网</span>
  </template>
    <template #right >
      <router-link to='search'>
    <van-icon name="search" size="0.4rem" color="black" />
      </router-link>
      <router-link to='center'>
    <van-icon name="user-o" size="0.4rem" color="black" />
      </router-link>
  </template>
    </van-nav-bar>
    
  </div>
</template>
      <script>
      export default {
      data(){
        return{
         icons:require('../../assets/imgs/home.png')
        }
      }
      }
      </script>
      
     <style lang="less" scoped>
      .van-nav-bar__right{
        i{
          padding: .2rem /* 10px -> .2rem */ .1rem /* 5px -> .1rem */;
          font-weight: 400;
        }
      }
      img{
        display: inline-block;
        width: .4rem /* 20px -> .4rem */;
        height: .4rem /* 20px -> .4rem */;
      }
      .van-nav-bar__left{
        span{
            color: black;
            font-weight: bolder;
            font-family: '宋体';
            padding-left: .1rem /* 10px -> .2rem */;
            font-size: .3rem /* 15px -> .3rem */;
        }
        
      }
      </style>
      
    
