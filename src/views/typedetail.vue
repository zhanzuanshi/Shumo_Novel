<template>
  <div class="type-main">
    <div class="content">
      <BackButton></BackButton>
      <Condisplay
        :options="options"
        :list="Type"
        :isLoading="isLoading"
        :pageLoading="pageLoading"
        @dataChange="getTypeList"
      ></Condisplay>
    </div>
  </div>
</template>

<script>
import Condisplay from "@/components/book/showbook.vue";
import { getbookdetail } from "../api/type/type";
import BackButton from "../components/common/BackButton.vue";
export default {
  components: {
    BackButton,
    Condisplay,
  },
  data() {
    return {
      isLoading: false,
      pageLoading: false,
      Type: [],
      // Autoimg: "?imageView&type=webp&thumbnail=200y282", //图片地址补全
      page: 1,
      scrollType: false,
      options: [
        {
          defval: 1,
          option: [
            { text: "最新", value: 1 },
            { text: "最热", value: 2 },
          ],
        },
        {
          defval: 0,
          option: [
            { text: "全部", value: 0 },
            { text: "免费", value: 1 },
            { text: "付费", value: 2 },
          ],
        },
        {
          defval: 0,
          option: [
            { text: "全部", value: 0 },
            { text: "连载", value: 1 },
            { text: "完结", value: 2 },
          ],
        },
      ],
      active: "",
      debounceScroll: () => {}, //滚动监听的方法
      // handleScrolls:()=>{}
    };
  },
  methods: {
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
    async getTypeList() {
      this.page = 1; //切换排行的分类时将请求页面重置为1
      this.isLoading = true;
      this.Type = await getbookdetail(
        this.$route.query.catId,
        this.$route.query.gender,
        this.options[0].defval,
        this.options[1].defval,
        this.options[2].defval,
        this.page
      );
      this.isLoading = false;
      document.documentElement.scrollTop = 0;
    },
  },
  computed: {
    scroll() {
      let isLoading = true; //是否有数据可以加载
      return async () => {
        // 距离底部200px时加载一次
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=
          10;
        // console.log(bottomOfWindow, isLoading);
        if (bottomOfWindow && isLoading == true) {
          this.page = this.page + 1; //每次分页+1
          const res = await getbookdetail(
            this.$route.query.catId,
            this.$route.query.gender,
            this.options[0].defval,
            this.options[1].defval,
            this.options[2].defval,
            this.page
          ); //自己封装的请求数据的方法
          if (
            res.length !== 0 //有数据的时候加载
          ) {
            this.pageLoading = true;
            isLoading = true;
            this.Type = this.Type.concat(res);
          } else {
            this.$toast({
              message: "暂无更多数据信息！",
              position: "bottom",
            });
            isLoading = false; //无数据可以加载
            this.pageLoading = false; //所有数据加载完成不再显示等待框
          }
        }
      };
    },
  },
  created() {
    // 滚动监听在结合防抖之后无法正常清除，所以我们把函数移到data属性中，然后通过给函数赋值来实现
    this.debounceScroll = this.debounce(this.scroll, 1000);
  },
  mounted() {
    this.getTypeList();
    window.addEventListener("scroll", this.debounceScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.debounceScroll, true);
  },
};
</script>

<style lang="less" scoped>

</style>