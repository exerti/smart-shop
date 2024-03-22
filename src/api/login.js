import request from '@/utils/request'

export const GetCaptchaImage = () => {
  return request.get('/captcha/image')
}

export const GetMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha',
    {
      form: {
        captchaCode,
        captchaKey,
        mobile
      }
    }
  )
}

export const Login = (mobile, smsCode) => {
  return request.post('/passport/login',
    {
      form: {
        isParty: false,
        mobile,
        partyData: [],
        smsCode
      }
    }
  )
}
