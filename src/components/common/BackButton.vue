<template>
  <div class="Common" >
    <van-nav-bar clss='left'  left-arrow @click-left="back" :fixed=true :placeholder=true>
      <template #right>
        
         <van-icon name="wap-home-o" @click="home"/>

      </template>
    </van-nav-bar>
   
  </div>
</template>

<script>


export default {
    data(){
        return{

        }
    },
    methods:{
       back(){
        this.$router.go(-1)
        // console.log(1);
       },
      //  回到首页
       home(){
        this.$router.push({name:'frontpage',query:{id:this.$route.query.id}})
       }
       
    }
};
</script>

<style lang="less" scoped>
.Common{
  .van-nav-bar .van-icon{
    color: gray;
    font-size: .42rem /* 21px -> .42rem */;
  }
  /deep/.van-nav-bar__content{

  background-color:#f7f7f7;
  border-radius: 5%;
  box-shadow: 0 2px 12px rgb(100 101 102 / 12%);;
}
/deep/ .van-nav-bar__left{
  i,span{
    font-size: .4rem /* 20px -> .4rem */ /* 18px -> .36rem */ /* 17px -> .34rem */ /* 14px -> .28rem */ /* 20px -> .4rem */ /* 24px -> .48rem */;
    color: rgb(97, 97, 97);
  }
}
}
 

</style>