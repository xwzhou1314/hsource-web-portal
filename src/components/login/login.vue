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
    height: 240px;
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
      <h2>登录</h2>
      <Form ref="loginData" :label-width="80">
        <FormItem label="Account" prop="acct">
          <Input type="password"  placeholder="请输入账号"/>
        </FormItem>
        <FormItem label="Password" prop="pass">
          <Input type="password"  placeholder="请输入密码"/>
        </FormItem>
        <FormItem class="form-footer">
          <Button type="button" >Submit</Button>
          <Button type="ghost"  style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
