<template>
  <div class="result">
   <ul>
    <li v-for="item in result" :key="item.id">
        <router-link :to="{
              name: 'bookinfo',
              query: { id: item.bookId, title: item.title },
            }">
        {{item.title}}
        </router-link>
    </li>
   </ul>
  </div>
</template>

<script>
import {getResult} from '../../api/search/search'
export default {
        data(){
            return{
                result:[]
            }
        },
        methods:{
                async Getresult(){
                    this.result=await getResult(this.$route.query.keyword)
                }
        },
        mounted(){
                    this.Getresult()
        }
}
</script>

<style lang="less" scoped>
.result{
    ul{
        display: flex;
        flex-direction: column;
        li{
            padding: .2rem /* 10px -> .2rem */;
            border-bottom: 2px solid gainsboro;
            a{
                color: black;
            }
        }
    }
}
</style>