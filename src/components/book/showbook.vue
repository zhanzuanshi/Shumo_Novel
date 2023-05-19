<template>
  <div class="rank">
    <div class="content">
      <van-dropdown-menu active-color="#3c98c9">
        <van-dropdown-item
          v-for="item in options"
          :key="item.value"
          v-model="item.defval"
          :options="item.option"
          @change="dataChange"
        />
      </van-dropdown-menu>
      <van-loading size="24px" vertical v-if="isLoading"
        >正在加载书籍详情...</van-loading
      >
      <ul class="book_list">
        <li v-for="items in list" :key="items.id">
          <router-link
            :to="{
              name: 'bookinfo',
              query: { id: preUuid(items.sourceUrl), title: items.title },
            }"
            class="href"
          >
            <div class="left">
              <img v-lazy="items.iconUrl" alt="" />
            </div>
            <div class="right">
              <span class="title">{{ items.title }}</span>
              <span class="author">{{ items.author }}</span>
              <i class="countWords">{{ items.showTotalCount }}字</i>
              <span class="introduce" v-html="items.description"></span>
            </div>
          </router-link>
        </li>
        <van-button class="backTop" @click="backTop" v-show="scrollType">
          <van-icon class="icon-backTop" name="arrow-up" size="25" />
        </van-button>
      </ul>
    </div>
    <van-loading size="24px" vertical v-show="pageLoading"
      >加载中...</van-loading
    >
  </div>
</template>
  
  <script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    isLoading: {
      //数据加载等待
      type: Boolean,
      default: false,
    },
    pageLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrollType: false,
      // Autoimg: "?imageView&type=webp&thumbnail=200y282", //图片地址补全
      // debounceScroll:()=>{},  //滚动监听的方法
      handleScrolls: () => {},
    };
  },
  methods: {
    // 格式化要传递的参数
    preUuid(item) {
      return item.split("/")[2];
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
    dataChange() {
      this.$emit("dataChange");
    },
    // 回到顶部
    backTop() {
      document.documentElement.scrollTop = 0;
    },
    /*让按钮在滚动了一定的距离的时候再出现，设置一个滚动条的监听*/
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 500) {
        this.scrollType = true;
      } else {
        this.scrollType = false;
      }
    },
  },
  created() {
    // 滚动监听在结合防抖之后无法正常清除，所以我们把函数移到data属性中，然后通过给函数赋值来实现
    this.handleScrolls = this.debounce(this.handleScroll, 1000);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrolls, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScrolls, true);
  },
};
</script>
  
  <style lang="less" scoped>
/deep/ .van-dropdown-menu {
  @media screen and(min-width:600px) {
    // padding: 0 2.5rem;
  }
}
/deep/ .van-dropdown-menu__bar {
  height: 0.6rem /* 30px -> .6rem */;
}
.book_list {
  padding: 0.3rem /* 15px -> .3rem */ 0.3rem /* 15px -> .3rem */;
  li {
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
        flex-direction: column;
        height: 3rem /* 150px -> 3rem */;
        justify-content: space-between;
        padding: 0rem 0rem /* 0px -> 0rem */ 0rem 0.2rem;
        .title {
          color: black;
          font-size: 0.34rem /* 17px -> .34rem */;
        }
        .author {
          font-size: 0.24rem /* 12px -> .24rem */;
          color: #aba59a;
        }
        .countWords {
          font-size: 0.24rem /* 12px -> .24rem */;
          color: #aba59a;
        }
        .introduce {
          position: relative;
          overflow: hidden;
          height: 50px;
          line-height: 25px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
          font-size: 0.28rem /* 14px -> .28rem */;
          color: #807a73;
        }
        // .introduce::after {
        //   content: '...';
        //   position: absolute;
        //   right: 0;
        //   bottom: 0;
        // }
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