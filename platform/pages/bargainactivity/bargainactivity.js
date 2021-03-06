var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var mapUtil;
var app = getApp();
// pages/bargainactivity/bargainactivity.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    type: 2,
    bargainList: "",
    couponSrc: 'http://116.62.151.139/res/img/coupon.png',
    nomsg:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '努力加载中...' });
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {

        that.setData({
          lat: res.latitude,
          lng: res.longitude
        });
        //调用 数组循环砍价活动列表方法
        that.initBargainList(res.latitude, res.longitude);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },
  //数组循环砍价活动列表方法
  initBargainList: function (lat, lng) {
    let that = this;
    console.log(lat);
    app.request({
      url: app.globalData.testUrl + '/activity/findActivity',
      method: "post",
      data: {
        type: that.data.type,
        lat: lat,
        lng: lng,
        status: that.data.status
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (result) {
        wx.hideLoading();
        console.log(result);
        var msg = result.data.data;
          if(msg.length==0){
              that.setData({
                nomsg: false,
              })
          }else{
            that.setData({
              nomsg: true,
              bargainList: msg
            })
          }
      }
    })
  },
  bargaindetail: function (e) {
    console.log(e);
    var activityId = e.currentTarget.dataset.id;
    app.request({
      url: app.globalData.testUrl + '/activity/bargainDetail',
      method: 'post',
      data: {
        activityId: activityId,
        userId: app.globalData.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(activityId, app.globalData.userId)
        console.log(msg);
        wx.navigateTo({
          url: '../bargain/bargain?activityId=' + activityId,
        })
      }
    })
  },
  getDistance: function (lat1, lng1, lat2, lng2) {

    lat1 = lat1 || 0;

    lng1 = lng1 || 0;

    lat2 = lat2 || 0;

    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;

    var rad2 = lat2 * Math.PI / 180.0;

    var a = rad1 - rad2;

    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;

    return ((r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))) / 1000).toFixed(2)

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
})