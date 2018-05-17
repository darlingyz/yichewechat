// pages/storeevaluate/storeevaluate.js
var shopId;
var app = getApp();
var score;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startSrc: 'http://116.62.151.139/res/img/star.png',
    havamsg:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'businessId',
      success: function (res) {
        shopId = res.data;
        wx.request({
          url: app.globalData.testUrl + '/storeInformation/shopEvaluateQuery',
          method: 'post',
          data: {
            shopId: shopId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'//默认值
          },
          success: function (msg) {
            console.log(msg);
            var arr=msg.data.data;
            if(arr.length==0){
                that.setData({
                  havamsg: false
                })
            }else{
              that.setData({
                havamsg: true,
                evaluateList: msg.data.data,
                commentpe: msg.data.data.length ? msg.data.data.length : 0
              })
            }
          }
        })
      }
    })
    wx.getStorage({
      key: 'score',
      success: function(res) {
        that.setData({
          score : res.data
        })
      },
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //跳到门店详情
  bindViewStoredetailb: function () {
    wx.navigateTo({
      url: '../storedetailb/storedetailb',
    })
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