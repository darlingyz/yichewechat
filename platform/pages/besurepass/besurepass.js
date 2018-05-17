var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showcoupondetail: false,
    showModal: false,
    pwd01: '',
    pwd02: '',
    passworld: '',
    phoneNumber: '',
    bao: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  phoneInput00: function (res) {
    //console.log(res.detail.value);
    let opwd00 = res.detail.value;
    this.setData({
      pwd01: opwd00
    })
  },
  phoneInput01: function (res) {
    console.log(res.detail.value);
    let opwd01 = res.detail.value;
    this.setData({
      pwd02: opwd01
    })
  },
  //点击验证跳转到页面
  toHome: function (res) {
    let that = this;
    let pwdNo01 = that.data.pwd01;
    let pwdNo02 = that.data.pwd02;
    //console.log(pwdNo01, pwdNo02);
    if (pwdNo01 == pwdNo02) {//密码对的情况
      wx.getStorage({
        key: 'phone',
        success: function (res) {
          let phoneNo = res.data;
          //console.log(res);
          wx.request({
            url: app.globalData.testUrl + '/register/submitRegister',
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              userName: app.globalData.nickName,
              portait: app.globalData.vatarUrl,
              openId: app.globalData.openId,
              phoneNumber: phoneNo,
              pwd: pwdNo02,
              type: 1,
            },
            //请求成功后的跳转
            success: function (res) {
              console.log(res);
              var oall = res.data.data.respUserInfo;
              app.globalData.userId = oall.userId;
              var bmoney = res.data.data.coupon;
              var shareCode = res.data.data.respUserInfo.shareCode;
              that.setData({
                showcoupondetail: true,
                showModal: true,
                bao: bmoney
              });
            }
          })
        }
      })
    } else {//验证不对的情况
      console.log("==========");
      wx.showModal({
        title: '提示',
        content: '两次的输入的密码一致，请重新输入！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  hideModal: function () {
    this.setData({
      showcoupondetail: false,
      showModal: false,
    });
  },
  //点击领取红包
  mybao: function (e) {
    // console.log(e)
    var id = e.currentTarget.dataset.id;
    // console.log(id)
    wx.request({
      url: app.globalData.testUrl + '/coupon/GetCoupon',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: app.globalData.userId,
        sign: 2,
        discountId: id
      },
      success: function (res) {
        //console.log(res);
        var msg = res.data.msg;
        if (msg == "成功") {
          wx.showToast({
            title: '领取成功！',
            icon: 'success',
            duration: 1000
          })
          wx.switchTab({
            url: '../index/index',
          })
        } else {
          wx.showToast({
            title: '失败！',
            icon: "success",
            duration: 1000
          })
        }
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
  onShareAppMessage: function () {

  }
})