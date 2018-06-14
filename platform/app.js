//app.js
let requestCount = 0
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
        this.globalData.code = res.code;
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
            wx.setStorageSync('openId', res.data.openid)
            that.auth()
          }
        })
      }
    })
  },
  auth() {
    const that = this
    wx.getSetting({
      success: res => {
        console.log('用户授权情况: ' + JSON.stringify(res.authSetting))
        if (res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation']) {
          wx.setStorageSync('scopeUserInfo', true)
          wx.setStorageSync('scopeUserLocation', true)
          wx.getUserInfo({
            success: res => {
              that.globalData.userInfo = res.userInfo
              that.globalData.nickName = res.userInfo.nickName
              that.globalData.vatarUrl = res.userInfo.avatarUrl
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          that.goAuth()
        }
      }
    })
  },
  goAuth() {
    wx.navigateTo({
      url: '/pages/auth/auth'
    })
  },
  request(args) {
    if (!requestCount) {
      wx.showLoading({
        title: '正在加载中...',
        mask: true
      })
    }
    requestCount++
    return wx.request({
      complete() {
        --requestCount
        if(!requestCount) {
          wx.hideLoading() 
        }
      },
      ...args
    })
  },
  globalData: {
    baiduMapKey: 'l97ULFNUrWcq64EjjoZPscgXzm1YxwPh',
  //testUrl: 'http://192.168.1.127:802/api',
    imgUrl: 'http://116.62.151.139/res/img/',
 // testUrl:'https://api-wechat.glongcar.com/api',
   testUrl: 'https://jk.glongcar.com/api',
    code:"",
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
    loginstatus: false,
    num: null,
    getuser: null,
    fail:null,//flag表示调用授权失败,去调用button
    scopeUserInfo: false,
    scopeUserLocation: false,
  }
})