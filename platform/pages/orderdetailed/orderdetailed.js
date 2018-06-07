var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待支付', '服务中', '待评价'],
    currentTab: 0,
    orderListMsg: "",
    paylist: "",
    havewaitmsg: false,
    waitcommon: "",
    seringmsg: false,
    seringcommon: ""
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.request({
      url: app.globalData.testUrl + '/order/wxUserOrders',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        orderState: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (msg) {
        //console.log(msg);
        that.setData({
          orderListMsg: msg.data.data
        })
      }
    })
    // 待支付
    app.request({
      url: app.globalData.testUrl + '/order/wxUserOrders',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        orderState: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log(msg);
        that.setData({
          paylist: msg.data.data
        })
      }
    })
    //服务中
    app.request({
      url: app.globalData.testUrl + '/order/wxUserOrders',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        orderState: 2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log(msg);
        //console.log("服务中")
        var odata = msg.data.data;
        if (odata.length == 0) {
          that.setData({
            seringmsg: false,
          })
        } else {
          that.setData({
            seringmsg: true,
            seringcommon: msg.data.data
          })
        }
      }
    })
    //待评价
    app.request({
      url: app.globalData.testUrl + '/order/noEvaluateOrders',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        evaluateState: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log(msg);
        //console.log("待评价")
        var odata = msg.data.data;
        if (odata.length == 0) {
          that.setData({
            havewaitmsg: false,
          })
        } else {
          that.setData({
            havewaitmsg: true,
            waitcommon: msg.data.data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //根据订单的状态去不同的页面
  orderdetail: function (e) {
    wx.setStorage({
      key: 'id',
      data: e.currentTarget.dataset.id,
    })
    var status = e.currentTarget.dataset.status;
   // console.log(status);
    if (status == 1) {
      wx.navigateTo({
        url: '../cashOrder/cashOrder',
      })
    } else if (status == 2) {
      wx.navigateTo({
        url: '../orderdetailserving/orderdetailserving',
      })
    } else if (status == 3) {
      wx.navigateTo({
        url: '../waitevaluate/waitevaluate',
      })
    } else if (status == 4) {
      wx.navigateTo({
        url: '../waitevaluate/waitevaluate',
      })
    } else {
      wx.navigateTo({
        url: '../orderdetailcance/orderdetailcance',
      })
    }
  },
  //取消订单
  txClick: function (e) {
    var code = e.currentTarget.dataset.code;
    app.request({
      url: app.globalData.testUrl + '/order/cancelOrder',
      method: 'post',
      data: {
        orderCode: code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log(msg);
        wx.startPullDownRefresh()
        var odata = msg.data.data;
        if (odata == "成功") {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1000
          })
          wx.stopPullDownRefresh()
        }
        wx.navigateTo({
          url: '../orderdetailcance/orderdetailcance',
        })
      }
    })
  },
  //付款
  bindViewpay: function (event) {
    var orderId = event.currentTarget.dataset.id;
    app.globalData.orderId = orderId;
    wx.navigateTo({
      url: '../pay/pay'
    })
  },
  //取消
  bindViewevaluateorder: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.setStorage({
      key: 'orderId',
      data: e.currentTarget.dataset.id,
    })
    wx.navigateTo({
      url: '../evaluateorder/evaluateorder?orderId=' + orderId,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
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

    wx.showLoading({ title: '努力加载中...' }),
      this.onLoad();
    wx.hideLoading()
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