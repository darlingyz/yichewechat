var app = getApp();
Page({

  data: {  
    orderListMsg:""
  },
  bindViewpay: function (event) {
    var orderId = event.currentTarget.dataset.id;
    app.globalData.orderId = orderId;
    // wx.setStorage({
    //   key: 'code',
    //   data: event.currentTarget.dataset.code
    // })
    wx.navigateTo({
      url: '../pay/pay'
    })
  },

  onReady: function () {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/order/wxUserOrders',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        orderState : 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);

        that.setData({
          orderListMsg : msg.data.data
        })
      }
    })
  },

  orderdetail : function(e){
    wx.setStorage({
      key: 'id',
      data: e.currentTarget.dataset.id,
    })
    var status = e.currentTarget.dataset.status;
    console.log(status);
    if(status == 1){
      wx.navigateTo({
        url: '../cashOrder/cashOrder',
      })
    }else if(status == 2){
      wx.navigateTo({
        url: '../orderdetailserving/orderdetailserving',
      })
    }else if(status == 3){
      wx.navigateTo({
        url: '../waitevaluate/waitevaluate',
      })
    }else if(status == 4){
      wx.navigateTo({
        url: '../waitevaluate/waitevaluate',
      })
    }else{
      wx.navigateTo({
        url: '../orderdetailcance/orderdetailcance',
      })
    }
  },
  bindVieworderdetail1:function(){
    wx.navigateTo({
      url: '../orderdetail1/orderdetail1',
    })
  },
  bindViewserving: function () {
    wx.navigateTo({
      url: '../serving/serving',
    })
  },
  bindViewevaluateorder: function (e) {
    wx.setStorage({
      key: 'orderId',
      data: e.currentTarget.dataset.id,
    })
    wx.navigateTo({
      url: '../evaluateorder/evaluateorder',
    })
  },

  txClick: function (e) {
      console.log(e)
      var code = e.currentTarget.dataset.code;
    wx.request({
      url: app.globalData.testUrl + '/order/cancelOrder',
      method: 'post',
      data: {
        orderCode: code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        var odata=msg.data.data;
        if (odata == "成功"){
            wx.showToast({
              title: '取消成功',
              icon:'success',
              duration:1000
            })
        }
      }
    })
  },
})
