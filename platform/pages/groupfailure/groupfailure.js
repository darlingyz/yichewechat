var app = getApp();
Page({
  data: {
          wash:'洗车',
          onsale:'限时优惠',
          onsale1:'新年感恩',
          price:'￥',
          price1:'9.9', 
          exPrice:'原价￥40.0',
          discount:'-砍价低至2.5折-',
          beginLogo:'http://192.168.1.111:91/userPic.png',
          beginName:'淦隆汽车',
          beginTime:'2018-02-14 13：31发起',
          beginLogo2:'http://192.168.1.111:91/userPic.png',
          beginName2:'享来享趣',
          beginTime2:'2018-02-14 13：31参与',
          beginLogo3:'http://192.168.1.111:91/userPic.png',
          beginName3:'一车独秀',
          beginTime3:'2018-02-14 13：31参与',
          },
  bindViewhome: function () {
    wx.switchTab({
      url: '../home/home',
    })
  },
  onLoad:function(){
    var that = this;
    wx.getStorage({
      key: 'activityId',
      success: function(res) {
        wx.request({
          url: app.globalData.testUrl + '/activity/GroupSuccess',
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
              ex_price: '原价' + msg.data.data.Activity.price,
              discount: '-砍价低至' + (msg.data.data.Activity.groupPrice / msg.data.data.Activity.price * 10).toFixed(1) + '折-',
              helpsMsg: msg.data.data.helps,
              mobile: msg.data.data.Activity.mobile,
              address: msg.data.data.Activity.address,
              beginLogo: msg.data.data.Activity.portrait,
              beginTime: msg.data.data.Activity.stime,
              beginName: msg.data.data.Activity.userName
            })
          }
        })
      },
    })
  }
})