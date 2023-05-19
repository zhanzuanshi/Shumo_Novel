// 书籍详情页
<template>
  <div class="bookinfo">
    <van-loading size="24px" vertical v-if="isLoading">正在加载书籍详情...</van-loading>
    <div class="content" v-if="isShow">
         <BackButton></BackButton>
    <div class="info" v-if="bookinfo.link">
      <div class="left" >
        <img :src="bookinfo.link[1].href + Autoimg" alt="" />
      </div>
      <div class="right">
        <h1 class="title">{{bookinfo.title}}</h1>
        <span>作者：{{bookinfo.author.name}}</span>
        <span>分类：{{bookinfo["pris:book"].category}}</span>
        <span>字数：{{getTotalwords(bookinfo["pris:book"].words)}}</span>
        <span>{{bookinfo["pris:subscribe"].clicks}}</span>
        <span>授权方：{{getAuthorizer()}}</span>
      </div>
    </div>
    <div class="button">
      <van-button   color="#3C98C9" @click="Islogin" :disabled=isClick>{{isRead?'继续阅读' : '开始阅读'}}</van-button>
      <van-button  @click="Setlocalstorage" color="#3C98C9">{{inChelf?'查看书架':'加入书架'}}</van-button>
    </div>
    <div class="summary">
      <h4>内容简介：</h4>
      <p class="text">{{bookinfo.summary}}</p>
    </div>
    <div class="chapters">
      <h4>目录 <i>(共{{bookcontent.length}}章)</i></h4>
      <van-loading size="24px" vertical v-if="isContent">正在加载章节...</van-loading>
      <ul>
        <router-link v-for="(item) in cutContent" :key="item.index" :to="{name:'read',query:{id:$route.query.id,conid:item.uuid}}">
          <li >
              {{item.title}}
        </li>
        </router-link >
      </ul>
      <router-link :to="{name:'content',query:{id:$route.query.id}}">
        <button class="Allchapter">全部章节</button>
      </router-link>
    </div>
    <div class="Comment">
      <h4>热门评论：</h4>
      <van-loading size="24px" vertical v-if="isComment">正在加载评论...</van-loading>
      <ul>
        <li v-for="(item) in cutComment"  :key="item.id">
          <div class="left">
              <img :src="item.avatar==null? defaultImg : item.avatar" @error="defaultImgs(item)"  >
          </div>
          <div class="right" >
              <span>{{item.username&&item.username.includes('.cc')? '用户123' :item.username}}</span>
              <p>{{item.text}}</p>
          </div>
        </li>
      </ul>
    </div>
    </div>
   
  </div>
</template>

<script>
import { GetBookInfo, GetContent ,GetComment} from "../api/book/bookinfo";
import BackButton from "../components/common/BackButton.vue";
export default {
  components: {
    BackButton,
  },
  data() {
    return {
      lastChapter:'',
      inChelf:'',
      isRead:'',
      isContent:'',
      isComment:'',
      isClick:true,
      isShow: false,
      isLoading:true,
      Autoimg: "?imageView&type=webp&thumbnail=200y282", //图片地址补全
      bookinfo: [], //书籍详情
      bookcontent: [], //章节列表
      bookcomment: [], //评论
      defaultImg:'https://yuedust.yuedu.126.net/assets/mobile/images/tx-default.png',
    };
  },
  methods: {
    // 评论头像不存在时使用默认头像来代替(属性存在值为空的情况下)
    defaultImgs(item){
       {
          item.avatar=this.defaultImg
       }
   },
  // 进入第一章节
  firstContent(){
    if(this.bookcontent[0]){
      if(this.bookcontent[0].leaf===true ){
       return this.bookcontent[0].uuid
      }else{
       return this.bookcontent[1].uuid
      }
    }
  },
  // 格式化总字数
  getTotalwords:function(item){
            if(item>=10000){
              // parsenInt 舍弃小数点
              return parseInt(item/10000)+'万'
            }else{
              return item
            }
      },
      // 判断书籍是否有授权方
      getAuthorizer(){
              if(this.bookinfo["pris:book"].authorizer){
                return this.bookinfo["pris:book"].authorizer
              }else{
                return '网易云阅读'
              }
      },
  // 设置本地存储，传入当前书籍的id
   Setlocalstorage(){
     if(this.inChelf==false){
      // 将传入的数据设置为数组
      let ids=JSON.parse(localStorage.getItem("chelf")) || [] ;
    ids.push({'id':this.$route.query.id,"type":"book"})
      window.localStorage.setItem("chelf",JSON.stringify(ids))
      this.$router.push({name:'chelf'})
    }else{
      this.$router.push({name:'chelf'})
    }
    
   },
  //  读取本地存储 判断当前书籍是否已经添加到书架
  Inchelf(){
        let ids=JSON.parse(localStorage.getItem("chelf"))
        if(ids){
          let index=ids.findIndex(
            item=>item.id==this.$route.query.id
          )
          // console.log(index);
          if(index==-1){
            this.inChelf=false
          }else{
            this.inChelf=true
          }
        }
  },
  // 读取session 判断用户是否登录
  Islogin(){
        let userinfo=JSON.parse(sessionStorage.getItem("userInfo")) ||{}
        if(JSON.stringify ( userinfo )==="{}"){
          this.$router.push({name:'login'})
          this.$toast({
            message:'您还没有登录',
            type:'waring'
          })
        }else{
          this.$router.push({name:'read',query:{id:this.$route.query.id,conid:this.isRead?this.lastChapter :this.firstContent()}})
        }
  },
//  获取书籍详情
    async getBookinfo() {
      this.bookinfo = await GetBookInfo(this.$route.query.id,this.$route.query.title);
      this.isShow=true
      this.isLoading=false
    },
    async getBookcontent(){
      this.isContent=true
      this.bookcontent=await GetContent(this.$route.query.id)
      this.isClick=false
      this.isContent=false
       // 读取本地存储，判断当前书籍是否已经观看过了
      let history=JSON.parse(localStorage.getItem("history")) || []
      if(history){       
      let index= history.findIndex(
          item=>item.id==this.$route.query.id
       )
        if(index==-1){
          this.isRead=false
        }else{
          this.isRead=true
         let  num=history[index].chapter
          if(this.bookcontent[num]){
          this.lastChapter=this.bookcontent[num].uuid
          }  
        }
      }
    },
    async getComment(){
      this.isComment=true
      this.bookcomment=await GetComment(this.$route.query.id)
      this.isComment=false
    },
    
  },
  
  mounted(){
    this.getBookinfo();
    this.getBookcontent();
    this.getComment()
    this.Inchelf()
  },
  computed:{
    // 通过计算属性来限制v-for的循环次数，提高性能
      cutContent:function(){
        return this.bookcontent.slice(0,5)
      },
      cutComment:function(){
       if(this.bookcomment.length!==0){
            return this.bookcomment.slice(0,3)
          }
          else{
            return  this.bookcomment=[{text:'本书还没有人评论哦,快来添加评论吧...'}]
          }
      },
      
  }
};
</script>

<style lang="less" scoped>
.content{
   padding: .3rem /* 15px -> .3rem */ /* 10px -> .2rem */;
   .info {
  display: flex;
  padding: 0.2rem  0rem /* 0px -> 0rem *//* 10px -> .2rem */;
  .left {
    img {
      width: 1.8rem /* 90px -> 1.8rem */;
      height: 2.6rem /* 130px -> 2.6rem */;
      border-radius: 5%;
      border: 2px solid whitesmoke;
      box-shadow: 3px 3px 3px  whitesmoke;
    }
  }
  .right{
    display: flex;
    justify-content: space-around;
    color: #888;
    font-size: .24rem /* 12px -> .24rem */;
    padding-left: .2rem /* 10px -> .2rem */;
    flex-direction: column;
    .title{
      font-size: 0.34rem;
      font-family: 楷体;
      font-weight: bolder;
      margin-top: -0.12rem /* -6px -> -0.12rem */ ;
      color: black;
    }
  }
}
.button{
  display: flex;
  justify-content: space-between;
  .van-button{
    font-size: .32rem /* 16px -> .32rem */;
    width: 3.2rem /* 100px -> 2rem */;
    height: .64rem /* 32px -> .64rem */;
  }
  .van-button__content{
    background-color: #3c98c9;
  }
}
.summary{
  padding: .2rem /* 10px -> .2rem */ 0rem /* 0px -> 0rem */ ;
  border-bottom: .02rem /* 1px -> .02rem */ solid gainsboro;
  .text{
    color: #888;
    font-size: .28rem /* 14px -> .28rem */;
    padding: .3rem /* 15px -> .3rem */ 0rem /* 0px -> 0rem */;
  }
}
.chapters{
  li{
    font-size: .28rem /* 14px -> .28rem */;
  }
  .Allchapter{
  width: 100%;
  height: 0.5rem /* 50px -> 1rem */;
  color: rgb(161, 161, 161);
  border: none;
}
  i{
    font-size: .24rem /* 12px -> .24rem */;
    color: #888;
  }
  border-bottom: .02rem /* 1px -> .02rem */ solid gainsboro;
  ul{
    padding: .2rem /* 10px -> .2rem */ 0rem /* 0px -> 0rem */;
    li{
      color: #888;
    }
  }
}
.Comment{
  margin-top: .2rem /* 10px -> .2rem */;
  border-top: .02rem /* 1px -> .02rem */ solid gainsboro;
  img{
    border-radius: 50%;
    width: .68rem /* 34px -> .68rem */ ;
    height: .68rem /* 34px -> .68rem */ ;
    margin-top: .3rem /* 15px -> .3rem */ ;
  }
  ul{
    li{
      display: flex;
      padding-bottom: .2rem ;/* 10px -> .2rem */
      border-bottom: .02rem /* 1px -> .02rem */ solid gainsboro;
      .right{
        margin: .2rem /* 10px -> .2rem */;
        span{
          color: #3c98c9;
          font-size: .28rem /* 14px -> .28rem */ ;
        }
        p{
          font-size: .24rem /* 12px -> .24rem */;
          color: #888;
          margin-top: .1rem /* 5px -> .1rem */;
        }
      }
    }
  }
}
}


</style>