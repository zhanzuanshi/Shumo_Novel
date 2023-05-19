<template>
  <div class="user">
    <el-table
      :data="
        userList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      border
      style="width: 100%"
    >
      <el-table-column prop="user_id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="user_name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteUser(scope.row.user_name)">删除用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="userList.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import request from "@/axiosconfig/axios-login";
import { getUsers } from "@/api/users/users";
export default {
  data() {
    return {
      userList: [],
      currentPage: 1, //当前页
      pageSize: 10, //每页条数
    };
  },
  methods: {
    // 获取数据
    async getUserList() {
      this.userList = await getUsers();
    },
    //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //当前页数改变
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 删除用户
    deleteUser(username){
      console.log(username);
        request.post('/deleteUser',{user_name:username})
        .then(res=>{
         if(res.data==0){
          this.getUserList()
          this.$toast({
            message:'删除成功',
            type:'success'
          })
         }else{
          this.$toast({
            message:'删除失败',
            type:'error'
          })
         }
        })
    }
  },
  mounted() {
    this.getUserList();
  },
};
</script>

<style lang="less" scoped>
</style>