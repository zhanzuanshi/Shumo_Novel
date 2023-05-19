
import { Swipe, SwipeItem,NavBar,Lazyload,Icon ,Tab, Tabs,DropdownMenu, DropdownItem,Toast,Loading,Button,Search } from 'vant'
import Vue from 'vue'
let pulgins=[
    Swipe,SwipeItem,NavBar,Lazyload ,Icon,Tab, Tabs,DropdownMenu, DropdownItem,Toast,Loading,Button ,Search
]
 function getVant(){
    pulgins.forEach((item)=>{
        return Vue.use(item)
    })
}

getVant()
