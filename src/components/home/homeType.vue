<template>
  <div class="homeType">
    <ul>
        <li v-for="item in limitShow" :key="item.id" @click="redraw" >
            <router-link :to="{path:'/rank'}">
                <img :src="item.cover" alt="">
                {{item.name}}
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import {gethomeType} from '../../api/home/home'
export default {
            data(){
                return{
                bookType:[]
                }
            },
            methods:{
            async Getbooktype(){
                this.bookType= await gethomeType()
            },
            redraw(){
                this.Getbooktype()
                this.$forceUpdate()
            }
            },
            mounted(){
                    this.Getbooktype()
            },
            computed:{
                limitShow(){
                    return this.bookType.slice(0,5)
                }
            }
}
</script>

<style lang="less" scoped>
    .homeType{
        padding-top: 10px;
        ul{
            display: flex;
            justify-content: space-around
           
        };
        li{
            a{
            display: flex;
            flex-direction: column;
            align-items: center;
            color: black;
            font-size: .28rem /* 14px -> .28rem */;
             img{
                width: 1rem /* 50px -> 1rem */;
                height: 1rem /* 50px -> 1rem */;
                border-radius: 50%;
            }
            }
           
        }
    }
</style>