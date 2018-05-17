var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 31.196740988071102,
    longitude: 121.68100325143205,
    shopList: '', 
    searchValue:"",
    markers: [{
      id: 1,
      latitude: 31.196740988071102,
      longitude: 121.68100325143205,
      name: '华夏东路'
    }],
    covers: [{
      latitude: 31.196740988071102,
      longitude: 121.68100325143205,
      iconPath: '/images/location.png'
    }, {
      latitude: 31.196740988071102,
      longitude: 121.68100325143205,
      iconPath: '/images/location.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //打开地图直接定位
    var that = this;
    wx.getLocation({
      success: function (res) {
        var lati = res.latitude;
        var long = res.longitude;
        wx.request({
          url: app.globalData.testUrl + '/search/storeRecommend',
          method: "post",
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            lng: long,
            lat: lati
          },
          success: function (res) {
            var mapdata = res.data.data;
            that.setData({
              shopList: mapdata,
              latitude: lati,
              longitude: long
            })
          }
        })
      },
    })
  },
  storedetail: function () {
    wx.navigateTo({
      url: '../storedetail/storedetail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  //点击定位图标，定位
  moveToLocation: function (e) {
    this.mapCtx.moveToLocation()
  },
  userNameInput: function (e) {
    var that=this;
    var value=e.detail.value;
    that.setData({
      searchValue:value
    })
  },



  //搜索关键字显示店铺
   search:function(e){
     var that=this;
     wx.request({
       url: app.globalData.testUrl + '/search/wxSearchShop',
       method:"post",
       header:{
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       data:{
         keyword: that.data.searchValue,
         lng:that.data.longitude,
         lat:that.data.latitude
       },
       success:function(res){
        that.setData({
          shopList:res.data.data
        })
       }
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

  },
  bindViewmoreserve: function () {
    wx.navigateTo({
      url: '../moreserve/moreserve',
    })
  },
})