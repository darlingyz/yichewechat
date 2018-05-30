Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  goindex:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  abouts:function(){
      wx.navigateTo({
        url: '../about/about',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this;
    withShareTicket: true;
    if (res.from === 'button') {
      return {
        title: "一车独秀拼团活动",
        path: '/pages/index/index',
        success: function (res) {
          console.log(res);
          console.log("分享成功！")
        },
        fail: function (res) {
          console.log(res)
          console.log("fail分享失败")
        }
      }
    }
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