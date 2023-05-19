<template>
        <div class="home">
                <div class="top">
                <TopNav></TopNav>
                <function-nav>
                </function-nav>
               
        </div>
        </div>
</template>

<script>
import TopNav from '../components/home/TopNav.vue'
import FunctionNav from '../components/home/FunctionNav.vue'
export default {
    components:{
                TopNav,
                FunctionNav
    },
data(){
    return{
   
    }
},
methods:{

}
}
</script>

<style>

</style>