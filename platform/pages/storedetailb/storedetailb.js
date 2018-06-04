// pages/storedetailb/storedetailb.js
var app = getApp();
var shopId;
var thisdistance;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distance : 0,
    data:"",
    imgArr:"",
    shopPhone:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'shopId',
      success: function (res) {
        shopId = res.data;
      }
    })
    wx.getLocation({
      success: function (res) {
        var olat = res.latitude;
        var olng = res.longitude;
     
    wx.getStorage({
      key: 'businessId',
      success: function (res) {
        thisdistance = res.data;
        var oshopId = res.data;
        wx.request({
          url: app.globalData.testUrl + '/storeInformation/storeDetail',
          method: 'post',
          data: {
            businessId: oshopId,
            lat: olat,
            lng: olng
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (msg) {
            console.log(msg);
            console.log("******************")
            var odata=msg.data.data,
              oarr = odata.facadeDetailUrl,
              imgArr;
            imgArr=oarr.split(",");
            that.setData({
                  data:odata,
                  imgArr:imgArr,
                  shopPhone: odata.phone
            })
          }
        })
      }
    })
  },
})
},
  //回到顶部
  bindViewStoredetailb: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //查看图片
  previewImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //跳到门店评价
  bindViewStoreevaluate: function () {
    wx.navigateTo({
      url: '../storeevaluate/storeevaluate',
    })
  },
  //电话
  shopPhone:function(){
    var that=this;
    wx.makePhoneCall({
      phoneNumber: that.data.shopPhone,
    })
  },
  //地图
  goShop:function(){
    wx.navigateTo({
      url: '../searchmap/searchmap',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.initAdsInfo();
   // this.initServerList();
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

  }
})