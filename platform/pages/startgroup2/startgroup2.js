var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  bindViewrules: function () {
    wx.navigateTo({
      url: '../rules/rules'
    });
  },

  bindViewhome:function(){
    wx.switchTab({
      url: '../home/home',
    })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'activityId',
      success: function(res) {
        //这里获取分享时传过来的id
      },
    })
    //使用分享过来的id进行参与活动,我这里写死一个
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/activity/userStartGroupActivity',
      method: 'post',
      data: {
        userGroupId: 64
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log(msg);
        that.setData({
          store: msg.data.data.Activity.activityImg,
          wash: msg.data.data.Activity.activityName,
          onsale: msg.data.data.Activity.description,
          price: '￥',
          price1: msg.data.data.Activity.groupPrice,
          ex_price: '原价￥' + msg.data.data.Activity.price,
          discount: '-砍价低至' + (msg.data.data.Activity.groupPrice / msg.data.data.Activity.price * 10).toFixed(1) + '折-',
          residueNumbers: msg.data.data.Activity.shortNum,
          residueTime: msg.data.data.Activity.etime,
          pic_1: msg.data.data.Activity.portrait,
          helpsMsg: msg.data.data.helps,
          group_arrow: 'http://116.62.151.139/res/img/detailed_arrow.png',
          needNum: msg.data.data.Activity.groupNum - 1,
          activityId: msg.data.data.Activity.id
        })
      }
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
    
  }
})