<template>
  <div class="area">
    <div class="title">
      <span>大家都在搜</span>
    </div>
    <ul class="hotwords">
      <li v-for="item in hotWords" :key="item.id">
        <router-link :to="{
              name: 'bookinfo',
              query: { id: item.id, title: item.name},
            }">
        {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHotWords } from "../../api/search/search";
export default {
  data() {
    return {
      hotWords: [],
    };
  },
  methods: {
    async GetHotwords() {
      this.hotWords = await getHotWords();
    },
  },
  mounted() {
    this.GetHotwords();
  },
};
</script>

<style lang="less" scoped>
.area {
  .title {
    height: 0.8rem /* 40px -> .8rem */;
    background-color: rgb(247, 247, 247);
    span {
        line-height: .8rem /* 40px -> .8rem */;
        color: #807a73;
        margin-left: .3rem /* 15px -> .3rem */;
    }
  }
}
.hotwords {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  li {
    border: 1px solid #c8c8c8;
    min-width: 100px;
    line-height: 0.6rem /* 30px -> .6rem */;
    text-align: center;
    height: 0.6rem /* 30px -> .6rem */;
    border-radius: 5%;
    margin: 10px;
    // color: #aba59a;
    a{
        color: #aba59a;
    }
  }
}
</style>