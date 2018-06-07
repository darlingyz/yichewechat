//好友付完钱后跳转的页面
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId:"",
    userGroupId:""
  },
  onLoad: function (options) {
    var that = this;
    var userGroupId = options.userGroupId;
    var nums = parseInt(userGroupId);
    console.log(nums)
    that.setData({
      userGroupId: nums
    })
    //此处要获取支付页面跳转过来后 传过来的活动id
        app.request({
          url: app.globalData.testUrl + '/activity/userHelpGroupActivity',
          method: 'post',
          data: {
            headGroupId:nums,//团长拼团的id222,//
            userId:app.globalData.userId,//325,//分享后好友的ID333
            orderId:app.globalData.orderId,//31
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'//默认值
          },
          success: function (msg) {
            console.log(msg);
            console.log(that.data.userGroupId, app.globalData.userId, app.globalData.orderId)
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
    var that=this;
    withShareTicket: true;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: "提示",
      path: '/pages/startgroup2/startgroup2?userGroupId=' + that.data.userGroupId,
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
  onReady:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})