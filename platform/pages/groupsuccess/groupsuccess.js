var app = getApp();
Page({


  data: {
    store: 'http://116.62.151.139/res/img//absmall.png',
    wash: '洗车',
    onsale: '限时优惠',
    onsale1: '新年感恩',
    price: '￥',
    price1: '9.9',
    ex_price: '原价40.0',
    discount: '-砍价低至2.5折-',
    beginLogo1: 'http://116.62.151.139/res/img//absmall.png',
    beginName1: '淦隆汽车',
    beginTime1: '2018-02-14 13：31发起',
    beginLogo2: 'http://116.62.151.139/res/img//absmall.png',
    beginName2: '享来享趣',
    beginTime2: '2018-02-14 13：33参与',
    beginLogo3: 'http://116.62.151.139/res/img//absmall.png',
    beginName3: '一车独秀',
    beginTime3: '2018-02-14 13：33参与',
    mobile: '4008201868',
    lng: "",
    lat: "",
    merLng: "",
    merLat: "",
    merName: ""
  },

  bindViewhome: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  bindVieworderdetailed: function () {
    wx.navigateTo({
      url: '../orderdetailed/orderdetailed'
    });
  },
  gophone: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.mobile,
    })
  },
  //导航路径
  gomap: function () {
    var that = this;
    var city = "",
      desc = "",
      latitude = that.data.lat,
      latitude2 = that.data.merLat,
      longitude = that.data.lng,
      longitude2 = that.data.merLng,
      name = that.data.merName;
    wx.navigateTo({
      url: `../map/map?longitude=${longitude}&latitude=${latitude}&longitude2=${longitude2}&latitude2=${latitude2}&city=${city}&name=${name}&desc=${desc}`,
    })
  },
  onLoad: function (options) {
    var group = options.group;
    var that = this;
    wx.getStorage({
      key: 'lat',
      success: function (res) {
        var lat = res.data;
        that.setData({
          lat: lat
        })
      },
    })
    wx.getStorage({
      key: 'lng',
      success: function (res) {
        var lng = res.data;
        that.setData({
          lng: lng
        })
      },
    })
    app.request({
      url: app.globalData.testUrl + '/activity/GroupSuccess',
      method: 'post',
      data: {
        userGroupId: group
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (msg) {
        console.log(msg)
        that.setData({
          store: msg.data.data.Activity.activityImg,
          wash: msg.data.data.Activity.activityName,
          onsale: msg.data.data.Activity.description,
          price: '￥',
          price1: msg.data.data.Activity.groupPrice,
          ex_price: '原价' + msg.data.data.Activity.price,
          discount: '-砍价低至' + msg.data.data.Activity.discount + '折-',
          helpsMsg: msg.data.data.helps,
          mobile: msg.data.data.Activity.mobile,
          address: msg.data.data.Activity.address,
          beginLogo1: msg.data.data.Activity.portrait,
          beginTime1: msg.data.data.Activity.stime,
          beginName1: msg.data.data.Activity.userName,
          merName: msg.data.data.Activity.merchantName,
          merLng: msg.data.data.Activity.lng,
          merLat: msg.data.data.Activity.lat,

        })
      }
    })
  },
})