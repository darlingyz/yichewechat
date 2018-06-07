// pages/login/login.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  //事件处理函数
  //跳转到一车独秀用户协议
  bindViewAgreement: function () {
    wx.navigateTo({
      url: '../userprotocol/userprotocol'
    })
  },
  //跳转到 我的
  goMy: function () {
    var that=this;
    wx.clearStorage();
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        app.request({
          url: app.globalData.testUrl + '/Wx/aaa',
          method: "post",
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
            app.globalData.openId = res.data.openid;
            console.log(app.globalData.openId);
            that.getUserInfo();
            wx.switchTab({
              url: '../index/index'
            })
          }
        })
      }
    })
  },
  getUserInfo: function (e) {
    var that = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: res => {
              wx.getUserInfo({
                success: res => {
                  var userInfo = res.userInfo;
                  var nickName = userInfo.nickName;
                  var vatarUrl = userInfo.avatarUrl;
                  var openid = app.globalData.openId;
                  var openid = app.globalData.openId;
                  console.log(openid);
                  // 可以将 res 发送给后台解码出 unionId
                  app.globalData.userInfo = res.userInfo
                  app.request({
                    url: app.globalData.testUrl + '/login/wxLittleLogin',
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
                      //console.log(res);

                      var userId = res.data.data.userId;
                      console.log(userId)
                      app.globalData.userId = userId;
                      that.setData({
                        userId: userId
                      })
                      wx.switchTab({
                        url: '../index/index'
                      })
                      // console.log(that.globalData.userId);
                    },
                  })
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              var userInfo = res.userInfo;
              var nickName = userInfo.nickName;
              var vatarUrl = userInfo.avatarUrl;
              var openid = app.globalData.openId;
              //console.log(openid);
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              app.request({
                url: app.globalData.testUrl + '/login/wxLittleLogin',
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
                  var userId = res.data.data.userId;
                  app.globalData.userId = userId;
                  that.setData({
                    userId: userId
                  })
                  wx.switchTab({
                    url: '../index/index'
                  })
                  console.log(app.globalData.userId);
                },
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    var models = that.data.maskModal;
    that.setData({
      maskModal: !models
    })
  },

   //跳转到手机号登录页
  bindViewPhoneLogin: function () {
    wx.navigateTo({
      url: '../passwordlogin/passwordlogin'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSetting({
    //   success:res =>{
    //     var that=this;
    //     if (res.authSetting['scope.userInfo']){
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res);
    //           // var that = this;
    //           var userInfo = res.userInfo;
    //           var nickName = userInfo.nickName;
    //           var vatarUrl = userInfo.avatarUrl;
    //           var openid = app.globalData.openId;
    //           app.globalData.userInfo = userInfo;//用户信息保存到全局变量中
    //           console.log(nickName, vatarUrl);
    //           console.log(openid);
    //           console.log("66666666666666666");
    //           //获取到用户的信息，发给后台

    //           // 可以将 res 发送给后台解码出 unionId
    //           app.globalData.userInfo = res.userInfo;
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况

    //           app.request({
    //             url: app.globalData.testUrl + '/login/wxLittleLogin',
    //             data: {
    //               openId: openid,
    //               userName: nickName,
    //               portait: vatarUrl
    //             },
    //             header: {
    //               'content-type': 'application/x-www-form-urlencoded'
    //             },
    //             method: 'post',
    //             success: function (res) {
    //               console.log("5555555555555");
    //               console.log(res);
    //               let userId = res.data.data.userId;
    //               app.globalData.userId = userId;
    //               console.log(userId);
    //             },
    //             fail: function (res) { },
    //           })
    //           if (that.userInfoReadyCallback) {
    //             that.userInfoReadyCallback(res)
    //           }
    //         }
    //       })



    //     }
    //   }
    // }),




    this.setData({
      srcWx: 'http://116.62.151.139/res/img/wx.png',
      srcPhone: 'http://116.62.151.139/res/img/phone.png'
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