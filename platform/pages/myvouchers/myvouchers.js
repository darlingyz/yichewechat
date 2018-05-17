var app =getApp();
Page({
  data: {
    couponsN: '2',
    vouchersN:'2',
  },
  onReady: function () {
    var that = this;
    wx.getLocation({
      success: function(res) {

    wx.request({
      url: app.globalData.testUrl + '/coupon/voucherQuery',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        lng : res.longitude,
        lat:res.latitude
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
       // console.log(msg);
        that.setData({
          CouponsList : msg.data.data
        })
      }
    })
      },
    })
  },
  bindViewshop : function(e){
    wx.setStorage({
      key: 'businessId',//门店id
      data: e.currentTarget.dataset.id,
    })
    wx.navigateTo({
      url: '../storedetail/storedetail',
    })
  },

  bindViewmycoupons:function(){
     wx.navigateTo({
       url: '../mycoupons/mycoupons',
     })

  }

})