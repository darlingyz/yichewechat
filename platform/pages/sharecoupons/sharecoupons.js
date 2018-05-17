// pages/sharecoupons/sharecoupons.js
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
        userSrc: 'http://192.168.1.111:91/userba.png',
        storeba: 'http://192.168.1.111:91/storeba.png',
        couponprice:'5',
        enprice:'10',
        sharecoupons:'淦隆汽车专享代金券',
        status:'已领取',
        usetime:'2018-04-20至2018-04-25',
        useplace:'限淦隆汽车门店使用',
        account:'18888886666',
     })
  },
  //打开一车独秀小程序
  bindViewHome: function(){
    wx.navigateTo({
      url: '../home/home'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //调用 分享列表方法
    this.initShareList();
  },
  //分享列表方法
  initShareList: function () {
    this.setData({
      shareList: [
        {
          username: '享来享趣',
          receivetime: '03-12 16:21',
          shareprice: '3',
        },
        {
          username: '享来享趣',
          receivetime: '03-12 16:21',
          shareprice: '2',
        },
     
      ]
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