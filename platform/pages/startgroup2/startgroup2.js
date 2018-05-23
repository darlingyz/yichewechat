//好友点开拼图链接，分享出去的页面
var app = getApp();
var common = require('../../libs/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    maskModal:false,
    userGroupId: "",
    userId:"",
    openId:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getUserInfo: function (res) {
    var that = this;
    that.setData({
      maskModal: false,
    })
    var models = that.data.maskModal;
    var userInfo = res.detail.userInfo;
    var nickName = userInfo.nickName;
    var vatarUrl = userInfo.avatarUrl;
    var openid = app.globalData.openId;
    app.globalData.nickName = nickName;
    app.globalData.vatarUrl = vatarUrl;
    wx.request({
      url: app.globalData.testUrl + '/login/wxLittleLogin',
      data: {
        openId: openid,
        userName: nickName,
        portait: vatarUrl
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        var data = res.data.data;
        if (data == null) {
          wx.showModal({
            title: '温馨提示',
            content: '请先绑定手机号!',
            success: function (res) {
              if (res.confirm) {
                //console.log('用户点击确定去注册手机号')
                wx.navigateTo({
                  url: '../phonelogin/phonelogin',
                })
              } else if (res.cancel) {
                //用户点击取消退出小程序
                wx.navigateBack({
                  delta: 0
                })
              }
            }
          })
        } else {
          var userId = res.data.data.userId;
          app.globalData.userId = userId;
          that.setData({
            userId: userId
          })
          console.log(that.globalData.userId);
        }
      },
    })
    app.globalData.userInfo = res.detail.userInfo;
  },
  onLoad: function (options) {
    wx.showLoading({ title: '努力加载中...' }),
    console.log(options);
    //获取活动传过来的活动userGropId,获取该活动页面的信息
    var that=this;
    var userGroupId = options.userGroupId;
    var nums = parseInt(userGroupId);//整形数字
    console.log(nums);
    app.globalData.nums = nums;//设置全局,拼团的ID
    that.setData({
      userGroupId: nums
    })
    wx.updateShareMenu({
      withShareTicket: true,
      success:function(){
        wx.request({
          url: 'https://api-wechat.glongcar.com/api' + '/activity/SearchheadGroupDetail',
          method: 'post',
          data: {
            userGroupId: nums
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'//默认值
          },
          success: function (msg) {
            wx.hideLoading();
            console.log(msg);
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
              time: msg.data.data.Activity.etime
            })
          }
        })
      }
    })    
  },
  //使用分享过来的id进行参与活动,我这里写死一个
  //传的值为id// 分享
  onShareAppMessage: function (res) {
    var that = this;
    withShareTicket: true;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      return {
        title: "提示",
        path: '/pages/startgroup2/startgroup2?userGroupId' + that.data.userGroupId,
        success: function (res) {
          console.log(res);
          wx.request({
            url: 'https://api-wechat.glongcar.com/api' + '/activity/SearchheadGroupDetail',
            method: 'post',
            data: {
              userGroupId: that.data.userGroupId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'//默认值
            },
            success:function(msg){
              console.log(msg)
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
                time: msg.data.data.Activity.etime
              })
            }
          })
        },
        fail: function (res) {
          // 分享失败
          console.log(res)
          console.log("fail=分享失败==============")
        }
      }
    }
  },
  //拼团规则
  bindViewrules: function () {
    wx.navigateTo({
      url: '../rules/rules'
    });
  },
  //去首页
  bindViewhome: function () {
    wx.switchTab({
      url: '../index/index',
    })
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
        url: 'https://api-wechat.glongcar.com/api' + '/activity/HelpGroupActivity',
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
            url: '../paygroupfriend/paygroupfriend',
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

  },
  close: function () {
    wx.navigateBack({
      delta: 0
    })
  }
})