<template>
  <div class="cont">
    <h2>welcome to You</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="usename">
        <el-input v-model="ruleForm.usename"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        usename: "",
        password: ""
      },
      rules: {
        usename: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 5到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 5 到 16个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        
          this.$axios.post("/api/login", {
              usename: this.ruleForm.usename,
              password: this.ruleForm.password
            })
            .then(res => {
              if (res.data.errno) {
                this.$message({
                  showClose: true,
                  message: "用户未注册",
                  type: "error"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "恭喜你，登陆成功",
                  type: "success"
                });
                this.$router.push('/admin')

                this.$store.commit('saveLoginUser',this.ruleForm.usename)
               
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
       this.$refs[formName].validate(valid => {
         
        if (valid) {
          this.$axios.post("/api/register", {
              usename: this.ruleForm.usename,
              password: this.ruleForm.password
            }).then(res=>{
               if (res.data.errno) {
                this.$message({
                  showClose: true,
                  message: "用户名已被注册",
                  type: "error"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "恭喜你，注册成功",
                  type: "success"
                });
              }
            })
        }
      })
    }
  }
};
</script>

<style scoped>
.cont {
  width: 650px;
  height: 350px;
  border: 2px solid #9f5f9f;
  box-shadow: 3px 3px 3px #9f5f9f;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.cont .demo-ruleForm {
  margin-top: 80px;
}
h2 {
  text-align: center;
  margin-top: 10px;
}
</style>
