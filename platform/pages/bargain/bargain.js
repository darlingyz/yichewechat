// pages/bargain/bargain.js
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
    var that = this;
    wx.getStorage({
      key: 'msg',
      success: function (res) {
          var msg = res.data;
          console.log(msg);
            that.setData({
              storeSrc: msg.data.data.img,
              couponSrc: 'http://116.62.151.139/res/img/coupon.png',
              bargainSrc: msg.data.data.img,
              washcar: msg.data.data.activityName,
              slogana: msg.data.data.description,
              currentPrice: '￥' + msg.data.data.minPrice,
              originalPrice: '￥' + msg.data.data.price,
              discount: (msg.data.data.minPrice / msg.data.data.price * 10).toFixed(1),
              bottomprice: msg.data.data.minPrice,
              origprice: msg.data.data.price,
              middleprice: msg.data.data.middlePrice,
              pnuma: msg.data.data.middleNum,
              pnumb: msg.data.data.minNum,
              saleprice: msg.data.data.price,
              cutedprice: msg.data.data.minPrice,
              acitivityId: msg.data.data.id,
              service :msg.data.data.service //页面上要有服务详情的明细的,现在页面上没有
            })
          }
        })
      },
  //立即购买
  bindViewBuy: function () {
    wx.navigateTo({
      url: '../pay/pay?id=saleprice',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  createBargain: function () {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/activity/useBargainActivity',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        activityId: that.data.acitivityId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        if (msg.data.code == 1) {
          wx.setStorage({
            key: 'userbargainid',
            data: msg.data.data.userBargainId,
          })
          wx.navigateTo({
            url: '../bargainb/bargainb',
          })
        }else{
          console.log("提示错误");
        }
      }
    })
  },
  //分享给朋友
  onShareAppMessage: function (options){
    return {
      title: '转发',
      desc: '请帮你的好友砍一刀吧!',
      path: '/pages/bargin/bargin',
      success (e){
        wx.showShareMenu({
          withShareTicket:true
        });
      },
      fail(e){
        console.log(e);
      },
      complete(){},
    } 
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