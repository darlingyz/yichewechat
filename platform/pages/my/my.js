// pages/my/my.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    userInfo:{}
  },
  onLoad: function (options) {
    wx.showLoading({ title: '努力加载中...' });
    this.setData({
      srcActivity: 'http://121.40.148.153/img/1381294047390736.png',
      srcStore: 'http://121.40.148.153/img/1381379545768160.png',
      srcContact: 'http://121.40.148.153/img/1381445916955184.png',
      srcCooperation: 'http://121.40.148.153/img/1381480333446998.png',
      srcAboutCar: 'http://121.40.148.153/img/1381504748859460.png',
      design: '你好！',
      bindPhone: '请绑定手机 >>',
      orderList: '我的订单',
      price: '0',
      num: '0',
    })
    var that = this;
    //console.log("获取用户信息");
    console.log(app.globalData.userId);
    wx.request({
      url: app.globalData.testUrl + '/project/wxPersonalCenter',
      method: 'post',
      data: {
        userId: app.globalData.userId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (msg) {
        console.log(msg)
        wx.hideLoading()
        that.setData({
          srcUser: app.globalData.vatarUrl,
          design: app.globalData.nickName,
          price: msg.data.data.price,
          num: msg.data.data.couponAmount,
          mobile: msg.data.data.mobile,
          carId: msg.data.data.carId,
          carLogo: msg.data.data.carLogo,
          carName: msg.data.data.carName,
          strokeCount: msg.data.data.strokeCount,
        })
      }
    })
  },
  /**
     * 弹窗
     */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
   // this.hideModal();

    wx.makePhoneCall({
      phoneNumber: '(021)58180562',
    })
  
  },
  //事件处理函数
  //绑定手机号
  bindViewBindPhone: function () {

    wx.navigateTo({
      url: '../phonelogin/phonelogin'
    })
  },
  //添加爱车
  bindViewAddLoveCar: function () {
    wx.navigateTo({
      url: '../vehicledetails/vehicledetails'
    })
  },
  //我的优惠
  mycouponsView:function(){
    wx.navigateTo({
      url: '../mycoupons/mycoupons',
    })
  },
  //我的钱包
  mywallet:function(){
    wx.setStorage({
      key: 'businessId',
      data: this.data.price
    })
    wx.navigateTo({
      url: '../mywallet/mywallet'
    })
  },
  //我的订单
  bindViewOrderList: function () {
    wx.navigateTo({
      url: '../orderdetailed/orderdetailed'
    })
  },
  bindViewCarList : function(){
    wx.navigateTo({
      url: '../carport/carport',
    })
  },
  //我参加的活动
  bindViewActivity: function () {
    wx.navigateTo({
      url: '../joinactive/joinactive'
    })
  },
  //我收藏的店铺
  bindViewStore: function() {
    wx.navigateTo({
      url: '../collectstore/collectstore'
    })
  },
  //商务合作
  bindViewCooperation: function () {
    wx.navigateTo({
      url: ''
    })
  },
  //关于一车独秀
  bindViewAboutCar: function () {
    wx.navigateTo({
      url: ''
    })
  },
  //退出登录，跳到登录页
  bindViewLogin: function () {
    wx.clearStorage();
    wx.navigateTo({
      url: '../passwordlogin/passwordlogin'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  bindViewAboutCar:function(){
    wx.navigateTo({
      url: '../aboutmain/aboutmain',
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
    //页面再次加载的时候请求的数据,如果此是用户id改变,则重新请求数据
    var that = this;
    //console.log("获取用户信息");
    //console.log(app.globalData.userId);
    wx.request({
      url: app.globalData.testUrl + '/project/wxPersonalCenter',
      method: 'post',
      data: {
        userId:app.globalData.userId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (msg) {
        //console.log(app.globalData.vatarUrl, app.globalData.nickName)
        that.setData({
          srcUser: app.globalData.vatarUrl,
          design: app.globalData.nickName,
          price: msg.data.data.price,
          num: msg.data.data.couponAmount,
          mobile: msg.data.data.mobile,
          carId: msg.data.data.carId,
          carLogo: msg.data.data.carLogo,
          carName: msg.data.data.carName,
          strokeCount: msg.data.data.strokeCount,
        })
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
    wx.showLoading({ title: '努力加载中...' });
    this.onLoad();
    wx.stopPullDownRefresh();
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