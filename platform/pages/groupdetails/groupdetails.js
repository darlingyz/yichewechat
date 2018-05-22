
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nopay:true,
    price1: "",
    odata: "",
    activityId:""
  },
  onLoad: function () {
    //页面详情
    var that = this;
    var num = app.globalData.num;
    if(num==1){
     that.setData({
       nopay: false,
     })
    }else{
      that.setData({
        nopay: true,
      })
    }
    wx.getStorage({
      key: 'activityId',
      success: function (res) {
        var activityId = res.data;
        console.log(res);
        that.setData({
          activityId: res.data
        });
        console.log(app.globalData.userId, res.data)
        wx.request({
          url: app.globalData.testUrl + '/activity/groupDetail',
          method: 'post',
          data: {
            userId:app.globalData.userId,
            id: res.data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (msg) {

            console.log(msg);
            //userGroup==null表示没有参与拼团，即没有支付，显示支付，否则显示去查看拼团信息
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
    // console.log("666666666colData.carId)
    var that = this;
  console.log(e);
    var otype = e.currentTarget.dataset.type;
    console.log(otype);
    var carId = app.globalData.carId;
    if (carId==null){
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
    }else{
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
          console.log(msg)
          var odata=msg.data.data;
          if(odata==null){
            console.log("您已经拼过该团,不能贪心哦")
            wx.showModal({
              title: '提示',
              content: '您已经拼过该团,不能贪心哦',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定，去拼团页面')
                  wx.navigateTo({
                    url: "../startgroupmiddle/startgroupmiddle"
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消不去拼团页面')
                }
              }
            })
          }else{
            console.log("去付钱--")
            var odata = msg.data.data;
            var orderId= msg.data.data.orderId;
            app.globalData.orderId = orderId;
            wx.setStorage({
              key: 'codedata',
              data: msg,
            })
            wx.navigateTo({
              url: '../paygroup/paygroup',
            })
          }
        }
      })
    }

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