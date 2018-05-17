// pages/friendsbargain/friendsbargain.js
var app = getApp();
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
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/activity/userBargainDetail',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        //这里需要从上个页面获取 参与活动成功的返回值:活动id
        userBargainId : 20
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        that.setData({
          userSrc: msg.data.data.portait,
          washcoupons: msg.data.data.activityName,
          pnum: '888',
          nprice: msg.data.data.minPrice,
          oprice: msg.data.data.originalPrice,
          origprice: msg.data.data.originalPrice,
          middleprice: msg.data.data.middlePrice,
          bottomprice: msg.data.data.minPrice,
          pnuma: msg.data.data.middleNum,
          pnumb: msg.data.data.minNum,
          userName: msg.data.data.userName,
          storeba:msg.data.data.img,
          friendsCutList: msg.data.data.userBargainHelps//好友帮助砍价列表,如果为空要有一个没人帮助的显示效果
        })
      }
    })


 
  },
  //事件处理函数
  //帮他砍价
  bindViewHelpcut: function () {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/activity/helpBargain',
      method: 'post',
      data: {
        userId: app.globalData.userId,
        //这里需要从上个页面获取 参与活动成功的返回值:活动id
        userBargainId: 20
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        if(msg.data.code == 1){
          wx.setStorage({
            key: 'userBargainId',
            data: that.data.userBargainId,
          })
          wx.navigateTo({
            url: '../friendsbargainb/friendsbargainb'
          })
        }else{
          //如果没成功,给用户一个提示()
          console.log("错误信息 :" + msg.data.msg);
          wx.setStorage({
            key: 'userBargainId',
            data: 20,
          })
          wx.navigateTo({
            url: '../friendsbargainb/friendsbargainb'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  //数组循环广告位列表方法
  initAdsList: function () {
    this.setData({
      adsList: [
        {
          adsSrc: 'http://192.168.1.111:91/guessyourlike.png',
        },
        {
          adsSrc: 'http://192.168.1.111:91/guessyourlike.png',
        },
        {
          adsSrc: 'http://192.168.1.111:91/guessyourlike.png',
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