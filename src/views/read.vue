<template>
  <div class="read">
    <van-loading size="24px" vertical v-if="isLoading"
      >正在加载章节内容...</van-loading
    >
    <div class="container" v-if="isShow">
      <BackButton></BackButton>
      <div class="content" v-html="content.content"></div>
      <van-loading size="24px" vertical v-show="pageLoading"
        >正在加载下一章节...</van-loading
      >
      <div class="button">
        <button @click="lastContent">上一章节</button>
        <router-link
          :to="{
            name: 'content',
            query: { id: $route.query.id },
          }"
        >
          <button>章节列表</button>
        </router-link>
        <button @click="nextContent">下一章节</button>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "../components/common/BackButton.vue";
import { GetContentinfo, GetContent } from "../api/book/bookinfo";
export default {
  components: {
    BackButton,
  },
  data() {
    return {
      isShow: false,
      pageLoading: false,
      isLoading: true,
      scrollType: false,
      chapter: 0,
      id:'',
      conid: "",
      content: [],
      contentList: [],
    };
  },
  methods: {
    // 防抖函数
    debounce(fn, delay) {
      let timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fn.apply(this, arguments);
        }, delay);
      };
    },
    // 获取章节内容
    async getContentinfo() {
      this.content = await GetContentinfo(
        this.$route.query.id,
        this.$route.query.conid
      );
      this.isShow = true;
      this.isLoading = false;
      this.id=this.$route.query.id
      this.conid=this.$route.query.conid
    },
    // 获取章节
    async getContent() {
      this.contentList = await GetContent(this.$route.query.id);
      // 查找传进来的id在章节列表中的索引
      if (this.contentList) {
        const index = this.contentList.findIndex(
          (item) => item.uuid == this.$route.query.conid
        );
          this.chapter = index;
      }
    },
    // 下一章节
    async nextContent() {
      let isLoading = true; //是否有数据可以加
      this.pageLoading = true;
      // 遍历获取到的数据
      if (isLoading == true) {
        while (this.chapter < this.contentList.length) {
          this.chapter = this.chapter + 1;
          this.conid = this.contentList[this.chapter].uuid;
          break;
        }
        const res = await GetContentinfo(this.$route.query.id, this.conid); //自己封装的请求数据的方法
        this.pageLoading = false;
        if (
          res //有数据的时候加载
        ) {
          isLoading = true;
          this.content = Object.assign(this.content, res);
          document.documentElement.scrollTop = 0;
        } else {
          this.$toast({
            message: "暂无更多数据信息！",
            position: "bottom",
          });
          isLoading = false; //无数据可以加载
          this.pageLoading = false; //所有数据加载完成不再显示等待框
        }
      }
    },
    // 上一章节
    async lastContent() {
      let isLoading = true; //是否有数据可以加
      // 遍历获取到的数据
      if (isLoading == true) {
        while (this.chapter < this.contentList.length) {
          this.chapter = this.chapter - 1;
          if(this.chapter<=0){
            this.$toast({
         message:'已经是第一章了',
         type:'warning'
       })
          }else{
            this.conid = this.contentList[this.chapter].uuid;
          }
          break;
        }
        this.pageLoading = true;
        const res = await GetContentinfo(this.$route.query.id, this.conid); //自己封装的请求数据的方法
        this.pageLoading=false
        // console.log(this.i);
        // console.log(res);
        if (
          res.length !== 0 //有数据的时候加载
        ) {
          isLoading = true;
          this.content = Object.assign(this.content, res);
          document.documentElement.scrollTop = 0;
        } else {
          this.$toast({
            message: "暂无更多数据信息！",
            position: "bottom",
          });
          isLoading = false; //无数据可以加载
          this.pageLoading = false; //所有数据加载完成不再显示等待框
        }
      }
    },
  },
  created() {
    this.getContent();
    this.getContentinfo();
  },
beforeDestroy() {
    // 操作本地存储，记录阅读历史
    // 将history强制格式化为数组
    let record = JSON.parse(localStorage.getItem("history")) || [];
    // 判断历史记录中是否有当前书籍，返回书籍在记录中的索引
    if(record){
        let index = record.findIndex(   
      (item)=>item.id===this.id
    );
    // 返回-1表示没有这本书，直接将当前书籍的id和章节id存进history
    if (index == -1) {
      record.push({ id: this.id, chapterId: this.conid, chapter: this.chapter });
      window.localStorage.setItem("history", JSON.stringify(record));
    } else {
      // 当前书籍在历史记录中有记录，根据书籍在history中的索引，更改章节id
      console.log(this.id);
      record[index] = { id: this.id,chapterId:this.conid, chapter: this.chapter };
      // 用更改后的数据替换掉旧数据
      window.localStorage.setItem("history",JSON.stringify(record))
      console.log(this.id);
    }
    }
    
  },
};
</script>
      
<style lang="less" scoped>
.read {
  .container {
    // v-html样式
    .content {
      background-color: #f7f5f2;
      padding: 0.4rem /* 20px -> .4rem */;
      /deep/ h1 {
        font-size: 0.48rem /* 24px -> .48rem */;
        margin-bottom: 0.3rem /* 10px -> .2rem */;
      }
      /deep/ p {
        color: #222;
        // font-family: 楷体;
        font-size: 0.36rem /* 18px -> .36rem */;
        text-align: justify;
        text-indent: 2em;
        padding: 0.32rem /* 16px -> .32rem */ 0rem /* 0px -> 0rem */;
      }
      /deep/ div {
        font-size: 0.36rem /* 18px -> .36rem */;
      }
    }
    .button {
      display: flex;
      height: 1rem /* 50px -> 1rem */;
      justify-content: space-around;
      align-items: center;
      button {
        border: 1px solid gainsboro;
        border-radius: 5%;
        height: 0.6rem /* 30px -> .6rem */;
        min-width: 2rem /* 100px -> 2rem */;
        color: #429bcb;
      }
    }
  }
}
</style>