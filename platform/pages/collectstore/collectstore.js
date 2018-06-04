// pages/collectstore/collectstore.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    havemsg: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  storedetail: function (e) {
    let businessId = e.currentTarget.dataset.shopid;
    wx.setStorage({
      key: 'businessId',
      data: businessId,
    })
    wx.navigateTo({
      url: '../storedetail/storedetail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initcollection();//请求收藏接口
  },
  //收藏接口
  initcollection: function () {
    wx.showLoading({
      title: '努力加载中...',
  })
    var that = this;
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.request({
          url: app.globalData.testUrl + '/search/searchCollectStore',
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            userId: app.globalData.userId,
            lng: longitude,
            lat: latitude
          },
          success: function (res) {
            wx.hideLoading()
            var arr = res.data.data;
            if (arr.length == 0) {
              that.setData({
                havemsg: false
              })
            } else {
              that.setData({
                havemsg: true,
                shopList: res.data.data
              })
            }
          }
        })
      },
    })
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