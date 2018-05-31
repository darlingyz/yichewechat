//砍价活动,好友分享后打开的页面
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskModal: false,
    friendlist: false,
    userBargainId: ""
  },

  /**
   * 生命周期函数--监听页面加载   
   */
  onLoad: function (options) {
    wx.showLoading({ title: '努力加载中...' });
    var that = this;
    //console.log(options)
    var models = that.data.maskModal;
    var userBargainId = options.userBargainId;
    var BargainNum = parseInt(userBargainId);//砍价活动的id91
    wx.updateShareMenu({
      withShareTicket: true,
      success: function () {
        that.setData({
          userBargainId: BargainNum,
        })
        wx.request({
          url: 'https://api-wechat.glongcar.com/api' + '/activity/userBargainDetail',
          method: 'post',
          data: {
            userBargainId: BargainNum,
            //BargainNum
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'//默认值
          },
          success: function (msg) {
            // console.log(msg);
            // console.log(that.data.userBargainId);
            wx.hideLoading();
            var userlist = msg.data.data.userBargainHelps;
            if (userlist.length == 0) {
              that.setData({
                friendlist: false,
                userSrc: msg.data.data.portait,
                washcoupons: msg.data.data.activityName,
                // pnum: msg.data.data.attendAmount,
                nprice: msg.data.data.minPrice,
                oprice: msg.data.data.originalPrice,
                origprice: msg.data.data.originalPrice,
                middleprice: msg.data.data.middlePrice,
                bottomprice: msg.data.data.minPrice,
                pnuma: msg.data.data.middleNum,
                pnumb: msg.data.data.minNum,
                userName: msg.data.data.userName,
                storeba: msg.data.data.img,
                friendsCutList: msg.data.data.userBargainHelps
              })
            } else {
              that.setData({
                friendlist: true,
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
                friendsCutList: msg.data.data.userBargainHelps
              })
            }
          }
        })
      }
    })
    // 获取用户的登录信息~~~
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        wx.request({
          url: 'https://api-wechat.glongcar.com/api' + '/Wx/aaa',
          method: "post",
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            // console.log(res);
            app.globalData.openId = res.data.openid;
            var openid = res.data.openid;
            //console.log(openid);
            wx.setStorage({
              key: 'openId',
              data: openid
            })
          }
        })
      }
    })
    //获取用户信息
    //获取道登录信息以后
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          //console.log("授权成功~~~")
          wx.getUserInfo({
            success: res => {
              var that = this;
              // console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo;
              var userInfo = res.userInfo;
              var nickName = userInfo.nickName;
              var vatarUrl = userInfo.avatarUrl;
              var openid = app.globalData.openId;
              app.globalData.nickName = nickName;
              app.globalData.vatarUrl = vatarUrl;
              wx.request({
                url: 'https://api-wechat.glongcar.com/api' + '/login/wxLittleLogin',
                data: {
                  openId: openid,
                  userName: nickName,
                  portait: vatarUrl
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                success: function (res) {
                  // console.log(res);
                  wx.hideLoading();
                  var data = res.data.data;
                  if (data == null) {
                    console.log(data)
                    console.log("没有绑定手机号,需要绑定,分享登陆~")
                    //设定一个全局当
                    /*wx.showModal({
                      title: '温馨提示',
                      content: '请先绑定手机号!',
                      success: function (res) {
                        if (res.confirm) {
                          //console.log('用户点击确定去注册手机号')
                          wx.navigateTo({
                            url: '../phonelogin/phonelogin',
                          })
                        } else if (res.cancel) {
                          //用户点击取消退出小程序
                          wx.navigateBack({
                            delta: 0
                          })
                        }
                      }
                    })*/
                  } else {
                    var userId = res.data.data.userId;
                    var carId = res.data.data.carId;
                    app.globalData.userId = userId;
                    app.globalData.carId = carId;
                    //console.log(userId)
                    wx.setStorage({
                      key: 'userId',
                      data: userId,
                    })
                  }
                },
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log("授权失败~===~")
          that.setData({
            maskModal: !models,
            fail: 0
          })
        }
      }
    })
  },
  //获取用户信息
  getUserInfo: function (res) {
    //console.log(res)
    var that = this;
    that.setData({
      maskModal: false,
    })
    var models = that.data.maskModal;
    var userInfo = res.detail.userInfo;
    var nickName = userInfo.nickName;
    var vatarUrl = userInfo.avatarUrl;
    var openid = app.globalData.openId;
    app.globalData.nickName = nickName;
    app.globalData.vatarUrl = vatarUrl;
    wx.request({
      url: 'https://api-wechat.glongcar.com/api' + '/login/wxLittleLogin',
      data: {
        openId: openid,
        userName: nickName,
        portait: vatarUrl
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        var data = res.data.data;
        if (data == null) {
          wx.showModal({
            title: '温馨提示',
            content: '请先绑定手机号!',
            success: function (res) {
              if (res.confirm) {
                //console.log('用户点击确定去注册手机号')
                wx.navigateTo({
                  url: '../phonelogin/phonelogin',
                })
              } else if (res.cancel) {
                //用户点击取消退出小程序
                wx.navigateBack({
                  delta: 0
                })
              }
            }
          })
        } else {
          var userId = data.userId;
          var carId = data.carId;
          app.globalData.userId = userId;
          app.globalData.carId = carId;
        }
      },
    })
    app.globalData.userInfo = res.detail.userInfo;
  },


  //事件处理函数
  //帮他砍价
  bindViewHelpcut: function () {
    var that = this;
    wx.request({
      url: 'https://api-wechat.glongcar.com/api' + '/activity/helpBargain',
      method: 'post',
      data: {
        userId:app.globalData.userId,
        userBargainId: that.data.userBargainId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log(app.globalData.userId,that.data.userBargainId)
        if (msg.data.code == 1) {
          wx.navigateTo({
            url: '../friendsbargainb/friendsbargainb?userBargainId=' + that.data.userBargainId
          })
        } else {
          // console.log(msg)
          //如果没成功,给用户一个提示()
          var ocode = msg.data.code;
          if (ocode == 0) {
            wx.showModal({
              title: '提示',
              content: msg.data.msg,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  //数组循环广告位列表方法
  initAdsList: function () {
    console.log("广告招租中...")
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
    this.onLoad();
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