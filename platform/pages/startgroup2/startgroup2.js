var app = getApp();
var common = require('../../libs/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId: ""
  },
  //登陆获取用户信息
  bindViewrules: function () {
    wx.navigateTo({
      url: '../rules/rules'
    });
  },
  bindViewhome: function () {
    wx.switchTab({
      url: '../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    //获取活动传过来的活动id,获取该活动页面的信息
    var userGroupId = options.userGroupId;
    var nums = parseInt(userGroupId);
    console.log(nums);
    app.globalData.nums = nums;//设置全局,拼团的ID
    that.setData({
      userGroupId: nums
    })
    wx.request({
      url: app.globalData.testUrl + '/activity/SearchheadGroupDetail',
      method: 'post',
      data: {
        userGroupId: 161
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        console.log(that.data.activityId)
        //console.log(userGroupId)
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
  //用户点击获取用户的id和活动id,用来给拼团活动发送接口
  /*wx.request({
    url: app.globalData.testUrl + '/activity/SearchUserGroupActivity',
    method: 'post',
    data: {
      userId: app.globalData.userId,
      activityId: 127
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'//默认值
    },
    success: function (msg) {
      console.log(msg);
      console.log(app.globalData.userId, that.data.activityId)
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
  })*/
  //使用分享过来的id进行参与活动,我这里写死一个
  //付过钱的活动的详情===或者付过钱首页进入后的
  //传的值为id
  // 分享
  onShareAppMessage: function (res) {
    var that = this;
    withShareTicket: true;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: "提示",
      path: '/pages/startgroup2/startgroup2?activityId' + that.data.activityId,
      success: function (res) {
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
        console.log(res);
        var shareTickets = res.shareTickets[0];
        app.globalData.shareTickets = shareTickets;
        console.log(shareTickets);
        console.log("分享成功！===============")
        wx.getShareInfo({
          //shareTicket: res.shareTickets[0],
          success: function (res) {
            console.log(res)
            console.log("success===获取信息成功======")
          },
          fail: function (res) {
            console.log(res)
            console.log("fail====获取信息失败====5555")
          },
          complete: function (res) {
            console.log(res);
            console.log(res + "complete========")
          }
        });
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
        console.log("fail=分享失败==============")
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  bindViewhome:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  //去支付界面
  gopaygroup:function(e){
    var that = this;
    var carId = app.globalData.carId;
    if (carId == null) {
      wx.showModal({
        title: '提示',
        content: '你还没有设置默认车辆不能参加活动！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../carport/carport',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.request({
        url: app.globalData.testUrl + '/activity/HelpGroupActivity',
        method: 'post',
        data: {
          headGroupId: app.globalData.nums,
          userId:333,//拼团用户的id
          carId:154,
          type:2
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (msg) {
          console.log(msg)
          var odata = msg.data.data;
          wx.setStorage({
            key: 'codedata',
            data: msg,
          })
          wx.navigateTo({
            url: '../friendpaygroup/friendpaygroup',
          })
        }
      })
    }
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