// pages/storeevaluate/storeevaluate.js
var shopId;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startSrc: 'http://116.62.151.139/res/img/star.png'
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
        app.request({
          url: app.globalData.testUrl + '/storeInformation/shopEvaluateQuery',
          method: 'post',
          data: {
            shopId: shopId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'//默认值
          },
          success: function (msg) {
            console.log("返回成功啦1111111122222222222222221");
            console.log(msg);
            that.setData({
              evaluateList: msg.data.data
            })
          }
        })
        this.setData({
          score: '4.9',
          commentpe: '2',
          startSrc: 'http://192.168.1.111:90/star.png',
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //调用 循环评价列表方法
    this.initEvaluateList();
  },
  //循环评价列表方法
  initEvaluateList: function () {
    this.setData({
      evaluateList: [
        {
          startSrc: 'http://192.168.1.111:90/star.png',
          userSrc: 'http://192.168.1.111:91/photopic.png',
          title: '小设计',
          date: '2017.12.22',
          message: '第二次在这家门店维修保养了，一如既往的赞',
          ephoto: 'http://192.168.1.111:91/photo.png',
        },
        {
          startSrc: 'http://192.168.1.111:90/star.png',
          userSrc: 'http://192.168.1.111:91/photopic.png',
          title: '小美工',
          date: '2017.12.22',
          message: '可以可以',
        },
      ]
    })
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