var app =getApp();
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

  bindViewhome:function()
  {
   wx.switchTab({
     url: '../index/index',
   })
  },
  //分享活动
  shareActivity:function(){
    //分享活动时,把团长的活动id发到下个页面,好友拼团时使用
    wx.setStorage({
      key: 'activityId',
      data: this.data.activityId,
    })
    //进行分享操作
    //.....
  },
  onLoad:function(){
    //此处要获取支付页面跳转过来后 传过来的活动id
    var that = this;
    wx.getStorage({
      key: 'activityId',
      success: function(res) {
    wx.request({
      url: app.globalData.testUrl + '/activity/userStartGroupActivity',
      method: 'post',
      data: {
        userGroupId: res.data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        that.setData({
          store: msg.data.data.Activity.activityImg,
          wash: msg.data.data.Activity.activityName,
          onsale: msg.data.data.Activity.description,
          price: '￥',
          price1: msg.data.data.Activity.groupPrice,
          ex_price: '原价￥' + msg.data.data.Activity.price,
          discount: '-砍价低至' + (msg.data.data.Activity.groupPrice / msg.data.data.Activity.price * 10).toFixed(1) +'折-',
          residueNumbers: msg.data.data.Activity.shortNum,
          residueTime: msg.data.data.Activity.etime,
          pic_1: msg.data.data.Activity.portrait,
          helpsMsg :msg.data.data.helps,
          group_arrow: 'http://116.62.151.139/res/img/detailed_arrow.png',
          needNum: msg.data.data.Activity.groupNum -1,
          activityId : msg.data.data.Activity.id
        })
      }
    })

      },
    })
  },

})