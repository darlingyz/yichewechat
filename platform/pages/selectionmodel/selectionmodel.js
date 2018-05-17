// pages/selectionmodel/selectionmodel.js
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
    var that =this;
      wx.getStorage({
        key: 'id',
        success: function(res) {
          wx.request({
            url: 'https://api.jisuapi.com/car/car',
            method: 'GET',
            data: {
              parentid: res.data,
              appkey: '3d857cc41c4aee47'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'//默认值
            },
            success: function (msg) {
              console.log(msg);
              wx.setStorage({
                key: 'fullname',
                data: msg.data.result.fullname,
              })
              that.setData({
                array: msg.data.result.list
              })
            }
          })
        },
      })
  },
  selectcar : function(e){
    wx.getStorage({
      key: 'brandname',
      success: function(res) {
        wx.setStorage({
          key: 'brandname',
          data: res.data,
        })
      },
    })
    wx.setStorage({
      key: 'item',
      data: e.currentTarget.dataset.item,
    })
    wx.navigateTo({
      url: '../vehicledetails/vehicledetails',
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
  
  },
  getData: function(){
    
  }
})