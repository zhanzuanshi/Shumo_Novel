<template>
  <div class="rank" >
    <Condisplay 
    :options="options"
    :list="rankList"
    :isLoading="isLoading"
    :pageLoading="pageLoading"
    @dataChange="getRankList"
    ></Condisplay>
  </div>
</template>

<script>
import Condisplay from '@/components/book/showbook.vue'
import { getrankList } from "../api/rank/rank";
export default{
  components:{
      Condisplay
   },
  data() {
    return {
      isLoading:false, //数据加载等待
      pageLoading: false,
      rankList: [], //排行分类
      // Autoimg: "?imageView&type=webp&thumbnail=200y282", //图片地址补全
      page: 1,  //数据请求默认页
      options:[   
       { 
        defval:'male',
        option: [
          { text: "男生排行榜", value: "male" },
          { text: "女生排行榜", value: "female" },
        ]},
        {
            defval:'day',
            option: [
          { text: "日榜", value: "day" },
          { text: "周榜", value: "week" },
          { text: "月榜", value: "month" },
        ]}
      ],
      debounceScroll:()=>{},  //滚动监听的方法
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
    // 请求数据
    async getRankList() {
      this.page = 1; //切换排行的分类时将请求页面重置为1
      this.isLoading=true
      this.rankList = await getrankList(this.options[0].defval, this.options[1].defval, this.page);
      this.isLoading=false
    },

    },
  computed:{
    scroll() {
      let isLoading = true; //是否有数据可以加载
     return async () => {
        // 距离底部1px时加载一次
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=
          1;
        if (bottomOfWindow && isLoading == true) {
          this.page = this.page + 1; //每次分页+1
          const res = await getrankList(this.options[0].defval, this.options[1].defval, this.page); //自己封装的请求数据的方法         
          if (
            res.length !== 0 //有数据的时候加载
          ) {
            this.pageLoading = true;
            isLoading = true;
            this.rankList = this.rankList.concat(res);
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
  created(){
    // 滚动监听在结合防抖之后无法正常清除，所以我们把函数移到data属性中，然后通过给函数赋值来实现
    this.debounceScroll=this.debounce(this.scroll,1000)
  },
  mounted() {
    this.getRankList();
    window.addEventListener('scroll',this.debounceScroll,true)

  },
  destroyed(){
    window.removeEventListener("scroll",this.debounceScroll, true);
  }
};
</script>

<style lang="less" scoped>
</style>