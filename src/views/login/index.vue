<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="phone" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="code" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="url" :src="url" alt="" @click="getImage">
        </div>
        <div class="form-item">
          <input  v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{ second==totalSecond? '获取验证码': `${second}`+"后重新发送" }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="Login">登录</div>
    </div>
  </div>
</template>

<script>
import { GetCaptchaImage, GetMsgCode, Login } from '@/api/login'
export default {
  async created () {
    this.getImage()
  },
  name: 'LoginPage',
  data () {
    return {
      totalSecond: 60,
      second: 60,
      timer: null,
      url: '',
      key: '',
      phone: '',
      code: '', // 图片验证码
      msgCode: '' // 消息验证码
    }
  },
  methods: {
    // 获取验证码
    async getImage () {
      const { data: { base64, key } } = await GetCaptchaImage('/captcha/image')
      this.url = base64
      this.key = key
      this.$toast('获取图片验证码成功')
    },
    async getCode () {
      if (!this.validFn) {
        return
      }
      // 定时器为空并且 总秒数等于当前的秒数
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求吗成功，获取验证码
        await GetMsgCode(this.code, this.key, this.phone)
        this.$toast('发送短信验证码成功')
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.code)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async Login () {
      // 验证码是否错误
      if (!this.validFn()) {
        return
      }
      // 手机号是否错误
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      // 都正确了，处理业务逻辑 , 发送请求，提示登录成功， 跳转到首页
      const res = await Login(this.phone, this.msgCode)
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }

}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
