// pages/bargain/bargain.js// pages/bargain/bargain.js
var app = getApp();
Page({

  /**
   * 页面的初始数据  
   */
  data: {
    acitivityId: "",
    userBargainId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var activityId = options.activityId;//活动id
    var oactive = parseInt(activityId);
    app.request({
      url: app.globalData.testUrl + '/activity/bargainDetail',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        activityId: oactive
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (res) {
        var msg = res.data.data;
        // console.log(msg)
        // console.log(res)
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
  //立即购买
  bindViewBuy: function () {
    var that = this;
    var middlePrice = that.data.middleprice;
    var saleprice = that.data.saleprice;
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
      console.log("000000");
      console.log(app.globalData.userId, that.data.acitivityId, app.globalData.carId)
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
                  activityId: that.data.acitivityId,
                  carId: app.globalData.carId
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'//默认值
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
  //发起砍价活动的接口
  createBargain: function () {
    var that = this;
    //console.log(app.globalData.userId, that.data.acitivityId)
    app.request({
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
        // console.log(msg);
        var userBargainId = msg.data.data.userBargainId;
        //     console.log(userBargainId + "砍价活动的id该参数要传递给分享好友的页面");
        that.setData({
          userBargainId: userBargainId
        })
        wx.navigateTo({
          url: '../barginstart/barginstart?userBargainId=' + that.data.userBargainId + '&acitivityId=' + that.data.acitivityId,
        })
        // console.log("点击获取分享个会好友的id")
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

})