
var app = getApp();
var orderId;
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
    var that = this;
    wx.getStorage({
      key: 'codedata',
      success: function (res) {
        var odata=res.data;
        //console.log(odata);
        //console.log(odata.data.data)
        var orderdata=odata.data.data;
        orderId = orderdata.orderId;
        that.setData({
          data:odata.data.data
        })
        if (res.statusCode == 200) {
          console.log("活动进入支付中");
          orderId = orderdata.orderId;
        }
      },
    });
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
   console.log("进入支付" + orderId);
    wx.request({
      url: app.globalData.testUrl + "/Wx/getPrePayId",
      method: 'post',
      data: {
        orderId: orderId,
        openId: app.globalData.openId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log(orderId, app.globalData.openId)
        console.log(msg);
        console.log("111111111")
        wx.requestPayment({
          'timeStamp': msg.data.data.timeStamp,
          'nonceStr': msg.data.data.nonceStr,
          'package': msg.data.data.package,
          'signType': 'MD5',
          'paySign': msg.data.data.paySign,
          'success': function (res) {
            console.log("222222222222222222")
            //支付成功，设定一个全局变量，用来设定去是否查看拼团还是支付
            app.globalData.num=1;
            wx.navigateTo({
              url: '../friendgroup/friendgroup',
            })
          },
          'fail': function (res) {
            console.log(orderCode, app.globalData.openId)
            console.log(res);
            conosole.log("333333333333333333")
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