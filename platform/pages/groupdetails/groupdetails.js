
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    price1: "",
    odata: "",
    activityId:""
  },
  onLoad: function () {
    //页面详情
    var that = this;
    wx.getStorage({
      key: 'activityId',
      success: function (res) {
        //activityId = res.data;
        console.log(res);
        that.setData({
          activityId: res.data
        });
        wx.request({
          url: app.globalData.testUrl + '/activity/groupDetail',
          method: 'post',
          data: {
            id: res.data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (msg) {
            console.log(msg);
            var rdata = msg.data.data;
            console.log(rdata);
            that.setData({
              odata: rdata
            })
          }
        })
      },
    })
    this.setData({
      //所有图片的高度  
      imgheights: [],
      //默认  
      current: 0,
    })
  },

  //跳转至拼团规则
  bindViewrules: function () {
    wx.navigateTo({
      url: '../rules/rules'
    });
  },
  //跳转至支付页
  bindViewpay: function (e) {
    // console.log("66666666666666666");
    // console.log(app.globalData.carId)
    var that = this;
    var otype = e.currentTarget.dataset.type;
    var carId = app.globalData.carId;
    wx.request({
      url: app.globalData.testUrl + '/activity/userGroupActivity',
      method: 'post',
      data: {
        activityId: that.data.activityId,
        userId: app.globalData.userId,
        carId: carId,
        type: otype
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        console.log(that.data.activityId, app.globalData.userId, carId);
        var odata = msg.data.data;
        wx.setStorage({
          key: 'codedata',
          data: msg,
        })
        wx.navigateTo({
          url: '../paygroup/paygroup',
        })
      }
    })
  },
  imageLoad: function (e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    // console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里  
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  //跳转至开始拼团
  bindViewstartgroup: function () {
    wx.navigateTo({
      url: '../startgroup/startgroup',
    })
  },
  onReady: function () {

  }
})