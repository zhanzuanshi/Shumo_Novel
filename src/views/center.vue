<template>
  <div class="content">
    <BackButton></BackButton>
    <div class="top">
      <img :src="headImg ? headImg : defaultImg" alt="" />
      <h3>{{ userName ? userName : "您还没有登录" }}</h3>
      
        <button @click="login">{{ userName ? "退出登录" : "登录" }}</button>
        <button @click="toUsers" v-if="isAdmin">进入后台</button>
    </div>
  </div>
</template>

<script>
import BackButton from "@/components/common/BackButton.vue";
export default {
  components: {
    BackButton,
  },
  data() {
    return {
      headImg: "",
      userName: "",
      defaultImg:
        "https://yuedust.yuedu.126.net/assets/mobile/images/tx-default.png",
      isAdmin:''
    };
  },
  methods: {
    getUserinfo() {
      let info = JSON.parse(sessionStorage.getItem("userInfo"));
      if (info) {
        this.userName = info.username;
        if(info.token=='admin'){
          this.isAdmin=true
        }
      }
    },
  login() {
    let info = JSON.parse(sessionStorage.getItem("userInfo"));
    if (info!=='') {
      sessionStorage.removeItem('userInfo')
      this.$router.push({ name: "login" });
    } else {
      this.$router.push({ name: "login" });
    }
  },
  // 跳转后台
  toUsers(){
      this.$router.push('/admin')
  }
  },
  created() {
    this.getUserinfo();
  },
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 6rem /* 300px -> 6rem */;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  img {
    width: 1.2rem /* 60px -> 1.2rem */;
    height: 1.2rem /* 60px -> 1.2rem */;
    border-radius: 50%;
  }
  button {
    width: 50%;
    height: 0.6rem /* 40px -> .8rem */;
    border: none;
    color: antiquewhite;
    border-radius: 5px;
    font-size: 0.4rem /* 20px -> .4rem */;
    background-color: rgb(252, 98, 98);
  }
}
</style>