// pages/vehicledetails/vehicledetails.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  this.setData({
    platenumber: '请输入车牌号',
    enginenumber: '请输入发动机号',
    framenumber: '请输入车架号',
    drivingmileage: '请输入  km',
  })
  wx.getStorage({
    key: 'brandname',
    success: function(res) {
     // console.log(res.data);
      that.setData({
        brandname : res.data
      })
    },
  })
  wx.getStorage({
    key: 'item',
    success: function(res) {
      //console.log(res.data);
      that.setData({
        selectCar : res.data
      })
    },
  })
  wx.getStorage({
    key: 'fullname',
    success: function(res) {
      //console.log(res.data);
      that.setData({
        fullname: res.data
      })
    },
  })
  },
  carNo : function(e){
    this.setData({
      carNo: e.detail.value
    })
  },
  carEngine: function (e) {
    this.setData({
      carEngine: e.detail.value
    })
  },
  carFrame: function (e) {
    this.setData({
      carFrame: e.detail.value
    })
  },
  strokeCount: function (e) {
    this.setData({
      strokeCount: e.detail.value
    })
  },
  addCar : function(){
    app.request({
      url: app.globalData.testUrl + '/carInformation/addCarInformation',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        carName: this.data.fullname,
        brand: this.data.brandname,
        carSeries: this.data.fullname ,
        vehicleModel : this.data.selectCar.name,
        carNo : this.data.carNo,
        carEngine: this.data.carEngine, 
        carFrame : this.data.carFrame,
        strokeCount : this.data.strokeCount,
        carLogo: this.data.selectCar.logo,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        wx.navigateTo({
          url: '../carport/carport',
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
  onShareAppMessage: function () {
  
  }
})