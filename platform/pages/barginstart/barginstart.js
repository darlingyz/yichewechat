// pages/friendsbargainc/friendsbargainc.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    havemsg: false,
    userBargainId: "",
    acitivityId: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var userBargainId = options.userBargainId;
    console.log(userBargainId)
    var acitivityId = options.acitivityId;
    that.setData({
      userBargainId: userBargainId,
      acitivityId: acitivityId
    })
  },
  seeorder: function () {
    var that = this;
    wx.navigateTo({
      url: '../waitpay/waitpay?orderId=' + that.data.orderId,
    })
  },
  bindViewBuy: function () {
    var that = this;
    var middlePrice = that.data.middleprice;
    var saleprice = that.data.saleprice;
    console.log(middlePrice, saleprice);
    console.log(app.globalData.userId, that.data.acitivityId, app.globalData.carId)
    if (middlePrice == saleprice) {
      wx.showModal({
        title: '提示',
        content: '如果要购买,则立即停止砍价,是否继续?',
        success: function (res) {
          if (res.confirm) {
            app.request({
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
                // console.log(res)
                wx.setStorage({
                  key: 'paybargain',
                  data: res,
                })
                // console.log(res)
                wx.navigateTo({
                  url: '../paybargain/paybargain',
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      var activeid = parseInt(that.data.acitivityId);
      console.log(app.globalData.userId, activeid, app.globalData.carId)
      var carId = app.globalData.carId;
      if (carId == null) {
        wx.showModal({
          title: '提示',
          content: '您还没有绑定默认车辆,请去绑定~',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../carport/carport',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '如果您直接付款,则立即停止砍价,是否继续?',
          success: function (res) {
            if (res.confirm) {
              app.request({
                url: app.globalData.testUrl + '/activity/bargainPay',
                method: 'post',
                data: {
                  userId: app.globalData.userId,
                  activityId: activeid,
                  carId: app.globalData.carId
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  wx.setStorage({
                    key: 'paybargain',
                    data: res,
                  })
                  wx.navigateTo({
                    url: '../paybargain/paybargain',
                  })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
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
    var that = this;
    app.request({
      url: app.globalData.testUrl + '/activity/userBargainDetail',
      method: 'post',
      data: {
        //从上个页面获取
        userBargainId: that.data.userBargainId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
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
            friendsCutList: msg.data.data.userBargainHelps//好友帮助砍价列表
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
            friendsCutList: msg.data.data.userBargainHelps//好友帮助砍价列表
          })
        }
      }
    })
    app.request({
      url: app.globalData.testUrl + '/activity/checkBargainOrder',
      method: 'post',
      data: {
        //从上个页面获取
        userId: app.globalData.userId,
        activityId: that.data.acitivityId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (res) {
       // console.log(app.globalData.userId, acitivityId)
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
          console.log(res)
          console.log("分享成功~~")
          console.log(that.data.userBargainId)
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