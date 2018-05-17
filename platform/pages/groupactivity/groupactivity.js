var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onReady: function () {
    this.initCouponsList();

  },

  initCouponsList: function () {
    var that = this;
    wx.getLocation({
      success: function (res) {
        wx.request({
          url: app.globalData.testUrl + '/activity/findActivity',
          method: 'post',
          data: {
            type: 1,
            lat: res.latitude,
            lng: res.longitude,
            status: 0
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'//默认值
          },
          success: function (msg) {
            console.log(msg);
            that.setData({
              activityList: msg.data.data,
              group_icon: 'http://116.62.151.139/res/img/group-icon.png',
            })
          }
        })
      },
    })
  },
  bindViewgroupdetails: function (e) {
    wx.setStorage({
      key: 'activityId',
      data: e.currentTarget.dataset.id,
    })
    wx.navigateTo({
      url: '../groupdetails/groupdetails',
    })
  }

})