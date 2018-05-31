// pages/selectstandard/selectstandard.js
var app=getApp();
const date = new Date()
const treadwidths = []
const aspectratios = []
const diameters = []

for (let i = 0; i <= 300; i++) {
  treadwidths.push(i)
  
}

for (let i = 0; i <= 100; i++) {
  aspectratios.push(i)
}

for (let i = 0; i <= 100; i++) {
  diameters.push(i)
}

Page({
  data: {
    treadwidths: treadwidths,
    aspectratios: aspectratios,
    diameters: diameters,
    //数组中的数字依次表示选择的第几项（下标从 0 开始），数字大于可选项长度时，选择最后一项
    value: [0, 0, 0],
    lng:"",
    lat:""
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      treadwidth: this.data.treadwidths[val[0]],
      aspectratio: this.data.aspectratios[val[1]],
      diameter: this.data.diameters[val[2]]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
  wx.getLocation({
    success: function(res) {
      console.log(res);
      var lat = res.latitude,
          lng = res.longitude;
        that.setData({
          lat: lat,
          lng: lng
        })
    },
  })
    this.setData({
      tyreselected: 'http://116.62.151.139/res/img/tyreselect.png',
    })
  },
  //获取轮胎规格
  bindChange: function (e) {
    //console.log(e);
    var detail = e.detail.value;
    var num01 = detail[0] + 1,
      num02 = '/',
      num03 = detail[2] + 1,
      num04 = 'R',
      num05 = detail[4] + 1,
      str = num01 + num02 + num03 + num04 + num05;
   // console.log(str);
    var that = this;
    that.setData({
      spec: str
    })

  },
  //点击搜索门店
  gosearch:function(){
    var that=this;
    //console.log(app.globalData.userId, app.globalData.carId, that.data.lat, that.data.lng)
    wx.request({
      url: app.globalData.testUrl + '/search/wxSearchStore',
      method: "post",
      data: {
        spec:that.data.str,
        searchType: 4,
        lat: that.data.lat,
        lng: that.data.lng,
        carId: app.globalData.carId,
        userId: app.globalData.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (result) {
        console.log(result);
      }
    })
    wx.setStorage({
      key: 'typestyle',
      data: that.data.spec,
    })
    wx.navigateBack({
       delta: 1
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  bindViewModelmatch:function(){
   /* wx:wx.navigateTo({
      url: '../modelmatch/modelmatch',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })*/
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