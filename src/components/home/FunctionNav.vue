<template>
  <div class="function">
    <transition name="fade" mode="out-in">
      <van-tabs
        sticky
        line-width="25"
        v-model="active"
        color="#3c98c9"
        ref="tabs"
      >
        <van-tab
          v-for="item in FucButton"
          :key="item.id"
          :title="item.name"
          :to="item.path"
          :name="item.path"
        >
        </van-tab>
       <template>
        <router-view></router-view>
       </template>
      </van-tabs>
    </transition>
  </div>
</template>

<script>
import Swiper from "../home/swiper.vue";

export default {
  components: {
    Swiper,
  },
  data() {
    return {
      FucButton: [
        { id: 0, name: "首页", path: "/frontpage" },
        { id: 1, name: "书架", path: "/chelf" },
        { id: 2, name: "分类", path: "/type" },
        { id: 3, name: "排行", path: "/rank" },
      ],
      active: "",
      resizes:()=>{}
    };
  },
  methods: {
    getRoute() {
      this.active = this.$route.path;
    },
    reload(){
        window.location.reload()
    },
    debounce(fn, delay) {
      // 1.定义一个定时器, 保存上一次的定时器
      let timer = null;
      // 2.真正执行的函数
      const _debounce = function () {
        // 取消上一次的定时器
        if (timer) clearTimeout(timer);
        // 延迟执行
        timer = setTimeout(() => {
          // 外部传入的真正要执行的函数
          fn();
        }, delay);
      };

      return _debounce;
    },

    // 窗口大小发生改变时修改样式
    resize() {
      let scrollTop = document.documentElement.scrollTop;
      let deviceWidth =
        document.documentElement.clientWidth || window.innerWidth;
      if (scrollTop >= 50 && deviceWidth > 750) {
        let obj = document.getElementsByClassName("van-sticky--fixed")[0];
        obj.classList.add("van-sticky--fixeds");
      } else {
        let objs = document.getElementsByClassName("van-sticky")[0];
        objs.classList.remove("van-sticky--fixeds");
      }
    },
  },
  created(){
      this.resizes=this.debounce(this.resize, 500)
      this.getRoute()
  },
  mounted() {
    this.getRoute();
    this.resizes();
    // window.addEventListener("resize",this.resizes , true);
    // window.addEventListener("scroll", this.resizes, true);
  },
  destroyed() {
    // window.removeEventListener("resize",this.resizes,true);
    // window.removeEventListener("scroll", this.resizes, true);
  },
};
</script>

<style lang="less" scoped>
.function {
  .van-tabs /deep/ .van-tab {
    span {
      font-size: 0.3rem /* 15px -> .3rem */;
      overflow: unset;
    }
  }
  .van-tabs /deep/ .van-tab--active {
    font-weight: 800;
  }
  /deep/ .van-sticky--fixed {
    @media screen and(min-width: 600px) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    }
   
  }
}
</style>