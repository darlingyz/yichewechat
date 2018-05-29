// pages/bargain/bargain.js// pages/bargain/bargain.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acitivityId: "",
    userBargainId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var activityId = options.activityId;//活动id
    var oactive = parseInt(activityId);
    wx.request({
      url: app.globalData.testUrl+'/activity/bargainDetail',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        activityId: oactive
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success:function(res){
        var msg = res.data.data;
        console.log(msg)
        console.log(res)
        that.setData({
          storeSrc: msg.img,
          couponSrc: 'http://116.62.151.139/res/img/coupon.png',
          bargainSrc: msg.img,
          washcar: msg.activityName,
          slogana: msg.description,
          currentPrice: '￥' + msg.minPrice,
          originalPrice: '￥' + msg.price,
          discount: (msg.minPrice / msg.price * 10).toFixed(1),
          bottomprice: msg.minPrice,
          origprice: msg.price,
          middleprice: msg.middlePrice,
          pnuma: msg.middleNum,
          pnumb: msg.minNum,
          saleprice: msg.price,
          cutedprice: msg.minPrice,
          acitivityId: msg.id,
          service: msg.service //页面上要有服务详情的明细的,现在页面上没有
        })
      }
    })
  },
  //分享给朋友
  /*onShareAppMessage:function (res) {
    var that = this;
    withShareTicket: true;
    console.log("分享给好友,为什么....")
    if (res.from === 'button') {
      console.log(res.target)
      return {
        title:"一车独秀砍价活动",
        path: '/pages/friendsbargain/friendsbargain?userBargainId=' + that.data.userBargainId,//
        success:function (res) {
          console.log(res)
          console.log("分享成功~~")
        },
        fail:function(req) {
          console.log(req);
        },
      }
    }
  },*/
  //立即购买
  bindViewBuy: function () {
    var that = this;
    console.log(app.globalData.carId)
    console.log(app.globalData.userId, that.data.acitivityId)
    wx.request({
      url: app.globalData.testUrl + '/activity/bargainPay',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        activityId: that.data.activityId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (res) {
        console.log(res)
        cosole.log("砍价付款请求成功的接口返回的信息.........成功" + that.data.acitivityId)
      }
    })
  },
//发起砍价活动的接口
  createBargain: function () {
    var that = this;
    console.log(app.globalData.userId, that.data.acitivityId)
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
        var userBargainId = msg.data.data.userBargainId;
        console.log(userBargainId + "砍价活动的id该参数要传递给分享好友的页面");
        that.setData({
          userBargainId: userBargainId
        })
      }
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
  onShareAppMessage: function (res) {
    var that = this;
    withShareTicket: true;
    if (res.from === 'button') {
      console.log(res.target)
      return {
        title: "一车独秀砍价活动",
        path: '/pages/friendsbargain/friendsbargain?userBargainId='+that.data.userBargainId,
        success: function (res) {
          console.log(res)
          console.log("分享成功~~")
          console.log(that.data.userBargainId)
        },
        fail: function (req) {
          console.log(req);
        },
      }
    }
  }
})