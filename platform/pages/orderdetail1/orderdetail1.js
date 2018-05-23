var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderListMsg: '',
  },
  bindViewpay: function (event) {
    wx.setStorage({
      key: 'code',
      data: event.currentTarget.dataset.code
    })
    wx.navigateTo({
      url: '../pay/pay'
    })
  }, 
  bindVieworderdetailed:function(){
    wx.navigateTo({
      url: '../orderdetailed/orderdetailed',
    })
  },
  bindViewserving: function () {
    wx.navigateTo({
      url: '../serving/serving',
    })
  },
  orderdetail : function(e){
    wx.setStorage({
      key: 'id',
      data: e.currentTarget.dataset.id,
    })
    var status = e.currentTarget.dataset.status;

    if (status == 1) {
      wx.navigateTo({
        url: '../cashOrder/cashOrder',
      })
    }
  },
  onReady: function () {
    var that = this;
    wx.request({
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
          orderListMsg: msg.data.data
        })
      }
    })
  },
  godown:function(){
    console.log("eee")
    // wx.navigateTo({
    //   url: 'http://www.glongcar.com/xlxq/#/download',
    // })

    wx.downloadFile({
      url: 'http://www.glongcar.com/xlxq/#/download',
    })
  },

  txClick: function (e) {
    var isShow = this.data.show;
    this.setData({ show: !isShow })
    var tcShow = this.data.showModalStatus;
    this.setData({ showModalStatus: !tcShow });

    var id = e.currentTarget.dataset.id;
    this.setData({ editId: id });
  },
  cancelClick: function (e) {
    var isShow = this.data.show;
    this.setData({ show: !isShow });
    var tcShow = this.data.showModalStatus;
    this.setData({ showModalStatus:!tcShow});
  },
  sureClick: function (e) {
    var isShow = this.data.show;
    this.setData({ show: !isShow });
    var tcShow = this.data.showModalStatus;
    this.setData({ showModalStatus: !tcShow });
  },
})