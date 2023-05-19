<template>
  <div class="hotclass">
    <van-loading size="24px" vertical v-if="isLoading"
      >正在加载书籍详情...</van-loading
    >
    <div v-if="isShow">
      <span class="headline">|热门推荐</span>
      <ul v-if="change">
        <li v-for="(item, index) in HotclassList" :key="index">
          <router-link
            :to="{
              name: 'bookinfo',
              query: { id: preUuid(item.sourceUrl), title: item.title },
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
import { getHotclass } from "../../api/home/home";
export default {
  data() {
    return {
      isShow: false,
      isLoading: true,
      HotclassList: [],
      change: true,
    };
  },
  methods: {
    // 格式化要传递的参数
    preUuid(item) {
      return item.split("/")[2];
    },
    limitShow() {
      let deviceWidth = document.documentElement.clientWidth;
      if (deviceWidth <= 376) {
        return this.HotclassList.slice(0, 3);
      } else {
        return this.HotclassList;
      }
    },
    async GetHotclassList() {
      this.HotclassList = await getHotclass();
      this.isLoading = false;
      this.isShow = true;
      // console.log(this.HotclassList);
    },
  },
  mounted() {
    this.GetHotclassList();
  },
};
</script>

<style lang="less" scoped>
.hotclass {
  .headline {
    color: #3c98c9;
    font-size: 0.32rem /* 16px -> .32rem */;
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
        padding-right: 0.1rem;
        margin-top: 0.1rem /* 5px -> .1rem */;
        justify-content: space-around;
        .author {
          color: #aba59a;
          font-size: 0.24rem /* 12px -> .24rem */;
        }
        .title {
          font-size: 0.28rem;
          padding-top: 0.1rem /* 5px -> .1rem */;
        }
        img {
          width: 2rem /* 100px -> 2rem */;
          height: 3rem /* 150px -> 3rem */;
          border-radius: 5%;
          border: 2px solid whitesmoke;
          box-shadow: 3px 3px 3px 3px whitesmoke;
        }
      }
    }
  }
}
</style>