<template>
  <div class="search">
    <div class="fixed">
      <div class="searchBar">
      <div class="back" @click="back">
        <span>«</span>
      </div>
      <van-search
        v-model="value"
        shape="square"
        label=""
        background="#3c98c9"
        placeholder="请输入搜索关键词"
        @search="getResult"
      />
      <div class="home">
        <router-link to="frontpage"> 首页 </router-link>
      </div>
    </div>
    </div>
   
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getResult() {
      this.$router.push({ name: "result", query: { keyword: this.value } });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  flex-direction: column;
  .fixed{
    height: 1rem;
  }
  .searchBar {
    height: 1rem;
    .van-search {
      width: 80%;
    }
    .back {
      background-color: #3c98c9;
      width: 10%;
      font-size: 0.5rem /* 25px -> .5rem */ /* 20px -> .4rem */;
      font-weight: bolder;
      text-align: center;
      line-height: 1rem /* 45px -> .9rem */ /* 54px -> 1.08rem */;
      color: white;
    }
    display: flex;
    .home {
      background-color: #3c98c9;
      width: 10%;
      text-align: center;
      line-height: 1rem;
      a {
        color: white;
      }
    }
  }
}
</style>