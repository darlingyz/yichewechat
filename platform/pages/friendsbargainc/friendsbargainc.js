// pages/friendsbargainc/friendsbargainc.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.getStorage({
      key: 'activityId',
      success: function(res) {
          wx.request({
            url: app.globalData.testUrl + '/activity/userBargainDetail',
            method: 'post',
            data: {
              //从上个页面获取
              userBargainId : res.data
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'//默认值
            },
            success: function (msg) {
              console.log(msg);
              that.setData({
                userSrc: msg.data.data.portait,
                storeba: msg.data.data.img,
                washcoupons: msg.data.data.activityName,
                pnum: '888',
                nprice: msg.data.data.minPrice,
                oprice: msg.data.data.originalPrice,
                origprice: msg.data.data.originalPrice,
                middleprice: msg.data.data.middlePrice,
                bottomprice: msg.data.data.minPrice,
                pnuma: msg.data.data.middleNum,
                pnumb: msg.data.data.minNum,
                saleprice: msg.data.data.currentPrice,
                cutedprice: msg.data.data.minPrice,
                friendsCutList: msg.data.data.userBargainHelps//好友帮助砍价列表,如果为空要有一个没人帮助的显示效果
              })
            }
          })
      },
    })
  },
  //立即购买
  bindViewBuy: function () {
    wx.navigateTo({
      url: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //分享给朋友
  binsViewShare: function () {
    wx.navigateTo({
      url: '',
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