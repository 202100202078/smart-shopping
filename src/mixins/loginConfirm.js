export default {
  methods: {
    checkToken () {
      // 判断是否有token
      // 如果没有，则显示弹框并返回true
      // 反之返回false
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '需要登录才能继续操作',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          // 跳转到登录页
          // 同时携带当前页面url作为参数传递，方便回到当前页面
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {
          // 不操作
        })
        return true
      }
      return false
    }
  }
}
