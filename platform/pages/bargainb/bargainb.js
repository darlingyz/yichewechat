// pages/bargainb/bargainb.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detail:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.request({
      url: app.globalData.testUrl +'/activity/bargainDetail',
      method: 'post',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        id: app.globalData.activeId
      },
      success:function(res){
          //console.log(res);
          that.setData({
            detail:res.data.data
          })
      }
    });
//分享给好友

    wx.showShareMenu({
      withShareTicket: true
    })

  },
  // gobargin:function(e){
  //   onShareAppMessage: ()=> {
  //     return {
  //       title: 'xx小程序',
  //       path: 'pages/index/index',
  //       success: function (res) {
  //         // 转发成功
  //         console.log("转发成功:" + JSON.stringify(res));
  //       },
  //       fail: function (res) {
  //         // 转发失败
  //         console.log("转发失败:" + JSON.stringify(res));
  //       }
  //     }

  //   }
  // },
  onShareAppMessage: function (options) {
    return {
      title: '一车独秀',
      desc: '请帮你的好友砍一刀吧!',
      path: '/pages/barginb/barginb',
      success(e) {
        console.log(e);
        console.log("00000")
        wx.showShareMenu({
          withShareTicket: true,
          success:function(e){
            console.log(e);
            console.log("111111");
          }
        });
        wx.getShareInfo({
          success:function(e){
              console.log(e);
              console.log("222222")
          }
        })      
      },
      fail(e) {
        console.log(e);
      },
      complete() { },
    }
  },

  //立即购买
  bindViewBuy: function () {
    wx.navigateTo({
      url: '../pay/pay',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //分享给朋友
  // binsViewShare: function () {

  //   // wx.navigateTo({
  //   //   url: '',
  //   // })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    wx.showShareMenu({
      withShareTicket: true
    })
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