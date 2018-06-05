var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskModal: false,
    hasList: false,
    carts: "",
    bussinessId: "",
    totalPrice: "",
    shopCarId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'businessId',
      success: function (res) {
        app.globalData.businessId = res.data;
      },
    })
    wx.getStorage({
      key: 'businessId',
      success: function (res) {
        console.log(res);
        var obId = res.data;
        that.setData({
          bussinessId: obId
        }),
          wx.request({
            url: app.globalData.testUrl + '/cartServcie/searchShoppingCartDetails',
            method: "post",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              userId: app.globalData.userId,
              merchantId: obId
            },
            success: function (res) {
              //console.log(res);
              if (res.data.data.length == 0) {
                that.setData({
                  hasList: false
                })
              } else {
                that.setData({
                  hasList: true,
                  carts: res.data.data
                })
                //查询总价钱
                wx.request({
                  url: app.globalData.testUrl + '/cartServcie/searchCarSum',
                  method: "post",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    userId: app.globalData.userId,
                    merchantId: obId
                  },
                  success: function (res) {
                    //console.log(res);
                    app.globalData.shopcarId = res.data.data.id;
                    //console.log(res.data.data.id);
                    that.setData({
                      totalPrice: res.data.data.totalCurrentPrice,
                      shopCarId: res.data.data.id
                    })
                  }
                })
              }
            }
          })
      },
    })
    this.getTotalPrice();
  },
  //添加商品
  addCount: function (e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    var merchantBusinessId = e.currentTarget.dataset.id
    let carts = this.data.carts;
    var businessNum = carts[index].businessNum;
    businessNum = businessNum + 1;
    carts[index].businessNum = businessNum;
   // console.log(that.data.bussinessId);
    //console.log(businessNum);
    wx.getStorage({
      key: 'businessId',
      success: function (res) {
        //console.log(res);
        var bId = res.data;
        wx.request({
          url: app.globalData.testUrl + '/cartServcie/addShoppingCart',
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            userId: app.globalData.userId,
            merchantBusinessId: merchantBusinessId,
            num: 1
          },
          success: function (res) {
            console.log(res)
          }
        })
      }
    })
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  //减少商品
  minusCount: function (e) {
    //console.log(e)
    const index = e.currentTarget.dataset.index;
    var merchantBusinessId = e.currentTarget.dataset.id
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let businessNum = carts[index].businessNum;
    if (businessNum <= 1) {
      return false;
    }
    businessNum = businessNum - 1;
    carts[index].businessNum = businessNum;
    wx.getStorage({
      key: 'businessId',
      success: function (res) {
        //console.log(res);
        var bId = res.data;
        wx.request({
          url: app.globalData.testUrl + '/cartServcie/subtractShoppingCart',
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            userId: app.globalData.userId,
            merchantBusinessId: merchantBusinessId,
            num: 1
          },
          success: function (res) {
            console.log(res);
          }
        })
      }
    })
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  //删除商品
  deleteList: function (e) {
    console.log(e);
    var that = this;
    var shoppingCarDetailsId = e.currentTarget.dataset.cardeid;
    var index = e.currentTarget.dataset.index;
    var carts = that.data.carts;
    carts.splice(index, 1);
    that.setData({
      carts: carts
    });
    if (!carts.length) {                  // 如果购物车为空
      that.setData({
        hasList: false              // 修改标识为false，显示购物车为空页面
      });
    } else {                              // 如果不为空
      this.getTotalPrice();           // 重新计算总价格
    }
    wx.request({
      url: app.globalData.testUrl + '/cartServcie/deleteOneShoppingCarDetails',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        shoppingCarDetailsId: shoppingCarDetailsId
      },
      success: function (res) {
        //console.log(res);
        if (res.data.code == 1) {
          wx.showToast({
            title: '删除成功!',
            icon: 'success',
            duration: 1000,
          })
        }
      }
    })

  },
  //计算总价钱
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      total += carts[i].businessNum * carts[i].price;   // 所有价格加起来
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },
  //订单生成，跳转到订单生成页面
  makeorder: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/order/verifyOrder',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        shopCarId: that.data.shopCarId
      },
      success: function (res) {
        var odata = res.data.data;
        if (odata == null) {
          wx.showModal({
            title: '提示',
            content: '请先注册手机号再结算！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '../phonelogin/phonelogin',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '../affirmorder/affirmorder',
          })
        }
      }
    })
  },

  gocancel: () => {
    var that = this;

    that.setData({
      maskModal: false
    });
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