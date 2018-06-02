// pages/friendsbargainc/friendsbargainc.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    havemsg: false,
    counbanrgin: true,
    userBargainId: "",
    acitivityId: "",
    orderId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    var userBargainId = options.userBargainId;
    var oacitivity = options.activityId;
    var acitivityId = parseInt(oacitivity);
    that.setData({
      userBargainId: userBargainId,
      acitivityId: acitivityId
    })
    wx.request({
      url: app.globalData.testUrl + '/activity/userBargainDetail',
      method: 'post',
      data: {
        //从上个页面获取
        userBargainId: userBargainId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        var help = msg.data.data.userBargainHelps;
        if (help.length == 0) {
          that.setData({
            havemsg: false,
            userSrc: msg.data.data.portait,
            storeba: msg.data.data.img,
            washcoupons: msg.data.data.activityName,
            pnum: msg.data.data.attendAmount,
            nprice: msg.data.data.minPrice,
            oprice: msg.data.data.originalPrice,
            origprice: msg.data.data.originalPrice,
            middleprice: msg.data.data.middlePrice,
            bottomprice: msg.data.data.minPrice,
            pnuma: msg.data.data.middleNum,
            pnumb: msg.data.data.minNum,
            saleprice: msg.data.data.currentPrice,
            cutedprice: msg.data.data.minPrice,
            friendsCutList: msg.data.data.userBargainHelps,//好友帮助砍价列表,
            userName: msg.data.data.userName
          })
        } else {
          that.setData({
            havemsg: true,
            userSrc: msg.data.data.portait,
            storeba: msg.data.data.img,
            washcoupons: msg.data.data.activityName,
            pnum: msg.data.data.attendAmount,
            nprice: msg.data.data.minPrice,
            oprice: msg.data.data.originalPrice,
            origprice: msg.data.data.originalPrice,
            middleprice: msg.data.data.middlePrice,
            bottomprice: msg.data.data.minPrice,
            pnuma: msg.data.data.middleNum,
            pnumb: msg.data.data.minNum,
            saleprice: msg.data.data.currentPrice,
            cutedprice: msg.data.data.minPrice,
            friendsCutList: msg.data.data.userBargainHelps,//好友帮助砍价列表
            userName: msg.data.data.userName
          })
        }
      }
    })
    wx.request({
      url: app.globalData.testUrl + '/activity/checkBargainOrder',
      method: 'post',
      data: {
        //从上个页面获取
        userId: app.globalData.userId,
        activityId: acitivityId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (res) {
        console.log(app.globalData.userId, acitivityId)
        //console.log(app.globalData.userId, acitivityId)
        console.log(res);
        var odata = res.data.data;
        if (odata == -1) {
          //console.log("没有订单，继续分享")
          that.setData({
            counbanrgin: true
          })
        } else {
          //console.log("已有订单，召唤好友隐藏")
          var orderId = odata;
          that.setData({
            counbanrgin: false,
            orderId: orderId
          })
        }
      }
    })
  },
  //查看订单
  seeorder: function () {
    var that = this;
    wx.navigateTo({
      url: '../waitpay/waitpay?orderId=' + that.data.orderId,
    })
  },
  //立即购买
  bindViewBuy: function () {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/activity/bargainPay',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        activityId: that.data.acitivityId,
        carId: app.globalData.carId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (res) {
        //console.log(res)
        wx.setStorage({
          key: 'paybargain',
          data: res,
        })
        //console.log(res)
        wx.navigateTo({
          url: '../paybargain/paybargain',
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
      return {
        title: "一车独秀砍价活动",
        path: '/pages/friendsbargain/friendsbargain?userBargainId=' + that.data.userBargainId,
        success: function (res) {
          //console.log(res)
          console.log("分享成功~~")
          //console.log(that.data.userBargainId)
        },
        fail: function (req) {
          console.log(req);
        },
      }
    } else {
      return {
        title: "一车独秀砍价活动",
        path: '/pages/friendsbargain/friendsbargain?userBargainId=' + that.data.userBargainId,
        success: function (res) {
          // console.log(res)
          console.log("分享成功~~")
          // console.log(that.data.userBargainId)
        },
        fail: function (req) {
          console.log(req);
        },
      }
    }
  }
})