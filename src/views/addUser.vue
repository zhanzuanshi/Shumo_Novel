<template>
  <div class="user">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="formInline.region" placeholder="选择角色">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="普通用户" value="user"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "../axiosconfig/axios-login";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else if (value.length < 6 && value.length > 11) {
        callback(new Error("用户名的长度在6-11个字符之间!"));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        user: "",
        region: "",
      },
      ruleForm: {
        username: "",
        pass: "",
        email: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        email: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      request
        .post("/regeister", {
          user_name: this.ruleForm.username,
          password: this.ruleForm.pass,
          email: this.ruleForm.email,
          role: this.formInline.region,
        })
        .then((res) => {
          switch (res.data) {
            case 0:
              this.$toast({
                message: "提交成功",
                type: "success",
              });
              break;
            case -1:
              this.$toast({
                message: "用户名已存在",
                type: "error",
              });
              this.existed = true;
              break;
          }
        }).catch(err=>{
            this.$toast({
            message:'提交失败',
            type:'error'
          })
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
</style>