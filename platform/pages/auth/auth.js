var app = getApp();

Page({
  onLoad: function(options) {
  },
  callback(res) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          console.log('用户同意获取用户信息，即将弹出地理位置授权框')
          // 可以将 res 发送给后台解码出 unionId
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              app.globalData.nickName = res.userInfo.nickName;
              app.globalData.vatarUrl = res.userInfo.avatarUrl;
              wx.setStorageSync('scopeUserInfo', true)
            }
          })
          
          wx.getLocation({
            success(res) {
              // 获取经纬度保存到本地
              console.log('地理位置经纬度获取成功.')
              console.log(res.latitude + ' , ' + res.longitude)
              wx.setStorageSync('lat', res.latitude)
              wx.setStorageSync('lng', res.longitude)
              wx.setStorageSync('scopeUserLocation', true)
              wx.navigateBack()
            },
            fail(res) {
              console.log('用户拒绝获取地理位置，即将打开小程序设置页面。')
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting['scope.userInfo'] &&
                  res.authSetting['scope.userLocation']) {
                    console.log('用户同意获取用户信息和用户地理位置，即将返回入口页')
                    wx.setStorageSync('scopeUserInfo', true)
                    wx.setStorageSync('scopeUserLocation', true)
                    wx.getLocation({
                      success(res) {
                        wx.setStorageSync('lat', res.latitude)
                        wx.setStorageSync('lng', res.longitude)
                        wx.navigateBack()
                      }
                    })
                  }
                }
              })
            }
          })
        } else {
          console.log('用户拒绝获取用户信息，停留在当前页')
        }
      }
    })
  }
})