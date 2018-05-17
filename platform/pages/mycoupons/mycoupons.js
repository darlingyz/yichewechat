var app = getApp()
Page({
  data: {

  },

  onReady: function () {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/coupon/couponQuery',
      method: 'post',
      data: {
        userId: app.globalData.userId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        that.setData({
          coupons:msg.data.data
        })
      }
      
    })
  },

  bindViewmyvouchers:function(){
     wx.navigateTo({
       url: '../myvouchers/myvouchers',
     })

  }
})