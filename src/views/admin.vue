<template>
  <el-container>
    <el-header height="80px">
      <el-row :gutter="20" class="nav">
        <el-col :span="4" class="icon"><img src="../assets/logo.png" alt=""></el-col>
        <el-col :span="16" class="title"><h1>书墨中文网后台管理系统</h1></el-col>
        <el-col :span="4" class="logout"><el-button type="primary" @click="backHome">回到首页</el-button></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <el-menu
          router
          :default-active="active"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/echarts">
            <i class="el-icon-menu"></i>
            <span slot="title">统计数据</span>
          </el-menu-item>
          <el-menu-item index="/adduser">
            <i class="el-icon-document"></i>
            <span slot="title">添加用户</span>
          </el-menu-item>
          <el-menu-item index="/users">
            <i class="el-icon-setting"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
        </el-menu></el-aside
      >
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      active: "",
    };
  },
  methods: {
    backHome(){
      this.$router.push('/frontpage')
    }
  },
  mounted() {
    this.active = this.$route.path;
  },
};
</script>

<style lang="less" scoped>
.el-header{
  text-align: center;
  padding: 0;
  margin: 0;
  line-height: 80px;
  background-color:#545c64 ;
  .nav{
  // background-color:#545c64 ;
  .icon{
    img{
  width: 60px;
  height: 60px;
}
  } 
.title{
  color: white;
}
}

}
.el-menu {
  height: calc(100vh - 80px);
}
</style>