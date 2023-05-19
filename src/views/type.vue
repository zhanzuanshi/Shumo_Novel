<template>
  <div class="type">
    <div class="typeContainer" v-for="items in TypeList" :key="items.id">
      <span>|{{ items.name }}</span>
      <ul>
        <li v-for="item in items.cates" :key="item.id" >
         <router-link :to="{name:'typedetail',query:{catId:item.cateId,gender:items.channel}}">{{item.cateName}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getbookType } from "../api/type/type";
export default {
  data() {
    return {
      TypeList: [],
    };
  },
  methods: {
    async GetType() {
      this.TypeList = await getbookType();
      // console.log(this.TypeList);
    },
  },
  created() {
    this.GetType();
  },
};
</script>

<style lang="less" scoped>
.typeContainer {
  padding: .4rem /* 20px -> .4rem */ .2rem /* 10px -> .2rem */;
  span {
    font-size: .36rem /* 18px -> .36rem */;
    font-weight: bold;
    color: #3c98c9;
  }
  ul {
    display: flex;
    width: auto;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: .1rem /* 5px -> .1rem */ .2rem /* 10px -> .2rem */;
    li {
      display: block;
      background-color: #f5f5f5;
      text-align: center;
      line-height: 0.6rem;
      width: 1.7rem /* 85px -> 1.7rem */;
      height: 0.6rem /* 30px -> .6rem */;
      border-radius: 0.1rem;
      font-size: 0.28rem /* 14px -> .28rem */;
      margin-top: 0.2rem /* 10px -> .2rem */;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      a{
        color: black;

      }
    }
  }
}
</style>