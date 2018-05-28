//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        wx.request({
          url: this.globalData.testUrl + '/Wx/aaa',
          method: "post",
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.globalData.openId = res.data.openid;
            console.log(that.globalData.openId)
            // that.globalData.sessionKey = msg.data.session_key
          }
        })
      }
    })
  },
  globalData: {
    baiduMapKey: 'l97ULFNUrWcq64EjjoZPscgXzm1YxwPh',
    //testUrl: 'http://192.168.1.130:802/api',  
    imgUrl: 'http://116.62.151.139/res/img/',
    testUrl:'https://api-wechat.glongcar.com/api',
    //testUrl: 'https://jk.glongcar.com/api',
    getuser: null,
    openId: null,
    sessionKey: null,
    userId: null,
    userInfo: null,
    carId: null,
    merchantName: null,
    businessId: null,
    shopcarId: null,
    activeId: null,
    sign: null,
    orderId: null,
    discountId: 0,
    nickName: "",
    vatarUrl: "",
    shareTickets: "",
    num: null,
    getuser: null,
    fail:null,//flag表示调用授权失败,去调用button
  }
})