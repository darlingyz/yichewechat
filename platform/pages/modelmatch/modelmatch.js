// pages/selectstandard/selectstandard.js
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
    this.setData({
      carsign: 'http://192.168.1.111:90/carsign.png',
      cartype:'奔驰GLC 200 2017款',
      tyreselected: 'http://192.168.1.111:91/tyreselect.png',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //调用 循环汽车款型列表
    this.initCartypelist();
  },
  //循环汽车款型列表
  initCartypelist: function(){
  this.setData({
    cartypelist:[
      {
        carkind: '235/55R19',
      },
      {
        carkind: '225/45R17',
      },
      {
        carkind: '205/55R16',
      },
      {
        carkind: '225/40R18',
      },
    ]
  })
  },
  bindViewSelectstandard:function(){
    wx:wx.navigateTo({
      url: '../selectstandard/selectstandard',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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