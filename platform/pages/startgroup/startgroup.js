//付款之后跳转的页面，只能在付款之后出现
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId: "",
    userGroupId: ""
  },

  onLoad: function (option) {
    var that = this;
    var sendinfo = option.sendinfo;
    console.log(option);
    //此处要获取支付页面跳转过来后 传过来的活动id
    wx.getStorage({
      key: 'activityId',
      success: function (res) {
        var activityId = res.data;
        console.log(activityId, app.globalData.userId, app.globalData.orderId)
        that.setData({
          activityId: activityId
        }),
          wx.setStorage({
            key: 'activityId',
            data: activityId,
          })
        wx.request({
          url: app.globalData.testUrl + '/activity/userStartGroupActivity',
          method: 'post',
          data: {
            activityId: activityId,
            userId: app.globalData.userId,
            orderId: app.globalData.orderId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (msg) {
            var userGroupId = msg.data.data.Activity.userGroupId;
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
              activityId: msg.data.data.Activity.id,
              userGroupId: userGroupId
            })
          }
        })
      },
    })
  },
  bindViewrules: function () {
    wx.navigateTo({
      url: '../rules/rules'
    });
  },
  bindViewhome: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  onShareAppMessage: function (res) {
    var that = this;
    withShareTicket: true;
    if (res.from === 'button') {
      console.log(res.target)
      return {
        title: "一车独秀拼团活动",
        path: '/pages/startgroup2/startgroup2?userGroupId=' + that.data.userGroupId,
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
  onReady: function () {
  }
})