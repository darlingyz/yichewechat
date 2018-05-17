var amapFile = require('../../libs/amap-wx.js');
var app=getApp();
Page({
  data:{
    desc:''
  },
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'b8b11c44e28154724a37202ebd826e21' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        that.setData({
          desc:data
        })
        console.log(data);
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },
})