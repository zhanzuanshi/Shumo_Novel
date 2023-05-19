<template>
  <div class="contentList">
    <BackButton></BackButton>
    <van-loading size="24px" vertical v-if="isLoading">正在加载章节列表...</van-loading>
    <ul>
      <li v-for="item in ContentList" :key="item.id">
        <router-link
          :to="{
            name: 'read',
            query: { id: $route.query.id, conid: item.uuid },
          }"
        >
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { GetContent } from "../api/book/bookinfo";
import BackButton from "../components/common/BackButton.vue";
export default {
  components: {
    BackButton,
  },
  data() {
    return {
      isLoading:true,
      ContentList: [],
    };
  },
  methods: {
    async GetContentList() {
      this.ContentList = await GetContent(this.$route.query.id);
      this.isLoading=false
    },
  },
  mounted() {
    this.GetContentList();
  },
};
</script>

<style lang="less" scoped>
.contentList {
  ul {
    li {
      a {
        color: gray;
        font-size: 0.4rem /* 20px -> .4rem */;
      }
        padding: .2rem /* 10px -> .2rem */;
        font-family: 楷体;
      border-bottom: 1px solid gainsboro;
    }
  }
}
</style>