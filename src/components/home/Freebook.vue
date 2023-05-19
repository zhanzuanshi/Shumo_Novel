<template>
  <div class="freebook">
    <van-loading size="24px" vertical v-if="isLoading">正在加载书籍详情...</van-loading>
    <div v-if="isShow">
      <div class="change">
<span class="headline">|人气飙升</span>
<span class="switch" @click="switchs">More></span>
    </div>
    <ul>
      <li v-for="item in LimitShow" :key="item.id">
        <router-link
          :to="{
            name: 'bookinfo',
            query: { id:item.id, title: item.title },
          }"
        >
          <div class="content">
            <img :src="item.cover" alt="" />
            <span class="author">作者：{{ item.author }}</span>
            <span class="title">{{ item.title }}</span>
          </div>
        </router-link>
      </li>
    </ul>
    </div>
    
  </div>
</template>

<script>
import { getFreebook } from "../../api/home/home";
export default {
  data() {
    return {
      isShow: false,
      isLoading:true,
      FreebookList: [],
      sex: "male",
      page: 1,
     
          start: 0,
          end: 5
      
    };
  },
  methods: {
    async GetFreebookList() {
      this.FreebookList = await getFreebook();
      this.isLoading=false
      this.isShow=true
      // console.log(this.FreebookList);
    },
    // 换一换
    switchs(){
     let start=Math.floor(Math.random()*5)
      let  end=start+5
            this.start=start
            this.end=end
        
    },
  },
  
  created() {
    this.GetFreebookList();
  },
  computed:{
    LimitShow:function(){
      // console.log(this.start);
      // console.log(this.end);
          return this.FreebookList.slice(this.start,this.end)
    }
  }
};
</script>

<style lang="less" scoped>
.freebook {
  border-bottom: 1px solid gainsboro;
  .change{
    display: flex;
    justify-content: space-between;
    .switch{
      color: #3c98c9;
    }
  }
  .headline{
    font-size: .32rem /* 16px -> .32rem */;
    color: #3c98c9;
  }
  padding: 15px 10px;
  ul {
    display: flex;
    overflow: auto;
    justify-content: space-between;
    li {
      .content {
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .1rem;
        padding-right: 0.1rem;
        justify-content: space-around;
        .author {
          color: #aba59a;
          font-size: 0.24rem /* 12px -> .24rem */;
        }
        .title {
          width: 2rem /* 100px -> 2rem */;
          font-size: 0.28rem;
          overflow: hidden;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-top: .1rem /* 5px -> .1rem */;
        }
        img {
          width: 2rem /* 100px -> 2rem */;
          height: 3rem /* 150px -> 3rem */;
          border-radius: 5%;
          box-shadow:  3px  3px  3px 3px whitesmoke;
        }
      }
    }
  }
}
</style>