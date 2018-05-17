// pages/moreserve1/moreserve1.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    odata:"",
    ogroup: "",
    havamsg:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initactive()
  },
  initactive: function (event) {
    var that = this;
    wx.getLocation({
      success: function (res) {
        // console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        //定位成功，请求接口去查找信息
        console.log(latitude, longitude);
        wx.request({
          url: app.globalData.testUrl + '/project/searchAllActivitis',
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            lat: latitude,
            lng: longitude
          },
          success: function (res) {
            console.log(res);
            var ogroups = res.data.data.groupActivities;
            var ores = res.data.data.bargainActivities;
            //console.log(ogroups);
            that.setData({
              odata: ores,
              ogroup: ogroups
            })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //参加活动，去其他页面
  goActive: function (e) {
    let businessId = e.currentTarget.dataset.shopid;
    wx.setStorage({
      key: 'businessId',
      data: businessId,
    });
    wx.navigateTo({
      url: '../bargainb/bargainb',
    })
  },
  goGroup: function (e) {
    let businessId = e.currentTarget.dataset.shopid;
    wx.setStorage({
      key: 'businessId',
      data: businessId,
    });
    wx.navigateTo({
      url: '../groupactivity/groupactivity',
    })
  },
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