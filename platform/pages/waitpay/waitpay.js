var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    merchantMsg: "",
    orderMsg: "",
    orderServices: "",
    userMsg: "",
    distance: "",
    orderId:"",
    orderCode:"",
    shopPhone:"",
    activityId:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var aorderId = options.orderId;
    wx.getLocation({
      success: function (res) {
        var lng = res.longitude;
        var lat = res.latitude;
        wx.request({
          url: app.globalData.testUrl + '/order/wxOrderDetails',
          method: 'post',
          data: {
            orderId: aorderId,
            lng: lng,
            lat: lat
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'//默认值
          },
          success: function (msg) {
            console.log(msg);
            var data = msg.data.data;
            var merchantMsg = data.merchantMsg;
            var orderMsg = data.orderMsg;
            var orderServices = data.orderMsg.orderServices;
            var userMsg = data.userMsg;
            that.setData({
              distance: data.distance2,
              merchantMsg: merchantMsg,
              orderMsg: orderMsg,
              orderServices: orderServices,
              userMsg: userMsg,
              orderId: orderMsg.id,
              orderCode: orderMsg.orderCode,
              shopPhone: merchantMsg.mobile,
              activityId: data.activityId
            })
          }
        })
      },
    })
  },
  //去付款
  bindViewpay: function () {
    var that=this;
    wx.request({
      url: app.globalData.testUrl + '/activity/bargainPayPrice',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        activityId: that.data.activityId,
        carId: app.globalData.carId,
        orderId: that.data.orderId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (res) {
        console.log(res)
        console.log(app.globalData.userId, that.data.activityId, app.globalData.carId)
        wx.setStorage({
          key: 'paybargain',
          data: res,
        })
        //console.log(res)
        wx.navigateTo({
          url: '../paybargain/paybargain',
        })
      }
    })
  },
  //取消订单
  cancel:function(){
    var that=this;
    wx.request({
      url: app.globalData.testUrl + '/order/cancelOrder',
      method: 'post',
      data: {
        orderCode: that.data.orderCode
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        var odata = msg.data.data;
        if (odata == "成功") {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1000
          })
        }
        wx.setStorage({
          key: 'id',
          data: that.data.orderId,
        })
        wx.navigateTo({
          url: '../orderdetailcance/orderdetailcance',
        })
      }
    })
  },
  //店铺电话
  callphone:function(){
    var that=this;
      wx.makePhoneCall({
        phoneNumber: that.data.shopPhone,
      })
  },
//地图
  gomap:function(){
    wx.navigateTo({
      url: '../searchmap/searchmap',
    })
  },
  //客服电话
  goPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '(021)58180562',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

