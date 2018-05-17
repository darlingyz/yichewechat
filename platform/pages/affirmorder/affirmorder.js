var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    vatarUrl: "",
    allData: "",
    merchant: "",
    shoppingCartDetails: "",
    user: "",
    price:0,
    shoppingCar: "",
    shopCarId: "",
    couponsList:"",
    show: false,
    showModalStatus: false,
    couponSelectedId: 0,
    priceId: "",
    omerchantId:"",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      nickName: app.globalData.nickName,
      vatarUrl: app.globalData.vatarUrl
    })
    wx.request({
      url: app.globalData.testUrl + '/order/verifyOrder',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        shopCarId: app.globalData.shopcarId
      },
      success: function (res) {
        var merchantId = res.data.data.shoppingCar.merchantId;
        that.setData({
          merchant: res.data.data.merchant,
          shoppingCartDetails: res.data.data.shoppingCartDetails,
          shoppingCar: res.data.data.shoppingCar,
          users: res.data.data.users
        })
        //查询可用的优惠券
        wx.request({
          url: app.globalData.testUrl + '/coupon/couponQuery',
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            userId: app.globalData.userId
          },
          success: function (res) {
            var odata = res.data.data;
            var arr = [];
            for (var i = 0; i < odata.length; i++) {
              var omerchat = odata[i].merchantId;
              if (merchantId == omerchat) {
                arr.push(odata[i])
              } else {
                return
              }
            };
            that.setData({
              couponsList: arr
            })
          }
        })
      }
    });
  
  },
  //提交订单
  bindWiewpay: function () {
    //console.log(app.globalData.userId, app.globalData.merchantName, app.globalData.businessId, app.globalData.carId, app.globalData.shopcarId, "888888")
    var that = this;
    if (app.globalData.carId==null){
        wx.showModal({
          title: '提示',
          content: '你还没有添加默认车辆,请先添加再提交订单~',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
    }else{
      wx.request({
        url: app.globalData.testUrl + '/order/addShoppingOrder',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userId: app.globalData.userId,
          merchantName: app.globalData.merchantName,
          merchantId: app.globalData.businessId,
          carId: app.globalData.carId,
          orderType: 1,
          shoppingCarId: app.globalData.shopcarId
        },
        success: function (res) {
          var orderId = res.data.data;
          app.globalData.orderId = orderId;
          if (res.data.code == 1) {
            wx.navigateTo({
              url: '../pay/pay'
            })
          }
        }
      })
    }
  },
  txClick: function () {
    var isShow = this.data.show;
    this.setData({ show: !isShow })
    var tcShow = this.data.showModalStatus;
    this.setData({ showModalStatus: !tcShow })
  },
  closeClick: function () {
    var tcShow = this.data.showModalStatus;
    this.setData({ showModalStatus: !tcShow })
    var isShow = this.data.show;
    this.setData({ show: !isShow })
  },
  chooseClick: function (event) {
    var price = event.currentTarget.dataset.price;
    var couponSelectedId = event.currentTarget.dataset.id;
    var discountId = event.currentTarget.dataset.discountid;
    console.log(event);
    console.log(discountId);
    //优惠券Id
    app.globalData.discountId = discountId;
    this.setData({ 
      couponSelectedId: couponSelectedId,
      price: price
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  onShareAppMessage: function () {
  }
})
