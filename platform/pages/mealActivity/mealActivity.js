var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopDatail: "",
    shopServer: "",
    phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var activityId = options.activityId;
    that.setData({
      activityId: activityId
    })
    console.log(activityId)
    wx.request({
      url: app.globalData.testUrl + '/activityPackage/activityPackageDetails',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      data: {
        activityId: activityId
      },
      success: function (res) {
        console.log(res);
        console.log(activityId)
        var shopDatail = res.data.data.respActivity;
        var shopServer = res.data.data.allServer;
        that.setData({
          shopDatail: shopDatail,
          shopServer: shopServer,
          phone: shopDatail.mobile
        })
      }
    })
  },
//shopPhone
  shopPhone:function(){
    var that=this;
    var phone = that.data.phone;
    wx.makePhoneCall({
      phoneNumber:phone,
    })
  },
//活动支付
goPay:function(){
  var that=this;
  wx.request({
    url: app.globalData.testUrl +'/activityPackage/packageOrder',
    method: "post",
    header: {
      'content-type': 'application/x-www-form-urlencoded'//默认值
    },
    data:{
      userId: app.globalData.userId,
      activityId: that.data.activityId
    },
    success:function(res){
      console.log(res)
      var orderId = res.data.data;
      app.globalData.orderId = orderId;
       wx.navigateTo({
         url: '../paymeal/paymeal?activityId=' +that.data.activityId,
       })
    }
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})