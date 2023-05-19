<template>
  <div class="Chelf">
    <ul class="book_list">
      <div class="checkBook" v-if="book">
        <span>您还没有书籍添加到书架</span>
      </div>
      <van-loading size="24px" vertical v-if="isLoading"
        >正在加载书架详情...</van-loading
      >
      <li v-for="items in bookdetail" :key="items.id"  class="href">
        <router-link
          :to="{
            name: 'bookinfo',
            query: { id: items.id, title: items.title },
          }"
         
        >
          <div class="left">
            <img v-lazy="items.cover" alt="" />
          </div>
        </router-link>
          <div class="right">
            <div class="right-content">
              <span class="title">{{ items.title }}</span>
              <span class="author">作者：{{ items.author }}</span>
              <span class="articleCount"
                >总章节：{{ items.articleCount }}章</span
              >
              <span class="Update"
                >最近更新：{{ TimestampToDate2(items.updateTime) }}</span
              >
            </div>

            <div class="right-button">
              <van-button color="#3C98C9" size="small" @click="deleteBook(items.id)"
                >删除书籍</van-button
              >
              <van-button
                color="#3C98C9"
                size="small"
                @click="keepRead(items.id, items.title)"
                >继续阅读</van-button
              >
            </div>
          </div>

      </li>
      <van-button class="backTop" @click="backTop" v-show="scrollType">
        <van-icon class="icon-backTop" name="arrow-up" size="25" />
      </van-button>
    </ul>
  </div>
</template>

<script>
import { Getshelf } from "../api/chelf/chelf";
export default {
  data() {
    return {
      book: "",
      id: "",
      isLoading: true,
      bookdetail: [],
      scrollType: false,
    };
  },
  methods: {
    // 解析时间
    TimestampToDate2(Timestamp) {
      let now = new Date(Timestamp),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return (
        y +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (d < 10 ? "0" + d : d) +
        " " +
        now.toTimeString().substr(0, 8)
      );
    },

    async getdetail() {
      this.id = window.localStorage.getItem("chelf");
      this.bookdetail = await Getshelf(this.id);
      this.isLoading = false;
    },
    backTop() {
      document.documentElement.scrollTop = 0;
      /*注意：是给滚动的父元素设置，也就是设置了overflow：auto的元素*/
    },
    /*如果不想让按钮在一开始的时候存在，而是在滚动了一定的距离的时候再出现，那设置 一个滚动条的监听*/
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop;
      // console.log(scrollTop);
      if (scrollTop > 500) {
        this.scrollType = true;
      } else {
        this.scrollType = false;
      }
    },
    // 判断书架有没有内容
    isBook() {
      let books = window.localStorage.getItem("chelf");
      if (books === null) {
        this.book = true;
        this.isLoading = false;
      } else {
        this.getdetail();
        this.book = false;
        this.isLoading = true;
      }
    },
    // 从书架删除书籍
    deleteBook(id) {
      let books = JSON.parse(localStorage.getItem("chelf")) || [];
      console.log(id);
     books.splice(books.findIndex(val=>val.id==id),1)
     window.localStorage.setItem("chelf",JSON.stringify(books))
     this.getdetail()
    },
    // 继续阅读
    keepRead(id, title) {
      let history = JSON.parse(localStorage.getItem("history")) || [];
      if (history.findIndex(val=>val.id==id) == -1) {
        this.$router.push({
          name: "bookinfo",
          query: { id: id, title: title },
        });
      } else{
        let index = history.findIndex(val=>val.id==id);
        let chapterId = history[index].chapterId;
        console.log(id);
        this.$router.push({
          name: "read",
          query: { id: id, conid: chapterId },
        });
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.isBook();
  },
  destroyed() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style lang="less" scoped>
.book_list {
  .checkBook {
    text-align: center;
    color: #aba59a;
  }
  padding: 0.3rem /* 15px -> .3rem */ 0.3rem /* 15px -> .3rem */;
    .href {
      display: flex;
      margin-top: 0.3rem /* 15px -> .3rem */;
      border-bottom: 1px solid gainsboro;
      img {
        width: 2rem /* 100px -> 2rem */;
        height: 3rem /* 150px -> 3rem */;
        border-radius: 2px;
      }
      .right {
        display: flex;
        .right-content {
          display: flex;
          flex-direction: column;
          height: 3rem /* 150px -> 3rem */;
          justify-content: space-between;
          padding: 0rem 0rem /* 0px -> 0rem */ 0rem 0.2rem;
          .Update {
            color: black;
            font-size: 0.24rem;
          }
          .title {
            color: black;
            font-size: 0.34rem /* 17px -> .34rem */ /* 12px -> .24rem */;
          }
          .author,
          .articleCount,
          .countWords {
            font-size: 0.24rem /* 12px -> .24rem */;
            color: #aba59a;
          }
        }
        .right-button {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 0rem 0rem /* 0px -> 0rem */ 0rem 0.2rem;
          .van-button {
            font-size: 0.28rem /* 14px -> .28rem */;
            width: 2rem /* 100px -> 2rem */;
            height: 0.5rem /* 32px -> .64rem */;
            max-width: 2rem;
          }
        }
      }

  }
}
// 回到顶部按钮
.backTop {
  border-radius: 50%;
  position: fixed;
  right: 0.4rem /* 20px -> .4rem */;
  height: 0.8rem /* 40px -> .8rem */;
  width: 0.8rem /* 40px -> .8rem */;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 65px;
  .van-icon-arrow-up:before {
    color: whitesmoke;
  }
}
</style>