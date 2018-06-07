// pages/friendsbargaine/friendsbargaine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    havamsg:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userBargainId = options.userBargainId;
    that.setData({
      userBargainId: userBargainId
    })
    app.request({
      url: app.globalData.testUrl + '/activity/helpResult',
      method: 'post',
      data: {
        userBargainId: userBargainId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (msg) {
        console.log(msg);
        var userhelp = msg.data.data.userBargainHelps;
        if (userhelp.length==0){
          that.setData({
            havamsg: false,
            joinpeople: msg.data.data.helpNum,
            userSrc: msg.data.data.portait,
            washcoupons: msg.data.data.activityName,
            pnum: msg.data.data.attendAmount,
            nprice: msg.data.data.minPrice,
            oprice: msg.data.data.originalPrice,
            origprice: msg.data.data.originalPrice,
            middleprice: msg.data.data.middlePrice,
            bottomprice: msg.data.data.minPrice,
            pnuma: msg.data.data.middleNum,
            pnumb: msg.data.data.minNum,
            userName: msg.data.data.userName,
            storeba: msg.data.data.img,
            //friendsCutList: msg.data.data.userBargainHelps//好友帮助砍价列表,如果为空要有一个没人帮助的显示效果
          })
        }else{
          that.setData({
            havamsg: true,
            joinpeople: msg.data.data.helpNum,
            userSrc: msg.data.data.portait,
            washcoupons: msg.data.data.activityName,
            pnum: msg.data.data.attendAmount,
            nprice: msg.data.data.minPrice,
            oprice: msg.data.data.originalPrice,
            origprice: msg.data.data.originalPrice,
            middleprice: msg.data.data.middlePrice,
            bottomprice: msg.data.data.minPrice,
            pnuma: msg.data.data.middleNum,
            pnumb: msg.data.data.minNum,
            userName: msg.data.data.userName,
            storeba: msg.data.data.img,
            friendsCutList: msg.data.data.userBargainHelps//好友帮助砍价列表,如果为空要有一个没人帮助的显示效果
          })
        }
      }
    })

  },
  //事件处理函数
  //去首页逛逛
  bindViewHome: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  onReady: function () {
    //调用 数组循环好友砍价详情列表方法
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