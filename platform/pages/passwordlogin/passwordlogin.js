// pages/passwordlogin/passwordlogin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '13816369901',
    password: "0",
  },
  //获取用户输入的手机号
  phoneinput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取用户输入的密码
  passwordinput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //获取用户输入的密码
  loginBtnClick: function (e) {
    wx.clearStorage();
    var that=this;
    console.log("手机号：" + that.data.phone + " 密码：" + that.data.password);
    app.request({
      url: app.globalData.testUrl + '/login/accountLogin',
      method: "post",
      data: {
        mobile: that.data.phone,
        pwd: that.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg)
        if (msg.data.code == 0){
          wx.showModal({
            title: '提示',
            content: '用户名或密码错误，请确认后重新输入！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        //登录成功,请求接口获取ip
        if(msg.data.code == '1'){
          var userId = msg.data.data.userId;
          var nickName = msg.data.data.userName;
          var vatarUrl = msg.data.data.portait
          app.globalData.userId = userId;
          app.globalData.nickName = nickName;
          app.globalData.vatarUrl = vatarUrl;
          console.log(app.globalData.userId);
          wx.switchTab({
            url: '../index/index'
          })
        }
      }
    })
  },
  //跳转到一车独秀用户协议页
  bindViewAgreement: function () {
    wx.navigateTo({
      url: '../userprotocol/userprotocol'
    })
  },

  //跳转到手机号登录页
  bindViewPhoneLogin: function () {
    wx.navigateTo({
      url: '../phonelogin/phonelogin'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({

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