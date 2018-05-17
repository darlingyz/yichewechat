var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad : function(){
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/carInformation/wxUserCarQuery',
      method: 'post',
      data: {
        userId : app.globalData.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        
        var ocarId = msg.data.data;
        app.globalData.carId = ocarId[0].carId;
        console.log(ocarId[0].carId);
        console.log(ocarId);
        wx.setStorage({
          key: 'carId',
          data: ocarId[0].carId,
        })
        that.setData({
          carportList : msg.data.data
        })
      }
    })
  },
  bindViewillegallist:function(){
    wx.navigateTo({
      url: '../illegallist/illegallist',
    })
  },
  bindViewcarport1:function(e){
    wx.setStorage({
      key: 'carId',
      data: e.currentTarget.dataset.id,
    })
    wx.navigateTo({
      url: '../carport1/carport1',
    })
  },
  addCar :function(e){
    wx.navigateTo({
      url: '../selectmodel/selectmodel',
    })
  }
})