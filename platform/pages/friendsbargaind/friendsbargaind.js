// pages/friendsbargaind/friendsbargaind.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userBargainId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userBargainId = options.userBargainId;
    that.setData({
      userBargainId: userBargainId
    })
        wx.request({
          url: app.globalData.testUrl + '/activity/userBargainDetail',
          method: 'post',
          data: {
            //从上个页面获取
            userBargainId: 40,//userBargainId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (msg) {
            console.log(msg);
            that.setData({
              userSrc: msg.data.data.portait,
              storeba: msg.data.data.img,
              washcoupons: msg.data.data.activityName,
              pnum: msg.data.data.attendAmount,
              nprice: msg.data.data.minPrice,
              oprice: msg.data.data.originalPrice,
              origprice: msg.data.data.originalPrice,
              middleprice: msg.data.data.middlePrice,
              bottomprice: msg.data.data.minPrice,
              pnuma: msg.data.data.middleNum,
              pnumb: msg.data.data.minNum,
              saleprice: msg.data.data.currentPrice,
              cutedprice: msg.data.data.minPrice,
              friendsCutList: msg.data.data.userBargainHelps//好友帮助砍价列表,如果为空要有一个没人帮助的显示效果
            })
          }
        })

    
  },
  //事件处理函数
  //查看订单去付款
  bindViewPay: function () {
    wx.navigateTo({
      url: '../waitpay/waitpay'
    })
  },
  onReady: function () {
    //调用 数组循环好友砍价详情列表方法
   // this.initFriendsCutList();
  },
  //数组循环好友砍价详情列表方法
  initFriendsCutList: function () {
    this.setData({
      friendsCutList: [
        {
          frienduserSrc: 'http://192.168.1.111:91/frienduser.png',
          friendsname: '小确幸',
          cutnum: '一',
          date: '03-02 ',
          time: '13:38',
        },
        {
          frienduserSrc: 'http://116.62.151.139/res/img/success.png',
          friendsname: '淦隆汽车',
          cutnum: '一',
          date: '03-02 ',
          time: '13:38',
        },
        {
          frienduserSrc: 'http://116.62.151.139/res/img/success.png',
          friendsname: '一车独秀',
          cutnum: '一',
          date: '03-02 ',
          time: '13:38',
        },
        {
          frienduserSrc: 'http://116.62.151.139/res/img/success.png',
          friendsname: '小确幸',
          cutnum: '一',
          date: '03-02 ',
          time: '13:38',
        },
        {
          frienduserSrc: 'http://116.62.151.139/res/img/success.png',
          friendsname: '淦隆汽车',
          cutnum: '一',
          date: '03-02 ',
          time: '13:38',
        },
        {
          frienduserSrc: 'http://116.62.151.139/res/img/success.png',
          friendsname: '一车独秀',
          cutnum: '一',
          date: '03-02 ',
          time: '13:38',
        },
      ]
    });
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