var app = getApp()
Page({
  data: {
    navbar: ['优惠券','商家代金券'],
    currentTab: 0,
    CouponsList:"",
    coupons:""
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onReady: function () {
    var that = this;
    app.request({
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
    //

//商家代金券
    wx.getLocation({
      success: function (res) {
        app.request({
          url: app.globalData.testUrl + '/coupon/voucherQuery',
          method: 'post',
          data: {
            userId: app.globalData.userId,
            lng: res.longitude,
            lat: res.latitude
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'//默认值
          },
          success: function (msg) {
            console.log(msg);
            console.log(app.globalData.userId, res.longitude, res.latitude)
            console.log("代金券.....")
            that.setData({
              CouponsList: msg.data.data
            })
          }
        })
      },
    })
  },
  //跳转到门店
  goShop: function () {
    wx.switchTab({
      url: '../store/store',
    })
  },
  //====代金券
  toMerchant:function(e){
    var businessId = e.currentTarget.dataset.id;
    wx.setStorage({
      key: 'businessId',
      data: businessId,
    })
    wx.navigateTo({
      url: '../storedetail/storedetail',
    })
  },
  bindViewmyvouchers:function(){
     wx.navigateTo({
       url: '../myvouchers/myvouchers',
     })

  }
})