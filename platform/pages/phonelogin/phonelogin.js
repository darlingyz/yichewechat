// pages/phonelogin/phonelogin.js
var interval = null //倒计时函数
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime:61
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      });
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000);
  },
  phoneInput:function(e){
    this.setData({
      phoneNum:e.detail.value
    })
  },
  codeInput:function(e){
    this.setData({
      verificationCode: e.detail.value
    })
  },
  //短信验证码
  getVerificationCode() {
    var that = this
//获取验证码之前要手机号验证
    var phoneNo = that.data.phoneNum;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (phoneNo == undefined) {
      wx.showModal({
        title: '提示',
        content: '手机号为空，请正确填写！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false;
    } else if (phoneNo.length < 11) {
      wx.showModal({
        title: '提示',
        content: '手机号有误，请正确填写！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }),
      that.setData({
        disabled: false
      })
      return false;
    } else if (!myreg.test(phoneNo)) {
      wx.showModal({
        title: '提示',
        content: '手机号为空，请正确填写！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false;
    } else if (phoneNo.length == 0) {
      wx.showModal({
        title: '提示',
        content: '手机号为空，请正确填写！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }),
        that.setData({
          disabled: false
        })
      return false;
    } else {
      wx.setStorage({
        key: 'phone',
        data: phoneNo,
      })
      //console.log(0);
    };
    //手机号验证成功，请求接口验证手机号是否注册过，
    wx.request({
      url: app.globalData.testUrl + '/register/getWxVerificationCode',
      method:"post",
      data:{
        phoneNumber: that.data.phoneNum
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success:function(e){
       // console.log(e);
       // console.log("66666666666666666")
        let code=e.data.code;
        if (code == 1){
          wx.showToast({
            title: '验证码已发送',
            icon:"success",
            duration:1000
          })
            that.setData({
              disabled: true
            })
            that.getCode();
        }else{
              that.setData({
                disabled: false
              });
            }
        }
    })
  },
  //验证手机号,跳转到下一页
  gosetPass:function(options){
    var that=this;
  wx.request({
    url: app.globalData.testUrl + '/register/checkVerificationCode',
    method: "post",
    data: {
      openId: app.globalData.openId,
      phoneNumber: that.data.phoneNum,
      verificationCode: that.data.verificationCode,
      portait: app.globalData.vatarUrl,
      type:1
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'//默认值
    },
    success: function (res) {
     // console.log(res);
      //console.log(app.globalData.openId, that.data.phoneNum, that.data.verificationCode)
      var code=res.data.code;
      if(code==1){
       //验证成功
        var msg = res.data.data;
        if(msg==null){
            wx.navigateTo({
              url: '../besurepass/besurepass',
            })
        }else{
          var userId=res.data.data.id;
          app.globalData.userId = userId;
          wx.switchTab({
            url: "../my/my",
          })
        }
      }else{
        //验证失败
         wx.showToast({
           title: '验证码不对',
           icon: 'success',
           duration: 1500
         })
      }
    }
  })




  },
  //事件处理函数
  //跳转到一车独秀用户协议页
  bindViewAgreement: function () {
    wx.navigateTo({
      url: '../userprotocol/userprotocol'
    })
  },
  //跳转到 我的

  //跳转到密码登录页
  bindViewPasswordLogin: function () {
    wx.navigateTo({
      url: '../passwordlogin/passwordlogin'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    phone: '手机号',
    VerificationCode: '动态码',
    tip: '新用户点击登录即设置密码',
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