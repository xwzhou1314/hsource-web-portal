<style>
  html,body {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
  }
  .login {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
    position: relative;
  }
  .login .from-wrap{
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -150px;
    width: 400px;
    height: 300px;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 30px;
  }
  .login h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .login FormItem {
    margin-bottom: 15px;
  }
  .login .form-footer {
    text-align: right;
  }
</style>
<template>
  <div class="login">
    <div class="from-wrap">
      <h2>注册</h2>
      <Form ref="registerData" :rules="ruleValidate" :model="loginData" :label-width="80">
        <FormItem label="账号" prop="username">
          <Input type="text"  placeholder="请输入账号"  v-model="loginData.username"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password"  placeholder="请输入密码"  v-model="loginData.password"/>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input type="text"  placeholder="请输入手机号"  v-model="loginData.phone"/>
        </FormItem>
        <FormItem class="form-footer">
          <Button type="primary" @click="handleSubmit(loginData)">注册</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      loginData: {
        username: '',
        password: '',
        phone: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '账号长度3-16个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, max: 16, message: '密码长度6-16个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (loginData) {
      this.$refs['registerData'].validate((val) => {
        // 表示校验成功
        if (val) {
          this.$http({
            url: this.$http.adornUrl('api/user/user/register'),
            data: this.$http.adornData(loginData, false),
            method: 'post'
          }).then((resp) => {
            console.log(resp)
            if (resp.status === 201) {
              this.$router.push('login/')
              this.$Message.info('注册成功')
            }
          })
        }
      })
    }
  }
}
</script>
