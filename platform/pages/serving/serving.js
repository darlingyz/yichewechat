Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindViewhome: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  bindVieworderdetail1: function () {
    wx.navigateTo({
      url: '../orderdetail1/orderdetail1',
    })
  },
  bindVieworderdetailed: function () {
    wx.navigateTo({
      url: '../orderdetailed/orderdetailed',
    })
  },

})