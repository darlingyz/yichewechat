
var app = getApp();
var orderCode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: ""
  },
  //事件处理函数
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(app.globalData.userId, app.globalData.orderId, app.globalData.discountId)
    var that = this;
    wx.request({
      url: app.globalData.testUrl + "/order/shoppingCarPay",
      method: 'post',
      data: {
        userId: app.globalData.userId,
        orderId: app.globalData.orderId,
        discountId:app.globalData.discountId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var odetail = res.data;
        that.setData({
          data: odetail
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  paypay: function () {
    var that = this;
    console.log("进入支付" + app.globalData.orderId);
    wx.request({
      url: app.globalData.testUrl + "/Wx/getPrePayId",
      method: 'post',
      data: {
        orderId: app.globalData.orderId,
        openId: app.globalData.openId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        wx.requestPayment({
          'timeStamp': msg.data.data.timeStamp,
          'nonceStr': msg.data.data.nonceStr,
          'package': msg.data.data.package,
          'signType': 'MD5',
          'paySign': msg.data.data.paySign,
          'success': function (res) {
            wx.navigateTo({
              url: '../orderdetailed/orderdetailed',
            })
          },
          'fail': function (res) {
            var err=res.errMsg;
            if (err =="requestPayment:fail cancel"){
                wx.showToast({
                  title: '支付失败',
                  icon:"success",
                  duration:1000
                })
            }
          }
        })
      }
    })
  },
})