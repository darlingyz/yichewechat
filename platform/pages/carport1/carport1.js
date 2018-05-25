var app = getApp();
var carId;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showModalStatus: false,
    editModel: false,
  },
  txClick: function () {
    var isShow = this.data.show;
    this.setData({ show: !isShow })
    var tcShow = this.data.showModalStatus;
    this.setData({ showModalStatus: !tcShow })
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'carId',
      success: function (res) {
        carId = res.data
        wx.request({
          url: app.globalData.testUrl + '/carInformation/searchCarByCarId',
          method: 'post',
          data: {
            userId: app.globalData.userId,
            carId: res.data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'//默认值
          },
          success: function (msg) {
            console.log(msg);
            that.setData({
              illegalPic:msg.data.data.carLogo,
              illegalModel : msg.data.data.carName,
              distance: msg.data.data.strokeCount,
              illicenseNumber: msg.data.data.carNo,
              carEngine: msg.data.data.carEngine,
              carFrame: msg.data.data.carFrame,
              oilMileage: msg.data.data.oilMileage,
              dailyMileage: msg.data.data.dailyMileage,
            })
          }
        })
      },
    })
  },
  cancelClick: function () {
    var isShow = this.data.show;
    this.setData({ show: !isShow });
    var tcShow = this.data.showModalStatus;
    this.setData({ showModalStatus: !tcShow });
  },
  bindViewcarport: function () {
    var that =this;
    wx.request({
      url: app.globalData.testUrl + '/shopCarRecord/updateCarRecord',
      method: 'post',
      data: {
        carId: carId,
        carNo: that.data.illicenseNumber,
        carEngine: that.data.carEngine,
        carFrame: that.data.carFrame,
        oilMileage: that.data.oilMileage,
        dailyMileage: that.data.dailyMileage
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
      }
    })
    wx.navigateTo({
      url: '../carport/carport',
    })
  },
  setDefault : function(){
    wx.request({
      url: app.globalData.testUrl + '/carInformation/modifyDefault',
      method: 'post',
      data: {
        carId :carId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        //这里修改为默认的之后,在我的页面 显示的还是以前的默认车辆信息,不会更新
        wx.navigateTo({
          url: '../carport/carport',
        })
      }
    })
  },
  sureClick: function () {
    var that = this;
    var editModel = that.data.editModel;
    wx.request({
      url: app.globalData.testUrl + '/carInformation/deleteCarInfo',
      method: 'post',
      data: {
        carId: carId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        if(msg.data.code == 1){
        that.setData({
          editModel: !editModel,
        });
        var isShow = that.data.show;
        that.setData({ show: !isShow });
        var tcShow = that.data.showModalStatus;
        that.setData({ showModalStatus: !tcShow });
        wx.navigateTo({
          url: '../carport/carport',
        })
        }else{
         var omsg=msg.data.data;
         if (omsg == "删除失败,默认车不能删"){
           wx.showModal({
             title: '提示',
             content: '删除失败,默认车不能删!',
             success:function(res){
               if (res.confirm){
                    wx.switchTab({
                      url: '../my/my',
                    })
               }else{
                 wx.navigateTo({
                   url: '../carport/carport',
                 })
               }
             }
           }) 
         }
        }
      }
    })
  },
  editClick: function () {
    wx.navigateTo({
      url: '../carport1/carport1',
    })
  },
  illicenseNumber : function(e){
    this.setData({
      illicenseNumber: e.detail.value
    })
  },
  carEngine: function (e) {
    this.setData({
      carEngine: e.detail.value
    })
  },
  carFrame: function (e) {
    this.setData({
      carFrame: e.detail.value
    })
  },
  oilMileage: function (e) {
    this.setData({
      oilMileage: e.detail.value
    })
  },
  dailyMileage: function (e) {
    this.setData({
      dailyMileage: e.detail.value
    })
  }
})