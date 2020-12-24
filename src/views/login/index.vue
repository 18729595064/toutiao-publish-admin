<template>
  <div class="login-container">
    <div class="box">
      <div class="login-head">
        <div class="log"></div>
      </div>
      <el-form ref="login-form" :model="user" class="login-form" :rules="formRules">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="user.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onLogin"
                     class="login-btn"
                      :loading="loadingChecked"
                      >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {login} from "@/api/user"

  export default {
    name: "LoginIndex",
    data() {
      return {
        user: {
          mobile: '',
          code: '',
          checked: false
        },
        // checked: false,
        loadingChecked: false,
        formRules: {
          mobile: [
            {required: true, message: "请输入手机号", trigger: 'blur'},
            {pattern: /^1[3|5|7|8|9]\d{9}$/, message: "请输入正确的手机号", trigger: 'change'}
          ],
          code: [
            {required: true, message: "请输入验证码", trigger: 'blur'},
            {pattern: /^\d{6}$/, message: "请输入正确的验证码", trigger: 'change'}
          ],
          checked: [
            {validator: (rule, value, callback) => {
                if (value){
                  callback();
                }else {
                  callback(new Error("请勾选用户协议"));
                }
              }, trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      onLogin() {
        // 获取表单数据
        // const user = this.user;

        // 表单验证
        this.$refs["login-form"].validate(valid => {
          if (!valid) return;
          this.login();
        });

      },

      login() {
        // 验证通过，提交登录
        this.loadingChecked = true;

        //对于代码中的请求操作
        // 请求接口可能需要重用
        // 实际工作中，接口易变动
        // 建议把请求封装成函数
        login(this.user).then(res => {
          // console.log(res);
          this.loadingChecked = false;
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          });

          // 跳转到首页
          this.$router.push({
            name: 'home'
          })

          // console.log(res);
          //把用户信息存储到本地，方便其他页面使用
          window.localStorage.setItem('user', JSON.stringify(res.data.data));
        }).catch(err => {
          this.loadingChecked = false;
          this.$message.error('登录失败，您的手机号或验证码填写错误');
          console.log(err);
        })
        // 处理后端相应结果
        // 成功  失败

      }
    }
  }
</script>

<style scoped>
  .login-container{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;
  }

  .box{
    background: #fff;
    padding-top: 30px;
  }

  .login-head{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .log{
    height: 57px;
    width: 259px;
    background: url("./logo_index.png") no-repeat;
  }

  .login-form{
    padding: 50px;

    min-width: 300px;
  }

  .login-btn{
    width: 100%;
  }
</style>