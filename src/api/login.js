// 用于存放与登录页面相关的请求函数
import request from '@/utils/request'

// 图形验证码请求
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 短信验证码请求
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录请求
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
