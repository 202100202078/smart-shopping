// 用于存放与登录页面相关的请求函数
import request from '@/utils/request'

// 图形验证码请求
export const getPicCode = () => {
  return request.get('/captcha/image')
}
