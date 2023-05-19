<!--suppress ALL -->
<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{active:isLogin}">
        <div class="big-contain" key="bigContainLogin" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="email" placeholder="用户名" v-model="username">
            <span class="errTips" v-if="emailError">* 用户名填写错误 *</span>
            <input type="password" placeholder="密码" v-model="password">
            <span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
          </div>
          <button class="bbutton" @click="login">登录</button>
        </div>
        <div class="big-contain" key="bigContainRegister" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="username">
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <input type="email" placeholder="邮箱" v-model="email">
            <input type="password" placeholder="密码" v-model="password">
          </div>
          <button class="bbutton" @click="regeister">注册</button>
        </div>
      </div>
      <div class="small-box" :class="{active:isLogin}">
        <div class="small-contain" key="smallContainRegister" v-if="isLogin">
          <div class="stitle">你好朋友!</div>
          <p class="scontent">开始注册，和我们一起阅读</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" key="smallContainLogin" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">观看更多精彩，请登录你的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../axiosconfig/axios-login'
export default {
  data() {
    return {
      isLogin:false,
      emailError: false,
      passwordError: false,
      username:'',
      password:'',
      email:'',
      existed: false,
    }

  },
  methods: {
    changeType() {
      this.isLogin = !this.isLogin
      this.username = 'admin'
      this.email = ''
      this.password = 'admin'
    },
    login(){
      if (this.username!==''&&this.password!==''){
        request.post('/login',{user_name:this.username,password:this.password}).then(res=>{
          console.log(res.data);
          switch (res.data){
            case -1:
              this.$toast({
                message:'账号不存在',
                type:'warning'
              })
              this.emailError=true;
              break;
              case 1:
              this.$toast({
                message:'密码错误',
                type:'error'
              })
                this.passwordError=true
                  break;
            case res.data:
              this.$toast({
                message:'登录成功',
                type:'success'
              })
              sessionStorage.setItem("userInfo",JSON.stringify({username:this.username,token:res.data[0].role}))
              if(res.data[0].role=='admin'){
                this.$router.push({path: '/admin'})
              }else {

                this.$router.push({path: '/frontpage'})
              }
              break;
            
          }
        })
      }else {
        this.$toast({
          message:'填写不能为空',
          type:'warning'
        })
      }
    },
    regeister(){
      if(this.username!==''&&this.password!==''&&this.email!==''){
        request.post('/regeister',{user_name:this.username,password:this.password,email:this.email
        }).then(res=>{
          switch (res.data){
            case 0:
                this.$toast({
                  message:'注册成功',
                  type:'success'
                })
              this.login()
              break;
            case -1:
              this.$toast({
                message:'用户名已存在',
                type:'error'
              })
              this.existed=true;
              break;

          }
        }).catch(err=>{
          this.$toast({
            message:'注册失败',
            type:'error'
          })
        })
      }else {
       this.$toast({
         message:'不能为空',
         type:'warning'
       })
      }
    }
  },
  mounted() {


  }
}
</script>

<style lang='less' scoped>

.login-register{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.contain{
  width: 70%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}
.big-box{
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.btitle{
  font-size: 0.36rem;
  font-weight: bold;
  color: rgb(57,167,176);
}
.bform{
  width: 100%;
  height: 45%;
  padding:0.5em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips{
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input{
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 1em;
  background-color: #f0f0f0;
}
.bbutton{
  width: 35%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57,167,176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box{
  width: 40%;
  height: 100%;
  background: linear-gradient(135deg,rgb(57,167,176),rgb(56,183,145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  align-items: center;
}
.stitle{
  font-size: 0.36rem;
  font-weight: bold;
  color: #fff;
}
.scontent{
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 4em 1em;
  line-height: 1.7em;
}
.sbutton{
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active{
  left: 0;
  transition: all 0.5s;
}
.small-box.active{
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>