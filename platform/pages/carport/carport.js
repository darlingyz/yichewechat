var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hvaemsg:false,
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
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (msg) {
        var ocarId = msg.data.data;
        if (ocarId.length==0){
            that.setData({
              hvaemsg:false
            })
        }else{
          app.globalData.carId = ocarId[0].carId;
          wx.setStorage({
            key: 'carId',
            data: ocarId[0].carId,
          })
          that.setData({
            hvaemsg:true,
            carportList: msg.data.data
          })
        }
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